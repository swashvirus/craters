import {Game, Vector} from '../../craters/craters'

// game
class mygame extends Game {
    constructor() {
        super({
	        fps: 60,
	        container: '#container',
	        size: new Vector(1000, 500)
        });
        
        this.viewport.style.background = "#eee";
        this.viewport.resize(this, {
            x: window.innerWidth,
            y: window.innerHeight
        })
    }

    update(elapsed, fps) {
        super.update()
        // console.log('tick ' + elapsed + ' at:' + fps + ' fps')
    }

    render() {
        super.render();

        this.context.fillStyle = "#fff";
        this.context.font = '2em Arial'
        this.context.fillText('It\'s working.️', 65, (this.state.size.y / 2), (this.state.size.x))
    }
}

let game = new mygame();