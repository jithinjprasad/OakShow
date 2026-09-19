$ErrorActionPreference = "Stop"
$env:GIT_TERMINAL_PROMPT = "0"

$token = if (Test-Path -LiteralPath "E:\OakShowOther\OakShow API's\oakshowGitToke.txt") { (Get-Content -LiteralPath "E:\OakShowOther\OakShow API's\oakshowGitToke.txt").Trim() } elseif (Test-Path -LiteralPath "E:\OakShow API's\oakshowGitToke.txt") { (Get-Content -LiteralPath "E:\OakShow API's\oakshowGitToke.txt").Trim() } elseif (Test-Path -LiteralPath "E:\oakshowGitToke.txt") { (Get-Content -LiteralPath "E:\oakshowGitToke.txt").Trim() } else { $env:GITHUB_TOKEN }
$scalixKey = if (Test-Path -LiteralPath "E:\scalixApiKey.txt") { (Get-Content -LiteralPath "E:\scalixApiKey.txt").Trim() } elseif (Test-Path -LiteralPath "E:\OakShowOther\OakShow API's\scalixApiKey.txt") { (Get-Content -LiteralPath "E:\OakShowOther\OakShow API's\scalixApiKey.txt").Trim() } elseif (Test-Path -LiteralPath "E:\OakShow API's\scalixApiKey.txt") { (Get-Content -LiteralPath "E:\OakShow API's\scalixApiKey.txt").Trim() } elseif (Test-Path -LiteralPath "E:\OakShow API's\oakshowApi.txt") { (Get-Content -LiteralPath "E:\OakShow API's\oakshowApi.txt").Trim() } elseif (Test-Path -LiteralPath "E:\oakshowApi.txt") { (Get-Content -LiteralPath "E:\oakshowApi.txt").Trim() } else { $env:SCALIX_API_KEY }
$git = if (Test-Path 'C:\Program Files\Git\cmd\git.exe') { 'C:\Program Files\Git\cmd\git.exe' } elseif (Test-Path 'C:\Users\Admin\AppData\Local\GitHubDesktop\app-3.6.4\resources\app\git\cmd\git.exe') { 'C:\Users\Admin\AppData\Local\GitHubDesktop\app-3.6.4\resources\app\git\cmd\git.exe' } else { 'git' }
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
if (Test-Path "$srcDir\dist\header.txt") { Copy-Item -Path "$srcDir\dist\header.txt" -Destination "$workDir\dist\header.txt" -Force }
if (Test-Path "$srcDir\dist\footer.txt") { Copy-Item -Path "$srcDir\dist\footer.txt" -Destination "$workDir\dist\footer.txt" -Force }
if (Test-Path "$srcDir\dist\now.txt") { Copy-Item -Path "$srcDir\dist\now.txt" -Destination "$workDir\dist\now.txt" -Force }
if (Test-Path "$srcDir\dist\css") {
    $destCss = "$workDir\dist\css"
    if (-not (Test-Path $destCss)) { New-Item -ItemType Directory -Force -Path $destCss | Out-Null }
    Copy-Item -Path "$srcDir\dist\css\*" -Destination "$destCss\" -Recurse -Force
}
if (Test-Path "$srcDir\dist\js") {
    $destJs = "$workDir\dist\js"
    if (-not (Test-Path $destJs)) { New-Item -ItemType Directory -Force -Path $destJs | Out-Null }
    Copy-Item -Path "$srcDir\dist\js\*" -Destination "$destJs\" -Recurse -Force
}

# 3. Sync all prerendered static HTML files into dist/
$htmlFiles = Get-ChildItem -Path "$srcDir\dist" -Filter "*.html" -File
foreach ($h in $htmlFiles) {
    Copy-Item -Path $h.FullName -Destination "$workDir\dist\$($h.Name)" -Force
}
Write-Host "Synced $($htmlFiles.Count) prerendered HTML pages to dist."

# 4. Sync root HTML files in oakshow-prod
$rootHtmls = @(
    "Digger.html", "GDN.html", "Upcoming.html", "upcoming.html", "Upcoming2.html", "Upcoming3.html", 
    "OakShowReviews.html", "OakShowRevirews.html", "reviews.html", "reciews.html",
    "OakShowBlogs.html", "OakShowBlog.html", "blogs.html",
    "30-feel-good-films-to-watch-during-lockdown.html",
    "RamayanaPart1.html", "VishwanathandSons.html", "ViswanathandSons.html",
    "ImGame.html", "im-game.html", "TheWhisperMan.html", "Careers.html", "OneNightOnly.html", 
    "Mandaadi.html", "Sardar2.html", "BethlehemKudumbaUnit.html", "DCTamilMovie.html", 
    "KhalifaTheRuler.html", "AvatarTheWayofWater.html",
    "ResidentEvil2026.html", "Runner.html", "TheRunner.html", "Irumudi.html", "LustStories3.html"
)
foreach ($rf in $rootHtmls) {
    if (Test-Path "$srcDir\$rf") {
        Copy-Item -Path "$srcDir\$rf" -Destination "$workDir\$rf" -Force
        Copy-Item -Path "$srcDir\$rf" -Destination "$workDir\dist\$rf" -Force
    }
}

# Sync Profiles HTML and text files into dist so individual critic review pages are served directly
# (Media/images are served via jsDelivr CDN fallback to keep build context well under Scalix 64MB limit)
if (Test-Path "$srcDir\public\Profiles") {
    $destProf = "$workDir\dist\Profiles"
    if (Test-Path $destProf) { Remove-Item -Recurse -Force $destProf }
    New-Item -ItemType Directory -Force -Path $destProf | Out-Null
    
    $profFiles = Get-ChildItem -Path "$srcDir\public\Profiles" -Recurse -File | Where-Object { $_.Extension -in @(".html", ".htm", ".txt", ".json") }
    foreach ($pf in $profFiles) {
        $relPath = $pf.FullName.Substring(("$srcDir\public\Profiles").Length)
        $targetFile = "$destProf$relPath"
        $targetDir = Split-Path -Parent $targetFile
        if (-not (Test-Path $targetDir)) { New-Item -ItemType Directory -Force -Path $targetDir | Out-Null }
        Copy-Item -Path $pf.FullName -Destination $targetFile -Force
    }
    Write-Host "Synced Profiles HTML/text files ($($profFiles.Count) files) to oakshow-prod dist."
}

# Sync blog into dist so modern blog pages and assets are served directly
if (Test-Path "$srcDir\blog") {
    $destBlog = "$workDir\dist\blog"
    if (-not (Test-Path $destBlog)) { New-Item -ItemType Directory -Force -Path $destBlog | Out-Null }
    Copy-Item -Path "$srcDir\blog\*" -Destination "$destBlog\" -Recurse -Force
    Write-Host "Synced blog to oakshow-prod dist."
}

# 5. Copy local media folders into dist
$mediaDirs = @(
    @{ Src = "$srcDir\pics\Films\Digger"; Dest = "$workDir\dist\pics\Films\Digger" },
    @{ Src = "$srcDir\pics\Films\GDN"; Dest = "$workDir\dist\pics\Films\GDN" },
    @{ Src = "$srcDir\pics\Films\RamayanaPart1"; Dest = "$workDir\dist\pics\Films\RamayanaPart1" },
    @{ Src = "$srcDir\pics\Films\VishwanathandSons"; Dest = "$workDir\dist\pics\Films\VishwanathandSons" },
    @{ Src = "$srcDir\pics\Films\ViswanathandSons"; Dest = "$workDir\dist\pics\Films\ViswanathandSons" },
    @{ Src = "$srcDir\pics\Films\OneNightOnly"; Dest = "$workDir\dist\pics\Films\OneNightOnly" },
    @{ Src = "$srcDir\pics\Films\Mandaadi"; Dest = "$workDir\dist\pics\Films\Mandaadi" },
    @{ Src = "$srcDir\pics\Films\Sardar2"; Dest = "$workDir\dist\pics\Films\Sardar2" },
    @{ Src = "$srcDir\pics\Films\ResidentEvil2026"; Dest = "$workDir\dist\pics\Films\ResidentEvil2026" },
    @{ Src = "$srcDir\pics\Films\Runner"; Dest = "$workDir\dist\pics\Films\Runner" },
    @{ Src = "$srcDir\pics\Films\The Runner"; Dest = "$workDir\dist\pics\Films\The Runner" },
    @{ Src = "$srcDir\pics\Films\TheRunner"; Dest = "$workDir\dist\pics\Films\TheRunner" },
    @{ Src = "$srcDir\pics\Films\Irumudi"; Dest = "$workDir\dist\pics\Films\Irumudi" },
    @{ Src = "$srcDir\pics\Films\LustStories3"; Dest = "$workDir\dist\pics\Films\LustStories3" },
    @{ Src = "$srcDir\pics\Serieses\Lanterns"; Dest = "$workDir\dist\pics\Serieses\Lanterns" },
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
$statusOutput = & $git -C $workDir status --porcelain
if ($statusOutput) {
    & $git -C $workDir add -A
    & $git -C $workDir commit -m "Deploy latest OakShow updates: poster rendering, cache detection, fallbacks, and multi-CDN" -q
}
Write-Host "Pushing to oakshow-prod GitHub..."
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
$updatePayload = @{
    image_ref = "172.18.0.253:5000/408d193f-88ad-4b4c-bcea-587580f4f877/oakshow:latest"
    rollout_strategy = "instant"
} | ConvertTo-Json

$updateRes = Invoke-RestMethod -Uri "https://api.scalix.world/v1/run/services/6c2b26e5-121c-4291-8970-ed91b34c3efb" -Method Put -Headers $headers -Body $updatePayload
Write-Host "Scalix service updated. Revision: $($updateRes.current_revision)"

Write-Host "SUCCESS: Scalix service updated and live on https://oakshow.in!"
