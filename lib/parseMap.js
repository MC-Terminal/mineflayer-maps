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
		image.data.set(getColor(map.data[p] - 3), i);
	}
	return PNG.sync.write(image);
};

function getColor (colorId) {
	if (!colors[colorId]) {
		return [0, 0, 0, 0];
	} else {
		return colors[colorId];
	}
}
