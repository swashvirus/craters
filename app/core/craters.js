/** -----------------------------------------------------------------------------
	Craters.js Game Engine 0.01
	http://github.com/swashvirus/craters.js
	
	basics fundamental starting point
-----------------------------------------------------------------------------
----------------------------------------------------------------------------- **/

var gameLoop = require('./game.loop.js'),
    gameUpdate = require('./game.update.js'),
    gameRender = require('./game.render.js'),
	gameCanvas = require('../plugins/utils.canvas.js'), // require our canvas utils
	
	craters = function (container, w, h, frames, debug) {
    $container = document.querySelector(container);

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
    this.viewport = gameCanvas.generateCanvas(w, h);
    this.viewport.id = "gameViewport";

    // Get and store the canvas context as a global
    this.context = this.viewport.getContext('2d');

    // Append viewport into our container within the dom
    $container.insertBefore(this.viewport, $container.firstChild);

    // Instantiate core modules with the current scope
    this.update = gameUpdate( this );
    this.render = gameRender( this );
    this.loop = gameLoop( this );

    return this;
	
};

module.exports = craters;