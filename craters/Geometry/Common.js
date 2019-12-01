const degToRad = function(angle) {
    return angle * Math.PI / 180;
};

const radToDeg = function(angle) {
    return angle * 180 / Math.PI;
};

const distance = function(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
};

const map = function(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
};

const boundary = function(value, min, max) {
    return Math.min(Math.max(value, min), max)
};

const abs = function abs(x) {
	return (x < 0 ? -x : x)
};

export default {abs, boundary, degToRad, radToDeg, distance, map}