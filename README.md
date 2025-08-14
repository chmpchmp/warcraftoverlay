# warcraftoverlay
warcraftoverlay is an overlay for Open Broadcast Software (OBS) that displays extra information for spectating a 1v1 melee game of Warcraft III: Reforged. The server uses [Blizzard.Net.Warcraft3](https://github.com/TinkerWorX/Blizzard.Net.Warcraft3) to fetch data from the current game or replay.

<img width="1920" height="1080" alt="demo" src="https://github.com/user-attachments/assets/409d284b-8e9e-45c9-a4b1-22675afc9250" />

## OBS Setup
- Add a **Scene**
- Add a **Browser Source**
- Set **URL** to http://localhost:25567
- Set **width** to 1920
- Set **height** to 1080
- Enable **Shutdown source when not visible**
- Add another **Scene**
- Add another **Browser Source**
- Set **URL** to http://localhost:25567/flipped
- Use the same settings as before
