export class loadData {
	constructor() {
		this.resources = {}
	};
	
	load(resource, callback) {
	if (resource instanceof Array) {
		if(resource.length < 0) return this.ready(callback);
		resource.forEach((res) => {
			this.resources[res] = false;
			this.fetch(res, callback)
		})
	} else {
		this.resources[resource] = false
		this.fetch(resource, callback)
	}
	}
	
	fetch(path, callback) {
	if (this.resources[path]) {
		return this.resources[path]
		} else {
			fetch(path).then(response => {
			if (!response.ok) throw response;
			return response.clone().json().catch(() => response.text())
			}).then(response => {
			if (typeof response === 'object') {
				this.resources[path] = response;
				this.ready(callback)
			}});
		}
	}
	
	ready(callback) {
	if (typeof callback === 'function') {
	let ready = true
	for (let item in this.resources) {
		if (Object.prototype.hasOwnProperty.call(this.resources, item) && !this.resources[item]) {
			ready = false
		}
	}
		if (ready) callback()
	}
	}
}