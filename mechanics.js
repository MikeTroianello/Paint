//PRELIMINARY VARIABLES

let canvas = document.getElementById('game-board');
let ctx = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 690;
var primaryColors = ["red", "blue", "yellow"];
var floorColors = ["red", "blue", "yello", "sludge"]


let column = {
  width: 180,
  height: 690,
}


let tile = {
  width: 180,
  height: 100,
}












//THIS IS THE START OF THE GAME

document.getElementById("start-button").onclick = function() {
  // $("#start-button").toggle();
  drawLayout(ctx, canvas.width, canvas.height);
  animate()
};

function animate() {
  console.log("animating");
  draw(player);
  drawLayout(ctx, canvas.width, canvas.height);
  draw(ctx, width, height);
  window.requestAnimationFrame(animate);
}

function drawLayout(ctx, width, height) {
  let col = width/5;
  let row = 160;
  ctx.fillStyle = "#f7f7e3";
  ctx.fillRect(0, 0, width, height)  
  ctx.fillStyle = "#000000";
  
  //VERTICAL BARS
  ctx.fillRect(0, 0, 2, height) 
  ctx.fillRect(col, 0, 3, row*3.5) 
  ctx.fillRect(col*2, 0, 3, row*3.5) 
  ctx.fillRect(col*3, 0, 3, row*3.5) 
  ctx.fillRect(col*4, 0, 3, row*3.5) 
  ctx.fillRect(width-2, 0, 2, height) 
  //HORIZONTAL BARS
  ctx.fillRect(0, 0, width, 3)
  ctx.fillRect(0, row, width, 2)
  ctx.fillRect(0, row*2, width, 2)
  ctx.fillRect(0, row*3, width, 2)
  ctx.fillRect(0, row*3.5, width, 2)
  ctx.fillRect(0, height-2, width, 2)
  
  // ctx.fillStyle = "#FFF";
  // ctx.fillRect(40, 0, 10, height) 
}

function drawPlayer() {

}

function animate() {

}


//THIS IS FOR MOVING THE PLAYER

var player = {
  
  moveLeft:  function() { this.x -= 160, placement --},
  moveRight: function() { this.x += 160, placement ++},
}

function draw(player) {
  var img = new Image();
  img.onload = function() { 
     ctx.drawImage(img, 50, 600, 50, 100); 
  }
  img.src = "https://upload.wikimedia.org/wikipedia/en/1/13/Stick_figure.png"
}

document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 37: player.moveLeft();  console.log('left',  player); break;
    case 39: player.moveRight(); console.log('right', player); break;
  }
  updateCanvas();
}

function updateCanvas(){
  ctx.clearRect(0,0, canvas.width ,canvas.height);
  drawLayout(ctx, canvas.width, canvas.height);
  // animate();
}