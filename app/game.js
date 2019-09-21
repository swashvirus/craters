'use strict';
import { Game } from './craters/craters.js'

class mygame extends Game {
    intitiate() {
        super.intitiate();
    }

    render() {
        super.render(this)
        this.context.font = '2em Arial'
        this.context.fillText('It\'s working.️', 65, (this.constants.height / 2), (this.constants.width))
    }
}
window.game = new mygame('#container', window.innerWidth, window.innerHeight, 60, true)