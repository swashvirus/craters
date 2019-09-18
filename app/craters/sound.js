(function(window){ "use strict";

// modified soundbox.js lib
class sound {

	constructor () {
	
		this.sounds = {}; // The loaded sounds and their instances
		this.instances = []; // Sounds that are currently playing
		this.default_volume = 1;
	}
	
	load (sound_name, path, callback) {
		this.sounds[sound_name] = new Audio(path);
		if(typeof callback == "function")
			this.sounds[sound_name].addEventListener("canplaythrough", callback);
		else
			return new Promise((resolve, reject) => {
				this.sounds[sound_name].addEventListener("canplaythrough", resolve);
				this.sounds[sound_name].addEventListener("error", reject);
			});
	};
	
	remove (sound_name) {
		if(typeof this.sounds != "undefined")
			delete this.sounds[sound_name];
	};
	
	unlock ( sound_name, callback, volume , loop ) {
		var that = this;
		var events = ['touchstart', 'touchend', 'mousedown', 'keydown'];
		var unlock = function unlock() {
		events.forEach(function (event) {
			document.body.removeEventListener(event, unlock)
		});
			that.play( sound_name, callback, volume , loop );
		};
		
		events.forEach(function (event) {
			document.body.addEventListener(event, unlock, false)
		});
	}
	
	play ( sound_name, callback, volume , loop ) {
		loop = loop || false;
		
		if(typeof this.sounds[sound_name] == "undefined") {
			console.error("Can't find sound called '" + sound_name + "'.");
			return false;
		}
		
		var soundInstance = this.sounds[sound_name].cloneNode(true);
		soundInstance.volume = typeof volume === 'number' ? volume : this.default_volume;
		soundInstance.loop = loop;
		soundInstance.play();
		this.instances.push(soundInstance);
		
		// Don't forget to remove the instance from the instances array
		soundInstance.addEventListener("ended", () => {
			var index = this.instances.indexOf(soundInstance);
			if(index != -1) this.instances.splice(index, 1);
		});
		
		// Attach the callback / promise
		if(typeof callback == "function") {
			soundInstance.addEventListener("ended", callback);
			return true;
		}
		
		return new Promise((resolve, reject) => soundInstance.addEventListener("ended", resolve));
	};
	
	stop_all () {
		// Pause all currently playing sounds
		
		// Shallow clone the array to avoid issues with instances auto-removing themselves
		var instances_to_stop = this.instances.slice();
		for(var instance of instances_to_stop) {
			instance.pause();
			instance.dispatchEvent(new Event("ended"));
		}
	}
}

module.exports = sound

})(window);