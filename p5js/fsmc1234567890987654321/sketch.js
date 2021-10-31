let vid, start, loop;

function preload() {
  start = loadSound('start.wav');
  loop = loadSound('loop.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight - 4);
  soundFormats('wav');
  frameRate(30);
  background(0);
  vid = createVideo('salincak.mp4');
  vid.hide();
}

let r = 250,
  g = 0,
  b = 0;
let speed = 50;
let fire = false;
let frame = 0;
let loopCount = false;
let txt = "Ekrana tıkla ve momentum öğren";
let title = false;

function draw() {
  background(0);
  if (fire) {
    frame++;
    if (frame > 4.9 * 30) {
      vid.loop();
      //loop.loop();  don't use that because my sound isn't in correct timing
      loop.play();
      fire = false;
      loopCount = true;
      title = true;
      frame = 0;
    }
  }

  if (loopCount) {
    frame++;
    if (frame > 7.2 * 30) {
      loop.play();
      frame = 0;
    }
  }

  if (r > 0 && b == 0) {
    g += speed;
    r -= speed;
  } else if (g > 0 && r == 0) {
    g -= speed;
    b += speed;
  } else if (b > 0 && g == 0) {
    b -= speed;
    r += speed;
  }

  textAlign(CENTER, CENTER);
  fill(0);
  strokeWeight(percent(0.8, 0));
  stroke(r, g, b);
  textSize(percent(4, 0));
  if (title) text("FATİH SULTAN MEHMET CERRAHOĞLU", width / 2, percent(12, 1));
  textSize(percent(2, 0));
  noStroke();
  fill(255);
  text(txt, percent(50, 0), percent(50, 1));
  imageMode(CENTER);
  image(vid, width / 2, height / 2, percent(50, 0), percent(50, 1));
}

function percent(perc, wh) {
  if (wh == 0) { //percent by width
    return width * perc / 100;
  } else {
    return height * perc / 100;
  }
}

function mousePressed() {
  //vid.loop();
  if (!loopCount && !fire) {
    txt = "Artık çok geç";
    start.play();
    fire = true;
  }
}
