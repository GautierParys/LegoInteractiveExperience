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
  img = loadImage("assets/images/VanGogh.jpg");
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

      let leftIrisXMult = (face.rightEye.centerX - face.rightIris.centerX) * 0.1;

      // Oeil droit
      push();
        beginClip();
          beginShape();
            vertex(165 + random(5, 21), 140 + random(5, 21));
            vertex(120 + random(5, 21), 192 + random(5, 21));
            vertex(157 + random(5, 21), 261 + random(5, 21));
            vertex(258 + random(5, 21), 241 + random(5, 21));
            vertex(334 + random(5, 21), 257 + random(5, 21));
            vertex(431 + random(5, 21), 239 + random(5, 21));
            vertex(469 + random(5, 21), 181 + random(5, 21));
            vertex(442 + random(5, 21), 98 + random(5, 21));
            vertex(350 + random(5, 21), 58 + random(5, 21));
            vertex(267 + random(5, 21), 54 + random(5, 21));
            vertex(239 + random(5, 21), 108 + random(5, 21));
          endShape(CLOSE);
        endClip();

        image(img, 95 + random(0, 5), 29 + random(0, 5), 349, );
      pop();

      // Oeil gauche
        fill(255, 0, 0);
        beginShape();
          vertex(300- 50, 300);
          bezierVertex(300 - 25, 300 - 25, 300 + 25, 300 - 25, 300 + 50, 300);
          bezierVertex(300 + 25, 300 + 25, 300 - 25, 300 + 25, 300 - 50, 300);
        endShape(CLOSE);
        fill(0, 255, 0);
        circle(300 - (25 * leftIrisXMult), 300, 25);

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