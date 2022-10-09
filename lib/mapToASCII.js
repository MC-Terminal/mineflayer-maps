const ansi = require('easy-ansi');
const colors = require('./colors');
const arrays = require('./arrays');

const mapToASCII = (map, downSample = true, inDiv = 0, pow = 2) => {
	let asciiOut = ansi.color.reset;
	const div = Math.pow(pow, inDiv);
	const width = Math.abs(map.columns);
	const divWidth = Math.abs(map.rows) / div;
	for (let i = pow - 1, s = 0; i < map.data.length; i = i + div, s++) {
		if (s === Number.parseInt(divWidth.toFixed(0))) {
			s = 0;
			asciiOut = asciiOut + '\n';
			i = i + width * div;
			// i = i + width;
		}

		if (downSample === true) {
			const pixels = [];
			for (let b = 0, c = 0; b < width * pow; b = b + width, c = c + pow) {
				for (let l = c; l < c + pow; l++) {
					pixels[l] = colors.getColor(map.data[i - l + b]);
				}
			}
			const allPixels = arrays.averageArrays(...pixels);
			asciiOut = asciiOut + ansi.color.rgb(...allPixels) + '██';
		} else {
			asciiOut = asciiOut + ansi.color.rgb(...colors.getColor(map.data[i])) + '██';
		}
	}
	asciiOut = asciiOut + ansi.color.reset;
	return asciiOut;
};

module.exports = mapToASCII;
