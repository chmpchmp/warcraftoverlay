@echo off
cd ..

start "" cmd /c "npm run dev --prefix client"
cmd /c "dotnet run --project Server -c Release -r win-x64"