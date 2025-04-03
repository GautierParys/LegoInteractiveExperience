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

// Définition des noms des fonts
let panchang_regular;
let panchang_semibold;
let panchang_extrabold;

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
  let textWid = textWidth("LEGO .1");
  text(txt, 30, 90);

  fill(130);
  square(width / 2, height / 2, 800);


    // Dessiner des points verts sur l'iris
    for (let face of faces) {
      const leftIrisMult = dist(face.leftEye.centerX, face.leftIris.centerX);
      // const currentX = 164.5;
      // const targetX = currentX + 1000 * leftIrisMult;
      // const lerpX = lerp(currentX, targetX, 0.01);

      // Oeil droit
      push();
        translate(900, 225);
        scale(0.5);
        beginClip();
          beginShape();
            vertex(45 + random(5, 21), 86 + random(5, 21));
            vertex(0 + random(5, 21), 138 + random(5, 21));
            vertex(37 + random(5, 21), 207 + random(5, 21));
            vertex(138 + random(5, 21), 187 + random(5, 21));
            vertex(214 + random(5, 21), 203 + random(5, 21));
            vertex(311 + random(5, 21), 185 + random(5, 21));
            vertex(349 + random(5, 21), 127 + random(5, 21));
            vertex(322 + random(5, 21), 44 + random(5, 21));
            vertex(230 + random(5, 21), 4 + random(5, 21));
            vertex(147 + random(5, 21), 0 + random(5, 21));
            vertex(119 + random(5, 21), 54 + random(5, 21));          
          endShape(CLOSE);
        endClip();

        image(img, 0, 0);
      pop();

      // Oeil gauche
      push();
      fill("#FFD0AB");
      translate(625, 250);
      scale(0.5);
      beginShape();
        vertex(164.5,0);
        bezierVertex(94.6076,0,0,70.5,0,70.5);
        bezierVertex(0,70.5,94.6076,141,164.5,141);
        bezierVertex(234.392,141,329,70.5,329,70.5);
        bezierVertex(329,70.5,234.392,0,164.5,0);
      endShape(CLOSE);

      if (leftIrisMult < 0) {
        fill("#2079B8");
        circle(lerp(164.5, 125, 0.05), 70.5, 125);
        fill("#080808");
        circle(lerp(164.5, 105, 0.05), 70.5, 65);
      } else if (164.5 > 0) {
        fill("#2079B8");
        circle(lerp(164.5, 204, 0.05), 70.5, 125);
        fill("#080808");
        circle(lerp(164.5, 224, 0.05), 70.5, 65);
      }

      pop();
    }
}

// Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
  console.log(faces);
}