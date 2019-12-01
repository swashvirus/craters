import {Game, Entity, Fixtures, Vector} from '../../craters/craters'
import {loadImage} from '../../craters/Modules/Assets/Image.js'

class mygame extends Game {
    constructor(container, width, height) {
		super({
	        fps: 60,
	        debug: false,
	        container: '#container',
	        size: new Vector(500, 500)
        });
        
        this.score = '0000'
		this.viewport.resize(this, {
		    x: window.innerWidth,
		    y: window.innerHeight
		})
		
        for (var i = 0; i < 15; i++) {
            this.addObject(new boltbug(this))
        }
        this.addObject(new ladybug(this))
    }

    render() {
        super.render()
        this.context.font = '2em Arial'
        this.context.fillStyle = '#fff'
        this.context.fillText('score: ' + this.score, (16), (50))
    }
}

class bug extends Entity {
    constructor(scope, image, width, height) {
        super({
	        debug: false,
	        texture: {
	        style: {
	        fillStyle: "red",
	        strokeStyle: "white"
	        },
	        frames: [0,1,2],
	        tileheight: height,
	        tilewidth: width,
	        image: image
        }});

        this.state.position.x = ((Math.random()) * (scope.state.size.x))
        this.state.position.y = ((Math.random()) * (scope.state.size.y))
		this.fixture = new Fixtures.Polygon(this.state.position, [{x:0, y:0}, {x:0, y:height}, {x:width, y:height}, {x:width, y:0}]);
        this.state.angle = (Math.random() * 360)
    }
}

class ladybug extends bug {
    constructor(scope, args) {
        super(scope, media.fetch('./media/bug.png'), 196, 218)
    }
}

class boltbug extends bug {
    constructor(scope, args) {
        super(scope, media.fetch('./media/bolt.png'), 214, 282)
    }
}
// what this does is , it loads all resources
// and later , it starts the game if all files were loaded

var media = new loadImage()
media.load([
    './media/bug.png',
    './media/bolt.png'
], function() {
    window.game = new mygame('#container', window.innerWidth, window.innerHeight, 60, true)
})