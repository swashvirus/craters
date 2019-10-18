// Game Loop Module
// This module contains the game loop, which handles
// updating the game state and re-rendering the canvas
// (using the updated state) at the configured FPS.
class Loop {
    constructor(scope, fps) {
        var loop = { elapsed: 0}
        // Initialize timer variables so we can calculate FPS
        // Main game rendering loop
        loop.main = function () {
            // Request a new Animation Frame
            // setting to `stopLoop` so animation can be stopped via
            loop.stopLoop = () => { window.cancelAnimationFrame( loop.startLoop ) };

            // Update the game state
            scope.update(scope, loop.elapsed)
            // Render the next frame
            scope.render(scope, loop.elapsed)
            loop.elapsed++
            loop.startLoop = window.requestAnimationFrame(loop.main)
        }

        // Start off main loop
        loop.main()
        return loop
    }
}

class Canvas {
    constructor(width, height, container) {
        container = document.querySelector(container || 'body')
        // Generate a canvas and store it as our viewport
        var canvas = document.createElement('canvas')
        var context = canvas.getContext('2d')
        // Pass our canvas' context to our getPixelRatio method
        var backingStores = ['webkitBackingStorePixelRatio', 'mozBackingStorePixelRatio', 'msBackingStorePixelRatio', 'oBackingStorePixelRatio', 'backingStorePixelRatio']
        var deviceRatio = window.devicePixelRatio
        // Iterate through our backing store props and determine the proper backing ratio.
        var backingRatio = backingStores.reduce(function(prev, curr) {
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

export {
    Canvas,
    Loop
}