"use strict";
// load craters.js
// script tag works just good as well

require('./craters/craters.js');

class mygame extends craters.container {
	
	intitiate () {
		super.intitiate();
		// now intitiate my game
		// deploy a new comet into the world
		this.state.entities.push( new comet(this, 'f18') );
	}
}

class comet extends craters.entity {
	// extend the entity class
	constructor (scope, name) {
		super();
		this.scope = scope;
		this.type = 'kinematic';
		this.name = name;
		this.state.pos = {x: 0, y: (this.scope.constants.height / 2)}
	}
	
	// executed per frame rate updates the entity
	update (){
		// update the comet's shaking moves ,
		this.state.pos.x += (Math.random() - 0.5);
		this.state.pos.y += (Math.random() - 0.5);
		// 'DOS' console.log(this.name + ' ' + this.type + ' state:' + JSON.stringify(this.state));
	}
	
	// draws the entity on the canvas
	render (){
		this.scope.context.save();
		this.scope.context.font = '64px Arial';
		this.scope.context.fillText('☄️', (10 + this.state.pos.x) , (this.state.pos.y), (this.scope.constants.width));
		
		this.scope.context.font = '32px Arial';
		this.scope.context.fillText('It\'s working.️', 65, (this.scope.constants.height / 2), (this.scope.constants.width));
		this.scope.context.restore();
	}
}

window.game = new mygame('#container', window.innerWidth, window.innerHeight, 60, true);