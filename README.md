# Frente Global

Play online: https://wulflo.github.io/realtowerdefense/

Tactical tower defense built with Three.js. It runs on desktop and as an installable Android PWA with offline support.

Eight military doctrines, nine tower systems, a single two-lane ground road, an air corridor and a naval theater where you can deploy destroyers and aircraft carriers. Each country uses models and names inspired by its real equipment, and its multipliers change damage, range and rate of fire.

Ten enemy factions rotate in five-wave cycles — four standard waves and their final boss. Every faction mixes ground and air units, and each wave shifts the ratio: the first presses on the ground and the last leans hardest on the air corridor. From wave 6 onward, other factions slip small infiltrator squads into the late stages and boss escorts; every infiltrator carries a double cyan/violet halo and pays a higher reward. Before every assault, the faction broadcasts a radio dialogue shown in the intel panel and in the wave banner.

On first launch you choose the language with the Spain and United States flags. The entire interface, factions, towers, enemies, help texts and notifications are available in Spanish and English; the language can be changed later from Settings.

Before deploying you can also pick one of four difficulties next to the nation selector: Recruit, Veteran, Elite and Nightmare. Higher difficulties invert the economy — fewer starting credits, lower kill bounties and smaller wave-clear bonuses — and slightly strengthen enemy HP and damage. Veteran is the intended baseline; changing difficulty starts a fresh match.

## Documentation

The full architecture, data model, simulation, internationalization and extension guide are in [`docs/ARQUITECTURA.md`](docs/ARQUITECTURA.md) (Spanish).

## Play locally

```bash
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173/`.

Do not open `index.html` by double-clicking: the service worker and manifest require an HTTP server.

## Controls

| Action | Keyboard | Touch |
| --- | --- | --- |
| Build tower (land or naval) | `1`–`9` | Tap an arsenal card |
| Start wave / pause | `Space` | “Start wave” button |
| Pause | `P` | ❚❚ button |
| Air strike | `Z` | ✈ button |
| EMP pulse | `X` | ⌁ button |
| Repair base | `C` | ✚ button |
| Selected tower ability | `R` | Inspection panel button |
| Simulation speed | — | `×1`–`×5` buttons |
| Sound | `M` | ♪ button |
| Fullscreen | `F` | Settings |
| Cancel selection | `Esc` | “Cancel” button |
| Restart game | — | Pause → “Restart game” |
| Move camera | `WASD` / arrow keys | Drag with one finger |
| Rotate camera | `Q` / `E` | Two fingers |
| Zoom | Mouse wheel | Pinch / `+` `−` buttons |

On portrait mobile the arsenal becomes a slide-up bottom tray. The installed app opens in landscape to make the most of the map.

## Mechanics

- **Wave intel:** the right panel shows enemy composition, armor, HP/damage scaling, EW vulnerability, adaptive pressure, threat level, the faction dialogue and a visual balance of air and ground forces. Boss waves also announce the boss ability.
- **Mixed waves:** every faction fields both ground and air troops. The air share grows across the four stages (roughly 8 %, 13 %, 18 % and 22 %), and the plan guarantees at least one unit of each available type.
- **Infiltrators:** from wave 6 onward, foreign detachments appear in the third and fourth stages and in boss escorts. They are marked with a pulsing double halo (cyan outer ring, violet inner ring), have +20 % HP, +8 % speed and damage, +0.03 armor and +35 % reward. The intel panel tags each infiltrator row and shows the total count, and the wave banner reports how many are incoming.
- **Enemy scaling:** armor, MLRS, drones and bombers join as waves progress; veteran and elite units appear later with their own labels. Wave size, spawn cadence, HP, damage, speed and armor all increase over time.
- **Faction cycle:** cavemen, Spartans, Crusaders, pirates, WWI USA, Chinese hi-tech, zombies, aliens, demons and celestials. The infernal faction appears immediately before the celestial faction.
- **Fire priority:** each tower can target the first, last, strongest or closest enemy.
- **Command support:** targeted air strike, an EMP that slows every unit but only repels those with electronic guidance, and base repair, each with a credit cost and cooldown. Repair costs more the lower the base integrity and accumulates fatigue with every use. The support bar is docked at the bottom of the arsenal so it never covers the map.
- **Structure abilities:** every tower type has its own ability (burst, bombardment, salvo, interception, overcharge, blackout and more). Each one costs credits and has an independent cooldown. Activate it from the inspection panel or with `R`.
- **Tactical climate:** each faction imposes a climate that modifies the damage, range and rate of fire of every structure. Towers display a badge with the active modifier and a colored ring (green for an advantage, red for a penalty, amber for mixed effects).
- **Incremental costs:** each structure beyond the first two raises the price of the next one by 1.5 %. Repeating the same system adds a further 5 % penalty, and each wave increases construction inflation up to 60 %. Upgrades use the same inflation at half weight, and selling returns 50 % of the credits actually invested.
- **Limited purchasing:** during a wave you cannot build or upgrade towers; the arsenal locks and becomes available again when the wave is cleared.
- **Game pace:** the simulation can run at `×1`, `×2`, `×3`, `×4` or `×5` without changing balance or cooldowns.
- **Single road:** ground enemies share a two-lane road, separated by lane so they do not overlap. Route points are snapped to cell centers, so units walk on the rendered asphalt rather than the edge of the tile. Towers occupy one cell and their models fit that footprint.
- **Sea:** destroyers and aircraft carriers occupy a `2×2` cell footprint and can only be placed on water; they cover the ground road near the coast.
- **Doctrines:** each faction's multipliers affect the real damage, range and rate of fire of its towers. Switching faction starts a new game.
- **Aircraft carrier:** every embarked strike takes off, hits its target and returns to the carrier before disappearing.
- **Boss abilities:** every boss appears every five waves with its own structure attack, announced in the intel panel and wave banner. Abilities include seismic smashes, focused sieges, sabotage or abduction that can destroy a structure outright, command barrages, EMP blackouts and area degradation. Each boss only targets structures within its own range and prioritizes the closest ones. Siege is capped and scales incrementally: the limit grows with campaign progress and with the size of the defense, but never exceeds a fraction of the total (35% affected, 20% destroyed). Deployed towers are never all at risk: a first boss facing 5 structures can destroy 1 and damage 2, while a late boss facing 30 structures can affect far more without wiping the board. Infiltrators sabotage a single nearby structure without destroying it.
- **Electronic warfare:** EW towers and their blackout only affect units with electronic guidance, radio, radar or GPS. Cyber soldiers, drones, mechs, fighters and alien craft are fully or partially vulnerable; creatures, magic units, pegasi, pterodactyls and purely mechanical bombers are immune. Jam vulnerability is shown per unit in the intel panel.
- **Adaptive pressure:** the enemy adapts to the deployed defense. A large, heavily upgraded force raises enemy HP and damage up to ×1.6 and reduces rewards, with the value frozen when the wave starts so destroying towers mid-wave cannot weaken reinforcements. Upgrades count at only +25 % of base cost per level, so concentrating investment in a veteran core is better than filling the map with level-1 towers. Unspent credits do not count, so hoarding money is not a defense.
- **Difficulty curve:** waves 1–11 teach the basics and leave room to build a mixed defense; from wave 12 onward HP, damage, wave size, veteran/elite odds and armor scale faster, and leakers chip the base progressively instead of ending the run in a single burst. Incremental costs, repair fatigue and adaptive pressure prevent a large accumulated arsenal from trivializing the late game; the curve keeps rising beyond wave 30.
- **Leak damage:** a unit that reaches the base removes a fraction of its attack value (35 %, capped at 22, for regular troops; 28 %, capped at 36, for a boss) rather than the full amount, so a few leaks cause gradual attrition.
- **Laser visuals:** the laser emitter only glows while it is actually firing; when idle it stays dark. The beam disappears as soon as the target dies or leaves range, and the turret returns to its rest angle instead of aiming at the last known point.
- **Procedural audio:** sound effects and music are synthesized live with Web Audio. Each enemy faction has its own arrangement and every faction has a boss variation with faster tempo, a lower root, war drums, a deep pedal and a tritone accent. Five base tracks can also be selected manually.

## PWA

- `manifest.webmanifest`: installation, icons and orientation.
- `sw.js`: precaches the shell (including `game.js`), uses network-first navigation and cache-first assets.
- Three.js is vendored in `vendor/three.min.js`, so there are no external dependencies.
- Settings, records, army, difficulty and language are stored in `localStorage`.

## Publishing to GitHub Pages

1. Create a GitHub repository and push this project to the `main` branch.
2. In the repository, open **Settings → Pages** and choose **Source: GitHub Actions**.
3. The `.github/workflows/deploy.yml` workflow runs on every push to `main`.
4. The public URL appears under **Settings → Pages** and in the **Actions** tab.

No secrets are required: GitHub Actions uses the built-in token and the declared `pages: write` permission. The workflow replaces `__BUILD__` in `sw.js` with the commit SHA to invalidate the cache on every deployment.

## Structure

```
index.html              Shell, styles and UI
game.js                 Game engine: scene, models, waves, i18n and logic
manifest.webmanifest    PWA manifest
sw.js                   Service worker
vendor/three.min.js     Local Three.js r128
icons/                  PWA icons (192, 512, maskable, Apple)
docs/                   Technical documentation
.github/workflows/      Automatic GitHub Pages deployment
```

## Notes

- Visual quality adapts automatically; it can also be fixed in Settings.
- Effects and the soundtrack are synthesized with Web Audio, with no audio files or external licenses. There are five procedural base tracks (march, ambient, electronic, infernal and celestial), plus one arrangement per faction and a boss variation for each.
- Progress is local to the device: there are no accounts or servers.
