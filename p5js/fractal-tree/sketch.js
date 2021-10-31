var l = 200;
var r = 0;
var rSldr;
var pSldr;
function setup() {
  createCanvas(windowWidth,windowHeight-4);
  background(230);
  translate(windowWidth/2,windowHeight-4);
  l = map(windowHeight,444,665,120,200);
  rSldr = createSlider(1,15, 5);
  rSldr.position(20, 20);
    frameRate(1);
  //noLoop();
}


function draw() {
  if(rSldr.value() != pSldr){
    background(230);
    strokeWeight(1);
    text(rSldr.value(),20,50,300,30);
    translate(windowWidth/2,windowHeight-4);
    dline(l);
    pSldr = rSldr.value();
  }
}

function dline(long){
  if(long>1){
    stroke(255-map(long,1,l,50,255));
    strokeWeight(map(long,0,l,1,10));
    line(0,0,0,-long);
    push();
    translate(0,-long);
    rotate(rSldr.value()*0.1);
    dline(long*0.7);
    rotate(-rSldr.value()*0.1*2);
    dline(long*0.7);
    pop();
  }
}
