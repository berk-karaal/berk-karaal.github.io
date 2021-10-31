var ball = new Array(500);
var n = 100;

function setup() {
  createCanvas(windowWidth, windowHeight - 4);
  background(255);
  n = map(windowWidth+windowHeight,800,5000,20,500);
  if(n>500) n=500;
  print(n);
  for(let a = 0;a<n;a+=1){
    ball[a] = new balls();
  }
}


function draw() {
  background(255,255,255);
  for(let a = 0;a<n;a+=1){
    ball[a].hesapla();
    ball[a].ciz();
  }
}


class balls{
  constructor(){
    this.x = windowWidth / 2;
    this.y = (windowHeight-4)/2;
    this.r = random(0,255);
    this.g = random(0,255);
    this.b = random(0,255);
    this.d = random(10,50);
    this.xs = random(-5,5);
    this.ys = random(-5,5);
  }
  ciz() {
    strokeWeight(1);
    stroke(30,30,30);
    fill(this.r,this.g,this.b);
    circle(this.x, this.y,this.d)
  }
  hesapla(){
    if(this.x-this.d/2<0)  this.xs *=-1;
    if(this.x+this.d/2>windowWidth)  this.xs *=-1;
    if(this.y-this.d/2<0)  this.ys *=-1;
    if(this.y+this.d/2>windowHeight-4)  this.ys *=-1;

    this.x += this.xs;
    this.y += this.ys;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight-4);
}
