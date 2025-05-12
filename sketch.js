"use strict";

// Définition des variables nécessaires à la détection de main
let handPose;
const HAND_OPTIONS = {
  maxHands: 1,
  flipped: true,
  runtime: "tfjs",
  modelType: "full",
  detectorModelUrl: undefined, //default to use the tf.hub model
  landmarkModelUrl: undefined, //default to use the tf.hub model
};
let hands = [];
let isFingerClosed = false;
let fingerLastpos; 

// Définition des variables nécessaires à la détection de visage
let faceMesh;
const OPTIONS = {maxFaces: 1,
  refineLandmarks: true,
  flipped: true,
  runtime: "mediapipe"
};
let faces = [];

let video;

// Définition des images
let rightEye;
let mouth;
let backgroundImage;
let grass;
let openmouth;
let closemouth;

// Définition des noms des fonts
let panchangRegular;
let panchangSemibold;
let panchangExtrabold;

// Scale
const scaleMult = 1;

// Taille du canva en fonction de la taille du navigateur
// const CANVAS_WIDTH = windowWidth;
// const CANVAS_HEIGHT = windowHeight;

function preload() {
  //Prelaod du modèle de détection de visage
  faceMesh = ml5.faceMesh(OPTIONS);
  handPose = ml5.handPose(HAND_OPTIONS);
  
  //Preload des images
  rightEye = loadImage("assets/images/VanGogh-Eye.jpg");
  backgroundImage = loadImage("assets/images/water-blue.jpg");
  grass = loadImage("assets/images/grass.jpg");
  openmouth = loadImage("assets/images/openmouth/Joseph_Ducreux_Self-Portrait.jpg");
  closemouth = loadImage("assets/images/openmouth/Gian_Lorenzo_Bernini,_self-portrait.jpg");

  //Preload de la font Panchang
  panchangExtrabold = loadFont("assets/fonts/Panchang-Extrabold.woff",
    () => console.log("Panchang extrabold loaded"),
    () => console.error("Panchang extrabold not loaded")
  );
  panchangSemibold = loadFont("assets/fonts/Panchang-Semibold.woff",
    () => console.log("Panchang semibold loaded"),
    () => console.error("Panchang semibold not loaded")
  );
  panchangRegular =loadFont("assets/fonts/Panchang-Regular.woff",
    () => console.log("Panchang regular loaded"),
    () => console.error("Panchang regular not loaded")
  );
}

function setup() {
  const CANVAS_WIDTH = windowWidth;
  const CANVAS_HEIGHT = windowHeight;

  const VIDEO_WIDTH = 640;
  const VIDEO_HEIGHT = 480;

  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  video = createCapture(VIDEO);
  video.size(VIDEO_WIDTH, VIDEO_HEIGHT);
  video.hide();

  faceMesh.detectStart(video, gotFaces);
  handPose.detectStart(video, gotHands);

  frameRate(8);
  noStroke();
  rectMode(CENTER);
  angleMode(DEGREES);
}

function draw() {
  const CANVAS_WIDTH = windowWidth;
  const CANVAS_HEIGHT = windowHeight;

  background(255);

  // textFont(panchang_extrabold);
  // fill(0);
  // textSize(80);
  // let txt = "LEGO .1";
  // // let textWid = textWidth(txt);
  // text(txt, 30, 90);

  push();
    beginClip();
      square(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 1080 * scaleMult);
    endClip();

    image(backgroundImage, 0, 0);
  pop();


  // Parcelles de terre
  push();
    translate(CANVAS_WIDTH / 2 - 540 + 653, 217);

    beginClip();
      beginShape();
        vertex(440 + random(5, 21),0 + random(5, 21));
        vertex(169 + random(5, 21),36 + random(5, 21));
        vertex(109 + random(5, 21),185 + random(5, 21));
        vertex(0 + random(5, 21),292 + random(5, 21));
        vertex(41 + random(5, 21),532 + random(5, 21));
        vertex(242 + random(5, 21),596 + random(5, 21));
        vertex(321 + random(5, 21),454 + random(5, 21));
        vertex(472 + random(5, 21),317 + random(5, 21));
      endShape();
    endClip();

    image(grass, 0, 0);
  pop();

  push();
    translate(CANVAS_WIDTH / 2 - 540 - 86, -44);

    beginClip();
      beginShape();
        vertex(511 + random(5, 21),287 + random(5, 21));
        vertex(375 + random(5, 21),217 + random(5, 21));
        vertex(325 + random(5, 21),82 + random(5, 21));
        vertex(239 + random(5, 21),1 + random(5, 21));
        vertex(65 + random(5, 21),26 + random(5, 21));
        vertex(14 + random(5, 21),93 + random(5, 21));
        vertex(1 + random(5, 21),189 + random(5, 21));
        vertex(14 + random(5, 21),313 + random(5, 21));
        vertex(183 + random(5, 21),433 + random(5, 21));
        vertex(197 + random(5, 21),564 + random(5, 21));
        vertex(362 + random(5, 21),552 + random(5, 21));
        vertex(531 + random(5, 21),603 + random(5, 21));
        vertex(541 + random(5, 21),394 + random(5, 21));
      endShape(CLOSE);
    endClip();

    image(grass, 0, 0);
  pop();

  push();
    translate(CANVAS_WIDTH / 2 - 540 + 106, 632);

    beginClip();
      beginShape();
        vertex(0 + random(5, 21),153 + random(5, 21));
        vertex(13 + random(5, 21),47 + random(5, 21));
        vertex(193 + random(5, 21),0 + random(5, 21));
        vertex(300 + random(5, 21),39 + random(5, 21));
        vertex(415 + random(5, 21),47 + random(5, 21));
        vertex(462 + random(5, 21),153 + random(5, 21));
        vertex(372 + random(5, 21),198 + random(5, 21));
        vertex(379 + random(5, 21),324 + random(5, 21));
        vertex(451 + random(5, 21),449 + random(5, 21));
        vertex(344 + random(5, 21),478 + random(5, 21));
        vertex(224 + random(5, 21),469 + random(5, 21));
        vertex(193 + random(5, 21),381 + random(5, 21));
        vertex(96 + random(5, 21),328 + random(5, 21));
        vertex(70 + random(5, 21),233 + random(5, 21));
      endShape(CLOSE);
    endClip();

    image(grass, 0, 0);
  pop();


    for (let face of faces) {
      // Oeil droit
      push();
        translate(CANVAS_WIDTH / 2 - 540 + 679, 198);
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

        image(rightEye, 0, 0, 283, 200);
      pop();

      // Oeil gauche
      push();
      translate(CANVAS_WIDTH / 2 - 540 + 161 + random(5, 21), 265 + random(5, 21));
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
        translate(CANVAS_WIDTH / 2 - 540 + 315, 564);

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

        if (face.lips.height <= 20) {
          image(closemouth, 0, 0);
        } else {
          image(openmouth, 0, 0);
        }
      pop();
    }
    // Swipe

    for (let hand of hands) {
      const indexTipPos = createVector(round(hand.index_finger_tip.x), round(hand.index_finger_tip.y));
      const thumbTipPos = createVector(round(hand.thumb_tip.x), round(hand.thumb_tip.y));

      const fingerDist = round(dist(indexTipPos.x, indexTipPos.y, thumbTipPos.x, thumbTipPos.y));

      if (fingerDist > 40) {
        isFingerClosed = false;
      }
      if (isFingerClosed == false) {
        if (fingerDist < 30) {
          fingerLastpos = indexTipPos.x;
          isFingerClosed = true;
        }
      }
      if (isFingerClosed == true && indexTipPos.x >= fingerLastpos + 40) {
        fill(0, 0, 0);
        circle(0, 0, 100);
      }

      console.log(isFingerClosed);
      console.log(fingerLastpos);
    }

    // Afficher la caméra
    // image(video, 0, 0);
}

// Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
  // console.log(faces);
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // Save the output to the hands variable
  hands = results;
  // console.log(hands);
}

function windowResized () {
  preload();
  setup();
}