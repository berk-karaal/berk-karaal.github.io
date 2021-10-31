var ball = [];
var n;
let img = new Array(10);
var buttons, maintexts;
var impactFont, ubuntuFont;
var instaImg, twitImg, youtImg;
var page = 0;
var maxPage = 2;

var lftBTN, rightBTN;
var newImg;

function preload() {
  /*
  if (windowHeight > windowWidth) {
    window.open("http://berk-karaal.github.io/mobile", "_self");
  }
  */

  buttons = loadJSON("json/buttons.json");
  maintexts = loadJSON("json/texts.json");
  impactFont = loadFont("fonts/impact.ttf");
  ubuntuFont = loadFont("fonts/ubuntu.ttf");
  rightBTN = loadImage("images/right_BTN.png");
  lftBTN = loadImage("images/left_BTN.png");
  newImg = loadImage("images/new.png");
  instaImg = loadImage("images/instagramCircle.png");
  twitImg = loadImage("images/twitterCircle.png");
  youtImg = loadImage("images/youtubeCircle.png");
  githubImg = loadImage("images/githubIcon.png");
  n = map(windowWidth + windowHeight, 800, 5000, 20, 150);
  if (n > 150) n = 150;
  if (n < 40) n -= 10;
  print(n);
}

function setup() {
  createCanvas(windowWidth, windowHeight - 5);
  background(255);
  for (let a = 0; a < n; a += 1) {
    ball.push(new balls());
  }
  imgRefresh();
}
let run = true;

function draw() {
  background(255, 255, 255);
  if (run) {
    for (let a = 0; a < n; a += 1) {
      ball[a].hesapla();
      ball[a].ciz();
    }
  }
  drawPanel();
  showMessages();
}

let titleA = 0;
let msgSize;

function drawPanel() {

  stroke(189, 123, 57);
  strokeWeight(5);
  fill(0, 0, 0, 50);
  rect(percent(1, 5), percent(2, 5), percent(1, 90), percent(2, 90)); //  frame

  strokeWeight(percent(1,Math.abs(sin(titleA))*0.5));
  titleA += 0.02;
  fill(0);
  stroke(209, 166, 65, 180);
  textFont(impactFont);
  textAlign(CENTER);
  textSize(imgWH / 2.5);
  text(maintexts.title, percent(1, 51), percent(2, 4) + imgWH / 2.5 + 15); // title

  fill(0);
  noStroke();
  textFont(ubuntuFont);
  textAlign(LEFT);
  msgSize = percent(2, 2);
  textSize(msgSize);
  text(maintexts.message, percent(1, 5), percent(2, 4)); // message

  drawSButtons();

  drawImages();

  fill(0);
  noStroke();
  textFont(ubuntuFont);
  textAlign(CENTER);
  textSize(msgSize * 2);
  text("Page " + (page + 1) + " of " + (maxPage + 1), percent(1, 50), percent(2, 93)); // page
}
let yx, yy, ywh, tx, ty, twh, ix, iy, iwh;
var ycwh = 0.3,
  ycwhMAX, tcwh = 0.25,
  tcwhMAX, icwh = 0.3,
  icwhMAX,
  gcwhMAX, gcwh=0;

function drawSButtons() {
  let bSpace = 0;
  iwh = percent(1, 4.4);
  ix = percent(1, 94) - bSpace - iwh / 2;
  iy = percent(2, 6) + iwh / 1.8;
  twh = percent(1, 4);
  tx = percent(1, 94) - bSpace - iwh * 3.3 / 2;
  ty = percent(2, 6) + iwh / 1.8;
  ywh = percent(1, 4);
  yx = percent(1, 94) - bSpace - iwh * 5.62 / 2;
  yy = percent(2, 6) + iwh / 1.8;
  gwh = percent(1, 3.5); //////////////////
  gx = percent(1, 5) + iwh/1.6;
  gy = percent(2, 6) + iwh / 2;
  noStroke();
  ycwhMAX = ywh * 1.1;
  tcwhMAX = twh * 1.1;
  icwhMAX = iwh * 1.1;
  gcwhMAX = iwh * 1.1;
  if (dist(mouseX, mouseY, yx, yy) < ywh * 1.1 / 2) {
    if (ycwh < 1) {
      ycwh += 0.05;
    }
  } else {
    if (ycwh > 0.3) {
      ycwh -= 0.01;
    }
  }
  fill(255, 0, 0, 50);
  ellipse(yx, yy, ycwhMAX * ycwh);
  if (dist(mouseX, mouseY, tx, ty) < twh * 1.1 / 2) {
    if (tcwh < 1) {
      tcwh += 0.05;
    }
  } else {
    if (tcwh > 0.25) {
      tcwh -= 0.01;
    }
  }
  fill(0, 172, 237, 50);
  ellipse(tx, ty, tcwhMAX * tcwh);
  if (dist(mouseX, mouseY, ix, iy) < iwh * 1.1 / 2) {
    if (icwh < 1) {
      icwh += 0.05;
    }
  } else {
    if (icwh > 0.3) {
      icwh -= 0.01;
    }
  }
  fill(147, 56, 160, 50);
  ellipse(ix, iy, icwhMAX * icwh);
  if (dist(mouseX, mouseY, gx, gy) < gwh * 1.1 / 2) {
    if (gcwh < 0.9) {
      gcwh += 0.1;
    }
  } else {
    if (gcwh > 0) {
      gcwh -= 0.05;
    }
  }
  fill(255, 100);
  ellipse(gx, gy, gcwhMAX * gcwh);

  imageMode(CENTER);
  image(githubImg, gx, gy, gwh, gwh);
  image(youtImg, yx, yy, ywh, ywh);
  image(twitImg, tx, ty, twh, twh);
  image(instaImg, ix, iy, iwh, iwh);
}

let imgWH;

function drawImages() {
  let index = 0;
  imgWH = percent(1, 9.5);
  while (percent(2, 35) + imgWH / 2 > percent(2, 35 * 2) - imgWH / 2 - 20) {
    imgWH -= 0.1;
  }
  imageMode(CENTER);
  for (let y = 0; y < 2; y++) {
    for (x = 0; x < 5; x++) {
      image(img[index], percent(1, 16.5 * (x + 1)), percent(2, 1) + percent(2, 35 * (y + 1)), imgWH, imgWH);
      if (buttons.b[index + (10 * page)].new) {
        image(newImg, percent(1, 16.5 * (x + 1)), percent(2, 1) + percent(2, 35 * (y + 1)), imgWH, imgWH);
      }
      index++;
    }
  }
  if (page > 0) {
    image(lftBTN, percent(1, 3), percent(2, 50), percent(1, 2.5), percent(2, 12)); // left button
  }
  if (page < maxPage) {
    image(rightBTN, percent(1, 97), percent(2, 50), percent(1, 2.5), percent(2, 12)); // right button
  }
}

function showMessages() {
  textAlign(LEFT);
  let index = 0;
  for (let y = 0; y < 2; y++) {
    for (x = 0; x < 5; x++) {
      if (dist(mouseX, mouseY, percent(1, 16.5 * (x + 1)), percent(2, 1) + percent(2, 35 * (y + 1))) < imgWH / 2 && buttons.b[index + (page * 10)].msg != "0") {
        if (x <= 2) {
          rect(percent(1, 16.5 * (x + 1)) - imgWH / 2, percent(2, 1) + percent(2, 35 * (y + 1)) - imgWH / 2, (percent(1, 16.5 * (x + 2)) + imgWH * 1.5) - percent(1, 16.5 * (x + 1)), imgWH);
          image(img[index], percent(1, 16.5 * (x + 1)), percent(2, 1) + percent(2, 35 * (y + 1)), imgWH, imgWH);
          noStroke();
          fill(255);
          textFont(ubuntuFont);
          textSize(msgSize * 1.1);
          text(buttons.b[index + (page * 10)].msg, percent(1, 16.5 * (x + 1)) + imgWH / 2 + 5, percent(2, 1) + percent(2, 35 * (y + 1)) - imgWH / 2 + 1, (percent(1, 16.5 * (x + 2)) + imgWH * 0.5) - percent(1, 16.5 * (x + 1)) - 5, imgWH - 1);
        } else {
          rect(percent(1, 16.5 * x) - imgWH, percent(2, 1) + percent(2, 35 * (y + 1)) - imgWH / 2, (percent(1, 16.5 * (x + 2)) + imgWH * 1.5) - percent(1, 16.5 * (x + 1)), imgWH);
          image(img[index], percent(1, 16.5 * (x + 1)), percent(2, 1) + percent(2, 35 * (y + 1)), imgWH, imgWH);
          noStroke();
          fill(255);
          textFont(ubuntuFont);
          textSize(msgSize * 1.1);
          text(buttons.b[index + (page * 10)].msg, percent(1, 16.5 * x) - imgWH + 5, percent(2, 1) + percent(2, 35 * (y + 1)) - imgWH / 2, (percent(1, 16.5 * (x + 2)) + imgWH * 1.5) - percent(1, 16.5 * (x + 1)) - imgWH, imgWH)
        }
      }
      index++;
    }
  }
}

function mousePressed() {
  let index = 0;
  for (let y = 0; y < 2; y++) {
    for (x = 0; x < 5; x++) {
      //image(img[index],percent(1,16.5*(x+1)),percent(2,1)+percent(2,35*(y+1)),imgWH,imgWH);
      if (dist(mouseX, mouseY, percent(1, 16.5 * (x + 1)), percent(2, 1) + percent(2, 35 * (y + 1))) < imgWH / 2 && buttons.b[index + (page * 10)].available == true) {
        window.open(buttons.b[index + (page * 10)].web, "_self");
      }
      index++;
    }
  }

  if (mouseX > percent(1, 97) - percent(1, 2.5) / 2 && mouseX < percent(1, 97) + percent(1, 2.5) / 2 && mouseY > percent(2, 50) - percent(2, 12) / 2 && mouseY < percent(2, 50) + percent(2, 12) / 2) {
    if (page < maxPage) {
      page++;
      imgRefresh();
    }
  }
  if (mouseX > percent(1, 3) - percent(1, 2.5) / 2 && mouseX < percent(1, 3) + percent(1, 2.5) / 2 && mouseY > percent(2, 50) - percent(2, 12) / 2 && mouseY < percent(2, 50) + percent(2, 12) / 2) {
    if (page > 0) {
      page--;
      imgRefresh();
    }
  }

  if (dist(mouseX, mouseY, yx, yy) < ywh * 1.1 / 2) {
    window.open("https://www.youtube.com/channel/UCWpnrDOJE-Yo70wdRf67bwQ");
  }
  if (dist(mouseX, mouseY, tx, ty) < twh * 1.1 / 2) {
    window.open("https://twitter.com/_BerkKaraal");
  }
  if (dist(mouseX, mouseY, ix, iy) < iwh * 1.1 / 2) {
    window.open("https://www.instagram.com/berkkaraal/");
  }
  if (dist(mouseX, mouseY, gx, gy) < gwh * 1.1 / 2) {
    window.open("https://github.com/berk-karaal");
  }

}

function imgRefresh() {
  for (let i = 0; i < 10; i++) {
    img[i] = loadImage(buttons.b[i + (10 * page)].img);
  }
}

class balls {
  constructor() {
    this.x = windowWidth / 2;
    this.y = (windowHeight - 4) / 2;
    this.r = random(0, 255);
    this.g = random(0, 255);
    this.b = random(0, 255);
    this.d = random(10, 50);
    this.xs = random(-5, 5);
    this.ys = random(-5, 5);
  }
  ciz() {
    strokeWeight(1);
    stroke(30, 30, 30);
    fill(this.r, this.g, this.b);
    circle(this.x, this.y, this.d)
  }
  hesapla() {
    if (this.x - this.d / 2 < 0) this.xs *= -1;
    if (this.x + this.d / 2 > windowWidth) this.xs *= -1;
    if (this.y - this.d / 2 < 0) this.ys *= -1;
    if (this.y + this.d / 2 > windowHeight - 4) this.ys *= -1;

    this.x += this.xs;
    this.y += this.ys;
  }
}

function percent(wOrH, perc) {
  if (wOrH == 1) {
    return (width * perc) / 100;
  } else {
    return (height * perc) / 100;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 4);
}
