// Rect collision tests the edges of each rect to
// test whether the objects are overlapping the other
class Collision {
	static detect (collider, collidee) {
	    // Store the collider and collidee edges
	    var l1 = collider.state.pos.x;
	    var t1 = collider.state.pos.y;
	    var r1 = l1 + collider.state.size.x;
	    var b1 = t1 + collider.state.size.y;
	    
	    var l2 = collidee.state.pos.x;
	    var t2 = collidee.state.pos.y;
	    var r2 = l2 + collidee.state.size.x;
	    var b2 = t2 + collidee.state.size.y;
	    
	    // If the any of the edges are beyond any of the
	    // others, then we know that the box cannot be
	    // colliding
	    if (b1 < t2 || t1 > b2 || r1 < l2 || l1 > r2) {
	        return false;
	    }
	    
	    // If the algorithm made it here, it had to collide
	    return true;
    }
}

// Game Loop Module
// This module contains the game loop, which handles
// updating the game state and re-rendering the canvas
// (using the updated state) at the configured FPS.
class Loop {
  constructor (scope, fps) {
    var loop = {}
    // Initialize timer variables so we can calculate FPS
    var fpsInterval = 1000 / fps
    var before = window.performance.now()
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
    }

    // Alternating Frame Rate vars
    var resetInterval = 5
    var resetState = 'new'

    loop.fps = 0

    // Main game rendering loop
    loop.main = function mainLoop (tframe) {
      // Request a new Animation Frame
      // setting to `stopLoop` so animation can be stopped via
      // `window.cancelAnimationFrame( loop.stopLoop )`
      loop.stopLoop = window.requestAnimationFrame(loop.main)

      // How long ago since last loop?
      var now = tframe
      var elapsed = now - before
      var activeCycle
      var targetResetInterval

      // If it's been at least our desired interval, render
      if (elapsed > fpsInterval) {
        // Set before = now for next frame, also adjust for
        // specified fpsInterval not being a multiple of rAF's interval (16.7ms)
        // ( http://stackoverflow.com/a/19772220 )
        before = now - (elapsed % fpsInterval)

        // Increment the vals for both the active and the alternate FPS calculations
        for (var calc in cycles) {
          ++cycles[calc].frameCount
          cycles[calc].sinceStart = now - cycles[calc].startTime
        }

        // Choose the correct FPS calculation, then update the exposed fps value
        activeCycle = cycles[resetState]
        loop.fps = Math.round(1000 / (activeCycle.sinceStart / activeCycle.frameCount) * 100) / 100

        // If our frame counts are equal....
        targetResetInterval = (cycles.new.frameCount === cycles.old.frameCount
          ? resetInterval * fps // Wait our interval
          : (resetInterval * 2) * fps) // Wait double our interval

        // If the active calculation goes over our specified interval,
        // reset it to 0 and flag our alternate calculation to be active
        // for the next series of animations.
        if (activeCycle.frameCount > targetResetInterval) {
          cycles[resetState].frameCount = 0
          cycles[resetState].startTime = now
          cycles[resetState].sinceStart = 0

          resetState = (resetState === 'new' ? 'old' : 'new')
        }

        // Update the game state
        scope.update(scope, now)
        // Render the next frame
        scope.render(scope, now)
      }
    }

    // Start off main loop
    loop.main()
    return loop
  }
}

class Canvas {
	constructor (width, height, container) {
		var container = document.querySelector(container || 'body');
		// Generate a canvas and store it as our viewport
	    var canvas = document.createElement('canvas')
	    var context = canvas.getContext('2d')
	    // Pass our canvas' context to our getPixelRatio method
	    var backingStores = ['webkitBackingStorePixelRatio', 'mozBackingStorePixelRatio', 'msBackingStorePixelRatio', 'oBackingStorePixelRatio', 'backingStorePixelRatio']
	    var deviceRatio = window.devicePixelRatio
	    // Iterate through our backing store props and determine the proper backing ratio.
	    var backingRatio = backingStores.reduce(function (prev, curr) {
	      return (Object.prototype.hasOwnProperty.call(context, curr) ? context[curr] : 1)
	    })
	    // Return the proper pixel ratio by dividing the device ratio by the backing ratio
	    var ratio = deviceRatio / backingRatio
	
	    // Set the canvas' width then downscale via CSS
	    canvas.width = Math.round(width * ratio)
	    canvas.height = Math.round(height * ratio)
	    canvas.style.width = width + 'px'
	    canvas.style.height = height + 'px'
	    // Scale the context so we get accurate pixel density
	    context.setTransform(ratio, 0, 0, ratio, 0, 0)
	    // Append viewport into our game within the dom
	    container.insertBefore(canvas, container.firstChild)
	    
	    return canvas // return the canvas
	}
}

export { Canvas, Loop, Collision }