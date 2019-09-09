(function(window){ "use strict";

var render = class render {

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
	        scope.context.fillStyle = '#ff0';
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
	}
}

module.exports = render

})(window);