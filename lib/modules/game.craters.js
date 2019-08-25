/** Craters.js micro game framework
 * This module contains the basics fundamental starting point calling game loop, which handles
 * updating the game state and re-rendering the canvas
 * (using the updated state) at the configured FPS.
 */
var gameLoop = require('./game.loop.js'),
    gameUpdate = require('./game.update.js'),
    gameRender = require('./game.render.js'),
	gameCanvas = require('../plugins/utils.canvas.js'),
	
	craters = function (container,  width,  height, frames, debug) {
    $container = document.querySelector(container);

    // Setup basic constants 
    this.constants = {
	    version: '1.0.0',
        width:  width,
        height:  height,
        frames: frames,
        debug: debug
    };

    // Instantiate an empty state object
    this.state = {
	    entities: {}
    };
	
    // Generate a canvas and store it as our viewport
    this.viewport = gameCanvas.generateCanvas( width,  height);
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