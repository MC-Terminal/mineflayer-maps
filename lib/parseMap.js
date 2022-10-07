const colors = require('./colors');
const { PNG } = require('pngjs');

module.exports = (map) => {
	const size = Math.sqrt(map.data.length);
	const image = new PNG({
		width: size,
		height: size,
		colorType: 6,
		inputColorType: 6,
		inputHasAlpha: true
	});

	for (let i = 0, p = 0; i < map.data.length * 4; i = i + 4, p++) {
		const color = getColor(map.data[p] - 3);
		image.data.set(Object.values(color), i);
	}
	const pngOut = PNG.sync.write(image);
	return pngOut;
};

function getColor (colorId) {
	if (!colors[colorId]) {
		return { red: 0, green: 0, blue: 0, alpha: 0 };
	} else {
		return colors[colorId];
	}
}
