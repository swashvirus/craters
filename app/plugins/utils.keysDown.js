/** keysDown Utility Module
 * Monitors and determines whether a key 
 * is pressed down at any given moment.
 * Returns getters for each key.
 */
function keysDown() {
    this.isPressed = {};

    var left, right, up, down;

    // Set up `onkeydown` event handler.
    document.onkeydown = function (ev) {
        if (ev.keyCode === 39) { right = true; }
        if (ev.keyCode === 37) { left = true; }
        if (ev.keyCode === 38) { up = true; }
        if (ev.keyCode === 40) { down = true; }
    };

    // Set up `onkeyup` event handler.
    document.onkeyup = function (ev) {
        if (ev.keyCode === 39) { right = false; }
        if (ev.keyCode === 37) { left = false; }
        if (ev.keyCode === 38) { up = false; }
        if (ev.keyCode === 40) { down = false; }
    };

    // Define getters for each key
    // * Not strictly necessary. Could just return
    // * an object literal of methods, the syntactic
    // * sugar of `defineProperty` is just so much sweeter :)
    Object.defineProperty(this.isPressed, 'left', {
        get: function() { return left; },
        configurable: true,
        enumerable: true
    });

    Object.defineProperty(this.isPressed, 'right', {
        get: function() { return right; },
        configurable: true,
        enumerable: true
    });

    Object.defineProperty(this.isPressed, 'up', {
        get: function() { return up; },
        configurable: true,
        enumerable: true
    });

    Object.defineProperty(this.isPressed, 'down', {
        get: function() { return down; },
        configurable: true,
        enumerable: true
    });

    return this;
}

module.exports = keysDown();