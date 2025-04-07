"use strict";

// Définition des variables nécessaires à la détection de visage
let faceMesh;
let options = { maxFaces: 1, refineLandmarks: true, flipped: true, runtime: "mediapipe"};
let faces = [];

let video;

// Définition d'une image pour l'oeil droit
let img;

// Définition des noms des fonts
let panchang_regular;
let panchang_semibold;
let panchang_extrabold;

// Scale
let scaleMult = 0.75;

function preload() {
  //Prelaod du modèle de détection de visage
  faceMesh = ml5.faceMesh(options);
  
  //Preload de l'image pour l'oeil droit
  img = loadImage("assets/images/VanGogh.jpg");

  //Preload de la font Panchang
  panchang_extrabold = loadFont("assets/fonts/Panchang-Extrabold.woff",
    () => console.log("Panchang extrabold loaded"),
    () => console.error("Panchang extrabold not loaded")
  );
  panchang_semibold = loadFont("assets/fonts/Panchang-Semibold.woff",
    () => console.log("Panchang semibold loaded"),
    () => console.error("Panchang semibold not loaded")
  );
  panchang_regular =loadFont("assets/fonts/Panchang-Regular.woff",
    () => console.log("Panchang regular loaded"),
    () => console.error("Panchang regular not loaded")
  );

}

function setup() {  
  const height = windowHeight;
  const width = height * (16/9);
  createCanvas(windowWidth, height);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  faceMesh.detectStart(video, gotFaces);

  frameRate(10);
  noStroke();

  rectMode(CENTER);
}

function draw() {
  const height = windowHeight;
  const width = windowWidth;

  background(255);

  textFont(panchang_extrabold);
  fill(0);
  textSize(80);
  let txt = "LEGO .1";
  // let textWid = textWidth(txt);
  text(txt, 30, 90);

  fill(130);
  square(width / 2, height / 2, 1080 * scaleMult);


    for (let face of faces) {
      // Oeil droit
      push();
        translate(width / 2 + 75, 225);
        scale(0.75);
        beginClip();
          beginShape();
            vertex(26 + random(5, 21),37 + random(5, 21));
            vertex(73 + random(5, 21),28 + random(5, 21));
            vertex(114 + random(5, 21),0 + random(5, 21));
            vertex(189 + random(5, 21),13 + random(5, 21));
            vertex(223 + random(5, 21),42 + random(5, 21));
            vertex(262 + random(5, 21),67 + random(5, 21));
            vertex(283 + random(5, 21),135 + random(5, 21));
            vertex(243 + random(5, 21),157 + random(5, 21));
            vertex(183 + random(5, 21),171 + random(5, 21));
            vertex(120 + random(5, 21),148 + random(5, 21));
            vertex(44 + random(5, 21),161 + random(5, 21));
            vertex(2 + random(5, 21),125 + random(5, 21));
            vertex(0 + random(5, 21),82 + random(5, 21));
            vertex(26 + random(5, 21),37 + random(5, 21));
          endShape(CLOSE);
        endClip();

        image(img, 0, 0);
      pop();

      // Oeil gauche
      push();
      fill("#FFD0AB");
      translate(width / 2 - 325, 250);
      scale(0.75);
      rotate(25);
      beginShape();
        vertex(164.5,0);
        bezierVertex(94.6076,0,0,70.5,0,70.5);
        bezierVertex(0,70.5,94.6076,141,164.5,141);
        bezierVertex(234.392,141,329,70.5,329,70.5);
        bezierVertex(329,70.5,234.392,0,164.5,0);
      endShape(CLOSE);

      const leftEyeMult = constrain(round(face.leftEye.centerX - face.leftIris.centerX), -3, 3);
      const leftEyeX = leftEyeMult < -1 ? 190 : leftEyeMult > .25 ? 140 : null;
      // console.log(leftEyeMult);
      // console.log(leftEyeX);
      fill("#2079B8");
      switch (leftEyeX) {
        case 140:
          circle(140, 70.5, 125);
        break;
        case 190:
          circle(190, 70.5, 125);
        break;
        default:
          circle(164.5, 70.5, 125);
      }
      pop();

      // Bouche
      push();
        translate(width / 2 - 203, 500);
        scale(0.75);

        beginClip();
          beginShape();
            vertex(30 + random(5, 21),56 + random(5, 21));
            vertex(50 + random(5, 21),21 + random(5, 21));
            vertex(141 + random(5, 21),21 + random(5, 21));
            vertex(203 + random(5, 21),0 + random(5, 21));
            vertex(311 + random(5, 21),38 + random(5, 21));
            vertex(407 + random(5, 21),21 + random(5, 21));
            vertex(506 + random(5, 21),62 + random(5, 21));
            vertex(466 + random(5, 21),89 + random(5, 21));
            vertex(466 + random(5, 21),159 + random(5, 21));
            vertex(432 + random(5, 21),227 + random(5, 21));
            vertex(335 + random(5, 21),238 + random(5, 21));
            vertex(250 + random(5, 21),201 + random(5, 21));
            vertex(203 + random(5, 21),245 + random(5, 21));
            vertex(95 + random(5, 21),245 + random(5, 21));
            vertex(0 + random(5, 21),191 + random(5, 21));
            vertex(30 + random(5, 21),56 + random(5, 21));
          endShape(CLOSE);
        endClip();

        image(img, 0, 0);
      pop();
    }
}

// Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
  console.log(faces);
}