import SAT from '../Geometry/SAT.js'

export default class Narrowphase {
    static overlap(collider, collidee) {
        return true;
    }
    
    static query(collidee, colliders) {
	    let collided = [];
	    
	    colliders.forEach((collider) => {
		    if(this.overlap(collider, collidee))
		    collided.push(collider)
	    })
	    
	    return collided;
    }
}