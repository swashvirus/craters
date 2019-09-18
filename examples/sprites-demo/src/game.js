"use strict";

var media = new craters.loader;
media.load(['./src/media/bug.png', './src/media/bolt.png', './src/media/bg.png', './src/media/bullet.png']);

class mygame extends craters.game {
	
	intitiate () {
		super.intitiate();
		
		this.score = '0000';
		// now intitiate my game
		// deploy a new ladybug into the world
		this.constants.bgcolor = 'rgba(0,0,0,0)';
		this.constants.fillcolor = 'rgba(255,255,255,1)';
		this.constants.font = '1.5em Arial';
		
		for (var i = 0; i < 5; i++){
			
			this.state.entities.push( new boltbug(this, {pos: {x: (Math.random() * this.constants.width), y: (Math.random() * this.constants.height)}}));
		}
		
		this.state.entities.push( new ladybug(this, 'f18') );
	}
	
	update () {
	
		super.update(this)
	}
	
	render () {
		super.render(this)
		
			this.context.fillText('score: ' + this.score, (16), (50));
	}
}

class ladybug extends craters.entity {
	// extend the entity class
	constructor (scope, name) {
		super();
		
		this.state.size = {x:196, y:218};
		this.sprite.frames = [0, 1, 2];
		this.sprite.image = media.fetch('./src/media/bug.png');
		
		this.scope = scope;
		this.type = 'kinematic';
		this.name = name;
		this.state.pos = {x: (this.scope.constants.width / 2) - (this.state.size.x / 2), y: (this.scope.constants.height - this.state.size.y)}
		var that = this;
		window.joystick = new virtualJoystick({
			strokeStyle: 'rgba(0,0,0, 0)',
			mouseSupport: true
		});
	}
	
	// executed per frame rate updates the entity
	update () {
	
		super.update ();
		var that = this;
		
		var dy = window.joystick.deltaY();
		var dx = window.joystick.deltaX();
		
		if( ( window.joystick.left() ||  window.joystick.right() ||  window.joystick.up() ||  window.joystick.down()) && (dy && dx) !==0 ) {
			
			that.state.angle = Math.atan2(dy, dx) / (Math.PI / 180);
			// console.log(that.state.angle);
		}
	}
	
	// draws the entity on the canvas
	render () {
		super.render();
	}
}

class boltbug extends craters.entity {
	
	constructor (scope, opt) {
	super();
		
		this.state.pos = {x:opt.pos.x, y:opt.pos.y};
		this.state.size = {x: 214, y: 282};
		this.sprite.frames = [0, 1, 2];
		this.sprite.image = media.fetch('./src/media/bolt.png');
		
		this.state.angle = (Math.random() * 360);
		
		this.scope = scope;
		this.type = 'kinematic';
		this.name = name;
	}
}

class bullet extends craters.entity {
	
	constructor (scope, opt) {
	super();
		
		this.scope = scope;
		this.state.size = {x: 38, y: 38};
		this.sprite.frames = [0];
		this.sprite.image = media.fetch( './src/media/bullet.png' );
		
		this.state.angle = opt.angle;
		this.state.accel.y = 10;
		this.state.pos = {x:opt.pos.x, y:opt.pos.y};
		
		this.type = 'kinematic';
	}
}

window.game = new mygame('#container', window.innerWidth, window.innerHeight, 60, false);