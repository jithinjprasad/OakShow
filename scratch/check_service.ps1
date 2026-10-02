$key = (Get-Content -LiteralPath 'E:/scalixApiKey.txt').Trim()
$headers = @{
    'Authorization' = "Bearer $key"
    'Content-Type' = 'application/json'
}
$service = Invoke-RestMethod -Uri 'https://api.scalix.world/v1/run/services/6c2b26e5-121c-4291-8970-ed91b34c3efb' -Headers $headers
$service | ConvertTo-Json -Depth 4
