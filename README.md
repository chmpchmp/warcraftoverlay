# warcraftoverlay
warcraftoverlay is an overlay for Open Broadcast Software (OBS) that displays extra information for spectating a 1v1 melee game of Warcraft III: Reforged. The server uses [Blizzard.Net.Warcraft3](https://github.com/TinkerWorX/Blizzard.Net.Warcraft3) to fetch data from the current game or replay.

![screenshot](/images/screenshot.png)

## Setup
### OBS
- Add a `Scene`
- Add a `Browser Source`
- Set `URL` to http://localhost:25567
- Set `width` to 1920
- Set `height` to 1080
- Enable `Shutdown source when not visible`
- Add another `Scene`
- Add another `Browser Source`
- Set `URL` to http://localhost:25567/flipped
- Use the same settings as before
### Icons
- In the `client/public/assets` directory, extract the `icons.zip` folder
### Usage
- Open `run.bat` file in the `tools` directory
