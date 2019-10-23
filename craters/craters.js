// Craters.js micro game framework
// This module contains the core craters.js framework fundamentals
// it loads modules and exports them
import * as Maths from './maths/common.js'

import {
    Canvas,
    Loop
} from './system.js'
import {
    Entity,
    Game,
    Sprite
} from './entity.js'
import {
    Loader
} from './loader.js'
import {
    Sound
} from './sound.js'

if (typeof window === 'undefined' && global) {
    global.window = {
        performance: {
            now: function(start) {
                if (!start) return Date.now()
                var end = Date.now(start)
                return Math.round((end[0] * 1000) + (end[1] / 1000000))
            }
        },
        requestAnimationFrame: function(f) {
            setImmediate(() => f(this.performance.now()))
        }
    }
}

class Craters {
    static version() {
        return '1.2.2'
    }
}

export {
    Craters,
    Loader,
    Game,
    Canvas,
    Loop,
    Entity,
    Sprite,
    Sound,
    Maths
}