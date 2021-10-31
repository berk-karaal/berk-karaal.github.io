let wh;

function setup() {
  createCanvas(windowWidth, windowHeight - 4);
  background(200);
  if (width < height) {
    wh = 1;
  } else {
    wh = 2;
  }
}

/*
  0 --> empty
  1 --> X
  2 --> O
*/
var letters = [" ", "X", "O"];
var elements = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];
let turn = 1;
let finished = false;

function draw() {
  if(!finished){
    background(200);
  }
  drawLines();
  drawElements();
}

function drawLines() {
  stroke(58, 61, 61);
  strokeWeight(percent(wh,1));
  //horizontal lines
  line(percent(wh, 10), percent(wh, 35), percent(wh, 85), percent(wh, 35));
  line(percent(wh, 10), percent(wh, 60), percent(wh, 85), percent(wh, 60));
  //vertical lines
  line(percent(wh, 35), percent(wh, 10), percent(wh, 35), percent(wh, 85));
  line(percent(wh, 60), percent(wh, 10), percent(wh, 60), percent(wh, 85));
}

function drawElements() {
  strokeWeight(percent(wh,2));
  textAlign(CENTER);
  textSize(percent(wh, 20));
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      if(elements[y][x]==1){
        fill(255,0,0);
      }else{
        fill(0,0,255);
      }
      text(letters[elements[y][x]], percent(wh, 22 + (x * 25)), percent(wh, 30 + (y * 25)));
    }
  }
}

function mousePressed() {
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      if (mouseX > percent(wh, 10 + (x * 25)) && mouseX < percent(wh, 35 + (x * 25)) && mouseY > percent(wh, 10 + (y * 25)) && mouseY < percent(wh, 35 + (y * 25)) && elements[y][x] == 0 && !finished) {
        turn++;
        elements[y][x] = turn % 2 + 1;
        check();
        break;
      }
    }
  }
}

function check(){
  if(elements[0][0]==elements[0][1] && elements[0][0]==elements[0][2] && elements[0][2] != 0){
    finishMessage(elements[0][0]);
  }else if(elements[1][0]==elements[1][1] && elements[1][0]==elements[1][2]&& elements[1][2] != 0){
    finishMessage(elements[1][0]);
  }else if(elements[2][0]==elements[2][1] && elements[2][0]==elements[2][2]&& elements[2][2] != 0){
    finishMessage(elements[2][0]);
  }else if(elements[0][0]==elements[1][0] && elements[0][0]==elements[2][0]&& elements[2][0] != 0){
    finishMessage(elements[0][0]);
  }else if(elements[0][1]==elements[1][1] && elements[0][1]==elements[2][1]&& elements[2][1] != 0){
    finishMessage(elements[0][1]);
  }else if(elements[0][2]==elements[1][2] && elements[0][2]==elements[2][2]&& elements[2][2] != 0){
    finishMessage(elements[0][2]);
  }else if(elements[0][2]==elements[1][1] && elements[0][2]==elements[2][0]&& elements[2][0] != 0){
    finishMessage(elements[0][2]);
  }else if(elements[0][0]==elements[1][1] && elements[0][0]==elements[2][2]&& elements[2][2] != 0){
    finishMessage(elements[0][0]);
  }else if(turn == 10){
    noLoop();
    textAlign(LEFT);
    noStroke();
    textSize(percent(wh,5));
    fill(0);
    text("DRAW! Refresh page for play again",percent(wh,10),percent(wh,7));
    finished = true;
  }
}

function finishMessage(winner){
  noLoop();
  textAlign(LEFT);
  noStroke();
  textSize(percent(wh,5));
  if(winner == 1){
    fill(255,0,0);
  }else{
    fill(0,0,255);
  }

  text("Winner is "+letters[winner]+" ! Refresh page for play again",percent(wh,10),percent(wh,7));
  finished = true;
}

function percent(widthHeight, perc) {
  if (widthHeight == 1) {
    return (width * perc) / 100;
  } else {
    return (height * perc) / 100;
  }
}
