import * as cg from '../../index.js'
import * as chai from 'chai'
const expect = chai.expect

let test = function(text, status){
	console.info(text +": "+ ((status) ? "pass":"fail"))
}

test("cg global", expect(cg).to.exist);
class mygame extends cg.Game {
	constructor (container, width, height){
		super ();
		
		this.state.size = {x: width, y: height}
		test("width", expect(this.state.size.x).to.equal(width));
		test("height", expect(this.state.size.y).to.equal(height));
		this.loop = new cg.Loop(this, 1)
		
		this.viewport = new cg.Canvas(this.state.size.x, this.state.size.y, container);
		this.context = this.viewport.context;
		this.viewport.style.background = "#eee";
		this.viewport.resize(this, {x: window.innerWidth, y: window.innerHeight})
	}
	
	update(elapsed, fps) {
		console.log('tick ' + elapsed + ' at:' + fps + ' fps')
	}
	
	render () {
	    super.render()
	    this.viewport.clear()
	    
	    this.context.fillStyle = "#fff";
	    this.context.font = '2em Arial'
	    this.context.fillText('It\'s working.️', 65, (this.state.size.y / 2), (this.state.size.x))
	}
}

let game = new mygame('#container', 1024, 512)