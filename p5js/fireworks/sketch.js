
var firework = new Array(15);

var rspeed = 9,tspeed = 4,size = 20,tail = 35;

function setup(){
  createCanvas(windowWidth,windowHeight-4);
  for(let i =0;i<firework.length;i++){
    firework[i] = new fireworks_c();
    firework[i].available = true;
  }
}

function draw(){
  background(45, 43, 74);
  for(let i =0;i<firework.length;i++){
     if(!firework[i].available){
       firework[i].update();
       firework[i].show();
    }
  }
}

function mousePressed(){
  for(let a =0;a<firework.length;a++){
    if(firework[a].available){
      firework[a].centerY = mouseY;
      firework[a].centerX = mouseX;
      firework[a].fstart();
      break;
    }
  }
}
