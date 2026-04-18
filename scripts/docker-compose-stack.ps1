param(
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$ComposeArgs
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

$stack = if ($env:COMPOSE_STACK) {
    if ($env:COMPOSE_STACK -notin @("linux", "desktop")) {
        Write-Error "COMPOSE_STACK invalid: use linux or desktop (got: $($env:COMPOSE_STACK))"
    }
    $env:COMPOSE_STACK
} else {
    "desktop"
}

$files = @("-f", "docker-compose.yml", "-f", "docker-compose.desktop.yml")
if ($stack -eq "linux") {
    $files = @("-f", "docker-compose.yml", "-f", "docker-compose.linux.yml")
}

& docker compose @files @ComposeArgs
