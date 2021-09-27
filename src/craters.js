// Craters.js micro game framework
// This module contains the core craters framework fundamentals
// it loads modules and exports them
import "./Polyfill.js"
import Entity from "./Entity.js"
import Game from "./Game.js"
import {Maths} from "./Geometry/Geometry.js"
import {Vector} from "./Geometry/Geometry.js"
import Fixtures from "./Fixture/Fixtures.js"
export {Game, Entity, Fixtures, Vector, Maths}