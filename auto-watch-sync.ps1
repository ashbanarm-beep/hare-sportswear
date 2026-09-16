param(
    [string]$Path = $PSScriptRoot,
    [int]$DebounceSeconds = 5
)

# Resolve Git command
$git = "git"
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    if (Test-Path "$env:LOCALAPPDATA\Programs\Git\cmd\git.exe") {
        $git = "$env:LOCALAPPDATA\Programs\Git\cmd\git.exe"
    } elseif (Test-Path "C:\Program Files\Git\cmd\git.exe") {
        $git = "C:\Program Files\Git\cmd\git.exe"
    } else {
        Write-Error "Git executable not found."
        return
    }
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  Hare Sportswear - Real-Time Live Auto-Sync to GitHub & Vercel" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Monitoring: $Path" -ForegroundColor Yellow
Write-Host "Whenever you make changes and save files:" -ForegroundColor White
Write-Host " -> Automatically commits to Git" -ForegroundColor Gray
Write-Host " -> Automatically pushes to GitHub (main branch)" -ForegroundColor Gray
Write-Host " -> Automatically triggers Vercel live redeployment" -ForegroundColor Gray
Write-Host "Press Ctrl+C at any time to stop.`n" -ForegroundColor DarkGray

$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $Path
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true
$watcher.NotifyFilter = [System.IO.NotifyFilters]::FileName, [System.IO.NotifyFilters]::LastWrite, [System.IO.NotifyFilters]::CreationTime

$script:lastChangeTime = [DateTime]::MinValue
$script:changedFiles = [System.Collections.Generic.HashSet[string]]::new()

$changeHandler = {
    param($sender, $eventArgs)
    $fullName = $eventArgs.FullPath
    if ($fullName -match '\\\.git($|\\)' -or $fullName -match '\\node_modules($|\\)' -or $fullName -match '\\dist($|\\)' -or $fullName -match '\.tmp$') {
        return
    }
    $script:lastChangeTime = [DateTime]::Now
    $script:changedFiles.Add($eventArgs.Name) | Out-Null
}

$subs = @(
    Register-ObjectEvent $watcher 'Changed' -Action $changeHandler,
    Register-ObjectEvent $watcher 'Created' -Action $changeHandler,
    Register-ObjectEvent $watcher 'Deleted' -Action $changeHandler,
    Register-ObjectEvent $watcher 'Renamed' -Action $changeHandler
)

try {
    while ($true) {
        Start-Sleep -Milliseconds 800
        if ($script:lastChangeTime -ne [DateTime]::MinValue) {
            $elapsed = ([DateTime]::Now - $script:lastChangeTime).TotalSeconds
            if ($elapsed -ge $DebounceSeconds) {
                $script:lastChangeTime = [DateTime]::MinValue
                $files = @($script:changedFiles)
                $script:changedFiles.Clear()

                $status = & $git -C $Path status --porcelain
                if ($status) {
                    $timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
                    $fileSummary = ($files | Select-Object -First 3) -join ", "
                    if ($files.Count -gt 3) { $fileSummary += " and $($files.Count - 3) others" }
                    $msg = "Auto-update: $fileSummary ($timestamp)"

                    Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Change detected: $fileSummary" -ForegroundColor Yellow
                    Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Committing and pushing to GitHub..." -ForegroundColor Cyan

                    & $git -C $Path add -A
                    & $git -C $Path commit -m $msg
                    $pushOutput = & $git -C $Path push origin main 2>&1
                    if ($LASTEXITCODE -eq 0) {
                        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] [SUCCESS] Pushed to GitHub! Vercel is now deploying your site live." -ForegroundColor Green
                    } else {
                        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] [WARNING] Push failed: $pushOutput" -ForegroundColor Red
                    }
                    Write-Host "Watching for next changes...`n" -ForegroundColor DarkGray
                }
            }
        }
    }
} finally {
    $watcher.EnableRaisingEvents = $false
    $watcher.Dispose()
    foreach ($sub in $subs) {
        Unregister-Event -SourceIdentifier $sub.Name -ErrorAction SilentlyContinue
    }
}
