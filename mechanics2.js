  let canvas = document.getElementById('background');
  let actionCanvas = document.getElementById('main');
  let ctx = canvas.getContext('2d');
  let actionCtx = actionCanvas.getContext('2d');
  let height = canvas.height;
  let width = canvas.width;
  let y1 = -50;
  let health = 3;

window.onload = function() {
  // createEnemy();
  

  document.getElementById("start-button").onclick = function() {
    drawBackground(ctx, width, height);
    createEnemy();
    drawEnemy();
    moveEnemy();
    animate();
  };

  function animate() {
    // console.log("animating");
    draw(car);
    
    window.requestAnimationFrame(animate);
  }
};


function drawBackground(ctx, width, height) {
  let col = width/5;
  let row = 160;
  ctx.fillStyle = "#f7f7e3";
  ctx.fillRect(0, 0, width, height)  
  
  
  //SLUDGE TILES
  ctx.fillStyle = "#5b5037";
  ctx.fillRect(2, (row*3)+1, width-4, (row/2))
 
 
 //TESTING TILES
  // ctx.fillStyle = "purple";
  // ctx.fillRect(2, 2, col-2, row-2)
  
  //VERTICAL BARS
  ctx.fillStyle = "#000000";
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
  ctx.fillRect(0, row*3.5, width, 5)
  ctx.fillRect(0, height-2, width, 2)
  //PLAYER COLOR BAR
  if(car.c==1){
    ctx.fillStyle = "red";
  }
  if(car.c==2){
    ctx.fillStyle = "blue";
  }
  if(car.c==3){
    ctx.fillStyle = "yellow";
  }
  ctx.fillRect(2, (row*3.5)+4, width-4, 125)
}

//PLAYER CHARACTER
var car = {
  x: 55,
  c: 1,
  moveLeft:  function() { this.x -= 182},
  moveRight: function() { this.x += 182},
}

function fire() {
  console.log(car.x);
  console.log(enemies[0].spawnPoint)
  if (car.x == enemies[0].spawnPoint - 30){
    console.log("HIT");
    y1 = -50;
    enemies.shift();
  }
  else{
    console.log("MISS");
  }
}

function draw(car) {
  var img = new Image();
  img.onload = function() { 
     ctx.drawImage(img, car.x, 575, 60, 100); 
  }
  img.src = "/Users/miketroianello/Desktop/Project1/STICKMAN.png"
}

//PLAYER MOVEMENTS
document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 37: 
      if(car.x >= 80) {
        car.moveLeft();  
          console.log('left',  car); 
          break;
        }
      else {
        break;
      }
   
    case 39: 
      if(car.x <= 700) { 
        car.moveRight(); 
          console.log('right', car); 
          break;
        } 
      else{
        break;
      }
    
    case 32: 
      fire();
      break;
    
    case 65:
      car.c=1;
      break;
    
    case 83:
      car.c=2;
      break; 

    case 68:
      car.c=3;
      break;



  }
  updateCanvas();
}


//ENEMIES
var enemies = [];

class Enemy{
  constructor(color, spawnPoint){
    this.color=color;
    this.spawnPoint=spawnPoint;
    this.y = 0;
  }
}

function createEnemy() {
  for(let i = 0; i<5; i++){
  let randomColor = Math.floor(Math.random() * 3)+1;
  let randomSpawn= Math.floor(Math.random() * 5) * 182 + 85;
  
  enemies.push(new Enemy(randomColor, randomSpawn))
  }
}

function drawEnemy () {
   if (enemies[0].color == 1){
    actionCtx.fillStyle = 'red';
   }
   else if (enemies[0].color == 2){
    actionCtx.fillStyle = 'blue';
   }
   else if (enemies[0].color == 3){
    actionCtx.fillStyle = 'yellow';
   }
  }

function clearCanvas() {
  actionCtx.clearRect(0,0,900,690);
}

function moveEnemy(){
  y1 += 1;
  clearCanvas();
  drawEnemy();
  actionCtx.beginPath();
  // actionCtx.fillStyle="red;"
  actionCtx.arc(enemies[0].spawnPoint, y1, 30, 270, 360);
  actionCtx.fill()
  actionCtx.stroke();
  if(y1 >= 532) {
    
    health--;
    y1=-50
    enemies.shift()

    drawEnemy()
  }
  // if (health<=0){
  //   alert("YOU LOSE")
  // }
 window.requestAnimationFrame(moveEnemy);
}

// window.requestAnimationFrame(moveEnemy);

function updateCanvas(){
  ctx.clearRect(0,0, width ,height);
  drawBackground(ctx, width, height);
  animate();
}