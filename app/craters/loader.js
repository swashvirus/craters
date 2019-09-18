(function(window){ "use strict";
// TODO callback
	class loader {
		
		constructor () {
			this.resourceCache = {};
		}
		
		load(resource) {
			
			var that = this;
			if(resource instanceof Array) {
				resource.forEach(function(url) {
					that.fetch(url);
				});
			}
			
			else {
				that.fetch(resource);
			}
			
		}
		
		fetch(url) {
			var that = this;
			if(that.resourceCache[url]) {
				return that.resourceCache[url];
			}
			
			else {
				var img = new Image();
				img.src = url;
				that.resourceCache[url] = img;
			}
		}
	};
	
	module.exports = loader
	
})(window);