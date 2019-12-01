export default class Sprite {
	constructor(object, params) {
		this.size = {
			x: params.tilewidth,
			y: params.tileheight
		}
		
		this.frame;
		this.grid = [];
		this.image = params.image;
		this.object = object;
		this.style = params.style;
		this.fixture = object.fixture;
		this.position = object.state.position;
		params.frames = params.frames || [0];
		
		if(this.image instanceof Image) {
			
			for(let h = 0; h < this.image.height; h += this.size.y){
			for(let w = 0; w < this.image.width; w += this.size.x){
				this.grid.push({x: w, y: h})
				}
			}
		}
		this.animation = {frames: params.frames}
	}
	
	update() {
		this.frame = this.animation.frames.shift()
		this.animation.frames.push(this.frame)
	}
	
	render() {
	let object = this.object;
	let image = this.image;
	let context = object.context;
	context.fillStyle = this.style.fillStyle;
	context.lineWidth = this.style.lineWidth;
	context.strokeStyle = this.style.strokeStyle;
	context.lineJoin = 'miter';
	
	switch (object.fixture.type) {
		    case 'circle': {
				context.save();
				context.beginPath();
				context.ellipse(
			        object.state.position.x,
			        object.state.position.y,
			        object.fixture.r,
			        object.fixture.r,
			        0, 0,
			        Math.PI * 2
		        );
		        context.clip();
		        let frame = this.frame;
		        if(image instanceof Image) {
		        context.drawImage(this.image,
			        this.grid[frame].x, this.grid[frame].y, this.size.x, this.size.y,
			        object.state.position.x - object.fixture.r, object.state.position.y - object.fixture.r, this.size.x, this.size.y
		        )}
		        else {
			        context.fill();
			        context.stroke();
		        }
		        context.closePath();
		        context.restore();
		        break;
		    }
		    case 'polygon': {
			    context.save();
		        context.beginPath();
		        context.moveTo(object.state.position.x + object.fixture.points[0].x, object.state.position.y + object.fixture.points[0].y);
		        for (let i = 1; i < object.fixture.points.length; i++) {
			        let v = object.fixture.points[i];
			        context.lineTo(object.state.position.x + v.x, object.state.position.y + v.y);
		        };
		        context.lineTo(object.state.position.x + object.fixture.points[0].x, object.state.position.y + object.fixture.points[0].y);
		        context.clip();
		        let frame = this.frame;
		        if(image instanceof Image) {
			        context.drawImage(this.image,
			        this.grid[frame].x, this.grid[frame].y, this.size.x, this.size.y,
			        object.state.position.x, object.state.position.y, this.size.x, this.size.y
		        )}
		        else {
			        context.fill();
			        context.stroke();
		        }
		        context.closePath();
		        context.restore();
		        break;
		    }
		}
	}
}