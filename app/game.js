'use strict';
import { Game, Canvas, Loop } from './craters/craters.js'

class mygame extends Game {
	constructor (container, width, height){
		super ();
		
		this.state.size = {x: width, y: height}
		this.viewport = new Canvas(this.state.size.x, this.state.size.y, container);
		this.context = this.viewport.getContext('2d')
		this.loop = new Loop(this, 60)
	}
	
    render () {
        super.render()
        this.clearContext(this.context, this.state.size)
        
        this.context.font = '2em Arial'
        this.context.fillText('It\'s working.️', 65, (this.state.size.y / 2), (this.state.size.x))
    }
}

window.game = new mygame('#container', window.innerWidth, window.innerHeight, 60, true)