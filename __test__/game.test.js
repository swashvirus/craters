import * as cg from '../index.js'
import * as chai from 'chai'
const expect = chai.expect

let test = function(text, status){
	console.info(text +": "+ ((status) ? "pass":"fail"))
}

expect(cg).to.exist;
class mygame extends cg.Game {
	constructor (container, width, height){
		super ();
		
		this.state.size = {x: width, y: height}
		test("width", expect(this.state.size.x).to.equal(width));
		test("height", expect(this.state.size.y).to.equal(height));
		this.loop = new cg.Loop(this, 1)
	}
	
	update(elapsed, fps) {
		console.log('tick ' + elapsed + ' at:' + fps + ' fps')
	}
}

let game = new mygame('node', 1024, 512)