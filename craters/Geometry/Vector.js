
// Vector
// ----------
// Represents a vector in two dimensions with `x` and `y` properties.


// Create a new Vector, optionally passing in the `x` and `y` coordinates. If
// a coordinate is not specified, it will be set to `0`
/**
* @param {?number=} x The x position.
* @param {?number=} y The y position.
* @constructor
*/
export default function Vector(x, y) {
	this['x'] = x || 0;
	this['y'] = y || 0;
}

// Copy the values of another Vector into this one.
/**
* @param {Vector} other The other Vector.
* @return {Vector} This for chaining.
*/
Vector.prototype['copy'] = Vector.prototype.copy = function(other) {
	this['x'] = other['x'];
	this['y'] = other['y'];
	return this;
};

// Create a new vector with the same coordinates as this on.
/**
* @return {Vector} The new cloned vector
*/
Vector.prototype['clone'] = Vector.prototype.clone = function() {
	return new Vector(this['x'], this['y']);
};

// Change this vector to be perpendicular to what it was before. (Effectively
// roatates it 90 degrees in a clockwise direction)
/**
* @return {Vector} This for chaining.
*/
Vector.prototype['perp'] = Vector.prototype.perp = function() {
	var x = this['x'];
	this['x'] = this['y'];
	this['y'] = -x;
	return this;
};

// Rotate this vector (counter-clockwise) by the specified angle (in radians).
/**
* @param {number} angle The angle to rotate (in radians)
* @return {Vector} This for chaining.
*/
Vector.prototype['rotate'] = Vector.prototype.rotate = function (angle) {
	var x = this['x'];
	var y = this['y'];
	this['x'] = x * Math.cos(angle) - y * Math.sin(angle);
	this['y'] = x * Math.sin(angle) + y * Math.cos(angle);
	return this;
};

// Reverse this vector.
/**
* @return {Vector} This for chaining.
*/
Vector.prototype['reverse'] = Vector.prototype.reverse = function() {
	this['x'] = -this['x'];
	this['y'] = -this['y'];
	return this;
};


// Normalize this vector.  (make it have length of `1`)
/**
* @return {Vector} This for chaining.
*/
Vector.prototype['normalize'] = Vector.prototype.normalize = function() {
	var d = this.len();
	if(d > 0) {
		this['x'] = this['x'] / d;
		this['y'] = this['y'] / d;
	}
	return this;
};

// Add another vector to this one.
/**
* @param {Vector} other The other Vector.
* @return {Vector} This for chaining.
*/
Vector.prototype['add'] = Vector.prototype.add = function(other) {
	this['x'] += other['x'];
	this['y'] += other['y'];
	return this;
};

// Subtract another vector from this one.
/**
* @param {Vector} other The other Vector.
* @return {Vector} This for chaiing.
*/
Vector.prototype['sub'] = Vector.prototype.sub = function(other) {
	this['x'] -= other['x'];
	this['y'] -= other['y'];
	return this;
};

// Scale this vector. An independent scaling factor can be provided
// for each axis, or a single scaling factor that will scale both `x` and `y`.
/**
* @param {number} x The scaling factor in the x direction.
* @param {?number=} y The scaling factor in the y direction.  If this
*   is not specified, the x scaling factor will be used.
* @return {Vector} This for chaining.
*/
Vector.prototype['scale'] = Vector.prototype.scale = function(x,y) {
	this['x'] *= x;
	this['y'] *= typeof y != 'undefined' ? y : x;
	return this;
};

// Project this vector on to another vector.
/**
* @param {Vector} other The vector to project onto.
* @return {Vector} This for chaining.
*/
Vector.prototype['project'] = Vector.prototype.project = function(other) {
	var amt = this.dot(other) / other.len2();
	this['x'] = amt * other['x'];
	this['y'] = amt * other['y'];
	return this;
};

// Project this vector onto a vector of unit length. This is slightly more efficient
// than `project` when dealing with unit vectors.
/**
* @param {Vector} other The unit vector to project onto.
* @return {Vector} This for chaining.
*/
Vector.prototype['projectN'] = Vector.prototype.projectN = function(other) {
	var amt = this.dot(other);
	this['x'] = amt * other['x'];
	this['y'] = amt * other['y'];
	return this;
};

// Reflect this vector on an arbitrary axis.
/**
* @param {Vector} axis The vector representing the axis.
* @return {Vector} This for chaining.
*/
Vector.prototype['reflect'] = Vector.prototype.reflect = function(axis) {
	var x = this['x'];
	var y = this['y'];
	this.project(axis).scale(2);
	this['x'] -= x;
	this['y'] -= y;
	return this;
};

// Reflect this vector on an arbitrary axis (represented by a unit vector). This is
// slightly more efficient than `reflect` when dealing with an axis that is a unit vector.
/**
* @param {Vector} axis The unit vector representing the axis.
* @return {Vector} This for chaining.
*/
Vector.prototype['reflectN'] = Vector.prototype.reflectN = function(axis) {
	var x = this['x'];
	var y = this['y'];
	this.projectN(axis).scale(2);
	this['x'] -= x;
	this['y'] -= y;
	return this;
};

// Get the dot product of this vector and another.
/**
* @param {Vector}  other The vector to dot this one against.
* @return {number} The dot product.
*/
Vector.prototype['dot'] = Vector.prototype.dot = function(other) {
	return this['x'] * other['x'] + this['y'] * other['y'];
};

// Get the squared length of this vector.
/**
* @return {number} The length^2 of this vector.
*/
Vector.prototype['len2'] = Vector.prototype.len2 = function() {
	return this.dot(this);
};

// Get the length of this vector.
/**
* @return {number} The length of this vector.
*/
Vector.prototype['len'] = Vector.prototype.len = function() {
	return Math.sqrt(this.len2());
};