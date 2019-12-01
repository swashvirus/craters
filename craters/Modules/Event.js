export class Event {
	constructor(this.target){
		this.events = {},
		this.empty = [];
		this.target = target || this
	};
	
	// On: listen event
	// callbacks will be triggered
	on(type, func, ctx){
		(this.events[type] = this.events[type] || []).push([func, ctx])
		return this.target
	};
	
	// Off: stop listening to event
	// specific callback
	off(type, func){
		type || (this.events = {})
		var list = this.events[type] || this.empty,
		i = list.length = func ? list.length : 0;
		while(i--) func == list[i][0] && list.splice(i,1)
		return this.target
	};
	
	// Emit: send event
	// callbacks will be triggered
	emit(type){
		var e = this.events[type] || this.empty, list = e.length > 0 ? e.slice(0, e.length) : e, i=0, j;
		while(j=list[i++]) j[0].apply(j[1], this.empty.slice.call(arguments, 1))
		return this.target
	};
}