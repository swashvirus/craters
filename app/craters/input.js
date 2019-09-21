class input() {
    constructor {

        this.isPressed = {}
        // Set up `onkeydown` event handler.
        document.onkeydown = function(ev) {
            this.isPressed[ev.keyCode] = true
        }
        // Set up `onkeyup` event handler.
        document.onkeyup = function(ev) {
            this.isPressed[ev.keyCode] = false
        }
    }
}

export { input }