let inUst, inAlt, btnOnay;

function setup() {
  createCanvas(windowWidth, windowHeight-4);
  background(0);
  inUst = createInput("21");
  inUst.position(65, 5);
  inUst.size(40, 15);
  inAlt = createInput("30");
  inAlt.position(65, 35);
  inAlt.size(40, 15);
  texts();
  btnOnay = createButton("ÇALIŞTIR");
  btnOnay.position(10, 95);
  btnOnay.size(100, 50);
  btnOnay.mousePressed(calis);
}

function texts() {
  fill(255);
  text("Üst boy:", 5, 5, inUst.x, 15);
  text("Alt boy:", 5, 35, inUst.x, 15);
}

let dtop = {
  d: 10
}
let genislik = 0.5;

function calis() {
  if (inUst.value() % 3 != 0) inUst.value(parseInt(inUst.value()) + 3 - (inUst.value() % 3));
  resizeCanvas(windowWidth, (parseInt(inUst.value()) + parseInt(inAlt.value())) * dtop.d + 100);
  print("h: " + (inUst.value() + inAlt.value()));
  let cmiktar = 1;
  background(0);
  translate(0, 0);
  texts();
  translate(width / 2, 20);
  fill(50, 168, 82);
  for (let i = 0; i < inUst.value(); i++) {
    for (let c = 0; c < cmiktar; c++) {
      ellipse(c * dtop.d, dtop.d / 2, dtop.d);
    }
    cmiktar += genislik * 2;
    translate(-genislik * dtop.d, dtop.d);
  }

  translate((Math.floor(cmiktar / 3) + 1) * dtop.d, 0);
  translate(-dtop.d / 2, 0);
  print(cmiktar);
  cmiktar = Math.floor(cmiktar / 3);
  for (let i = 0; i < inAlt.value(); i++) {
    for (let c = 0; c < cmiktar; c++) {
      ellipse(c * dtop.d, dtop.d / 2, dtop.d);
    }
    cmiktar += genislik * 2;
    translate(-genislik * dtop.d, dtop.d);
  }
}
