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
            }
        };
    }

    addObject(obj) {
        // used for adding entities
        this.entities.push(obj);
    }

    removeObject(index) {
        // used to remove entities
        this.entities.splice(index, 1);
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

const boundary = function numberboundary(min, max) {
    return Math.min(Math.max(this, min), max)
};
// Expose methods
Number.prototype.boundary = boundary;

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
        return '1.2.0'
    }
}

export { Canvas, Craters, Entity, Game, Loader, Loop, Sound, Sprite };
