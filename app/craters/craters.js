/** Craters.js micro game framework
 * This module contains the basics fundamental starting point calling game loop, which handles
 * updating the game state and re-rendering the canvas
 * (using the updated state) at the configured FPS.
 */
var game = require('./game.js'),
	entity = require('./entity.js'),
	loader = require('./loader.js'),
	sound = require('./sound.js');

var Boundary = function numberBoundary(min, max) {
    return Math.min( Math.max(this, min), max );
}
// Expose methods
Number.prototype.boundary = Boundary;

(function(window){ "use strict";

	window.craters = {
		version:'0.0.0.2',
		game: game,
		entity: entity.entity,
		sprite: entity.sprite,
		loader: loader,
		sound: sound
	}

})(window);