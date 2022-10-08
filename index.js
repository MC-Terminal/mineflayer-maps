const parseMap = require('./lib/parseMap');
const { join } = require('path');

let saveToFileFn = () => {};

let amogus = 0;
const maps = [];

const inject = (bot, options = {}) => {
	bot.maps = {
		outputDir: options.maps_outputDir ?? join('.'),
		setSaveToFile: (bool) => {
			if (bool !== true || bool !== false) return;
			options.maps_saveToFile = bool;
		},
		filePrefix: options.maps_filePrefix ?? 'map_',
		fileSuffix: options.maps_fileSuffix ?? ''
	};

	let mapName = bot.maps.filePrefix + '0' + bot.maps.fileSuffix;

	if ((options.maps_saveToFile ?? true) === true) {
		saveToFileFn = (pngImage) => {
			const { writeFileSync, readdirSync, mkdirSync, lstatSync, rmSync } = require('fs');

			try {
				const stats = lstatSync(bot.maps.outputDir);

				if (!stats.isDirectory()) {
					rmSync(bot.maps.outputDir);
					mkdirSync(bot.maps.outputDir, { recursive: true });
				}
			} catch {
				mkdirSync(bot.maps.outputDir, { recursive: true });
			}

			let id = 0;
			const files = readdirSync(bot.maps.outputDir);
			for (let i = 0; i < files.length; i++) {
				if (files.includes(mapName + '.png')) id++;
				else continue;
				mapName = mapOutputFile(bot.maps.filePrefix, id, bot.maps.fileSuffix);
			}
			const mapOutputFullPath = join(bot.maps.outputDir, mapName + '.png');
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

module.exports = inject;
module.exports.parseMap = parseMap;
