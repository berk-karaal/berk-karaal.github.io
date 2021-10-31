class cube {
  constructor(x_, y_) {
    this.x = x_;
    this.y = y_;
    this.upSpeed = 2;
    this.downSpeed = 0.15;
    this.size = minSize;
    this.max = minSize;
    this.grow = false;
    this.fillc = minFill;
  }
  cupdate() {
    let distance = dist(this.x, this.y, mouseX, mouseY);
    if (distance < limit) {
      this.grow = true;
      this.max = map(distance, 0, limit, maxSize, 0);
    } else {
      this.grow = false;
    }
    if (this.grow && this.size < this.max) {
      this.size += this.upSpeed;
    } else if (this.size > minSize && !this.grow) {
      this.size -= this.downSpeed;
    }
    this.fillc=map(this.size,minSize,maxSize,minFill,maxFill);
  }
  cdraw() {
    fill(this.fillc);
    rect(this.x, this.y, this.size, this.size);
  }
}

///////////////////////////////////////////////////////////////////////////////
let minSize = 10,
    maxSize = 30;
let space = 20;
let limit = 180;
let minFill = 0,
    maxFill = 255;
var xNum, yNum;
var cubes = [];

function setup() {
  createCanvas(windowWidth, windowHeight - 4);
  frameRate(60);
  background(200);
  rectMode(CENTER);

  for (let y = 0; y < height; y += minSize / 2 + space) {
    for (let x = 0; x < width; x += minSize / 2 + space) {
      cubes.push(new cube(x + space, y + space));
    }
  }
}

function draw() {
  background(90);
  for (let i = 0; i < cubes.length; i++) {
    cubes[i].cupdate();
    cubes[i].cdraw();
  }
}
