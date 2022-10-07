# Mineflayer map downloader
Automatically downloads item maps when in render distance of an item frame with a map in it or if a map is in the bots inventory.


<img src="https://user-images.githubusercontent.com/61137113/151663467-1d665cac-2a45-4948-b218-3e146a7cbf95.png" height="300px" alt="In game image of the map">
<img src="https://user-images.githubusercontent.com/61137113/151663482-8ecb28c7-52f4-4e4b-87fd-717da4624b1e.png" height="300px" alt="Downloaded image of the map" style="image-rendering: pixelated;">

## Installing
1. Install the plugin with npm
```bash
npm i mineflayer-maps
```
2. Load the plugin with the mineflayer plugin API
```javascript
const maps = require('mineflayer-maps')

bot.loadPlugin(maps) // load it before spawning to get all maps
```

## Options
This plugin extends the `BotOptions` type from mineflayer. Add them to the createBot options when creating the bot. You can also change them later by changing the `bot.maps` properties.

#### Example for an option
```javascript
const bot = mineflayer.createBot({
  mapDownloader_outputDir: "some/output/dir"
})
```

### maps_outputDir
  - Sets an output directory where maps should be saved. Maps are saved in the format `map_<map id>.png` where the map id has leading zeros.

### maps_saveToFile
  - If maps should be saved to file. If false maps are only stored internally. Usefull if you only want to look at maps with the web viewer. Default is `true`

### maps_filePrefix
  - Saved maps file prefix

### "maps_fileSuffix"
  - Saved maps file suffix

## Events

### (`new_map`, { map, name, png })
  - Emitted by the mapSaver and the bot when a new map was detected.
  - Parses an object when emitted:
    - `map` - Object. The map that was detected
    - `name` - String. The name that would be given to this map.
    - `png` - Buffer. The png Buffer of the created map.
### (`new_map_saved`, { name, fullPath })
  - Emitted by the mapSaver and the bot when a new map was saved.
  - Emitted only when `saveToFile` is `true`.
  - Parses an object when emitted:
    - `name` - String. The name that would be given to this map.
    - `fullPath` - String. The full path of the saved map.
