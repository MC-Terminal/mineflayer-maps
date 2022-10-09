function averageArrays (...arrs) {
	return toFixedArray(divideArray(addToArray(...arrs), arrs.length));
}

function addToArray (...arrs) {
	const out = [...arrs[0]];
	if (typeof out !== 'object') return;
	for (let i = 1; i < arrs.length; i++) {
		const arr2 = arrs[i];
		for (let i = 0; i < Math.max(out.length, arr2.length); i++) {
			out[i] = (out[i] || 0) + (arr2[i] || 0);
		}
	}
	return out;
}

function divideArray (arr, div) {
	const out = [];
	for (let i = 0; i < arr.length; i++) {
		out[i] = arr[i] / div;
	}
	return out;
}

function toFixedArray (arr, fix) {
	const out = [];
	for (let i = 0; i < arr.length; i++) {
		out[i] = Number.parseInt(arr[i].toFixed(fix || 0));
	}
	return out;
}

module.exports = {
	averageArrays,
	addToArray,
	divideArray,
	toFixedArray
};
