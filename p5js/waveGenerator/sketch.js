
function setup(){
  createCanvas(windowWidth,windowHeight-4);
  in_genlik = createInput("100");
  in_genlik.position(190, 10);
  in_genlik.size(50,20);
  in_frq = createInput("0.1");
  in_frq.position(120, 50);
  in_frq.size(50,20);
  in_thck = createInput("10");
  in_thck.position(200, 90);
  in_thck.size(50,20);
  button = createButton("START/STOP");
  button.position(280, 20);
  button.size(100,90);
  button.mousePressed(onoff);
}
/*
  Inputs:
    genlik,
    kalinlik,
    freq
*/
let run = true;
var a = 0,genlik=100,freq=0.1;
var y = new Array(800);
let uzunluk = 250,
    kalinlik= 10;

function draw(){
  if(run){
    uzunluk = parseInt(windowWidth/5-15);
    background(200);
    texts();
    fill(255);
    translate(40,windowHeight/2);
    stroke(0,0,0,60);
    strokeWeight(kalinlik*0.5);
    line(0,0,uzunluk*5,0);
    for(let i = 0;i<=parseInt(uzunluk*5);i+=100){
      noStroke();
      fill(255,0,0);
      ellipse(i,0,kalinlik/2);
    }
    noStroke();
    fill(0, 128, 255);
    ellipse(0,sin(a)*genlik,10,10);
    a+=freq;
    kaydir();
    y[0] = sin(a)*genlik;
    yaz();
  }
}

function texts(){
  noStroke();
  fill(0);
  textSize(20);
  text("Amplitude (Genlik): ",10,12,200,100);
  text("Frequency: ",10,52,200,100);
  text("Thickness (Kalınlık): ",10,92,200,100);
  textSize(10);
  text("* It's just a simulation, do not trust the values!",10,windowHeight-30,windowWidth,windowHeight);
}
function yaz(){
  for(var i = 0;i<uzunluk;i++){
    //ellipse(50+i*5,y[i],5,5);
    stroke(0);
    strokeWeight(kalinlik);
    if(i+1<uzunluk){
      line(10+i*5,y[i],10+(i+1)*5,y[i+1]);
    }
  }
}

function kaydir(){
  for(var i = uzunluk-2;i>=0;i--){
    y[i+1]=y[i];
  }
}

function onoff(){
  run = !run;
  genlik=parseFloat(in_genlik.value());
  freq=parseFloat(in_frq.value());
  kalinlik = parseInt(in_thck.value());
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight-4);
}
