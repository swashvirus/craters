var Craters = (function (exports) {
    'use strict';

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

    // import {radToDeg} from './math';

    /**
     * Base Vector constructor
     * @constructor
     * @param {number} x - x coordinate
     * @param {number} y - y coordinate
     */
    const Vector = function(x, y) {
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
            let args = arguments;
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

    var common = /*#__PURE__*/Object.freeze({
        Vector: Vector,
        boundary: boundary,
        degToRad: degToRad,
        radToDeg: radToDeg,
        distance: distance,
        map: map
    });

    // Game Loop Module
    // This module contains the game loop, which handles
    // updating the game state and re-rendering the canvas
    // (using the updated state) at the configured tframe.
    class Loop {
        constructor(scope, tframe) {
            var loop = {
                elapsed: 0,
                tframe: (1000 / tframe),
                before: window.performance.now()
            };
            // Initialize timer variables so we can calculate tframe
            // Main game rendering loop
            loop.main = function() {
                loop.startLoop = window.requestAnimationFrame(loop.main);
                loop.fps = Math.round(((1000 / (window.performance.now() - loop.before) * 100) / 100));

                if (window.performance.now() < loop.before + loop.tframe) return
                loop.before = window.performance.now();
                // Request a new Animation Frame
                // setting to `stopLoop` so animation can be stopped via
                loop.stopLoop = () => {
                    window.cancelAnimationFrame(loop.startLoop);
                };

                // Update the game state
                scope.update(loop.elapsed, loop.fps);
                // Render the next frame
                scope.render(loop.elapsed, loop.fps);
                loop.elapsed++;
            };

            // Start off main loop
            loop.main();
            return loop
        }
    }

    class Canvas {
        constructor(width, height, container) {
            container = document.querySelector(container || 'body');
            // Generate a canvas and store it as our viewport
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            // Pass our canvas' context to our getPixelRatio method
            var backingStores = ['webkitBackingStorePixelRatio', 'mozBackingStorePixelRatio', 'msBackingStorePixelRatio', 'oBackingStorePixelRatio', 'backingStorePixelRatio'];
            var deviceRatio = window.devicePixelRatio;
            // Iterate through our backing store props and determine the proper backing ratio.
            var backingRatio = backingStores.reduce(function(prev, curr) {
                return (Object.prototype.hasOwnProperty.call(context, curr) ? context[curr] : 1)
            });
            // Return the proper pixel ratio by dividing the device ratio by the backing ratio
            var ratio = deviceRatio / backingRatio;

            // Set the canvas' width then downscale via CSS
            canvas.width = Math.round(width * ratio);
            canvas.height = Math.round(height * ratio);
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            // Scale the context so we get accurate pixel density
            context.setTransform(ratio, 0, 0, ratio, 0, 0);
            // Append viewport into our game within the dom
            container.insertBefore(canvas, container.firstChild);
            canvas.context = canvas.getContext('2d');

            canvas.resize = (scope, size) => {
                canvas.style.width = size.x + 'px';
                canvas.style.height = size.y + 'px';
                canvas.width = Math.round(size.x * ratio);
                canvas.height = Math.round(size.y * ratio);
                context.setTransform(ratio, 0, 0, ratio, 0, 0);

                scope.state.size.x = size.x;
                scope.state.size.y = size.y;
            };

            canvas.clear = (w, x, y, z) => {
                w = w || 0;
                x = x || 0;
                y = y || canvas.width;
                z = z || canvas.height;
                canvas.context.clearRect(w, x, y, z);
            };

            canvas.camera = (x, y) => {
                canvas.context.setTransform(1, 0, 0, 1, 0, 0); // reset the transform matrix
                canvas.context.translate(-x, -y);
            };

            return canvas // return the canvas
        }
    }

    class Game {
        constructor(container, width, height, fps, debug) {
            this.entities = [];
            this.state = {
                container: container,
                size: {
                    x: 512,
                    y: 512
                },
                gravity: {
                    x: 0,
                    y: 0
                },
                friction: {
                    x: 0,
                    y: 0
                }
            };
        }

        addObject(obj) {
            // used for adding entities
            return this.entities.push(obj)
        }

        removeObject(index) {
            // used to remove entities
            return this.entities.splice(index, 1)
        }

        update() {
            // Loop through all bodies and update one at a time
            this.entities.forEach((body) => {
                body.update();
                switch (body.type) {
                    case 'dynamic':
                        // gravity applies here
                        body.state.vel.x += body.state.accel.x + (body.state.gravity.x + this.state.gravity.x);
                        body.state.vel.y += body.state.accel.y + (body.state.gravity.y + this.state.gravity.y);
                        body.state.pos.x += body.state.vel.x;
                        body.state.pos.y += body.state.vel.y;

                        var fx = body.state.friction.x,
                            nx = body.state.vel.x + fx,
                            x = body.state.vel.x - fx,
                            fy = body.state.friction.y,
                            ny = body.state.vel.y + fy,
                            y = body.state.vel.y - fy;

                        body.state.vel.x = (
                            (nx < 0) ? nx :
                            (x > 0) ? x : 0
                        );

                        body.state.vel.y = (
                            (ny < 0) ? ny :
                            (y > 0) ? y : 0
                        );

                        break
                    case 'kinematic':
                        // there's no force of gravity applied onto kinematic bodies
                        body.state.vel.x += body.state.accel.x;
                        body.state.vel.y += body.state.accel.y;
                        body.state.pos.x += body.state.vel.x;
                        body.state.pos.y += body.state.vel.y;

                        break
                    default:
                        // throw new Error('type not valid')
                }
            });
        }

        render() {
            // Loop through all bodies and update one at a time
            this.entities.forEach((body) => {
                body.render();
            });
        }
    }

    class Entity extends Game {
        constructor() {
            super();
            this.state.size = {
                x: 10,
                y: 10
            };
            this.state.pos = {
                x: 0,
                y: 0
            };
            this.state.vel = {
                x: 0,
                y: 0
            };
            this.state.accel = {
                x: 0,
                y: 0
            };
            this.state.radius = 10;
            this.state.angle = 0;
            this.type = 'dynamic';
        }
    }

    class Sprite extends Entity {
        constructor(scope, args) {
            super();

            this.scope = scope;
            this.state.pos = args.pos || {
                x: 0,
                y: 0
            };
            this.state.crop = {
                x: 0,
                y: 0
            };
            this.state.size = args.size || {
                x: 0,
                y: 0
            };

            this.state.frames = args.frames || [];
            this.state.angle = args.angle || 0;
            this.state.image = args.image || new Image();
            this.state.delay = args.delay || 5;
            this.state.tick = args.tick || 0;
            this.state.orientation = args.orientation || 'horizontal';
        }

        update() {
            super.update();

            if (this.state.tick <= 0) {
                if (this.orientation === 'vertical') {
                    this.state.crop.y = this.state.frames.shift();
                    this.state.frames.push(this.state.crop.y);
                } else {
                    this.state.crop.x = this.state.frames.shift();
                    this.state.frames.push(this.state.crop.x);
                }

                this.state.tick = this.state.delay;
            }

            this.state.tick--;
        }

        render() {
            super.render();

            this.scope.context.save();
            this.scope.context.translate(this.state.crop.x + (this.state.size.x / 2), this.state.crop.y + (this.state.size.y / 2));
            this.scope.context.rotate((this.state.angle) * (Math.PI / 180));
            this.scope.context.translate(-(this.state.crop.x + (this.state.size.x / 2)), -(this.state.crop.y + (this.state.size.y / 2)));

            this.scope.context.drawImage(this.state.image,
                (this.state.crop.x * this.state.size.x), (this.state.crop.y * this.state.size.y), this.state.size.x, this.state.size.y,
                this.state.pos.x, this.state.pos.y, this.state.size.x, this.state.size.y);

            this.scope.context.restore();
        }
    }

    class Loader {
        constructor() {
            this.rescache = {};
        };

        load(res, cbk) {
            var that = this;
            if (res instanceof Array) {
                res.forEach(function(i) {
                    that.rescache[i] = false;
                    that.fetch(i, cbk);
                });
            } else {
                that.rescache[res] = false;
                that.fetch(res, cbk);
            }
        }

        fetch(url, cbk) {
            var that = this;
            if (that.rescache[url]) {
                return that.rescache[url]
            } else {
                var img = new Image();
                img.onload = function() {
                    that.rescache[url] = img;
                    that.ready(cbk);
                };

                img.src = url;
            }
        }

        ready(cbk) {
            var that = this;
            if (typeof cbk === 'function') {
                var ready = true;
                for (var item in that.rescache) {
                    if (Object.prototype.hasOwnProperty.call(that.rescache, item) && !that.rescache[item]) {
                        ready = false;
                    }
                }

                if (ready) cbk();
            }
        }
    }

    // modified soundbox.js lib
    class Sound {
        constructor() {
            this.sounds = {}; // The loaded sounds and their instances
            this.instances = []; // Sounds that are currently playing
            this.defaultVolume = 1;
        };

        load(name, path, callback) {
            this.sounds[name] = new Audio(path);
            if (typeof callback === 'function') {
                this.sounds[name].addEventListener('canplaythrough', callback);
            } else {
                return new Promise((resolve, reject) => {
                    this.sounds[name].addEventListener('canplaythrough', resolve);
                    this.sounds[name].addEventListener('error', reject);
                })
            }
        };

        remove(name) {
            if (typeof this.sounds !== 'undefined') {
                delete this.sounds[name];
            }
        };

        unlock(name, callback, volume, loop) {
            var that = this;
            var events = ['touchstart', 'touchend', 'mousedown', 'keydown'];
            var unlock = function unlock() {
                events.forEach(function(event) {
                    document.body.removeEventListener(event, unlock);
                });
                that.play(name, callback, volume, loop);
            };

            events.forEach(function(event) {
                document.body.addEventListener(event, unlock, false);
            });
        };

        play(name, callback, volume, loop) {
            loop = loop || false;

            if (typeof this.sounds[name] === 'undefined') {
                console.error("Can't find sound called '" + name + "'.");
                return false
            }
            var soundInstance = this.sounds[name].cloneNode(true);
            soundInstance.volume = typeof volume === 'number' ? volume : this.defaultVolume;
            soundInstance.loop = loop;
            soundInstance.play();
            this.instances.push(soundInstance);

            // Don't forget to remove the instance from the instances array
            soundInstance.addEventListener('ended', () => {
                var index = this.instances.indexOf(soundInstance);
                if (index !== -1) this.instances.splice(index, 1);
            });

            // Attach the callback / promise
            if (typeof callback === 'function') {
                soundInstance.addEventListener('ended', callback);
                return true
            }
            return new Promise((resolve, reject) => soundInstance.addEventListener('ended', resolve))
        };

        stopAll() {
            // Pause all currently playing sounds

            // Shallow clone the array to avoid issues with instances auto-removing themselves
            var instancesToStop = this.instances.slice();
            for (var instance of instancesToStop) {
                instance.pause();
                instance.dispatchEvent(new Event('ended'));
            }
        }
    }

    // Craters.js micro game framework

    if (typeof window === 'undefined' && global) {
        global.window = {
            performance: {
                now: function(start) {
                    if (!start) return Date.now()
                    var end = Date.now(start);
                    return Math.round((end[0] * 1000) + (end[1] / 1000000))
                }
            },
            requestAnimationFrame: function(f) {
                setImmediate(() => f(this.performance.now()));
            }
        };
    }

    class Craters {
        static version() {
            return '1.2.2'
        }
    }

    exports.Canvas = Canvas;
    exports.Craters = Craters;
    exports.Entity = Entity;
    exports.Game = Game;
    exports.Loader = Loader;
    exports.Loop = Loop;
    exports.Maths = common;
    exports.Sound = Sound;
    exports.Sprite = Sprite;

    return exports;

}({}));
