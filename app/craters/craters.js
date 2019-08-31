/** Craters.js micro game framework
 * This module contains the basics fundamental starting point calling game loop, which handles
 * updating the game state and re-rendering the canvas
 * (using the updated state) at the configured FPS.
 */

(function(window){ "use strict";

window.craters = {
	version:'1.0.1'
}

craters.game = class game {
	constructor(container,  width,  height, frames, debug) {
	    this.container = container;
	    this.constants = {
		    width:  width,
		    height: height,
		    frames: frames,
		    debug:  debug
	    };
	    
	    this.state = {
		    entities: {}
	    };
	    
		// Generate a canvas and store it as our viewport
		this.viewport = gameCanvas.generateCanvas( this.constants.width,  this.constants.height);
		this.viewport.id = "gameViewport";
		
		// Get and store the canvas context as a global
		this.context = this.viewport.getContext('2d');
		
		// Append viewport into our container within the dom
		this.container = document.querySelector(this.container);
		this.container.insertBefore(this.viewport, this.container.firstChild);
		
		// Instantiate core modules with the current scope
		this.update = new gameUpdate( this );
		this.render = new gameRender( this );
		this.loop   = new gameLoop( this );
		this.init();
	}
	
	init(){
		
	}
	
};

craters.entity = class entity {
	constructor () {
		this.state = {
			position: {x:0, y:0}
		}
	}
	
	update (){
		// comment
	}
	
	render (){
		// comment
	}
}

craters.class = class {
	constructor () {
		this.init();
	}
	init (){
		// comment
	}
	update (){
		// comment
	}
	
	render (){
		// comment
	}
}

class gameUpdate {
	constructor ( scope ) {
		return this.update(scope);
	}
	
	update (scope) {
	    return function update( tFrame ) {
	        var state = scope.state || {};
	
	        // If there are entities, iterate through them and call their `update` methods
	        if (state.hasOwnProperty('entities')) {
	            var entities = state.entities;
	            // Loop through entities
	            for (var entity in entities) {
	                // Fire off each active entities `render` method
	                entities[entity].update();
	            }
	        }
	
	        return state;
	    }
	}
}

class gameRender {
	constructor ( scope ) {
		return this.render(scope);
	}
	
	render (scope) {
	    // Setup globals
	    var w = scope.constants.width,
	        h = scope.constants.height;
	
	    return function render() {
	        // Clear out the canvas
	        scope.context.clearRect(0, 0, w, h);
	        
	        // Spit out some text
	        // If we want to show the FPS, then render it in the top right corner.
	        if (scope.constants.debug) {
	            scope.context.fillStyle = '#ff0';
	            scope.context.fillText('fps : ' + scope.loop.fps, w - 100, 50);
	        }
	
	        // If there are entities, iterate through them and call their `render` methods
	        if (scope.state.hasOwnProperty('entities')) {
	            var entities = scope.state.entities;
	            // Loop through entities
	            for (var entity in entities) {
	                // Fire off each active entities `render` method
	                entities[entity].render();
	            }
	        }
	    }
	}
}

class gameLoop {
	constructor ( scope ) {
		return this.loop(scope);
	}
	
	loop (scope) {
	    var loop = {};
	    // Initialize timer variables so we can calculate FPS
	    var fps = scope.constants.frames,
	        fpsInterval = 1000 / fps,
	        before = window.performance.now(),
	        // Set up an object to contain our alternating FPS calculations
	        cycles = {
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
	        },
	        // Alternating Frame Rate vars
	        resetInterval = 5,
	        resetState = 'new';
	
	    loop.fps = 0;
	
	    // Main game rendering loop
	    loop.main = function mainLoop( tframe ) {
	        // Request a new Animation Frame
	        // setting to `stopLoop` so animation can be stopped via
	        // `window.cancelAnimationFrame( loop.stopLoop )`
	        loop.stopLoop = window.requestAnimationFrame( loop.main );
	
	        // How long ago since last loop?
	        var now = tframe,
	            elapsed = now - before,
	            activeCycle, targetResetInterval;
	
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
	            scope.state = scope.update( now );
	            // Render the next frame
	            scope.render();
	        }
	    };
	
	    // Start off main loop
	    loop.main();
	
	    return loop;
	}
}

class gameCanvas {
    /** Determine the proper pixel ratio for the canvas */
    static getPixelRatio(context) {
      console.log('Determining pixel ratio.');
      var backingStores = [
        'webkitBackingStorePixelRatio',
        'mozBackingStorePixelRatio',
        'msBackingStorePixelRatio',
        'oBackingStorePixelRatio',
        'backingStorePixelRatio'
      ];

      var deviceRatio = window.devicePixelRatio;

      // Iterate through our backing store props and determine the proper backing ratio.
      var backingRatio = backingStores.reduce(function(prev, curr) {
        return (context.hasOwnProperty(curr) ? context[curr] : 1);
      });

      // Return the proper pixel ratio by dividing the device ratio by the backing ratio
      return deviceRatio / backingRatio;
    }

    /** Generate a canvas with the proper width / height
     * Based on: http://www.html5rocks.com/en/tutorials/canvas/hidpi/
     */
    static generateCanvas(w, h) {
      console.log('Generating canvas.');

      var canvas = document.createElement('canvas'),
          context = canvas.getContext('2d');
      // Pass our canvas' context to our getPixelRatio method
      var ratio = this.getPixelRatio(context);

      // Set the canvas' width then downscale via CSS
      canvas.width = Math.round(w * ratio);
      canvas.height = Math.round(h * ratio);
      canvas.style.width = w +'px';
      canvas.style.height = h +'px';
      // Scale the context so we get accurate pixel density
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      return canvas;
    }
};

})(window);