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
        }
        // Initialize timer variables so we can calculate tframe
        // Main game rendering loop
        loop.main = function() {
            loop.startLoop = window.requestAnimationFrame(loop.main)
            loop.fps = Math.round(((1000 / (window.performance.now() - loop.before) * 100) / 100))

            if (window.performance.now() < loop.before + loop.tframe) return
            loop.before = window.performance.now()
            // Request a new Animation Frame
            // setting to `stopLoop` so animation can be stopped via
            loop.stopLoop = () => {
                window.cancelAnimationFrame(loop.startLoop)
            }

            // Update the game state
            scope.update(loop.elapsed, loop.fps)
            // Render the next frame
            scope.render(loop.elapsed, loop.fps)
            loop.elapsed++
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
        canvas.context = canvas.getContext('2d')

        canvas.resize = (scope, size) => {
            canvas.style.width = size.x + 'px'
            canvas.style.height = size.y + 'px'
            canvas.width = Math.round(size.x * ratio)
            canvas.height = Math.round(size.y * ratio)
            context.setTransform(ratio, 0, 0, ratio, 0, 0)

            scope.state.size.x = size.x
            scope.state.size.y = size.y
        }

        canvas.clear = (w, x, y, z) => {
            w = w || 0
            x = x || 0
            y = y || canvas.width
            z = z || canvas.height
            canvas.context.clearRect(w, x, y, z)
        }

        canvas.camera = (x, y) => {
            canvas.context.setTransform(1, 0, 0, 1, 0, 0) // reset the transform matrix
            canvas.context.translate(-x, -y)
        }

        return canvas // return the canvas
    }
}

export {
    Canvas,
    Loop
}