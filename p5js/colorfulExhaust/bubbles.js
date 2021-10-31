class bubbles{

  constructor(){
    var bubbleSize = random(5,15),
        xSpeed,ySpeed,t,x,y;
    var live = false;
    var r,g,b;
  }


  b_create(mx,my,px,py){
    this.bubbleSize = random(5,30);
    this.xSpeed = random(-2,5);
    this.ySpeed = random(-2,5);
    this.r = random(0,255);
    this.g = random(0,255);
    this.b = random(0,255);
    if(my-py > 0){
      this.ySpeed *= -1;
    }
    if(mx-px > 0){
      this.xSpeed *= -1;
    }
    this.t = 255;
    this.x = mx;
    this.y = my;
    this.live = true;
  }

  b_update(){
    this.x +=this.xSpeed;
    this.y +=this.ySpeed;
    if(this.t<0){
      this.live = false;
    }
    this.t -=3;
  }

  b_show(){
    stroke(0,0,0,map(this.t,255,0,50,0));
    fill(this.r,this.g,this.b,this.t);
    ellipse(this.x,this.y,this.bubbleSize,this.bubbleSize);
  }

}
