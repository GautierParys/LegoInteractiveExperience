"use strict";

// Class représentant les découpes de papiers pour les images
class paperCut {
  constructor(vertexNb) {
    this.vertex = vertexNb;
  }
}
  //Options de ces découpes
let paperCutOptions = {
  maxVertex: 8
}

// Définition des variables nécessaires à la détection de visage
let faceMesh;
let options = { maxFaces: 1, refineLandmarks: true, flipped: true, runtime: "mediapipe"};
let faces = [];

let video;

// Définition d'une image pour l'oeil droit
let img;

function preload() {
  //Prelaod du modèle de détection de visage
  faceMesh = ml5.faceMesh(options);
  
  //Preload de l'image pour l'oeil droit
  img = loadImage("assets/images/VanGogh-Eye.jpg");
}

function setup() {  
  const height = windowHeight;
  const width = height * (16/9);
  createCanvas(width, height);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  faceMesh.detectStart(video, gotFaces);

  frameRate(10);
  noStroke();
}

function draw() {
  const height = windowHeight;
  const width = height * (16/9);
  const heigthRatio = height / 480;
  const widthRatio = width / 640;

  background(255);



    // Dessiner des points verts sur l'iris
    for (let face of faces) {
      let eyeCenterR = createVector(face.leftEye.centerX * widthRatio, face.leftEye.centerY * heigthRatio);
      let eyeCenterL = createVector(face.rightEye.centerX * widthRatio, face.rightEye.centerY * heigthRatio);
      let irisCenterR = createVector(face.leftIris.centerX * widthRatio, face.leftIris.centerY * heigthRatio);
      let irisCenterL = createVector(face.rightIris.centerX * widthRatio, face.rightIris.centerY * heigthRatio);

      // Oeil droit
      push();
        beginClip();
          beginShape();
            XXXX
          endShape(CLOSE);
        endClip();

        // scale(0.1, 0.1);
        image();
      pop();

      // Oeil gauche
        fill(255, 0, 0);
        beginShape();
          vertex(eyeCenterL.x - 50, eyeCenterL.y);
          bezierVertex(eyeCenterL.x - 25, eyeCenterL.y - 25, eyeCenterL.x + 25, eyeCenterL.y - 25, eyeCenterL.x + 50, eyeCenterL.y);
          bezierVertex(eyeCenterL.x + 25, eyeCenterL.y + 25, eyeCenterL.x - 25, eyeCenterL.y + 25, eyeCenterL.x - 50, eyeCenterL.y);
        endShape(CLOSE);
        fill(0, 255, 0);
        circle(irisCenterL.x, irisCenterL.y, 25);

      // circle(irisCenterR.x, irisCenterR.y, 15);
      // circle(irisCenterL.x, irisCenterL.y, 15);
    }
}

// Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
  console.log(faces);
}