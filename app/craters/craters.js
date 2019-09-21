// Craters.js micro game framework
// This module contains the basics fundamental starting point calling game loop, which handles
// updating the game state and re-rendering the canvas
// (using the updated state) at the configured FPS.

import { game } from './game.js'
import { entity, sprite } from './entity.js'
import { loader } from './loader.js'
import { sound } from './sound.js'

const Boundary = function numberBoundary (min, max) {
  return Math.min(Math.max(this, min), max)
}
// Expose methods
Number.prototype.boundary = Boundary

class craters {
  static version () {
    return '0.0.0.3'
  }
}

export { craters, loader, game, entity, sprite, sound }
