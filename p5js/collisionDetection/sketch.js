let red;
function setup() {
  red=color(255,0,0,255);
  createCanvas(600,600);
  background(200);
  rectMode(CENTER);
}

let rx=300,ry=300,rwh=50;
let collision = false;
function draw() {
  background(200);
  fill(255);
  rect(rx,ry,rwh,rwh);
  checkCollision(mouseX,mouseY,rwh,rx,ry,rwh);
  if(collision) fill(red);
  rect(mouseX,mouseY,rwh,rwh);
}

function checkCollision(bx,by,bwh,ax,ay,awh) {
                    //  r1x,r1y,r1wh,r2x,r2y,r2wh
  if((bx+(bwh/2)>=ax-(awh/2) && bx+(bwh/2)<=(ax+awh/2)||(bx-(bwh/2)>=ax-(awh/2)) && bx-(bwh/2)<=(ax+awh/2)) && ( (by+(bwh/2)>=ay-(awh/2) && by+(bwh/2)<=ay+(awh/2))||(by-(bwh/2)>=ay-(awh/2) && by-(bwh/2)<=ay+(awh/2)) ) ){ // case 1
    collision = true;
  }else{
    collision=false;
  }
}
