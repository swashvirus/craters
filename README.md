# Craters.js ☄️
![](craters.gif)
[craters.js nodejs version️](https://github.com/swashvirus/node-craters.js)
#### Short escription
portability is the main goal of the framework
simple to use micro game framework lightweight and minimal weighing just 2kb zipped and minified includes all you need to get a game up and running in a few lines of code, a loop , update , render. which makes it simple to modify and hackable framework. leaving enough room for the game logic. suitable for [js13kgames](https://js13kgames.com) competition or anyone trying to build a game using a skeleton framework as opposed to complex alternatives
#### Let's Blast Off 🚀
note the example game is included in the dist folder alternatively you can build it on your own 
`sudo git clone https://github.com/swashvirus/craters.js.git`
`cd ./craters.js && webpack`
#### writing the demo game yourself
```javascript
"use strict";
/** Craters.js Demo Game
 *  This module contains the main game including entities
 *  everything was initiated in the craters.js 
 */
// load craters. js --- script tag works just good as well
require('./craters/craters.js');

class mygame extends craters.game {
	
	init () {
		super.init();
		// now init my game 
		window.that = this;
		window.w = this.constants.width,
		window.h = this.constants.hieght;
		that.state.entities.comet = new comet('f18');
	}
}

class comet extends craters.entity {
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

window.game = new mygame('#container', window.innerWidth, window.innerHeight, 60, true);

```