/***
	** Craters.js hello world game ,
	** 
***/
// Begin by loading Game Core Modules
var gameLoop = require('./app/core/game.loop.js'),
	gameUpdate = require('./app/core/game.update.js'),
	gameRender = require('./app/core/game.render.js'),
	canvas = require('./app/plugins/utils.canvas.js'),
	$container = document.getElementById('container');

// comment
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
// comment
var comet = function(name){
  this.name = name;
  this.type = 'lunar';
  this.state = {
	  position: {x:0, y:0},
	  radius: 20
  };
  // comment
  this.update = function (){
	    // update the comet's shaking moves ,
		this.state.position.x += (Math.random() - 0.5);
		this.state.position.y += (Math.random() - 0.5);
		// 'DOS' console.log(this.name + ' ' + this.type + ' state:' + JSON.stringify(this.state));
  };
  // comment
  this.render = function (){
		// draw the entities ,
		that.context.save();
		that.context.font = '64px Impact';
		that.context.fillText('☄️', (10 + this.state.position.x) , ((w / 2) + this.state.position.x), (w));
		// comment
		that.context.font = '32px Impact';
		that.context.fillText('It\'s working.️', 65, (w / 2), (w));
		that.context.restore();
  }
  
};

// init an instance of a comet
that.state.entities.comet = new comet('f18');

	return this;
}

// Instantiate a new game in the global scope at full screen
window.game = new Game(window.innerWidth, window.innerHeight, 60, true);

module.exports = game;