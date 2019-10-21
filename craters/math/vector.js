/**
 * Generic Vector class
 *
 *
 * @example
 * import vector, {Vector} from 'Vector';
 *
 * Instantiate new objects in the following ways
 *  1. use vector convenience function like so: vector(x, y);
 *  2. use Vector object directly like: new Vector(x, y);
 *
 * Methods on a newly created vector, such as .add or .subtract
 * modify the x and y properties on that vector, changing them forever
 * i.e.
 *      let vec1 = vector(0, 0);
 *      let vec2 = vector(10, 20);
 *      vec1.add(vec2);
 *
 * Results in vec1.x = 10 and vec1.y = 20.  vec2 is unmodified
 *
 * To perform an operation on two vectors and return a new vector,
 * without modifying the input vectors, use the methods on {Vector}
 * i.e.
 *      let vec1 = vector(0, 0);
 *      let vec2 = vector(10, 20);
 *      let vec3 = Vector.add(vec1, vec2);
 *
 * Results in vec1 and vec2 remining unmodified,
 * and vec3.x = 10 and vec3.y = 20
 *
 */

import {radToDeg} from './math';

/**
 * Base Vector constructor
 * @constructor
 * @param {number} x - x coordinate
 * @param {number} y - y coordinate
 */
export const Vector = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

/**
 * Prototype object for all Vectors
 */
Vector.prototype = {
    /**
     * Return a copy of a vector
     * @method
     * @return {Vector} a new vector object
     */
    clone: function() {
        return new Vector(this.x, this.y);
    },

    /**
     * Generic Setter
     * @method
     * @param {string} prop - property to set
     * @param {*} val - value to set
     * @return {This} for chaining
     */
    set: function(prop, val) {
        if (prop === 'x') {
            this.x = val;
        } else if (prop === 'y') {
            this.y = val;
        }
        return this;
    },

    /**
     * Add another vector to this vector, modifying internal
     * properties
     * @method
     * @param {Vector} vec - vector to add
     * @return {This} for chaining
     */
    add: function() {
        let args = arguments
        let x, y;
        if (args.length === 1) {
            let vec = args[0];
            if (typeof vec === 'object') {
                x = vec.x;
                y = vec.y;
            }
        } else if (args.length === 2) {
            if (typeof args[0] === 'number' && typeof args[1] === 'number') {
                x = args[0];
                y = args[1];
            }
        }

        this.x += x;
        this.y += y;

        return this;
    },

    /**
     * Subtract another vector from this vector
     * @method
     * @param {Vector} vec - vector to subtract
     * @return {This} for chaining
     */
    subtract: function(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    },

    /**
     * Multiply another vector by this vector or scalar
     * modifies internal properties
     * @param {Vector|number} vec - either Vector object or single scalar
     * @return {This} for chaining
     */
    multiply: function(vec) {
        if (typeof vec === 'object') {
            this.x *= vec.x;
            this.y *= vec.y;
        } else if (typeof vec === 'number') {
            this.x *= vec;
            this.y *= vec;
        }

        return this;
    },

    /**
     * Gives the magnitude (length, essentially) of the vector
     * @method
     * @return {number} magnitude of the vector
     */
    magnitude: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },

    /**
     * Magnitude squared - useful when trying to save on computation
     * @method
     * @return {number} mag squared
     */
    magnitudeSq: function() {
        return this.x * this.x + this.y * this.y;
    },

    /**
     * Negate both x and y values (essentially rotate vector 180 degrees)
     * @method
     * @return {Vector} for method chaining
     */
    negate: function() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    },

    /**
     * Translate to specified x and y points
     * @param {number} x - amount to move in the x
     * @param {number} y - amount to move in the y
     * @return {This} for chaining
     */
    // translate:
    // function(x, y) {
    //     this.x += x;
    //     this.y += y;
    //     return this;
    // },

    /**
     * Rotate vector around specified point of rotation
     * Note: Will rotate around origin
     * @param {number} angle - amount of rotation in radians
     * @return {This} for chaining
     */
    rotate: function(angle) {
        let sin = Math.sin(angle);
        let cos = Math.cos(angle);
        let x = (this.x * cos) - (this.y * sin);
        let y = (this.x * sin) + (this.y * cos);
        this.x = x;
        this.y = y;
        return this;
    },

    /**
     * Dot product between two vectors
     * Does NOT modify internal state
     * @param {Vector} vec - the vector to dot with
     * @return {number} dot product
     */
    dot: function(vec) {
        return this.x * vec.x + this.y * vec.y;
    },

    /**
     * Cross product between two vectors
     * Does NOT modify internal state
     * @method
     * @param {Vector} vec - the vec to cross with
     * @return {number} cross product
     */
    cross: function(vec) {
        return this.x * vec.y - this.y * vec.x;
    },

    /**
     * Return angle between two vectors in radians
     * @param {Vector} vec - vector to find angle to
     * @return {number} theta - radians between two vectors
     */
    angleTo: function(vec) {
        let a = this.magnitude();
        let b = vec.magnitude();
        let d = this.dot(vec);

        let theta = Math.acos(d / (a * b));
        return theta;
    },

    /**
     * Return angle from 0 of this vector
     * @method
     * @param {string} [mode] - if mode = 'DEGREES', return value will be in
     * degrees, otherwise radians
     * @return {number} angle in degrees or radians (depending on mode)
     *
     */
    getAngle: function(mode) {
        if (mode === 'DEGREES') {
            return radToDeg(Math.atan(this.y / this.x));
        }
        let a = Math.atan2(this.y, this.x);
        //return a;
        return a < 0 ? Math.PI * 2 + a : a;
    },

    /**
     * Convert to a unit vector
     * i.e. change length of vector to 1
     * @method
     * @return {This} for chaining
     */
    normalize: function() {
        let mag = this.magnitude();
        this.x /= mag;
        this.y /= mag;
        return this;
    },

    /**
     * Create normal vector based on current vector
     * Modifies internal state!
     * @param {string} side - specify 'left' or 'right' normal
     * @return {This} for chaining
     */
    perp: function(side) {
        if (side === 'right') {
            let tmp = this.x;
            this.x = this.y;
            this.y = -tmp;
        } else {
            let tmp = this.x;
            this.x = -this.y;
            this.y = tmp;
        }
        return this;
    },

    /**
     * Calculate euclidian distance between two vectors
     * @param {Vector} vec - vector to find distance to
     * @return {number} euclidean distance
     */
    distanceTo: function(vec) {
        return Math.sqrt((vec.x - this.x) * (vec.x - this.x) + (vec.y - this.y) * (vec.y - this.y));
    },

    /**
     * Scalar Projection of A onto B assuming B is NOT a unit vector
     * @param {Vector} vec - the vector to project onto
     * @return {number} component of A on B
     */
    scalarProject: function(vec) {
        return this.dot(vec) / vec.magnitude();
    },

    /**
     * Calculate Scalar projection of A onto B assuming that B is a unit vector
     * This is more efficient assuming we already have a unit vector
     * @param {Vector} vec - the unit vector to project onto
     * @return {number} component of A on B
     */
    scalarProjectUnit: function(vec) {
        return this.dot(vec);
    },

    /**
     * Vector Projection of A onto B assuming B is NOT a unit vector
     * @param {Vector} vec - vector to project onto
     * @return {This} for chaining
     */
    vectorProject: function(vec) {
        let scalarComp = this.dot(vec) / vec.magnitudeSq();
        this.x = vec.x * scalarComp;
        this.y = vec.y * scalarComp;
        return this;
    },

    /**
     * Vector Projection of A onto B assuming B IS a unit vector
     * @param {Vector} vec - vector to project onto
     * @return {This} for chaining
     */
    vectorProjectUnit: function(vec) {
        let scalarComp = this.dot(vec);
        this.x = vec.x * scalarComp;
        this.y = vec.y * scalarComp;
        return this;
    }
};

Vector.prototype.translate = Vector.prototype.add;

/**
 * Convenience function so we can ignore the 'new' keyword
 * @param {number} x - initial x value
 * @param {number} y - initial y value
 * @return {Vector} a new vector object
 */
var vector = function(x, y) {
    return new Vector(x, y);
};

// ---------- Static Methods -----------//
/**
 * @static
 * @param {Vector} v1 - first Vector obj
 * @param {Vector} v2 - second Vector obj
 * @return {Vector}
 *
 * Adds two vectors, and returns a new one
 */
Vector.add = function(v1, v2) {
    return new Vector(v1.x + v2.x, v1.y + v2.y);
};
Vector.subtract = function(v1, v2) {
    return new Vector(v1.x - v2.x, v1.y - v2.y);
};
Vector.multiply = function(v1, v2) {
    if (typeof v1 === 'number' && typeof v2 === 'number') {
        return v1 * v2;
    }

    if (typeof v1 === 'object' && typeof v2 === 'number') {
        return new Vector(v1.x * v2, v1.y * v2);
    }

    if (typeof v2 === 'object' && typeof v1 === 'number') {
        return new Vector(v1 * v2.x, v1 * v2.y);
    }

    return new Vector(v1.x * v2.x, v1.y * v2.y);
};
Vector.dot = function(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
};
Vector.angleBetween = function(v1, v2) {
    let a = v1.magnitude();
    let b = v2.magnitude();
    let d = v1.dot(v2);

    let theta = Math.acos(d / (a * b));
    return theta;
};
Vector.perp = function(v1, side) {
    switch (side) {
        case 'right':
            return new Vector(v1.y, -v1.x);
        default:
            return new Vector(-v1.y, v1.x);
    }
};
Vector.negate = function(v) {
    return new Vector(-v.x, -v.y);
};

export default vector;