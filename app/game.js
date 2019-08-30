"use strict";
/** Craters.js Demo Game
 *  This module contains the main game including entities
 *  everything was initiated in the craters.js 
 */
var cg = require('./craters/craters.js');
class mygame extends cg.game {
	init (){
	super.init();
	// now init my game 
	var that = this;
	var w = this.constants.width,
		h = this.constants.hieght;
		
	class comet extends cg.entity {
		// comment */
		constructor (name) {
			super();
			
			this.name = name;
		}
		
		update (){
			// update the comet's shaking moves ,
			this.state.position.x += (Math.random() - 0.5);
			this.state.position.y += (Math.random() - 0.5);
			// 'DOS' console.log(this.name + ' ' + this.type + ' state:' + JSON.stringify(this.state));
		}
		// comment
		render (){
			// draw the entities ,
			that.context.save();
			that.context.font = '64px Impact';
			that.context.fillText('☄️', (10 + this.state.position.x) , ((w / 2) + this.state.position.x), (w));
			// comment
			that.context.font = '32px Impact';
			that.context.fillText('It\'s working.️', 65, (w / 2), (w));
			that.context.restore();
		}
	}
		
	that.state.entities.comet = new comet('f18');
	
	}
}

var game = new mygame('#container', window.innerWidth, window.innerHeight, 60, true);