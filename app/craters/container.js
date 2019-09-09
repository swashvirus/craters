(function(window){ "use strict";

var physics = require ('./physics.js'),
	update = require ('./update.js'),
	render = require ('./render.js'),
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
		this.update = new update( this );
		this.render = new render( this );
		this.loop   = new loop( this );
		this.init();
	}
	
	init(){
		
	}
};

module.exports = container

})(window);