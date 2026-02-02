# FIX VERCEL ENV VARIABLES & DEPLOY
# ------------------------------------

$ErrorActionPreference = "Stop"

Write-Host "🔍 Checking Vercel login status..."
try {
    $user = vercel whoami
    Write-Host "✅ Logged in as: $user"
} catch {
    Write-Host "❌ You are NOT logged in to Vercel."
    Write-Host "👉 Please run 'vercel login' in your terminal first, then run this script again."
    exit 1
}

Write-Host "`n🔗 Linking Vercel project..."
cmd /c "vercel link --yes"

Write-Host "`n📂 Reading .env file..."
if (-not (Test-Path .env)) {
    Write-Host "❌ .env file not found!"
    exit 1
}

$envLines = Get-Content .env | Where-Object { $_ -notmatch "^#" -and $_ -match "=" }

foreach ($line in $envLines) {
    $parts = $line -split "=", 2
    $key = $parts[0].Trim()
    $value = $parts[1].Trim()

    Write-Host "⚙️  Configuring $key..."

    # Remove existing keys to prevent interaction blocking
    Write-Host "   - Cleaning old values..."
    cmd /c "vercel env rm $key production --yes 2>NUL"
    cmd /c "vercel env rm $key preview --yes 2>NUL"
    cmd /c "vercel env rm $key development --yes 2>NUL"

    # Add new values
    Write-Host "   - Adding new values..."
    # We use cmd /c echo to ensure clean piping to stdin
    cmd /c "echo $value | vercel env add $key production" | Out-Null
    cmd /c "echo $value | vercel env add $key preview" | Out-Null
    cmd /c "echo $value | vercel env add $key development" | Out-Null
}

Write-Host "`n🚀 All variables added! Triggering new deployment..."
cmd /c "vercel --prod"

Write-Host "`n✅ DONE! Your site is deploying and should work in a few minutes."
