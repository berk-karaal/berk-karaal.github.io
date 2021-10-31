class fireworks_c{

  constructor() {

    var red = 0
    var green = 0;
    var blue = 0;

    var r = 0,t = 255;
    var x,y,centerX,centerY;
    var available = true;
  }

  fstart(){
    this.available = false;
    this.red= random(0,255);
    this.green= random(0,255);
    this.blue= random(0,255);
    this.r = 0;
    this.t = 255;
  }

  update(){
    this.r+= rspeed;
    this.t-= tspeed;
    if(this.t<0){
      this.available = true;
    }else{
      this.available = false;
    }
  }

  show(){
    for(let i =0;i<25;i++){
      this.x = cos(i)*this.r;
      this.y = sin(i)*this.r;
      strokeWeight(3);
      stroke(this.red,this.green,this.blue,this.t);
      line(this.centerX+cos(i)*(this.r-tail),this.centerY+sin(i)*(this.r-tail),this.centerX+this.x,this.centerY+this.y);
      strokeWeight(1);
      stroke(0,0,0,this.t);
      fill(this.red,this.green,this.blue,this.t);
      ellipse(this.centerX+this.x,this.centerY+this.y,size,size);
    }
  }

}
