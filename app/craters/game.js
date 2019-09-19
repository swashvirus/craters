(function(window){ "use strict";
	
	class game {
		constructor(game,  width,  height, frames, debug) {
		    this.game = game || 'body';
		    this.constants = {
			    gravity: {
				    x: 0, 
				    y: 100
			    },
			    
			    width:  width,
			    height: height,
			    frames: frames,
			    debug:  debug,
			    bgcolor: 'rgba(0,0,0,0)',
			    color: '#ff0',
			    font: '1em Arial'
		    };
		    
		    this.state = {
			    entities: []
		    };
		    
			// Generate a canvas and store it as our viewport
			var canvas = document.createElement('canvas'),
			context = canvas.getContext('2d');
			// Pass our canvas' context to our getPixelRatio method
			var backingStores = ['webkitBackingStorePixelRatio','mozBackingStorePixelRatio','msBackingStorePixelRatio','oBackingStorePixelRatio','backingStorePixelRatio'];
			var deviceRatio = window.devicePixelRatio;
			// Iterate through our backing store props and determine the proper backing ratio.
			var backingRatio = backingStores.reduce(function(prev, curr) {
			return (context.hasOwnProperty(curr) ? context[curr] : 1); });
			// Return the proper pixel ratio by dividing the device ratio by the backing ratio
			var ratio = deviceRatio / backingRatio;
			
			// Set the canvas' width then downscale via CSS
			canvas.width = Math.round(this.constants.width * ratio);
			canvas.height = Math.round(this.constants.height * ratio);
			canvas.style.width = this.constants.width +'px';
			canvas.style.height = this.constants.height +'px';
			// Scale the context so we get accurate pixel density
			context.setTransform(ratio, 0, 0, ratio, 0, 0);
			
			this.viewport = canvas;
			this.viewport.id = "gameViewport";
			
			// Get and store the canvas context as a global
			this.context = this.viewport.getContext('2d');
			
			// Append viewport into our game within the dom
			this.game = document.querySelector(this.game); 
			this.game.insertBefore(this.viewport, this.game.firstChild);
			
			// Initiate core modules with the current scope
			this.loop = new loop( this );
			this.intitiate ();
		}
		
		intitiate () {
			
		}
		
		update (scope, now) {
			
			var state = scope.state || [];
			var entities = state.entities;
			for (var entity = 0; entity < entities.length; entity++) {
				// Fire off each active entities `render` method
				entities[entity].update();
			}
		}
		
		render (scope, now) {
			// Setup globals
			var w = scope.constants.width,
				h = scope.constants.height;
			
			// Clear out the canvas
			scope.context.font = scope.constants.font;
			scope.context.save();
			scope.context.clearRect(0, 0, w, h);
			scope.context.fillStyle = scope.constants.bgcolor;
			scope.context.fillRect(0, 0, w, h);
			scope.context.fill();
			scope.context.restore();
			// Spit out some text
			scope.context.fillStyle = scope.constants.color;
			// If we want to show the FPS, then render it in the top right corner.
			if (scope.constants.debug) {
				scope.context.fillText('fps : ' + scope.loop.fps, w - 100, 50);
			}
			
			// If there are entities, iterate through them and call their `render` methods
			var state = scope.state || [];
			var entities = state.entities;
			for (var entity = 0; entity < entities.length; entity++) {
				// Fire off each active entities `render` method
				entities[entity].render();
			}
		}
	};
	
	
	class loop {
	
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
		            scope.update(scope, now );
		            // Render the next frame
		            scope.render(scope, now);
		        }
		    };
		
		    // Start off main loop
		    loop.main();
		
		    return loop;
		}
	}

	module.exports = game
	
})(window);