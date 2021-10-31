class classCircle{
  constructor(x_,y_,r_){
    this.grow=true;
    this.x = x_;
    this.y = y_;
    this.r = r_;
    this.red = int(random(0,255));
    this.green = int(random(0,255));
    this.blue = int(random(0,255));
  }

  c_update(){
    if(this.x+this.r>width || this.x-this.r<0 || this.y+this.r>height || this.y-this.r<0) this.grow = false;
    for(let i =0;i<circles.length;i++){
    if(dist(this.x,this.y,circles[i].x,circles[i].y)-2<circles[i].r+this.r && this.x != circles[i].x){
      this.grow=false;
    }
    }
    if(this.grow) this.r++;
  }

  c_draw(){
    fill(this.red,this.green,this.blue);
    ellipse(this.x,this.y,this.r*2,this.r*2);
  }
}
