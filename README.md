# Craters.js
![npm bundle size](https://img.shields.io/bundlephobia/minzip/craters.js)
![es modules](https://img.shields.io/badge/es-modules-green)

![craters.js logo](https://swashvirus.github.io/craters.js/craters.gif)
[craters.js documentation](https://swashvirus.github.io/documentation-craters.js/)

#### Short description
A Compact html5 Game Engine that helps you build fast, modern HTML5 Games
* [Buggame sprite sample game](https://swashvirus.github.io/craters.js/examples/sprites-demo/index.html)
* [Panda Breakout sample game](https://swashvirus.github.io/craters.js/examples/breakout-game/index.html)

#### Features ✨
- The Changelog outlines more features [Read changelog](CHANGELOG.md)
- ES modules
	* reduces bundle size you only import what you need
- Sound
	* a sound system used for loading and playing audio files
	
- Sprite
	* a sprite system it draws and animates images as sprites

- Loader
	* a file loading utility used for pre-loading image files and caching them so that they can be used by i.e the sprite system

- Entity
	* a base class for deriving your game entities from, with update and render methods as well as the state object with predefined variables properties velocity, acceleration, position and size

- Game
	* a base class for deriving your games from it has a state object just like the entity it also has methods update and render.
- Input 
	* a helper for input ie keyboard
#### Structure
game is a method used to create an instance of game world
the game and entities both have methods update and render

#### Let's make a game 🚀
more example games included in the examples and test folder alternatively you can build the games on your own using webpack
### installation
#### Clone repository
```bash 
git clone https://github.com/swashvirus/craters.js.git
# import app/craters/craters.js
```
#### Npm install
```bash
npm install craters.js
```
#### Global object
```bash
Craters is the global Object used in the iife build
```
##### Writing the demo game yourself
```javascript
'use strict';
import { Game, Canvas, Loop } from './craters/craters.js'

class mygame extends Game {
	constructor (container, width, height){
		super ();
		
		this.state.size = {x: width, y: height}
		this.viewport = new Canvas(this.state.size.x, this.state.size.y, container);
		this.context = this.viewport.context
		this.loop = new Loop(this, 60)
	}
	
    render () {
        this.viewport.clear()
        super.render()
        
        this.context.font = '2em Arial'
        this.context.fillText('It\'s working.️', 65, (this.state.size.y / 2), (this.state.size.x))
    }
}

window.game = new mygame('#container', window.innerWidth, window.innerHeight, 60, true)
```
Submit Issues, fixes and Contributions `PR`