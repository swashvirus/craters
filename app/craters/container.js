(function(window){ "use strict";

var physics = require ('./physics.js'),
	loop = require ('./loop.js'),
	canvas = require ('./canvas.js');
	
var container = class container {
	constructor(container,  width,  height, frames, debug) {
	    this.container = container;
	    this.constants = {
		    gravity: {
			    x: 0, 
			    y: 100
		    },
		    
		    width:  width,
		    height: height,
		    frames: frames,
		    debug:  debug
	    };
	    
	    this.state = {
		    entities: []
	    };
	    
		// Generate a canvas and store it as our viewport
		this.viewport = canvas.generateCanvas( this.constants.width,  this.constants.height);
		this.viewport.id = "gameViewport";
		
		// Get and store the canvas context as a global
		this.context = this.viewport.getContext('2d');
		
		// Append viewport into our container within the dom
		this.container = document.querySelector(this.container); 
		this.container.insertBefore(this.viewport, this.container.firstChild);
		
		// Instantiate core modules with the current scope
		this.physics = new physics( this );
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
};

module.exports = container

})(window);