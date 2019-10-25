import {
    Game,
    Loop,
    Canvas,
    Entity,
    Maths
} from '../../index.js'
import * as SAT from 'sat-js'

class mygame extends Game {
    constructor(container, width, height) {
        super();

        this.state.size = {
            x: width,
            y: height
        }
        this.loop = new Loop(this, 60)

        this.viewport = new Canvas(this.state.size.x, this.state.size.y, container);
        this.context = this.viewport.context;
        this.viewport.style.background = "#eee";
        this.viewport.resize(this, {
            x: window.innerWidth,
            y: window.innerHeight
        })

        // add marbles
        for (var i = 0; i < 25; i++) {
            let id = this.addObject(new marble(this)) - 1
            this.entities[id].id = id;
        }

        /*this.screenshot = new record(document.querySelector('canvas'), 5000000)
        this.screenshot.done = false;
        this.screenshot.start();*/
    }

    render() {
        this.viewport.clear()
        super.render()


    }

    update() {
        super.update();

        /*if (((elapsed / 60) > 5) && !this.screenshot.done){
        this.screenshot.done = true;
        this.screenshot.stop();
        this.screenshot.save('screenplay');}*/
    }
}

class marble extends Entity {
    constructor(scope) {
        super()

        this.scope = scope;
        this.type = 'dynamic';

        this.shape = new SAT.Circle(new SAT.Vector((this.scope.state.size.x / 2), (this.scope.state.size.x / 2)), (Math.random() * 50) + 10);
        this.state.pos = this.shape.pos

        // this.state.gravity.y = 0.10;
        this.state.friction = {
            x: 0.005,
            y: 0.005
        }

        this.state.vel = {
            x: ((Math.random() - 0.5) * 100),
            y: ((Math.random()) * 100)
        }
    }

    update() {
        super.update();

        // X-axis collision
        if ((this.state.pos.x + this.shape.r > this.scope.state.size.x) || (this.state.pos.x < 0)) {
            this.state.vel.x *= 0
        }
        // Y-axis collision
        if ((this.state.pos.y + this.shape.r > this.scope.state.size.y) || (this.state.pos.y < 0)) {
            this.state.vel.y *= 0
        }

        for (var i = 0; i < this.scope.entities.length; i++) {
            if (this.scope.entities[i].id == this.id) continue;
            var response = new SAT.Response();
            var collided = SAT.testCircleCircle(this.shape, this.scope.entities[i].shape, response);
            if (collided) {
                response.overlapV.scale(0.5);
                this.state.pos.sub(response.overlapV);
                this.scope.entities[i].state.pos.add(response.overlapV);
                this.scope.context.fillStyle = 'red';
            }
        }

        this.state.pos.y = Maths.boundary((this.state.pos.y), (this.shape.r), (this.scope.state.size.y - (this.shape.r)))
    }

    render() {

        this.scope.context.beginPath();
        this.scope.context.arc((this.state.pos.x), (this.state.pos.y), (this.shape.r), 0, Math.PI * 2);
        this.scope.context.lineWidth = 1;

        this.scope.context.strokeStyle = '#000';
        this.scope.context.fillStyle = 'green';

        this.scope.context.fill();
        this.scope.context.stroke();
    }
}

// record.js - smusamashah
// To record canvas effitiently using MediaRecorder
// https://webrtc.github.io/samples/src/content/capture/canvas-record/

function record(canvas, video_bits_per_sec) {
    this.start = startRecording;
    this.stop = stopRecording;
    this.save = download;

    var recordedBlobs = [];
    var supportedType = null;
    var mediaRecorder = null;

    var stream = canvas.captureStream();
    if (typeof stream == undefined || !stream) {
        return;
    }

    const video = document.createElement('video');
    video.style.display = 'none';

    function startRecording() {
        var types = [
            "video/webm",
            'video/webm,codecs=vp9',
            'video/vp8',
            "video/webm\;codecs=vp8",
            "video/webm\;codecs=daala",
            "video/webm\;codecs=h264",
            "video/mpeg"
        ];

        for (var i in types) {
            if (MediaRecorder.isTypeSupported(types[i])) {
                supportedType = types[i];
                break;
            }
        }
        if (supportedType == null) {
            console.log("No supported type found for MediaRecorder");
        }
        var options = {
            mimeType: supportedType,
            videoBitsPerSecond: video_bits_per_sec || 2500000 // 2.5Mbps
        };

        recordedBlobs = [];
        try {
            mediaRecorder = new MediaRecorder(stream, options);
        } catch (e) {
            alert('MediaRecorder is not supported by this browser.');
            console.error('Exception while creating MediaRecorder:', e);
            return;
        }

        console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
        mediaRecorder.onstop = handleStop;
        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorder.start(100); // collect 100ms of data blobs
        console.log('MediaRecorder started', mediaRecorder);
    }

    function handleDataAvailable(event) {
        if (event.data && event.data.size > 0) {
            recordedBlobs.push(event.data);
        }
    }

    function handleStop(event) {
        console.log('Recorder stopped: ', event);
        const superBuffer = new Blob(recordedBlobs, {
            type: supportedType
        });
        video.src = window.URL.createObjectURL(superBuffer);
    }

    function stopRecording() {
        mediaRecorder.stop();
        console.log('Recorded Blobs: ', recordedBlobs);
        video.controls = true;
    }

    function download(file_name) {
        const name = file_name || 'recording.webm';
        const blob = new Blob(recordedBlobs, {
            type: supportedType
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
    }
}

let game = new mygame('#container', 1024, 512)