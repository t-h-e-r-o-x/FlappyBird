const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
//create image variables
const bird = new Image(38,26);
const bg = new Image(900, 504);
const fg = new Image(501,118);
const pipeNorth = new Image(52,242);
const pipeSouth = new Image(52,378);
//loading images
bird.src = "Images/bird.png";
bg.src = "Images/bg5.png";
fg.src = "Images/fg4.png";
pipeNorth.src = "Images/pipeNorth.png";
pipeSouth.src = "Images/pipeSouth.png";
//position of bottom pillar
var gap = 85;
var c = (pipeNorth.height + gap);
var bx = 19;
var by = 150;
var g = 1.8;
var score = 0;
//audio files
var press = new Audio();
var success = new Audio();

press.src = "Sounds/fly.mp3";
success.src = "Sounds/score.mp3";
//on key presses
document.addEventListener("keydown", moveUp);
function moveUp () {
  by -= 35;
  press.play();
}
//pipe coordinates
var pipe = [];
pipe[0] = {
  x : cvs.width,
  y : 0
}
//drawing images onto canvas
function draw() {
  ctx.drawImage(bg,0,0);

  for(var i = 0; i < pipe.length ; i++){
  ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
  ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y + c);
  pipe[i].x--;
  if(pipe[i].x == 460){
    pipe.push({
      x: cvs.width,
      y: Math.floor(Math.random()*pipeNorth.height) - pipeNorth.height
    });
  }
  if((bx + bird.width >= pipe[i].x) && (bx <= pipe[i].x + pipeNorth.width)
  && ((by <= pipe[i].y + pipeNorth.height) || (by + bird.height >= pipe[i].y + c))
  || by + bird.height >= cvs.height - fg.height ){
    location.reload();
  }
  if(pipe[i].x == 5){
    score++;
    success.play();
  }
}
  ctx.drawImage(fg,0,cvs.height - fg.height);
  ctx.drawImage(bird, bx, by);
  by += g;
  ctx.fillStyle = "black";
  ctx.font = "20px Verdana";
  ctx.fillText("Score:" + score, 10,cvs.height-20);
  requestAnimationFrame(draw);
}

window.onload = function(){
  draw();
}
