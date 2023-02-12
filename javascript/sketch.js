let bobby;
let canvas;
let button;

let wtf = 2;
let happy = 1;
let sad = 0;
let bobbyState = wtf;

let sky;

let pressed = 0;
let randomWeather = 2;

function setup() {
  angleMode(DEGREES);

  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-container");

  button = createButton("SHUFFLE WEATHER");
  button.addClass("button");
  button.parent("gui-container");

  sky = color(255, 255, 255);

  bobby = new Emoticon();

  button.mousePressed(handlePressed);
}

function draw() {
  background(sky); //sky
  drawLandscape(); //landscape
  bobby.setup(); //emoticon

  if (pressed == 0) {
    button.html("SHUFFLE WEATHER");
  } else if (pressed % 2 && pressed != 0) {
    updateWeather();
    button.html("SHUFFLE WEATHER");
    button.removeClass("wait");
  } else {
    shuffleWeather();
    button.html("...");
    button.addClass("wait");
  }

  if (bobbyState == sad) {
    bobby.frown();
  } else if (bobbyState == happy) {
    bobby.smile();
  } else {
    bobby.open();
  }
}

//----------------------------------------------------------------

class Emoticon {
  constructor() {
    this.bodyX = 0;
    this.bodyY = 0;
    this.bodyDiam = 100;

    this.eyesX = -15;
    this.eyesY = -15;
    this.eyesW = 15;
    this.eyesH = 25;

    this.mouthX = 0;
    this.mouthY = 25;
    this.mouthW = 15;
    this.mouthH = 25;
    this.mouthStart = 0;
    this.mouthStop = 360;
  }

  setup() {
    push();
    translate(windowWidth * 0.5, windowHeight * 0.5);

    //BODY
    fill(245, 215, 90);
    circle(this.bodyX, this.bodyY, this.bodyDiam);

    //EYES
    fill(0);
    ellipse(this.eyesX, this.eyesY, this.eyesW, this.eyesH);
    ellipse(-this.eyesX, this.eyesY, this.eyesW, this.eyesH);

    //MOUTH
    noFill();
    strokeWeight(3);
    arc(
      this.mouthX,
      this.mouthY,
      this.mouthW,
      this.mouthH,
      this.mouthStart,
      this.mouthStop
    );

    pop();
  }

  open() {
    this.mouthX = 0;
    this.mouthY = 25;
    this.mouthW = 15;
    this.mouthH = 25;
    this.mouthStart = 0;
    this.mouthStop = 360;
  }

  smile() {
    this.mouthW = 50;
    this.mouthH = 15;
    this.mouthStart = 0;
    this.mouthStop = 180;
  }

  frown() {
    this.mouthW = 50;
    this.mouthH = 15;
    this.mouthStart = 180;
    this.mouthStop = 360;
  }
}

function drawLandscape() {
  //MOUNTAINS
  let v4 = createVector(windowWidth * 0.75, windowHeight * 0.4);
  let v5 = createVector(windowWidth + windowWidth * 0.25, windowHeight * 0.8);
  let v6 = createVector(windowWidth * 0.25, windowHeight * 0.8);
  fill(56, 222, 63);
  triangle(v4.x, v4.y, v5.x, v5.y, v6.x, v6.y);

  let v1 = createVector(windowWidth * 0.25, windowHeight * 0.25);
  let v2 = createVector(-windowWidth * 0.25, windowHeight * 0.8);
  let v3 = createVector(windowWidth * 0.75, windowHeight * 0.8);
  fill(0, 160, 42);
  triangle(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y);

  //GROUND
  let rX = 0;
  let rY = windowHeight * 0.75;
  let rW = windowWidth;
  let rH = windowHeight * 0.25;
  fill(90, 25, 15);
  rect(rX, rY, rW, rH);
}

function handlePressed() {
  pressed++;
  randomWeather = floor(random(2));
}

function shuffleWeather() {
  sky = color(255, 255, 255);
  bobbyState = wtf;
}

function updateWeather() {
  if (randomWeather == 0) {
    sky = color(0, 180, 255);
    bobbyState = happy;
  } else if (randomWeather == 1) {
    sky = color(86, 111, 151);
    bobbyState = sad;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
