import * as cg from '../../index.js'

class mygame extends cg.Game {
    constructor(container, width, height) {
        super();

        this.state.size = {
            x: width,
            y: height
        }
        this.loop = new cg.Loop(this, 60)

        this.viewport = new cg.Canvas(this.state.size.x, this.state.size.y, container);
        this.context = this.viewport.context;
        this.viewport.style.background = "#eee";
        this.viewport.resize(this, {
            x: window.innerWidth,
            y: window.innerHeight
        })

        this.Tilemap = new Tilemap(this, {
            image: media.fetch('./tilemap.png'),
            map: {
                "t": 32,
                "w": 32,
                "h": 32,
                "z": 1,
                "m": [
                    [0, 14, 2],
                    [1, 14, 2],
                    [2, 14, 2],
                    [3, 14, 2],
                    [4, 14, 2],
                    [5, 14, 2],
                    [6, 14, 2],
                    [7, 14, 2],
                    [14, 14, 2],
                    [15, 14, 2],
                    [16, 14, 2],
                    [17, 14, 2],
                    [18, 14, 2],
                    [33, 14, 2],
                    [34, 14, 2],
                    [35, 14, 2],
                    [36, 14, 2],
                    [37, 14, 2],
                    [38, 14, 2],
                    [39, 14, 2],
                    [39, 13, 2],
                    [38, 13, 2],
                    [37, 13, 2],
                    [36, 13, 2],
                    [35, 13, 2],
                    [34, 13, 2],
                    [32, 14, 2],
                    [31, 14, 2],
                    [30, 14, 2],
                    [29, 14, 2],
                    [28, 14, 2],
                    [27, 14, 2],
                    [26, 14, 2],
                    [25, 14, 2],
                    [24, 14, 2],
                    [23, 14, 2],
                    [22, 14, 2],
                    [21, 14, 2],
                    [20, 14, 2],
                    [19, 14, 2],
                    [19, 13, 2],
                    [18, 13, 2],
                    [17, 13, 2],
                    [16, 13, 2],
                    [15, 13, 2],
                    [14, 13, 2],
                    [20, 13, 2],
                    [21, 13, 2],
                    [22, 13, 2],
                    [23, 13, 2],
                    [24, 13, 2],
                    [25, 13, 2],
                    [26, 13, 2],
                    [27, 13, 2],
                    [28, 13, 2],
                    [29, 13, 2],
                    [30, 13, 2],
                    [31, 13, 2],
                    [32, 13, 2],
                    [33, 13, 2],
                    [7, 13, 2],
                    [6, 13, 2],
                    [5, 13, 2],
                    [4, 13, 2],
                    [3, 13, 2],
                    [2, 13, 2],
                    [1, 13, 2],
                    [0, 13, 2],
                    [8, 13, 2],
                    [8, 14, 2],
                    [9, 14, 2],
                    [9, 13, 2],
                    [16, 10, 10],
                    [17, 10, 11],
                    [16, 11, 26],
                    [16, 12, 26],
                    [17, 11, 27],
                    [17, 12, 27],
                    [4, 9, 4],
                    [7, 9, 4],
                    [34, 6, 12],
                    [34, 7, 28],
                    [34, 8, 28],
                    [34, 9, 28],
                    [34, 10, 28],
                    [34, 11, 28],
                    [34, 12, 28],
                    [37, 12, 30],
                    [36, 11, 16],
                    [36, 12, 16],
                    [38, 11, 16],
                    [38, 12, 16],
                    [37, 11, 14],
                    [36, 10, 13],
                    [38, 10, 13],
                    [37, 10, 15],
                    [37, 9, 16],
                    [37, 8, 13],
                    [1, 12, 17],
                    [2, 12, 18],
                    [3, 12, 19],
                    [21, 12, 23],
                    [22, 11, 23],
                    [23, 10, 23],
                    [24, 11, 24],
                    [25, 10, 25],
                    [26, 11, 25],
                    [27, 12, 25],
                    [24, 9, 9],
                    [24, 10, 8],
                    [23, 11, 8],
                    [22, 12, 8],
                    [23, 12, 8],
                    [24, 12, 8],
                    [25, 12, 8],
                    [25, 11, 8],
                    [26, 12, 8],
                    [29, 12, 1],
                    [30, 12, 1],
                    [30, 11, 1],
                    [31, 12, 1],
                    [31, 11, 1],
                    [31, 10, 1],
                    [32, 12, 1],
                    [32, 11, 1],
                    [32, 10, 1],
                    [32, 9, 1],
                    [19, 4, 20],
                    [20, 4, 21],
                    [21, 4, 21],
                    [22, 4, 21],
                    [23, 4, 22],
                    [19, 3, 5],
                    [20, 3, 6],
                    [21, 3, 6],
                    [22, 3, 6],
                    [23, 3, 7]
                ],
                "M": []
            }
        })
        for (var i = 0; i < 25; i++) {
            this.addObject(new ball(this))
        }
    }

    render() {
        this.viewport.clear()
        super.render()
    }
}

class ball extends cg.Sprite {
    constructor(scope) {
        super(scope, {
            frames: [12],
            image: media.fetch('./tilemap.png')
        })
        this.scope = scope;
        this.state.gravity.y = 0.5;
        this.state.friction = {
            x: 0.005,
            y: 0.005
        }
        this.state.vel = {
            x: ((Math.random() - 0.5) * 5),
            y: ((Math.random() - 0.5) * 5)
        } // initiatal velocity
        this.state.size = {
            x: 32,
            y: 32
        } // dimensions
        this.state.pos = {
            x: (scope.state.size.x / 2) - (this.state.size.x / 2),
            y: (scope.state.size.y / 2 - this.state.size.y)
        } // initial position
    }

    update() {
        super.update();

        // X-axis collision
        if ((this.state.pos.x + this.state.size.x > this.scope.state.size.x) || (this.state.pos.x < 0)) {
            this.state.vel.x *= -1
        }
        // Y-axis collision
        if ((this.state.pos.y + this.state.size.y > this.scope.state.size.y) || (this.state.pos.y < 0)) {
            this.state.vel.y *= -1
        }

        this.state.pos.y = cg.Maths.boundary((this.state.pos.y), (this.state.size.y), (this.scope.state.size.y - (this.state.size.y)))
    }

    render() {
        super.render();
        // this.scope.viewport.camera((this.state.pos.x - this.scope.state.size.x / 3), (this.state.pos.y - this.scope.state.size.y / 3))
    }
}

class Tilemap {
    constructor(scope, data) {
        this.scope = scope;
        this.map = data.map || {};
        this.image = data.image || new Image();

        class cell extends cg.Sprite {
            constructor(scope, args) {
                super(scope, {
                    frames: args.frames
                })

                this.scope = scope;
                this.state.image = args.image
                this.state.size = args.size;
                this.state.pos = args.pos;
            }
        }

        this.map.m.forEach((tile) => {
            console.log(tile[0] * this.map.w + " " + tile[1] * this.map.h + " " + tile[2])
            this.scope.entities.push(new cell(this.scope, {
                image: this.image,
                pos: {
                    x: tile[0] * this.map.w,
                    y: tile[1] * this.map.h
                },
                frames: [tile[2]],
                size: {
                    x: this.map.w,
                    y: this.map.h
                }
            }));
        })
    }
}

var media = new cg.Loader()
media.load([
    './tilemap.png'
], function() {
    let game = new mygame('#container', 1024, 512)
});