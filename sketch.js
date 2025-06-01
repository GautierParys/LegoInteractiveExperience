// Ce code présente mon projet d'IA Lego.
/**
Pour le réaliser, j'ai à la fois fait de simples recherches sur Internet, consulté des sites tels que
Stack Overflow ou encore utilisé ChatGPT. 
Il est à noter que ChatGPT n'était présent lors du développement de ce projet que pour m'expliquer certaines notions de p5.js
lorsque mes propres recherches n'étaient pas concluantes, mais aussi pour m'aider à comprendre d'où venaient certaines erreurs.
*/
// La librairie que j'utilise pour le tracking de la tête et de la main est ml5.js (https://ml5js.org/).
/**
S’il y a un problème quelconque lors du chargement de la page ou lors de l'exécution (comme du lag...), c'est sûrement dû aux modèles de détection de visages et de mains qui sont assez lourds.
Pour régler ce problème, il suffit de relancer la page. Si le problème persiste, alors je recommande un Ctrl + F5 sur Windows ou un Option + Cmd + R sur Mac (sur Safari) ou Shift + Cmd + R (sur Chrome et Firefox).
*/
// Lien du GitHub si besoin : https://github.com/GautierParys/LegoInteractiveExperience

/**
Pour que tout fonctionne correctement, il faut se trouver à une cinquantaine de centimètres de la webcam, et de préférence face à elle.
Afin de switcher entre les différents visages, il faut montrer sa main à la caméra, pincer son pouce avec son index puis glisser sa main vers la droite (et attendre un peu, c'est un peu lent).
*/

"use strict";


// Définition des variables nécessaires à la détection de main
let handPose;
const HAND_OPTIONS = {
  maxHands: 1,
  flipped: true,
  runtime: "tfjs",
  modelType: "lite",
};
let hands = [];
let fingerLastpos; 

// Définition des variables nécessaires à la détection de visage
let faceMesh;
const OPTIONS = {
  maxFaces: 1,
  refineLandmarks: true,
  flipped: true,
  runtime: "mediapipe"
};
let faces = [];

// Définition de la variable nécessaire à la capture vidéo
let video;

// Définition des lites contenants les images
let waters = [];
let earths = [];

let rightEyes = [];

let openedMouths = [];
let closedMouths = [];

let currentFace;

// Définition de la variable nécessaire au swipe
let justSwiped = false;

// Définition de la variable de détection du chargement des models
let modelsLoaded = false;

// Définition du nom de la font
let panchangRegular;


// Fonction chargeant des éléments avant le reste du code
function preload() {
  // Prelaod du modèle de détection de visage
  faceMesh = ml5.faceMesh(OPTIONS);
  handPose = ml5.handPose(HAND_OPTIONS);

  
  
  
  // Prelaod des imagers d'eau
  for (let i = 1; i <= 3; i++) {
    waters.push(loadImage("assets/images/waters/water-"+ i +".jpg"));
  }
  // Preload des images de terre
  for (let i = 1; i <= 3; i++) {
    earths.push(loadImage("assets/images/earths/earth-"+ i +".jpg"));
  }
  // Preload des images de l'oeil droit
  for (let i = 1; i <= 5; i++) {
    rightEyes.push(loadImage("assets/images/rightEyes/rightEye-"+ i +".png"));
  }
  // Preload des bouches (ouvertes / fermées)
  for (let i = 1; i <= 3; i++) {
    closedMouths.push(loadImage("assets/images/closedmouth/closedmouth-"+ i +".png"));
  }
  for (let i = 1; i <= 2; i++) {
    openedMouths.push(loadImage("assets/images/openedMouth/openedmouth-"+ i +".jpg"));
  }



  // Preload Panchang Regular
  panchangRegular = loadFont("assets/fonts/Panchang-Regular.woff",
    () => console.log("Panchang regular loaded"),
    () => console.error("Panchang regular not loaded")
  );
}

function setup() {
  // Met la taille du canvas à la taille de la fenêtre
  const CANVAS_WIDTH = windowWidth;
  const CANVAS_HEIGHT = windowHeight;

  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  //  Définit les différent éléments constituants le visage et étants modifiables
  currentFace = {
    faceID: 0,
    water: waters[0],
    earth: earths[0],
    rightEye: rightEyes[round(random(0, 4))],
    closedMouth: closedMouths[round(random(0, 2))],
    openedMouth: openedMouths[round(random(0, 1))]
  }

  // Capture de la vidéo
  video = createCapture(VIDEO);
  video.hide();

  // Démarre les modèles de détection de visages et de mains
  faceMesh.detectStart(video, gotFaces);
  handPose.detectStart(video, gotHands);

  // Définition des règles globales du canevas 
  frameRate(12);
  noStroke();
  rectMode(CENTER);
  angleMode(DEGREES);

  // Définition des règles relatives au texte
  textAlign(CENTER, TOP);
  textFont(panchangRegular);
  textSize(16);
}

function draw() {

  // Redéfinition de la taille du canevas plus son centre
  const CANVAS_WIDTH = windowWidth;
  const CANVAS_HEIGHT = windowHeight;
  const CANVAS_CENTER = createVector(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  
  // Met l'arrière plan en blanc
  background(245);

  // Système d'écran de chargement et de chargement des modèles
  if (faces.length > 0 && hands.length > 0) {
    modelsLoaded = true;
  } else {
    fill(8);
    text("Tracking models are loading please wait...", CANVAS_CENTER.x, CANVAS_CENTER.y);
    text("Show both your face plus one hand to the camera to load both models.", CANVAS_CENTER.x, CANVAS_CENTER.y + 24);
  }

  if (modelsLoaded == true) {
    // Retire le texte précédent et affiche un autre
    background(245);
    fill(8);
    text("No face detected", CANVAS_CENTER.x, CANVAS_CENTER.y);


    for (let face of faces) {
      for (let hand of hands) {

        // Système de swipe de visage
        const indexTipPos = createVector(round(hand.index_finger_tip.x), round(hand.index_finger_tip.y));
        const thumbTipPos = createVector(round(hand.thumb_tip.x), round(hand.thumb_tip.y));

        const fingerDist = round(dist(0, indexTipPos.y, 0, thumbTipPos.y));

        if (fingerDist <= 15 && indexTipPos.x > fingerLastpos + 5 && !justSwiped) {
          currentFace.faceID = currentFace.faceID == 2 ? currentFace.faceID = 0 : currentFace.faceID + 1;
          currentFace.water = waters[currentFace.faceID];
          currentFace.earth = earths[currentFace.faceID];
          justSwiped = true;
        } else if (fingerDist > 15) {
          justSwiped = false;
          fingerLastpos = indexTipPos.x;
        }
      }

      // Arrière plan du visage
      push();
        beginClip();
          square(CANVAS_CENTER.x, CANVAS_CENTER.y, 1080);
        endClip();

        image(currentFace.water, 0, 0);
      pop();


      // Parcelles de terre
      push();
        translate(CANVAS_CENTER.x - 540 + 653, 217);

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

        image(currentFace.earth, 0, 0);
      pop();

      push();
        translate(CANVAS_CENTER.x - 540 - 86, -44);

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

        image(currentFace.earth, 0, 0);
      pop();

      push();
        translate(CANVAS_CENTER.x - 540 + 106, 632);

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

        image(currentFace.earth, 0, 0);
      pop();


      // Oeil droit (par rapport à l'utilisateur)
      push();
        translate(CANVAS_CENTER.x - 540 + 679, 198);
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

        image(currentFace.rightEye, 0, 0, 283, 200);
      pop();

      // Oeil gauche (par rapport à l'utilisateur)
      push();
      translate(CANVAS_CENTER.x - 540 + 161 + random(5, 21), 265 + random(5, 21));
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


      // Gestion du mouvement de l'oeil en fonction de ceux de l'utilisateur
      const leftEyeMult = (round(face.leftEye.centerX - face.leftIris.centerX) + round(face.rightEye.centerX - face.rightIris.centerX)) * 0.5;

      let currentPosC1;
      let currentPosC2;
      
      if (leftEyeMult > 2) {
        currentPosC1 = 120;
        currentPosC2 = 110;
      } else if (leftEyeMult < -1) {
        currentPosC1 = 210;
        currentPosC2 = 220;
      } else {
        currentPosC1 = 164.5;
        currentPosC2 = 164.5;
      }

      fill("#2079B8");
      circle(currentPosC1, 70.5, 131);
      fill("#080808");
      circle(currentPosC2, 70.5, 58);

      pop();

      // Bouche
      push();
        translate(CANVAS_CENTER.x - 540 + 315, 564);

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

        // Gestion de la bouche ouverte ou fermée en fonction de celle de l'utilisateur
        if (face.lips.height <= 40) {
          image(currentFace.closedMouth, 0, 0, 522, 261);
        } else {
          image(currentFace.openedMouth, 0, 0, 522, 261);
        }
      pop();
    }
  }

    // Afficher la caméra
    // image(video, 0, 0);
}

// Fonction qui récupère les données de la reconnaissance de visages
function gotFaces(results) {
  // Sauvegarde les résultats dans la variable faces
  faces = results;
}

// Fonction qui récupère les données de la reconnaissance de mains
function gotHands(results) {
  // Sauvegarde les résultats dans la variable hands
  hands = results;
}

// Recharge tout lorsque la fenêtre change de taille
function windowResized () {
  preload();
  setup();
}