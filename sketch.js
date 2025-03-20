"use strict";

let faceMesh;
let options = { maxFaces: 1, refineLandmarks: true, flipped: true, runtime: "mediapipe"};
let faces = [];

let video;

function preload() {
  faceMesh = ml5.faceMesh(options);
}

function setup() {  
  const height = windowHeight;
  const width = height * (16/9);
  createCanvas(width, height);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  faceMesh.detectStart(video, gotFaces);
}

function draw() {
  const height = windowHeight;
  const width = height * (16/9);
  const heigthRatio = height / 480;
  const widthRatio = width / 640;

  push();
  scale(-1, 1);
  image(video, 0, 0, -width, height);
  pop();

  // Draw all the tracked face points
    for (let face of faces) {
      fill(0, 255, 0);
      noStroke();

      circle(face.leftIris.centerX * widthRatio, face.leftIris.centerY * heigthRatio, 15);
      circle(face.rightIris.centerX * widthRatio, face.rightIris.centerY * heigthRatio, 15);
    }
}

// Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
  console.log(faces);
}