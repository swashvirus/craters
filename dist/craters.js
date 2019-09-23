var cg = (function (exports) {
  'use strict';

  class Game {
    constructor (container, width, height, frames, debug) {
      this.container = container || 'body';
      this.state = {
        width: width,
        height: height,
        frames: frames,
        debug: debug,
        bgcolor: 'rgba(0,0,0,0)',
        color: '#ff0',
        font: '1em Arial'
      };

      this.entities = [];
      // Generate a canvas and store it as our viewport
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      // Pass our canvas' context to our getPixelRatio method
      var backingStores = ['webkitBackingStorePixelRatio', 'mozBackingStorePixelRatio', 'msBackingStorePixelRatio', 'oBackingStorePixelRatio', 'backingStorePixelRatio'];
      var deviceRatio = window.devicePixelRatio;
      // Iterate through our backing store props and determine the proper backing ratio.
      var backingRatio = backingStores.reduce(function (prev, curr) {
        return (Object.prototype.hasOwnProperty.call(context, curr) ? context[curr] : 1)
      });
      // Return the proper pixel ratio by dividing the device ratio by the backing ratio
      var ratio = deviceRatio / backingRatio;

      // Set the canvas' width then downscale via CSS
      canvas.width = Math.round(this.state.width * ratio);
      canvas.height = Math.round(this.state.height * ratio);
      canvas.style.width = this.state.width + 'px';
      canvas.style.height = this.state.height + 'px';
      // Scale the context so we get accurate pixel density
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      this.viewport = canvas;
      this.viewport.id = 'gameViewport';

      // Get and store the canvas context as a global
      this.context = this.viewport.getContext('2d');

      // Append viewport into our game within the dom
      this.container = document.querySelector(this.container);
      this.container.insertBefore(this.viewport, this.container.firstChild);

      // Initiate core modules with the current scope
      this.loop = new Loop(this);
      this.intitiate();
    }

    intitiate () {

    }

    update (scope, now) {
      for (var entity = 0; entity < this.entities.length; entity++) {
        // Fire off each active entities `render` method
        this.entities[entity].update();
      }
    }

    render (scope, now) {
      // Setup globals
      var w = scope.state.width;
      var h = scope.state.height;

      // Clear out the canvas
      scope.context.font = scope.state.font;
      scope.context.save();
      scope.context.clearRect(0, 0, w, h);
      scope.context.fillStyle = scope.state.bgcolor;
      scope.context.fillRect(0, 0, w, h);
      scope.context.fill();
      scope.context.restore();
      // Spit out some text
      scope.context.fillStyle = scope.state.color;
      // If we want to show the FPS, then render it in the top right corner.
      if (scope.state.debug) {
        scope.context.fillText('fps : ' + scope.loop.fps, w - 100, 50);
      }
      // If there are entities, iterate through them and call their `render` methods
      for (var entity = 0; entity < this.entities.length; entity++) {
        // Fire off each active entities `render` method
        this.entities[entity].render();
      }
    }
  }
  class Loop {
    constructor (scope) {
      var loop = {};
      // Initialize timer variables so we can calculate FPS
      var fps = scope.state.frames;
      var fpsInterval = 1000 / fps;
      var before = window.performance.now();
      // Set up an object to contain our alternating FPS calculations
      var cycles = {
        new: {
          frameCount: 0,
          startTime: before,
          sinceStart: 0
        },
        old: {
          frameCount: 0,
          startTime: before,
          sineStart: 0
        }
      };

      // Alternating Frame Rate vars
      var resetInterval = 5;
      var resetState = 'new';

      loop.fps = 0;

      // Main game rendering loop
      loop.main = function mainLoop (tframe) {
        // Request a new Animation Frame
        // setting to `stopLoop` so animation can be stopped via
        // `window.cancelAnimationFrame( loop.stopLoop )`
        loop.stopLoop = window.requestAnimationFrame(loop.main);

        // How long ago since last loop?
        var now = tframe;
        var elapsed = now - before;
        var activeCycle;
        var targetResetInterval;

        // If it's been at least our desired interval, render
        if (elapsed > fpsInterval) {
          // Set before = now for next frame, also adjust for
          // specified fpsInterval not being a multiple of rAF's interval (16.7ms)
          // ( http://stackoverflow.com/a/19772220 )
          before = now - (elapsed % fpsInterval);

          // Increment the vals for both the active and the alternate FPS calculations
          for (var calc in cycles) {
            ++cycles[calc].frameCount;
            cycles[calc].sinceStart = now - cycles[calc].startTime;
          }

          // Choose the correct FPS calculation, then update the exposed fps value
          activeCycle = cycles[resetState];
          loop.fps = Math.round(1000 / (activeCycle.sinceStart / activeCycle.frameCount) * 100) / 100;

          // If our frame counts are equal....
          targetResetInterval = (cycles.new.frameCount === cycles.old.frameCount
            ? resetInterval * fps // Wait our interval
            : (resetInterval * 2) * fps); // Wait double our interval

          // If the active calculation goes over our specified interval,
          // reset it to 0 and flag our alternate calculation to be active
          // for the next series of animations.
          if (activeCycle.frameCount > targetResetInterval) {
            cycles[resetState].frameCount = 0;
            cycles[resetState].startTime = now;
            cycles[resetState].sinceStart = 0;

            resetState = (resetState === 'new' ? 'old' : 'new');
          }

          // Update the game state
          scope.update(scope, now);
          // Render the next frame
          scope.render(scope, now);
        }
      };

      // Start off main loop
      loop.main();

      return loop
    }
  }

  class Entity {
    constructor () {
      this.state = {
        size: {
          x: 10,
          y: 10
        },
        pos: {
          x: 0,
          y: 0
        },
        vel: {
          x: 0,
          y: 0
        },
        accel: {
          x: 0,
          y: 0
        },
        radius: 10,
        angle: 0
      };

      this.entities = [];
    }

    update () {
      // update the sub entities if there's any
      // by firing off the update function one by one
      for (var entity = 0; entity < this.entities.length; entity++) {
        this.entities[entity].update();
      }
      this.state.vel.x += this.state.accel.x;
      this.state.vel.y += this.state.accel.y;
      this.state.pos.x += this.state.vel.x;
      this.state.pos.y += this.state.vel.y;
    }

    render () {
      for (var entity = 0; entity < this.entities.length; entity++) {
        this.entities[entity].render();
      }
    }
  }

  class Sprite extends Entity {
    constructor (scope, args) {
      super();

      this.scope = scope;
      this.state = {
        pos: args.pos || {
          x: 0,
          y: 0
        },
        crop: {
          x: 0,
          y: 0
        },
        size: args.size || {
          x: 0,
          y: 0
        },
        frames: args.frames || [],
        angle: args.angle || 0,
        image: args.image || new Image(),
        delay: args.delay || 5,
        tick: args.tick || 0,
        orientation: args.orientation || 'horizontal'
      };
    }

    update () {
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

    render () {
      super.render(this);

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
    constructor () {
      this.rescache = {};
    };

    load (res, cbk) {
      var that = this;
      if (res instanceof Array) {
        res.forEach(function (i) {
          that.rescache[i] = false;
          that.fetch(i, cbk);
        });
      } else {
        that.rescache[res] = false;
        that.fetch(res, cbk);
      }
    }

    fetch (url, cbk) {
      var that = this;
      if (that.rescache[url]) {
        return that.rescache[url]
      } else {
        var img = new Image();
        img.onload = function () {
          that.rescache[url] = img;
          that.ready(cbk);
        };

        img.src = url;
      }
    }

    ready (cbk) {
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
    constructor () {
      this.sounds = {}; // The loaded sounds and their instances
      this.instances = []; // Sounds that are currently playing
      this.defaultVolume = 1;
    };

    load (name, path, callback) {
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

    remove (name) {
      if (typeof this.sounds !== 'undefined') {
        delete this.sounds[name];
      }
    };

    unlock (name, callback, volume, loop) {
      var that = this;
      var events = ['touchstart', 'touchend', 'mousedown', 'keydown'];
      var unlock = function unlock () {
        events.forEach(function (event) {
          document.body.removeEventListener(event, unlock);
        });
        that.play(name, callback, volume, loop);
      };

      events.forEach(function (event) {
        document.body.addEventListener(event, unlock, false);
      });
    };

    play (name, callback, volume, loop) {
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

    stopAll () {
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

  const boundary = function numberboundary (min, max) {
    return Math.min(Math.max(this, min), max)
  };
  // Expose methods
  Number.prototype.boundary = boundary;

  class Craters {
    static version () {
      return '0.0.0.4'
    }
  }

  exports.Craters = Craters;
  exports.Entity = Entity;
  exports.Game = Game;
  exports.Loader = Loader;
  exports.Sound = Sound;
  exports.Sprite = Sprite;

  return exports;

}({}));
