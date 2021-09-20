export default class Broadphase {
    // 
    static collides(collider, collidee) {
        if (collider.collision.collides && collidee.collision.collides) {
            // TODO: 
            // additionally check group 
            return true;
        }
        return false;
    }
    
    static query(collidee, quad) {
	    let collideds = [];
	    let collided = quad.retrieve(collidee);
	    collided.forEach((item) => {collideds.push(item.item)})
	    return collideds;
    }
}