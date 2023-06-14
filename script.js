noseX = 0;
noseY = 0;

function preload(){
    mustache_pic = loadImage('mustache.png');
}
let video;
let poseNet;
let poses;

function setup() {
    canvas = createCanvas(400, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400,300);
    video.hide(); 
    webcam = video;

    poseNet = ml5.poseNet(video, modelLoaded());
    poseNet.on('pose', function(results) {
        poses = results;
        if (poses.length > 0) {
            console.log(poses);
            console.log('nose X = ' + poses[0].pose.nose.x);
            console.log('nose Y = ' + poses[0].pose.nose.y);
            noseX = results[0].pose.nose.x -50;
            noseY = results[0].pose.nose.y +20;
        }
    })
}

function modelLoaded() {
    console.log('PoseNet is Loaded')
}

function draw() {
    image(webcam, 0, 0, 400, 300);
    image(mustache_pic, noseX, noseY, 100, 20);
}

function take_snapshot() {
    save("Mustache_Photo.png");
}