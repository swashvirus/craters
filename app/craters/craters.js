// Craters.js micro game framework
// This module contains the basics fundamental starting point calling game loop, which handles
// updating the game state and re-rendering the canvas
// (using the updated state) at the configured FPS.

import { Game } from './game.js'
import { Entity, Sprite } from './entity.js'
import { Loader } from './loader.js'
import { Sound } from './sound.js'

const boundary = function numberboundary (min, max) {
  return Math.min(Math.max(this, min), max)
}
// Expose methods
Number.prototype.boundary = boundary

class Craters {
  static version () {
    return '0.0.0.4'
  }
}

export { Craters, Loader, Game, Entity, Sprite, Sound }
