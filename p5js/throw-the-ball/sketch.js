let run = false,
  changeSpeed = false;
let bx = 0,
  by = 0,
  bwh = 60,
  speedX = 0,
  speedY = 0,
  gravity;
let key;
function setup() {
  createCanvas(windowWidth, windowHeight - 4);
  let start = getURL().indexOf("g=")+2;
  let url = decodeURIComponent(getURL());
  key = url.substring(start,url.length);
  gravity = parseFloat(key);
  if(isNaN(gravity)){
    print("Setting g to default.")
    gravity = 0.6;
  }
  print("g: "+gravity);
  bx = width / 2;
  by = height / 2;
}


function draw() {
  background(108, 182, 204);
  if (run) {
    speedY+=gravity;

    if(gravity!=0)  speedX = speedX*0.995;
    print("Y speed: "+speedY);
    if(bx-bwh/2<0||bx+bwh/2>width){
      speedX*=-1;
    }
    if(by+bwh/2>=height&&speedY>0){
      if(Math.abs(speedY)<3){
        speedY=0;
      }else{
        speedY=(speedY*-0.9)+gravity*5/6;
      }
    }
    if(by-bwh/2<0 && speedY<0){
      speedY*=-1;
    }
    bx += speedX;
    by += speedY;
  }
  strokeWeight(2);
  stroke(0);
  fill(193, 82, 199);
  ellipse(bx,by,bwh);
  if (mouseIsPressed) {
    run = false;
    if (dist(mouseX, mouseY, bx, by) < bwh / 2 && !changeSpeed) {
      changeSpeed = true;
    }
    if (changeSpeed) {
      strokeWeight(10);
      stroke(0,0,0,90);
      line(bx, by, mouseX, mouseY);
    }
  }
}

function mouseReleased() {
  if (changeSpeed) {
    speedX = (bx-mouseX)*0.1;
    speedY = (by-mouseY)*0.1;
    changeSpeed = false;
    run = true;
  }
}
