function setup() {
  if(windowWidth<windowHeight){
    createCanvas(windowWidth*0.99,windowWidth*0.99);
  }
  else{
    createCanvas(windowHeight*0.99,windowHeight*0.99);
  }
  background(200);
  frameRate(20);
}

let a=1,
  b=0,
  c=0;  // ax² + bx + c

function draw() {
  background(200);
  translate(width/2,height/2);
  drawAxis();
  drawParabola();
  printText();
  drawUI();
}

function drawUI(){
  let btnColor = color(222, 62, 142);
  let btnBack = color(87, 79, 83);
  textAlign(CENTER,CENTER);
  noStroke();

  fill(btnBack);
  ellipse(-width/2+percent(3),-height/2+percent(10),percent(4));
  textSize(percent(8));
  fill(btnColor);
  text("-",-width/2+percent(3),-height/2+percent(10));
  fill(0);
  textSize(percent(4));
  text("a",-width/2+percent(6.5),-height/2+percent(10));
  fill(btnBack);
  ellipse(-width/2+percent(10),-height/2+percent(10),percent(4));
  fill(btnColor);
  textSize(percent(5));
  text("+",-width/2+percent(10),-height/2+percent(10.4));

  fill(btnBack);
  ellipse(-width/2+percent(3),-height/2+percent(16),percent(4));
  textSize(percent(8));
  fill(btnColor);
  text("-",-width/2+percent(3),-height/2+percent(16));
  fill(0);
  textSize(percent(4));
  text("b",-width/2+percent(6.5),-height/2+percent(16));
  fill(btnBack);
  ellipse(-width/2+percent(10),-height/2+percent(16),percent(4));
  fill(btnColor);
  textSize(percent(5));
  text("+",-width/2+percent(10),-height/2+percent(16.4));

  fill(btnBack);
  ellipse(-width/2+percent(3),-height/2+percent(22),percent(4));
  textSize(percent(8));
  fill(btnColor);
  text("-",-width/2+percent(3),-height/2+percent(22));
  fill(0);
  textSize(percent(4));
  text("c",-width/2+percent(6.5),-height/2+percent(22));
  fill(btnBack);
  ellipse(-width/2+percent(10),-height/2+percent(22),percent(4));
  fill(btnColor);
  textSize(percent(5));
  text("+",-width/2+percent(10),-height/2+percent(22.4));
}


function mousePressed(){
  if(dist(mouseX-width/2,mouseY-width/2,-width/2+percent(3),-height/2+percent(10))<percent(2)){
    a -=1;
  }else if(dist(mouseX-width/2,mouseY-width/2,-width/2+percent(10),-height/2+percent(10))<percent(2)){
    a +=1;
  }else if(dist(mouseX-width/2,mouseY-width/2,-width/2+percent(3),-height/2+percent(16))<percent(2)){
    b -=1;
  }else if(dist(mouseX-width/2,mouseY-width/2,-width/2+percent(10),-height/2+percent(16))<percent(2)){
    b +=1;
  }else if(dist(mouseX-width/2,mouseY-width/2,-width/2+percent(3),-height/2+percent(22))<percent(2)){
    c -=1;
  }else if(dist(mouseX-width/2,mouseY-width/2,-width/2+percent(10),-height/2+percent(22))<percent(2)){
    c +=1;
  }
}


function printText(){
  textAlign(LEFT,TOP);
  stroke(200);
  strokeWeight(percent(0.1));
  fill(0);
  textSize(percent(4));
  text("f(x)="+a+"x²"+(b<0 ? "":"+")+b+"x"+(c<0 ? "":"+")+c,-width/2+percent(1),-height/2+percent(1));
}

function drawParabola(){
  stroke(0);
  strokeWeight(percent(0.2));
  let speed = 0.5;
    for(let i = -width/2;i<=width/2;i+= speed){
      k = map(i,-width/2,width/2,-50,50);
      line(i-speed,-a*Math.pow(k-speed,2)+-b*(k-speed)+(-c)*2,i,-a*Math.pow(k,2)+-b*k+(-c)*2);
    }
}

function drawAxis(){
  stroke(173, 164, 163);
  strokeWeight(percent(0.1));
  line(-width/2,0,width/2,0,percent(0.5)); // x axis
  line(0,-height/2,0,height/2,percent(0.5)); // y axis
  noStroke();
  fill(227, 170, 163);
  ellipse(0,0,percent(1));  // origin dot
  fill(230, 117, 103);
  textSize(percent(3.5));
  text("x",width/2-percent(2),-percent(2));
  text("y",percent(2),-height/2+percent(2));
}

function keyPressed(){
  if(key == "a"){
    a += 1;
    print("a: "+a);
  }else if(key == "z"){
    a -= 1;
    print("a: "+a);
  }else if(key == "b"){
    b += 1;
    print("b: "+b);
  }else if(key == "g"){
    b -= 1;
    print("b: "+b);
  }else if(key == "c"){
    c += 1;
    print("c: "+c);
  }else if(key == "d"){
    c -= 1;
    print("c: "+c);
  }
}

function percent(perc){
  return perc*width/100;
}
