let nums = new Array(200);
let n;
let thick = 10,
    space = 4;
let x = space;
let run = true;
function setup() {
  createCanvas(windowWidth,windowHeight-4);
  background(34, 227, 140);
  n = windowWidth/(space + thick)-1;
  for(let i = 0;i<nums.length;i++){
    nums[i] = random(10,windowHeight-4-100);
  }
    frameRate(20);
}
let arraynum = 0,
    memo,
    change;
function draw() {
  if(run){
  background(34, 227, 140);
  text("Refresh for again (Of course it will be different values)",10,10,500,500);
  translate(0,windowHeight-4);
  x = space;
  for(let i = 0; i<n;i++){
    fill(map(nums[i],10,windowHeight-4-100,255,0));
	noStroke();
    rect(x,0,thick,-nums[i]);
    x+=space+thick;
  }

  if(arraynum < n){
    for(let i = arraynum;i<n;i++){
      if(nums[i]<nums[arraynum]){
        memo = nums[arraynum];
        nums[arraynum] = nums[i];
        nums[i] = memo;
      }
    }

    arraynum++;
  }
  if(arraynum == n){
    print(nums);
    arraynum++;
  }
  }
}

function mousePressed(){
  run = !run;
}
