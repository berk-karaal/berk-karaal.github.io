var lines = new Array(500);

function setup() {
  createCanvas(windowWidth,windowHeight-4);
  background(255);
  for(let i=0;i<lines.length;i++){
    lines[i] = new Line();
  }
}


function draw() {
  background(255);
  stroke(66, 155, 245);
  for(let i=0;i<lines.length;i++){
    lines[i].calculate();
    lines[i].write();
  }
}

function windowResized(){
    resizeCanvas(windowWidth,windowHeight-4);
}

class Line{


  constructor(){
    this.restart();
  }



  restart(){
    this.x = random(windowWidth);
    this.y = random(-150,-250);
    this.z = random(1,16);
    this.thickness = map(this.z,1,16,2,8);
    this.leng = map(this.z,1,16,9,25);
    this.speed = map(this.z,1,16,1.5,6.5);
  }




  calculate(){
    if(this.y > windowHeight+this.leng){
      this.restart();
    }
    this.y += this.speed;
  }

  write(){
    strokeWeight(this.thickness);
    line(this.x,this.y,this.x,this.y+this.leng);
  }
}
