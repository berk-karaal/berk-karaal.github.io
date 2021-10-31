function setup() {
  createCanvas(windowWidth, windowHeight - 4);
  background(200);
  let start = getURL().indexOf("num=")+4;
  let url = decodeURIComponent(getURL());
  key = url.substring(start,url.length);
  print(key);
  n = key;
  if(!(n>1)){
    n = 100;
  }
}
let n = 100;
let a = 0;
let run = true;
let speed = 0.000002;
function draw() {
  if (run) {
    background(200);
    translate(width / 2, height / 2);
    for (let i = 0; i < n; i++) {
      a -= speed;
      rotate(a);
      strokeWeight(i/3);
      stroke(0,0,0,150);
      point(0, i*3);
      }
  }
}

function mousePressed(){
  run = !run;
}

function keyPressed(){
  if(key == "w"){
    speed += 0.0000015;
  }else if(key == "s"){
    speed -= 0.0000015;
  }
}
