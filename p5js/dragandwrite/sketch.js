let key,pX,pY,charNum=0;

function setup() {
  createCanvas(windowWidth,windowHeight-4);
  background(180);
  frameRate(60);
  textSize(30);
  textAlign(LEFT);
  let start = getURL().indexOf("txt=")+4;
  let url = decodeURIComponent(getURL());
  key = url.substring(start,url.length);
  for(let i =0;i<100;i++){
    key = key.replace("+"," ");
  }
  print(key);
}
function draw() {
  if(mouseIsPressed){
    if(dist(pX,pY,mouseX,mouseY)>textWidth(key.charAt(charNum))+5){
      xDist = pX - mouseX;
      yDist = pY - mouseY;
      push();
      if(xDist<0){
        translate(mouseX-xDist/2,mouseY);
        rotate(atan(yDist/xDist));
      }else{
        translate(mouseX+xDist/2,mouseY);
        rotate(3.15+atan(yDist/xDist));
      }
      text(key.charAt(charNum),0,0);
      pop();
      pX = mouseX;
      pY = mouseY;
      dragRate =0;
      charNum ++;
      if(charNum > key.length){
        charNum =0;
      }
    }
  }
}
function mousePressed(){
    pX = mouseX;
    pY = mouseY;
}
function mouseReleased(){
  charNum =0;
}