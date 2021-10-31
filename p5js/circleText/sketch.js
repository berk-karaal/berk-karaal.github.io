let txt = "";
// /?txt=Hello+World
function setup() {
  createCanvas(windowWidth,windowHeight-4);
  background(255);
  textAlign(LEFT);
  textSize(16);
  let start = getURL().indexOf("txt=")+4;
  let url = decodeURIComponent(getURL());
  txt = url.substring(start,url.length);
  for(let i =0;i<100;i++){
    txt = txt.replace("+"," ");
  }
  print(txt);
}

let rot = 0;
function draw() {
  rot +=0.01;
  background(255);
  translate(width/2,height/2);
  rotate(rot);
  for(let i = 0;i<21;i++){
    rotate(0.3);
    let x = 0;
    for(let c=0;c<txt.length;c++){
      textSize(map(c,0,10,10,60));
      text(txt.charAt(c),50+x,0);
      x+=textWidth(txt.charAt(c));
    }
  }
}
