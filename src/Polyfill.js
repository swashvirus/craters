// for nodejs environment
// the script creates an equivalent of 
// requestAnimationFrame function

var cg = new Object();
if (typeof window === 'undefined' && global) {
    global.window = {
        performance: {
            now: function(start) {
                if (!start) return Date.now()
                var end = Date.now(start)
                return Math.round((end[0] * 1000) + (end[1] / 1000000))
            }
        },
        requestAnimationFrame: function(f) {
            setImmediate(() => f(this.performance.now()))
        }
    }
}

// assingn cg to window object
window['cg'] = cg;