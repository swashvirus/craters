(function(window){ "use strict";

	window.mole = class mole extends craters.entity {

		update (){ 
			// console.log('boj')
		}
		
		render (){
			var negpos = function(){ if (Math.random() > 0.5) return 1; return -1; }
			var zerpos = function(i){ if (Math.random() > 0.5) return i; return 0; }
			
			cg.context.fillText('🐰', zerpos(((w / 2) + ((w / 4) * negpos()))), zerpos(((h / 2) + ((h / 4) * negpos()))), (w));
		}
	}

})(window);