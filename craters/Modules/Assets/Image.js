export class loadImage {
	constructor() {
		this.instances = {}
	};
	
	load(resource, callback) {
		if (resource instanceof Array) {
			if(resource.length < 0) return this.ready(callback);
			resource.forEach((i) => {
				this.instances[i] = false
				this.fetch(i, callback)
			})
		} else {
			this.instances[resource] = false
			this.fetch(resource, callback)
		}
	}
	
	fetch(path, callback) {
		if (this.instances[path]) {
		return this.instances[path]
		} else {
			let img = new Image()
			img.onload = () => {
				this.instances[path] = img
				this.ready(callback)
			}
			img.src = path;
		}
	}
	
	ready(callback) {
		if (typeof callback === 'function') {
		let ready = true;
		for (let item in this.instances) {
			if (Object.prototype.hasOwnProperty.call(this.instances, item) && !this.instances[item]) {
				ready = false;
			}
		}
		
		if (ready) callback();
		}
	}
}