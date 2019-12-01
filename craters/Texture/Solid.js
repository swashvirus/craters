export default class Solid {
	constructor(body, params) {
		this.body = body;
		this.style = params.style;
		this.fixture = body.fixture;
		this.position = body.state.position;
	}
	
	update(){
	
	}
	
	render() {
	let body = this.body;
	let context = body.context;
	context.fillStyle = this.style.fillStyle;
	context.lineWidth = this.style.lineWidth;
	context.strokeStyle = this.style.strokeStyle;
	context.lineJoin = 'miter';
	
	switch (body.fixture.type) {
		    case 'circle': {
				context.beginPath();
				context.ellipse(
			        body.state.position.x,
			        body.state.position.y,
			        body.fixture.r,
			        body.fixture.r,
			        0, 0,
			        Math.PI * 2
		        );
		        context.closePath();
		        context.stroke();
		        context.fill();
		        break;
		    }
		    case 'polygon': {
		        context.beginPath();
		        // console.log(JSON.stringify(body.fixture.points))
		        context.moveTo(body.state.position.x + body.fixture.points[0].x, body.state.position.y + body.fixture.points[0].y);
		        for (let i = 1; i < body.fixture.points.length; i++) {
			        let v = body.fixture.points[i];
			        context.lineTo(body.state.position.x + v.x, body.state.position.y + v.y);
		        };
		        context.lineTo(body.state.position.x + body.fixture.points[0].x, body.state.position.y + body.fixture.points[0].y);
		        context.fill();
		        context.stroke();
		        break;
		    }
		}
	}
}