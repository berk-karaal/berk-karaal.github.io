let ew = 30,
    eh = 30,
    ey ,
    ex ,
    xSpeed = 8,
    ySpeed = 0;

let game = false,
    score1 = 0,
    score2 = 0,
    hint = true;

function setup() {
  createCanvas(windowWidth - 5, windowHeight - 5);
  ex = width/2;
  ey=height/2;
  background(0);
}

let rectH = 100,
  rectW = 15,
  r1Y = 10,
  r2Y = 10;

let w = false,
    s = false,
    o = false,
    l = false;

function draw() {
  background(0);
  if(w && r1Y>0) r1Y -= 8;
  if(s && r1Y<height-rectH) r1Y += 8;
  if(o && r2Y>0)  r2Y -= 8;
  if(l && r2Y<height-rectH) r2Y += 8;
  if(game){
    ex += xSpeed;
    ey += ySpeed;
    if(ex>width-(10+rectW+ew/2) && ey<r2Y+rectH+eh-5 && ey>r2Y-eh+5){
      xSpeed = -random(6,23);
      ySpeed = random(-7,7);
    }else if(ex<10+rectW+ew/2 && ey<r1Y+rectH+eh-5 && ey>r1Y-eh+5){
      xSpeed = random(6,23);
      ySpeed = random(-7,7);
    }else if(ex>width-20){
      // player 1 scored
      game = false;
      ex = width/2;
      ey=height/2;
      score1++;
      hint = true;
    }else if(ex<20){
      // player 2 scored
      game = false;
      ex = width/2;
      ey=height/2;
      score2 ++;
      hint = true;
    }

    if(ey<ew/2+5){
      ySpeed *=-1;
    }else if(ey>height-(ew/2)){
      ySpeed *=-1;
    }
  }


  stroke(255);
  fill(255);
  if(hint){
    textSize(15);
    text("press SPACE to start",width/2-70,60);
    text("up: W",30,r1Y+15);
    text("down: S",30,r1Y+45);
    text("up: O",width-(70+rectW),r2Y+15);
    text("down: L",width-(70+rectW),r2Y+45);
  }
  textSize(30);
  text(score1+" - "+score2,width/2-35,35);
  ellipse(ex,ey,ew,eh);
  rect(width-10-rectW,r2Y,rectW,rectH);
  rect(10, r1Y, rectW, rectH);
  epx = ex;
  epy = ey;
}

function keyPressed(){
  if(key == "w")  w = true;
  if(key == "s")  s = true;
  if(key == "o")  o = true;
  if(key == "l")  l = true;
  if(key == " "){
    if(!game){
      if((score1 + score2) % 2 == 0){
        xSpeed = 5;
      }else{
        xSpeed = -5;
      }
      ySpeed = 0;
      game = true;
      hint = false;
    }
  }
}

function keyReleased(){
    if(key == "w")  w = false;
    if(key == "s")  s = false;
    if(key == "o")  o = false;
    if(key == "l")  l = false;
}
