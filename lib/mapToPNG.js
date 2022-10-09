const colors = require('./colors');
const { PNG } = require('pngjs');

module.exports = (map) => {
	const size = Math.sqrt(map.data.length); // 128
	const image = new PNG({
		width: size,
		height: size,
		colorType: 6,
		inputColorType: 6,
		inputHasAlpha: true
	});

	for (let i = 0, p = 0; i < map.data.length * 4; i = i + 4, p++) {
		image.data.set(colors.getColor(map.data[p]), i);
	}
	return PNG.sync.write(image);
};
