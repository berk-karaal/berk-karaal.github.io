var bubble = new Array(400);

function setup() {
  createCanvas(windowWidth, windowHeight - 4);
  for (let i = 0; i < bubble.length; i++) {
    bubble[i] = new bubbles();
  }
  frameRate(50);
}
let bubbleN = 5;

function draw() {
  background(170, 213, 234);
  for (let i = 0; i < bubble.length; i++) {
    if (bubble[i].live) {
      bubble[i].b_update();
      bubble[i].b_show();
    }
  }
}
let value =0;
function mouseDragged(){
  value +=1;

  if(value>=3){
    let n =0;
    for(let i = 0;i<bubble.length;i++){
      if (!bubble[i].live) {
        if(n<bubbleN){
          n ++;
          bubble[i].b_create(mouseX,mouseY,pmouseX,pmouseY);
        }
      }
    }
    value = 0;
  }
}
