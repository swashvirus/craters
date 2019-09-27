import { Game, Entity, Sprite, Loader, Collision } from './../../app/craters/craters.js'

'use strict'
class breakOut extends Game {
  constructor () {
    super('#container', window.innerWidth, window.innerHeight, 60, false)

    this.score = 0;
    this.state.color = 'rgba(255,255,255,1)'
    this.state.bgcolor = 'rgba(0,0,0,0.001)'
    this.state.font = '1.5em Arial'
    this.ball = this.entities.push(new ball(this)) - 1;
    this.entities.push(new paddle(this))
    for(var row = 0; row < 3; row++){
	    for(var col = 0; col < (this.state.width / 138); col++){
		   var index = this.entities.push(new bamboo(this,{x: (138 * col), y: (53 * row)}))
		   this.entities[index - 1].id = (index - 1)
	    }
    }
  }

  render () {
    super.render(this)
    this.context.fillText('score: ' + this.score, (16), (50))
  }
}

class ball extends Sprite {
  constructor (scope) {
    super(scope, {frames: [0], image: media.fetch('./media/ball@3X.png')})
	
	this.state.vel = {x: 5, y: 5}
    this.state.size = { x: 48, y: 48 }
    this.state.pos = { x: (scope.state.width / 2) - (this.state.size.x / 2), y: (scope.state.height/2 - this.state.size.y) }
  }
  update (){
	  super.update ();
	  
	  // y-axis less than zero
	  if (this.state.pos.y < 0) {
		  this.state.vel.y *= -1;
	  }
	  // y-axis greater than max
	  if ((this.state.pos.y + this.state.size.y + 69) > this.scope.state.height) {
		  this.state.vel.y *= -1;
	  }
	  // x-axis less than zero
	  if (this.state.pos.x < 0) {
		  this.state.vel.x *= -1;
	  }
	  // x-axis greater than max
	  if ((this.state.pos.x + this.state.size.x) > this.scope.state.width) {
		  this.state.vel.x *= -1;
	  }
  }
}

class bamboo extends Sprite {
  constructor (scope, pos) {
    super(scope, {frames: [0], image: media.fetch('./media/block@3x.png')})
	this.scope = scope;
    this.state.size = { x: 138, y: 53 }
    this.state.pos = { x: pos.x, y: pos.y }
  }
  update () {
	super.update()
	if(Collision.detector(this.scope.entities[this.scope.ball], this)){
		this.scope.score+=10;
		this.state.image = new Image();
		this.state.pos = this.state.size = {x:0, y:0} // dirty hack alert
	}
  }
}

class paddle extends Sprite {
  constructor (scope) {
    super(scope, {frames: [0], image: media.fetch('./media/paddle@3X.png')})
    this.scope = scope;
    this.state.size = { x: 180, y: 69 }
  }
  update () {
	super.update()
	this.state.pos = { x: this.scope.entities[this.scope.ball].state.pos.x + 25 - (this.state.size.x / 2), y: (this.scope.state.height - this.state.size.y) }
  }
}

// what this does is , it loads all resources
// and later , it starts the game if all files were loaded

var media = new Loader()
media.load([
  './media/ball@3X.png',
  './media/paddle@3X.png',
  './media/block@3x.png'
], function () { window.game = new breakOut() })