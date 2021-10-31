let speed = 8;
var fireworks = [10];
let n = 0;
let maxDistance = 800;
let childDistance = 25;
let thickness = 20;
var mode;

function setup() {
  createCanvas(windowWidth, windowHeight - 4);
  let start = getURL().indexOf("mode=") + 5;
  let url = decodeURIComponent(getURL());
  mode = url.substring(start, url.length);
  for (let i = 0; i < 10; i++) {
    fireworks[i] = new firework(0, 0, false);
  }
  mode *= 0.1;
  print(mode);
}


function draw() {
  background(45, 43, 74);
  for (let i = 0; i < fireworks.length; i++) {
    fireworks[i].fdraw();
  }
}

function mousePressed() {
  if(mouseButton === RIGHT){
    noLoop();
    return;
  }
  if (n < fireworks.length) {
    fireworks[n] = new firework(mouseX, mouseY, true);
    n++;
  } else {
    n = 0;
    fireworks[n] = new firework(mouseX, mouseY, true);
    n++;
  }

}


/////////////////////////////////////////////////////////////

class firework {
  constructor(x_, y_, run_) {
    this.x = x_;
    this.y = y_;
    this.speed = speed;
    this.r = -150;
    this.run = run_;
    this.thick = thickness;

    this.red = random(0, 255);
    this.g = random(0, 255);
    this.b = random(0, 255);
  }

  fdraw() {
    if (this.run) {
      push();
      translate(this.x, this.y);
      for (let i = 0; i < 21; i++) {
        noStroke();
        if (this.r < 0) {
          fill(this.red-this.red*0.6, this.g-this.g*0.6, this.b-this.b*0.6, map(this.r, 0, maxDistance, 255, 0));

          //fill(0, 0, 0, map(this.r, 0, maxDistance, 255, 0));
        } else {
          fill(this.red, this.g, this.b, map(this.r, 0, maxDistance, 255, 0));
        }
        rotate(mode);
        ellipse(0, this.r, this.thick, this.thick);
        let count = this.r / childDistance;
        if (count > 5) count = 5;
        for (let c = 1; c < count; c++) {
          ellipse(0, this.r - (c * 25), this.thick - (c * 4), this.thick - (c * 4));
        }

      }
      this.r += this.speed;
      pop();
    }
  }
}
