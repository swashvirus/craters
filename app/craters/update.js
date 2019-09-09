(function(window){ "use strict";

var update = class update {

	constructor ( scope ) {
		return this.update(scope);
	}
	
	update (scope) {
	    return function update( tFrame ) {
	        var state = scope.state || [];
            var entities = state.entities;
			for (var entity = 0; entity < entities.length; entity++) {
                // Fire off each active entities `render` method
                entities[entity].update();
            }
	
	        return state;
	    }
	}
}

module.exports = update

})(window);