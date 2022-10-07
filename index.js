const parseMap = require('./lib/parseMap');

const { join } = require('path');

let saveToFileFn = () => {};

let amogus = 0;
const maps = [];

const mineflayerPlugin = (bot, options = {}) => {
	const outputDir = options.maps_outputDir ?? join('.');
	const saveToFile = options.maps_saveToFile ?? true;
	const filePrefix = options.maps_filePrefix ?? 'map_';
	const fileSuffix = options.maps_fileSuffix ?? '';

	let mapName = filePrefix + '0' + fileSuffix;

	if (saveToFile === true) {
		saveToFileFn = (pngImage) => {
			const { writeFileSync, readdirSync, mkdirSync, lstatSync, rmSync } = require('fs');

			try {
				const stats = lstatSync(outputDir);

				if (!stats.isDirectory()) {
					rmSync(outputDir);
					mkdirSync(outputDir, { recursive: true });
				}
			} catch {
				mkdirSync(outputDir, { recursive: true });
			}

			let id = 0;
			const files = readdirSync(outputDir);
			for (let i = 0; i < files.length; i++) {
				mapName = mapOutputFile(filePrefix, id, fileSuffix);
				if (files.includes(mapName + '.png')) id++;
			}
			const mapOutputFullPath = join(outputDir, mapName + '.png');
			writeFileSync(mapOutputFullPath, pngImage);
			bot.emit('new_map_saved', {
				name: mapName,
				fullPath: mapOutputFullPath
			});
		};
	}

	bot._client.on('map', (map) => {
		if (!map.data || maps.includes(getMapId(map))) {
			return;
		}
		maps[amogus] = getMapId(map);
		if (amogus > 50) amogus = 50;
		else amogus++;

		const pngImage = parseMap(map);
		delete map.data;
		bot.emit('new_map', {
			map,
			name: mapName,
			png: pngImage
		});
		saveToFileFn(pngImage);
	});
};

function getMapId (map) {
	return map.itemDamage + map.scale - map.columns - map.rows + map.x + map.y + map.data?.slice(0, 130);
};

const mapOutputFile = (filePrefix, fileSuffix, id) => {
	return filePrefix + id + fileSuffix;
};

module.exports = mineflayerPlugin;
module.exports.parseMap = parseMap;
