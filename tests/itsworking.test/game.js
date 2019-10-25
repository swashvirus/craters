import {
    Game,
    Loop,
    Canvas
} from '../../index.js'

// game
class mygame extends Game {
    constructor(container, width, height) {
        super();

        this.state.size = {
            x: width,
            y: height
        }

        this.loop = new Loop(this, 60)
        this.viewport = new Canvas(this.state.size.x, this.state.size.y, container);
        this.context = this.viewport.context;
        this.viewport.style.background = "#eee";
        this.viewport.resize(this, {
            x: window.innerWidth,
            y: window.innerHeight
        })
    }

    update(elapsed, fps) {
        // console.log('tick ' + elapsed + ' at:' + fps + ' fps')
    }

    render() {
        this.viewport.clear()
        super.render()

        this.context.fillStyle = "#fff";
        this.context.font = '2em Arial'
        this.context.fillText('It\'s working.️', 65, (this.state.size.y / 2), (this.state.size.x))
    }
}

let game = new mygame('#container', 1024, 512)