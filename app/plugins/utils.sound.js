
/**
 * SoundBox
 * By Starbeamrainbowlabs
 * License: MIT License
 * A super simple JS library for playing sound effects and other audio.
 *
 * Note to self: When making a release, remember to update the version number at the bottom of the file!
 */
// "use strict";

var sound = function () {
	
	this.sounds = {}; // The loaded sounds and their instances
	this.instances = []; // Sounds that are currently playing
	this.default_volume = 1;
	
	this.load = function (sound_name, path, callback) {
		this.sounds[sound_name] = new Audio(path);
		if(typeof callback == "function")
			this.sounds[sound_name].addEventListener("canplaythrough", callback);
		else
			return new Promise((resolve, reject) => {
				this.sounds[sound_name].addEventListener("canplaythrough", resolve);
				this.sounds[sound_name].addEventListener("error", reject);
			});
	};
	
	this.remove = function (sound_name) {
		if(typeof this.sounds != "undefined")
			delete this.sounds[sound_name];
	};
	
	this.play = function (sound_name, callback, volume , loop ) {
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
	
	this.stop_all = function () {
		// Pause all currently playing sounds
		
		// Shallow clone the array to avoid issues with instances auto-removing themselves
		var instances_to_stop = this.instances.slice();
		for(var instance of instances_to_stop) {
			instance.pause();
			instance.dispatchEvent(new Event("ended"));
		}
	}
	
	return this;
}

module.exports = sound 