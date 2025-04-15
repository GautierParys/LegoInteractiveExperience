"use strict";

// Définition des variables nécessaires à la détection de visage
let faceMesh;
const options = {maxFaces: 1, refineLandmarks: true, flipped: true, runtime: "mediapipe"};
let faces = [];

let video;

// Définition des images
let rightEye;
let mouth;
let backgroundImage;
let grass;

// Définition des noms des fonts
let panchang_regular;
let panchang_semibold;
let panchang_extrabold;

// Scale
const scaleMult = 1;

// Taille du canva en fonction de la taille du navigateur
// const canvasWidth = windowWidth;
// const canvasHeight = windowHeight;

function preload() {
  //Prelaod du modèle de détection de visage
  faceMesh = ml5.faceMesh(options);
  
  //Preload des images
  rightEye = loadImage("assets/images/VanGogh-Eye.jpg");
  backgroundImage = loadImage("assets/images/water.jpg");
  grass = loadImage("assets/images/grass.jpg");

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
  // const baseWidth = 1600;
  // const baseHeight = 900;
  // const {canvasWidth, canvasHeight} = canvasUpdate(baseWidth, baseHeight);

  const canvasWidth = windowWidth;
  const canvasHeight = windowHeight;

  const videoWidth = 640;
  const videoHeight = 480;

  createCanvas(canvasWidth, canvasHeight);

  video = createCapture(VIDEO);
  video.size(videoWidth, videoHeight);
  video.hide();

  faceMesh.detectStart(video, gotFaces);

  frameRate(10);
  noStroke();
  rectMode(CENTER);
  angleMode(DEGREES);
}

function draw() {
  const canvasWidth = windowWidth;
  const canvasHeight = windowHeight;

  background(255);

  // textFont(panchang_extrabold);
  // fill(0);
  // textSize(80);
  // let txt = "LEGO .1";
  // // let textWid = textWidth(txt);
  // text(txt, 30, 90);

  push();
    beginClip();
      square(canvasWidth / 2, canvasHeight / 2, 1080 * scaleMult);
    endClip();

    image(backgroundImage, 0, 0);
  pop();


  // Parcelles de terre
  push();
    translate(canvasWidth / 2 - 540 + 653, 217);

    beginClip();
      beginShape();
        vertex(440,0);
        vertex(169,35.5);
        vertex(108.5,185);
        vertex(0,291.5);
        vertex(41,532);
        vertex(242,596);
        vertex(320.5,453.5);
        vertex(472,316.5);
        vertex(440,0);
      endShape();
    endClip();

    image(grass, 0, 0);
  pop();

  push();
    translate(canvasWidth / 2 - 540 - 86, -44);

    beginClip();
      beginShape();
        vertex(510.765,287.475);
        vertex(375.14,217.086);
        vertex(325.473,81.5841);
        vertex(239.449,0.636229);
        vertex(64.6278,26.2642);
        vertex(13.8614,93.0667);
        vertex(0.985041,189.016);
        vertex(14.4599,312.506);
        vertex(182.697,432.665);
        vertex(197.176,564.398);
        vertex(361.887,551.577);
        vertex(531.14,602.934);
        vertex(541.05,393.768);
        vertex(510.765,287.475);
      endShape();
    endClip();

    image(grass, 0, 0);
  pop();

  push();
    translate(canvasWidth / 2 - 540 + 106, 632);

    beginClip();
      beginShape();
        vertex(0,152.774);
        vertex(13.0914,46.9748);
        vertex(192.782,0);
        vertex(300.258,39.3572);
        vertex(415.335,46.9748);
        vertex(462,152.774);
        vertex(372.26,197.844);
        vertex(378.806,323.322);
        vertex(451.151,449.011);
        vertex(344.177,478);
        vertex(223.741,468.69);
        vertex(192.782,380.665);
        vertex(96.2852,328.189);
        vertex(70.1024,233.393);
        vertex(0,152.774);
      endShape();
    endClip();

    image(grass, 0, 0);
  pop();


    for (let face of faces) {
      // Oeil droit
      push();
        translate(canvasWidth / 2 - 540 + 679, 198);
        rotate(6);
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
          endShape(CLOSE);
        endClip();

        image(rightEye, 0, 0);
      pop();

      // Oeil gauche
      push();
      translate(canvasWidth / 2 - 540 + 161 + random(5, 21), 265 + random(5, 21));
      rotate(-12 + random(0.01, 0.07));

      beginClip();
        beginShape();
          vertex(164.5,0);
          bezierVertex(94.6076,0,0,70.5,0,70.5);
          bezierVertex(0,70.5,94.6076,141,164.5,141);
          bezierVertex(234.392,141,329,70.5,329,70.5);
          bezierVertex(329,70.5,234.392,0,164.5,0);
        endShape(CLOSE);
      endClip();

      background("#FFD0AB");

      const leftEyeMult = constrain(round(face.leftEye.centerX - face.leftIris.centerX), -3, 3);
      const leftIrisX = leftEyeMult < -2 ? "right" : leftEyeMult > -1.2 ? "left" : null;
      // console.log(leftEyeMult);
      // console.log(leftIrisX);
      fill("#2079B8");
      switch (leftIrisX) {
        case "left":
          circle(120, 70.5, 131);
          fill("#080808");
          circle(110, 70.5, 58);
        break;
        case "right":
          circle(210, 70.5, 131);
          fill("#080808");
          circle(220, 70.5, 58);
        break;
        default:
          circle(164.5, 70.5, 131);
          fill("#080808");
          circle(164.5, 70.5, 58);
      }
      pop();

      // Bouche
      push();
        translate(canvasWidth / 2 - 540 + 315, 564);

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
          endShape(CLOSE);
        endClip();

        image(rightEye, 0, 0);
      pop();
    }
}

// Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
  console.log(faces);
}

// function canvasUpdate (baseWidth, baseHeight) {
//   const aspectRatio = baseWidth / baseHeight
//   if (windowWidth / windowHeight > aspectRatio) {
//     const canvasWidth = windowHeight * aspectRatio;
//     const canvasHeight = windowHeight;
//     const scaleFactor = canvasWidth / baseWidth;
//     return {
//       canvasWidth: canvasWidth,
//       canvasHeight: canvasHeight,
//       scaleFactor: scaleFactor
//     };
//   }

//   return {
//     canvasWidth: baseWidth,
//     canvasHeight: baseHeight,
//     scaleFactor: scaleFactor
//   };
// }

function windowResized () {
  preload();
  setup();
}