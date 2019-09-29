'use strict';
// import what we needed for the game 
import { Game, Sprite, Canvas, Loop, Collision, Loader, Sound } from './../../app/craters/craters.js'
var media = new Loader(); // well use this for loading media
var audio = new Sound();
// derive our game from craters Game
class mygame extends Game {
	constructor (container, width, height){
		super ();
		// define some constants we'll need this later in the game
		this.score = 0; // initial score
		this.state.size = {x: width, y: height} // game dimensions width and height
		this.state.pos = {x: 0, y: 0} // we'll use this to let the collider have an idea of the position of the game
		this.deleted = [];
		this.viewport = new Canvas(this.state.size.x, this.state.size.y, container); // this.viewport is a canvas element used to display our game
		this.context = this.viewport.getContext('2d') // get the context of the canvas // to be used for the actual drawings
		this.context.fillStyle = "#fff"; // white font
		this.loop = new Loop(this, 60) // define the frame rate at which the game will be updated and rendered
		this.ball = (this.entities.push(new ball(this)) - 1); // save the index of the ball
		this.paddle = (this.entities.push(new paddle(this)) - 1); // save the index of the paddle
		this.bamboos = 0;
	}
	update () {
		if (this.bamboos <= 0) this.newgame(((this.state.size.y / 2) / 53), ((this.state.size.x) / 138)) // no bamboo , add some
		
		super.update ();
	}
	// the main rendering function of the game 
    render () {
        this.clearContext(this.context, this.state.size) // clear the game context
        // write the score board top left corner
        this.context.font = '2em Arial'
        this.context.fillText('SCORE: ️'+ this.score, (16), (50), (this.state.size.x))
        
        super.render() // render all the game entities
    }
    
    // this function respawns bamboos
    newgame (rows, cols) {
		// row by col add bamboo
		for(var row = 0; row < rows; row++){
		    for(var col = 0; col < cols; col++){
			   var index = (this.entities.push(new bamboo(this,{x: (138 * col), y: (53 * row)}))-1)
			   this.entities[index].id = index
			   this.bamboos++
		    }
	    }
    }
}

class ball extends Sprite {
  constructor (scope) {
    super(scope, {frames: [0], image: media.fetch('./media/ball@3x.png')})
	
	this.scope = scope;
	this.state.vel = {x: 5, y: -2}
    this.state.size = { x: 48, y: 48 }
    this.state.pos = { x: (scope.state.size.x / 2) - (this.state.size.x / 2), y: (scope.state.size.y / 2 - this.state.size.y) }
  }
  update () {
	  super.update ();
	  
	  if((this.state.pos.x + this.state.size.x > this.scope.state.size.x) || (this.state.pos.x < 0)){
		  this.state.vel.x *= -1
	  }
	  if((this.state.pos.y + this.state.size.y > this.scope.state.size.y) || (this.state.pos.y < 0)){
		  this.state.vel.y *= -1
	  }
	  
	  if(Collision.detect(this.scope.entities[this.scope.paddle], this)){
		  this.state.vel.y *= -1
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
	if(this.state.collided) return;
	if(Collision.detect(this.scope.entities[this.scope.ball], this)){
		this.scope.score+=10;
		this.scope.bamboos--
		audio.play('pop')
		var id = this.id;
		this.scope.entities = this.scope.entities.filter(function(i){ return i.id!=id})
	}
  }
}

class particle extends Sprite {
  constructor (scope, pos) {
    super(scope, {frames: [0]})
    this.scope = scope;
    this.state.image = media.fetch('./media/block_break01@3x.png')
    this.state.size = {x:45, y:35}
    this.state.pos = pos;
    this.state.accel.y = (Math.random()) * 1.25;
    this.state.accel.x = (Math.random() - 0.5) * 1.25;
  }
}

class paddle extends Sprite {
  constructor (scope) {
    super(scope, {frames: [0], image: media.fetch('./media/paddle@3x.png')})
    this.scope = scope;
    this.state.size = { x: 180, y: 69 }
  }
  update () {
	super.update()
	this.state.pos = { x: this.scope.entities[this.scope.ball].state.pos.x + 25 - (this.state.size.x / 2), y: (this.scope.state.size.y - this.state.size.y) }
  }
}

var popSfx = audio.load('pop','./media/music/pop.ogg')
media.load([
  './media/ball@3x.png',
  './media/paddle@3x.png',
  './media/block@3x.png',
  './media/block_break01@3x.png'
], function () { 
	window.game = new mygame('#container', window.innerWidth, window.innerHeight, 60, true) 
});