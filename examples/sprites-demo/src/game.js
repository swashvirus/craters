"use strict";

var media = new craters.loader;
	media.load([
	'./src/media/bug.png',
	'./src/media/bolt.png'
]);

class mygame extends craters.game {
	
	intitiate () {
	
		super.intitiate();
		
		this.score = '0000';
		this.constants.color = 'rgba(255,255,255,1)';
		this.constants.bgcolor = 'rgba(0,0,0,0.001)';
		this.constants.font = '1.5em Arial';
		
		for (var i = 0; i < 5; i++){
			this.state.entities.push( new boltbug(this, {pos: {x: (Math.random() * this.constants.width), y: (Math.random() * this.constants.height)}}));
		}
		
		this.state.entities.push( new ladybug(this, 'f18') );
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
		this.state.pos = {x: (scope.constants.width / 2) - (this.state.size.x / 2), y: (scope.constants.height - this.state.size.y)}
				
		scope.state.entities.push(new craters.sprite(scope, {pos: this.state.pos, size: this.state.size, frames: [0, 1, 2], image: media.fetch('./src/media/bug.png')}))
	}
}

class boltbug extends craters.entity {
	constructor (scope, args) {
		super();
		
		this.state.pos = args.pos;
		this.state.angle = (Math.random() * 360);
		
		scope.state.entities.push(new craters.sprite(scope, {size: {x: 214, y: 282}, pos: this.state.pos , frames: [0, 1, 2], image: media.fetch('./src/media/bolt.png'), angle: this.state.angle}))
	}
}

window.game = new mygame('#container', window.innerWidth, window.innerHeight, 60, false);