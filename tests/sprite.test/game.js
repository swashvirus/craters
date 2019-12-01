'use strict';
import {Loop} from '../../craters/System.js'
import {loadImage} from '../../craters/Modules/Assets/Image.js'
import {Canvas} from '../../craters/System.js'

class Sprite {
    constructor(image, canvas) {
	    this.size = {
		   x: 196,
		   y: 218
	    }
	    this.pos = {
		    x: 50,
		    y: 50
	    }
	    this.image = image;
	    this.viewport = canvas;
	    this.context = canvas.context;
		let width = canvas.width;
		let height = canvas.height;
		this.grid = new Array();
		
		for(let w = 0; w < width; w+=this.size.x){
			for(let h = 0; h < height; h+=this.size.y){
				this.grid.push({x: w, y: h})
			}
		}
		console.log(JSON.stringify(this.grid))
		// default anim strip
		this.animation = {frames: [0,1,3,4]}
    }

    update() {
        this.frame = this.animation.frames.shift()
        this.animation.frames.push(this.frame)
    }

    render() {
	    this.viewport.clear()
        let frame = this.frame;
        this.context.drawImage(this.image,
        this.grid[frame].x, this.grid[frame].y, this.size.x, this.size.y,
        this.pos.x, this.pos.y, this.size.x, this.size.y)
    }
}

let sprite = new loadImage()
let image = sprite.load('./bug.png', () => {
	let game = new Loop( new Sprite(sprite.fetch('./bug.png'), new Canvas(window.innerWidth, window.innerHeight, '#container')), 60)
})