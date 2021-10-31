class rain {
  constructor() {
    this.become();
  }

  update() {
    this.y += this.speed;
    this.x += this.xSpeed;
    if (this.x - this.size / 2 < 0 || this.x + this.size / 2 > width) {
      this.xSpeed *= -1;
    }
    if (this.y > height) {
      this.become();
    }
  }

  draw() {
    textSize(this.size);
    fill(this.clr);
    for (let i = 0; i < this.txt.length; i++) {
      push();
      translate(this.x, this.y + i * this.size);
      this.rot += this.rotSpeed;
      rotate(this.rot);
      text(this.txt.charAt(i), 0, 0);
      pop();
    }
  }

  become() {
    this.x = random(0, width);
    this.speed = random(1, 5);
    this.size = map(this.speed, 1, 5, 15, 40);
    this.txt = txtKey;
    this.y = -this.txt.length * this.size - random(0, 50);
    this.clr = color(random(0, 255), random(0, 255), random(0, 255), random(50, 255));
    this.rot = 0;
    this.rotSpeed = random(-0.040, 0.040);
    this.xSpeed = random(-3, 3);
  }
}
///////////////////////////////////////////////////////////////////////////////
var rains = [];
var txtKey = "";
let dropNum = 10;

function setup() {
  frameRate(60);
  createCanvas(windowWidth, windowHeight - 4);
  background(50);
  textAlign(CENTER);
  txtKey = decodeURIComponent(getURL());
  txtKey = txtKey.substring(txtKey.indexOf("?txt=") + 5);
  for (let i = 0; i < 100; i++) {
    txtKey = txtKey.replace("+", " ");
  }
  print(txtKey);
  dropNum = width / 40;
  print(dropNum);
  for (let i = 0; i < dropNum; i++) {
    rains.push(new rain());
  }
}

function draw() {
  background(20);
  for (let i = 0; i < dropNum; i++) {
    rains[i].update();
    rains[i].draw();
  }
}
