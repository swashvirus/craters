// Craters.js micro game framework
// This module contains the core craters.js framework fundamentals
// it loads modules and exports them
import './Polyfill.js'

import Entity from './Entity.js'
import Game from './Game.js'
import {Maths} from './Geometry/Geometry.js'
import {Vector} from './Geometry/Geometry.js'
import Fixtures from './Fixture/Fixtures.js'

class Craters {
    static version() {
        return '1.3.0'
    }
}

export { Craters, Game, Entity, Fixtures, Vector, Maths }