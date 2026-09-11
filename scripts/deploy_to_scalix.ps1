$ErrorActionPreference = "Stop"

$tokenFile = "E:\OakShow API's\oakshowGitToke.txt"
$token = if (Test-Path $tokenFile) { (Get-Content $tokenFile).Trim() } else { $env:GITHUB_TOKEN }
$scalixKeyFile = "E:\OakShow API's\scalixApiKey.txt"
$scalixKey = if (Test-Path $scalixKeyFile) { (Get-Content $scalixKeyFile).Trim() } else { $env:SCALIX_API_KEY }
$git = 'C:\Users\Admin\AppData\Local\GitHubDesktop\app-3.6.4\resources\app\git\cmd\git.exe'
$workDir = 'e:\OakShow\oakshow-prod-clean'
$srcDir = 'e:\OakShow'

Write-Host "=== Preparing oakshow-prod deployment ==="

# 1. Sync compiled assets
$assetsDir = Join-Path $workDir "dist\assets"
if (Test-Path $assetsDir) {
    Remove-Item -Recurse -Force $assetsDir
}
New-Item -ItemType Directory -Force -Path $assetsDir | Out-Null
Copy-Item -Path "$srcDir\dist\assets\*" -Destination "$assetsDir\" -Force
Write-Host "Synced dist/assets."

# 2. Sync index.html and root icons
Copy-Item -Path "$srcDir\dist\index.html" -Destination "$workDir\dist\index.html" -Force
if (Test-Path "$srcDir\public\favicon.ico") { Copy-Item -Path "$srcDir\public\favicon.ico" -Destination "$workDir\dist\favicon.ico" -Force }
if (Test-Path "$srcDir\public\favicon.png") { Copy-Item -Path "$srcDir\public\favicon.png" -Destination "$workDir\dist\favicon.png" -Force }
if (Test-Path "$srcDir\public\robots.txt") { Copy-Item -Path "$srcDir\public\robots.txt" -Destination "$workDir\dist\robots.txt" -Force }
if (Test-Path "$srcDir\public\sitemap.xml") { Copy-Item -Path "$srcDir\public\sitemap.xml" -Destination "$workDir\dist\sitemap.xml" -Force }

# 3. Sync all prerendered static HTML files into dist/
$htmlFiles = Get-ChildItem -Path "$srcDir\dist" -Filter "*.html" -File
foreach ($h in $htmlFiles) {
    Copy-Item -Path $h.FullName -Destination "$workDir\dist\$($h.Name)" -Force
}
Write-Host "Synced $($htmlFiles.Count) prerendered HTML pages to dist."

# 4. Sync root HTML files in oakshow-prod
$rootHtmls = @("Digger.html", "GDN.html", "Upcoming.html", "Upcoming2.html", "Upcoming3.html", "ImGame.html", "TheWhisperMan.html", "Careers.html")
foreach ($rf in $rootHtmls) {
    if (Test-Path "$srcDir\$rf") {
        Copy-Item -Path "$srcDir\$rf" -Destination "$workDir\$rf" -Force
    }
}

# 5. Copy local media folders (Digger, GDN, and Logos) into dist
$mediaDirs = @(
    @{ Src = "$srcDir\pics\Films\Digger"; Dest = "$workDir\dist\pics\Films\Digger" },
    @{ Src = "$srcDir\pics\Films\GDN"; Dest = "$workDir\dist\pics\Films\GDN" },
    @{ Src = "$srcDir\pics\RatingSiteLogos"; Dest = "$workDir\dist\pics\RatingSiteLogos" },
    @{ Src = "$srcDir\pics\SocialWebsiteLogos"; Dest = "$workDir\dist\pics\SocialWebsiteLogos" },
    @{ Src = "$srcDir\pics\BookngWebSiteLogos"; Dest = "$workDir\dist\pics\BookngWebSiteLogos" },
    @{ Src = "$srcDir\pics\WatchOnline"; Dest = "$workDir\dist\pics\WatchOnline" }
)

foreach ($m in $mediaDirs) {
    if (Test-Path $m.Src) {
        New-Item -ItemType Directory -Force -Path $m.Dest | Out-Null
        Copy-Item -Path "$($m.Src)\*" -Destination "$($m.Dest)\" -Recurse -Force
        Write-Host "Copied local media: $($m.Src) -> $($m.Dest)"
    }
}

# 6. Copy updated nginx.conf
Copy-Item -Path "$srcDir\nginx.conf" -Destination "$workDir\nginx.conf" -Force
Write-Host "Synced nginx.conf with high-speed Multi-CDN media fallback."

# 7. Ensure .dockerignore exists
$dockerignoreContent = @'
.git
.gitignore
*.md
'@
Set-Content -Path "$workDir\.dockerignore" -Value $dockerignoreContent

# 8. Check context size excluding .git
$nonGitFiles = Get-ChildItem -Path $workDir -Recurse -File | Where-Object { $_.FullName -notmatch '\\\.git($|\\)' }
$totalBytes = ($nonGitFiles | Measure-Object -Property Length -Sum).Sum
$totalMB = [math]::Round($totalBytes / 1MB, 2)
Write-Host "Build context size (excluding .git): $totalMB MB"

if ($totalMB -gt 60) {
    Write-Error "Build context size too large: $totalMB MB > 60 MB"
    exit 1
}

# 9. Git commit and push to oakshow-prod
Write-Host "Committing and pushing to oakshow-prod..."
& $git -C $workDir config user.name 'jithinjprasad'
& $git -C $workDir config user.email 'jithinjprasad@gmail.com'
& $git -C $workDir add -A
& $git -C $workDir commit -m "Permanently remove dark theme codebase and toggles across all devices" -q
& $git -C $workDir push "https://$token@github.com/jithinjprasad/oakshow-prod.git" main

if ($LASTEXITCODE -ne 0) {
    Write-Error "Git push to oakshow-prod failed"
    exit 1
}

Write-Host "Git push succeeded! Triggering Scalix build..."

# 10. Trigger Scalix build
$headers = @{
    "Authorization" = "Bearer $scalixKey"
    "X-Project-Id"  = "408d193f-88ad-4b4c-bcea-587580f4f877"
    "Content-Type"  = "application/json"
}

$body = @{
    source_type     = "git"
    source_url      = "https://github.com/jithinjprasad/oakshow-prod.git"
    source_ref      = "main"
    dockerfile_path = "Dockerfile"
    image_tag       = "oakshow"
    auth_token      = $token
} | ConvertTo-Json

$res = Invoke-RestMethod -Uri "https://api.scalix.world/v1/build" -Method Post -Headers $headers -Body $body
$buildId = $res.build.id
Write-Host "Triggered build ID: $buildId"

$status = $res.build.status
$elapsed = 0
while ($status -ne "succeeded" -and $status -ne "completed" -and $status -ne "failed") {
    Start-Sleep -Seconds 3
    $elapsed += 3
    $check = Invoke-RestMethod -Uri "https://api.scalix.world/v1/build/$buildId" -Headers $headers
    $status = $check.build.status
    Write-Host "[$elapsed s] Build status: $status"
}

if ($status -ne "succeeded" -and $status -ne "completed") {
    $err = $check.build.error_message
    Write-Error "Build failed ($status): $err"
    exit 1
}

Write-Host "Build SUCCEEDED! Updating Scalix compute service..."
$scalixCli = "C:\Users\Admin\AppData\Local\npm-cache\_npx\3f549465910e61c1\node_modules\scalix-cloud\binaries\scalix-cloud.exe"
$serviceBody = '{\"image_ref\":\"172.18.0.253:5000/408d193f-88ad-4b4c-bcea-587580f4f877/oakshow:latest\",\"rollout_strategy\":\"instant\"}'

& $scalixCli api compute update-service 6c2b26e5-121c-4291-8970-ed91b34c3efb --body $serviceBody --api-url https://api.scalix.world --token $scalixKey --project 408d193f-88ad-4b4c-bcea-587580f4f877

Write-Host "SUCCESS: Scalix service updated and live on https://oakshow.in!"
