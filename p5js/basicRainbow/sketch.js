class drawCirc {

  constructor(r_, ang_, cr_, cg_, cb_, max_) {
    this.r = r_;
    this.ang = ang_;
    this.x = 0;
    this.y = 0;
    this.cr = cr_;
    this.cg = cg_;
    this.cb = cb_;
    this.max = max_;
    this.min = ang_;
  }

  c_draw() {
    if (true) {
      this.x = cos(this.ang) * (this.r * 2);
      this.y = sin(this.ang) * (this.r * 1.6);
      let fr, fg, fb,thck;
      if (keyIsDown(RIGHT_ARROW)&&!(this.ang > this.max)) {
        this.ang += drawSpeed;
        this.fr = this.cr;
        this.fg = this.cg;
        this.fb = this.cb;
        thck = 30;
      } else if (keyIsDown(LEFT_ARROW)&&!(this.ang <= this.min)) {
        this.ang -= drawSpeed;
        this.fr = 255;
        this.fg = 255;
        this.fb = 255;
        thck =32;
      }
      fill(this.fr, this.fg, this.fb);
      noStroke();
      ellipse(this.x, this.y, thck);
    }
  }

}

///////////////////////////////////////////////////////////////////////////////

var l = [7];
let drawSpeed = 0.017;

function setup() {
  createCanvas(windowWidth, windowHeight - 4);
  frameRate(60);
  
  l[0] = new drawCirc(200, 9.72, 129, 116, 210, 12.27);
  l[1] = new drawCirc(216, 9.7, 0, 0, 255, 12.30);
  l[2] = new drawCirc(232, 9.68, 1, 160, 199, 12.32);
  l[3] = new drawCirc(248, 9.66, 0, 255, 0, 12.34);
  l[4] = new drawCirc(264, 9.64, 255, 255, 0, 12.36);
  l[5] = new drawCirc(280, 9.62, 255, 127, 0, 12.38);
  l[6] = new drawCirc(296, 9.6, 255, 0, 0, 12.4);
}


function draw() {
  noStroke();
  strokeWeight(1);
  fill(0);
  text("Press right arrow to draw, press left arrow to erase.",10,10,200,100);

  translate(width / 2, height - 100);
  for (let i = 0; i < l.length; i++) l[i].c_draw();
}
