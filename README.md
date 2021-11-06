# Craters
![npm bundle size](https://img.shields.io/bundlephobia/minzip/craters)
![es modules](https://img.shields.io/badge/es-modules-green)

![craters logo](https://swashvirus.github.io/craters/media/craters.gif)
[craters documentation](https://swashvirus.github.io/craters/docs/index.html)

#### Short description
A Compact html5 Game Engine that helps you build fast, modern HTML5 Games
* [Buggame sprite sample game](https://swashvirus.github.io/craters/examples/sprites-demo/index.html)
* [Panda Breakout sample game](https://swashvirus.github.io/craters/examples/breakout-game/index.html)
* [Tilemap sample game](https://swashvirus.github.io/craters/tests/tilemap.test/index.html)

#### Features ✨
#### Rigid Body Physics.

- QuadTrees Spatial Subdivision
	* Broadphase collision detection

- Separating Axis Theorem
	* Narrow phase collision detection

#### Tile Engine

- Sprite system
	* Renders animated images and solid color.

#### Additional features
- Emscript6 modules
	* Reduces your package size

#### Additional Modules
- Assets module
	* Loads images, Audio and json files.

- Input module
	* Captures keyboard input

- Sound module
	* Creates instances of audio files a fork of Soundbox.js

### Installation

- Clone git repository
```bash 
git clone https://github.com/swashvirus/craters.git
```
- Npm package
```bash
npm install craters
```

#### Let's make a game 🚀
example games are included in the examples and test directory

##### Writing an example "it's working" game.
```javascript
import {Game, Vector} from '../../craters/craters'
class mygame extends Game {
    constructor() {
        super({
	        fps: 60,
	        container: '#container',
	        size: new Vector(1024, 512)
        });
    }

    render() {
        super.render();
		// draw some text on the screen
        this.context.fillStyle = "#fff";
        this.context.font = '2em Arial'
        this.context.fillText('It\'s working.️', 65, (this.state.size.y / 2), (this.state.size.x))
    }
}
let game = new mygame();
```
Submit Issues, fixes and Contributions.
