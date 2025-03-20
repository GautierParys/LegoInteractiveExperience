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
  // scale(-1, 0);
  image(video, 0, 0, width, height);

  // Draw all the tracked face points
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];

    for (let j = 0; j < face.keypoints.length; j++) {
      let keypoint = face.keypoints[j];
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 5);
    }
  }
}

// Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
}