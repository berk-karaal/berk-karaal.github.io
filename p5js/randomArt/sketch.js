/*
  Created by Berk Karaal
  Youtube: https://www.youtube.com/channel/UCWpnrDOJE-Yo70wdRf67bwQ
  Made with the p5.js library
  p5.js: https://p5js.org/
*/

var walkers = []; // created a array for my walkers
var backg;

function setup() {
  createCanvas(windowWidth, windowHeight - 4);
  backg = color(220);
  background(backg);
}

let run = false,
  startUp = true,
  picking = false;

function draw() {
  if (run) { // Machine draws when run is true
    for (let i = 0; i < walkers.length; i++) {
      walkers[i].walk();
    }
  } else if (startUp) { // When page opened these codes will run
    background(backg);
    for (let i = 0; i < walkers.length; i++) {
      walkers[i].pretend(); // these codes will work to see the location of the balls
    }
    if (picking) {  // these code will work to pick a new walker
      strokeWeight(percent(0.0015));
      rectMode(CENTER);
      stroke(0, 0, 0, 200)
      fill(255, 255, 255, 80);
      rect(pickWalkerX, pickWalkerY, 100 * percent(0.002), 100 * percent(0.002));
      fill(255);
      ellipse(pickWalkerX, pickWalkerY, percent(0.066));
      stroke(0, 0, 0, 100);
      strokeWeight(percent(0.01));
      line(pickWalkerX, pickWalkerY, mouseX, mouseY);
      calculatePercent();

      // texts
      textAlign(LEFT);
      textSize(percent(0.02));
      fill(0);
      strokeWeight(percent(0.0015));
      text(Math.round(lperc)+"% left   --   "+(100-Math.round(lperc))+"% right",pickWalkerX-100 * percent(0.002)/2,pickWalkerY-100 * percent(0.0026)/2);
      text(Math.round(uperc)+"% up   --   "+(100-Math.round(uperc))+"% down",pickWalkerX-100 * percent(0.002)/2,pickWalkerY-100 * percent(0.0022)/2);
    }
  }
}

let pickWalkerX, pickWalkerY, lperc, uperc, walkerspeed = 5;

function calculatePercent() { // Walker values ​​are calculated with these codes
  if (pickWalkerX < mouseX) {
    lperc = 50 - (50 * (mouseX - pickWalkerX) / (pickWalkerX + 100 * percent(0.002) / 2 - pickWalkerX));
    if (lperc < 0) lperc = 0;
  } else {
    lperc = 50 + (50 * (pickWalkerX - mouseX) / (pickWalkerX - (pickWalkerX - 100 * percent(0.002) / 2)));
    if (lperc > 100) lperc = 100;
  }
  if (pickWalkerY < mouseY) {
    uperc = 50 - (50 * (mouseY - pickWalkerY) / (pickWalkerY + 100 * percent(0.002) / 2 - pickWalkerY));
    if (uperc < 0) uperc = 0;
  } else {
    uperc = 50 + (50 * (pickWalkerY - mouseY) / (pickWalkerY - (pickWalkerY - 100 * percent(0.002) / 2)));
    if (uperc > 100) uperc = 100;
  }
}

function mousePressed() {
  if (startUp) {
    pickWalkerX = mouseX;
    pickWalkerY = mouseY;
    picking = true;
  }
}


function mouseReleased() {
  picking = false;
  if (startUp) {
    walkers.push(new walker(pickWalkerX, pickWalkerY, lperc, uperc, walkerspeed)); // Adding new elements to walkers array
  }
}

function keyPressed() {
  if (keyCode == 32) {  // keyCode 32 = space
    if (startUp) {
      background(backg);
    }
    startUp = false;
    run = !run;
  }
}

class walker {
  constructor(x_, y_, lp_, up_, spd_) {
    this.x = x_;
    this.y = y_;
    this.lp = lp_;
    this.up = up_;
    this.speed = spd_;
    this.live = true;
  }

  walk() {
    if (this.live) {
      let rndm = random(0, 100);
      if (rndm < this.lp) {
        this.x -= this.speed; // go left
      } else {
        this.x += this.speed; // go right
      }

      rndm = random(0, 100);
      if (rndm < this.up) {
        this.y -= this.speed; // go up
      } else {
        this.y += this.speed; //go down
      }
      strokeWeight(percent(0.0015));
      stroke(0, 0, 0, 150);
      fill(random(0, 255), random(0, 255), random(0, 255));
      ellipse(this.x, this.y, percent(0.066));
      if (this.x - percent(0.066) / 2 > width || this.x + percent(0.066) / 2 < 0 || this.y - percent(0.066) / 2 > height || this.y + percent(0.066) < 0) {
        print("Someone died!"); // when someone cross the borders it should not walk anymore
        this.live = false;
      }
    }
  }

  pretend() {
    strokeWeight(percent(0.0015));
    stroke(0, 0, 0, 150);
    fill(255);
    ellipse(this.x, this.y, percent(0.066));
  }
}

function percent(p) { // I calculated it for different resolutions
  if (width < height) {
    return width * p;
  } else {
    return height * p;
  }
}
