# Craters.js ☄️
![](final.gif)
[craters.js nodejs version️](https://github.com/swashvirus/node-craters.js)
#### Short escription 
simple to use micro framework lightweight and minimal weighing just 2kb zipped and minified includes all you need to get a game up and running in a few lines of code, a loop , update , render. which makes it simple to modify and hackable framework. leaving enough room for the game logic. suitable for [js13kgames](https://js13kgames.com) competition or anyone trying to build a game using a skeleton framework as opposed to complex alternatives
#### Blast Off 🚀
an example illustration is included in the dist folder alternatively you can build it on your own 
`sudo git clone https://github.com/swashvirus/craters.js.git`
`cd ./craters.js && webpack`
#### writing the demo game yourself
```javascript
// load craters.js here
var game = require('./app/core/craters.js');
var cg = new game('#container', window.innerWidth, window.innerHeight, 60, true);
// --- fixed in next commit -- define entities obj
cg.state.entities = cg.state.entities || {}

var w = cg.constants.width,
	h = cg.constants.hieght;
// let's define our hero , comet
var comet = function(name){
	// few constants
	this.name = name;
	this.type = 'lunar';
	this.state = {
		position: {x:0, y:0}
	}
	// on update this is executed ,
	this.update = function (){
		// update the comet's shaking moves ,
		this.state.position.x += (Math.random() - 0.5);
		this.state.position.y += (Math.random() - 0.5);
		// 'DOS' console.log(this.name + ' ' + this.type + ' state:' + JSON.stringify(this.state));
	}
	// rendering done at framerate
	this.render = function (){
		// draw the entities ,
		cg.context.save();
		cg.context.font = '64px Impact';
		cg.context.fillText('☄️', (10 + this.state.position.x) , ((w / 2) + this.state.position.x), (w));
		// comment
		cg.context.font = '32px Impact';
		cg.context.fillText('It\'s working.️', 65, (w / 2), (w));
		cg.context.restore();
	}
}

// add an instance of a comet into the game  
cg.state.entities.comet = new comet('f18');
```