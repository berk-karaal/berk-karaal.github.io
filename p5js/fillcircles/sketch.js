let img;
let dens;
var circles = [];
let wait = false;

function setup() {
  createCanvas(windowWidth, windowHeight - 4);
  frameRate(60);
  img = createImage(windowWidth, windowHeight - 4, RGB);
  pixelDensity(1);
  dens = pixelDensity();
  background(0);
  noStroke();
}
let num = 0;
let drawImg = true;

function draw() {
  if (!wait) {
    if (drawImg) {
      if (mouseIsPressed){
        stroke(255);
        strokeWeight(50);
        line(pmouseX,pmouseY,mouseX,mouseY);
        strokeWeight(1);
        ellipse(mouseX, mouseY, 50, 50);
      }
    } else {
      noStroke();
      while (num < 20) {
        createCircle();
        num++;
      }
      num = 0;
      for (let i = 0; i < circles.length; i++) {
        circles[i].c_update();
        circles[i].c_draw();
      }
    }
  }
}
let tryNum = 0;

function createCircle() {
  let rx = random(0, width);
  let ry = random(0, height);
  let become = true;
  for (let i = 0; i < circles.length; i++) {
    if (dist(rx, ry, circles[i].x, circles[i].y) - 5 < circles[i].r || brightness(img.get(int(rx), int(ry))) < 100) {
      become = false;
      break;
    }
  }
  if (become) {
    tryNum = 0;
    if (!(brightness(img.get(int(rx), int(ry))) < 100)) {
      circles.push(new classCircle(rx, ry, 5));
    }
  } else {
    if (tryNum < 1000) {
      tryNum++;
      createCircle();
    } else {
      tryNum = 0;
      print("FINISHED");
      drawImg = true;
      wait = true;
    }
  }
}

function keyPressed() {
  if (key == " " && drawImg) {
    print("PRINTING");
    loadPixels();
    img.loadPixels();
    for (let i = 0; i < (4 * (windowWidth * dens) * (windowHeight * dens)); i++) {
      img.pixels[i] = pixels[i];
    }
    updatePixels();
    img.updatePixels();
    pixelDensity(2);
    background(0);
    drawImg = false;
  }

}
