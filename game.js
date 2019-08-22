/***
** Craters.js Hello world 
** Load Game Core Modules
** 
***/
var gameLoop = require('./app/core/game.loop.js'),
	gameUpdate = require('./app/core/game.update.js'),
	gameRender = require('./app/core/game.render.js'),
	canvas = require('./app/plugins/utils.canvas.js'),
	$container = document.getElementById('container');
	

function Game(w, h, frames, debug) {
var that;

// Setup some constants
this.constants = {
    width: w,
    height: h,
    frames: frames,
    debug: debug
};

// Instantiate an empty state object
this.state = {};
  // burnSfx = new sound('burn.mp3');
  // Generate a canvas and store it as our viewport
this.viewport = canvas.generateCanvas(w, h);
this.viewport.id = "gameViewport";

// Get and store the canvas context as a global
this.context = this.viewport.getContext('2d');

// Append viewport into our container within the dom
$container.insertBefore(this.viewport, $container.firstChild);

// Instantiate core modules with the current scope
this.update = gameUpdate( this );
this.render = gameRender( this );
this.loop = gameLoop( this );

that = this;

that.state.entities = that.state.entities || {};
that.state.entities.text = {
	update: function (){
		// 
	},
	render: function (){
		that.context.save();
		that.context.font = '32px Impact';
		that.context.fillText('It\'s working.', 5, w/2, w);
		that.context.restore();
	}
};

	return this;
}

// Instantiate a new game in the global scope at full screen
window.game = new Game(window.innerWidth, window.innerHeight, 60, true);

module.exports = game;