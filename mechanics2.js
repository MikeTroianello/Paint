  let canvas = document.getElementById('background');
  let actionCanvas = document.getElementById('main');
  let ctx = canvas.getContext('2d');
  let actionCtx = actionCanvas.getContext('2d');
  let height = canvas.height;
  let width = canvas.width;
  let y1=0;

  //PRELIMINARY VARIABLES


// var primaryColors = ["red", "blue", "yellow"];
// var floorColors = ["red", "blue", "yello", "sludge"]


// let column = {
//   width: 180,
//   height: 690,
// }


// let tile = {
//   width: 180,
//   height: 100,
// }


window.onload = function() {
  createEnemy();
  

  document.getElementById("start-button").onclick = function() {
    drawBackground(ctx, width, height);
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


var car = {
  x: 55,
  c: 1,
  moveLeft:  function() { this.x -= 182},
  moveRight: function() { this.x += 182},
  fire: function() {console.log("FIRE")},
  changeColor: function() {
    if (car.c==1){
      console.log("Red")
    }
    else if (car.c==2){
      console.log("Blue")
    }
    else if (car.c==3){
      console.log("Yellow")
    }
    else {
      console.log("ERROR")
    }
  }
}

function draw(car) {
  var img = new Image();
  img.onload = function() { 
     ctx.drawImage(img, car.x, 575, 60, 100); 
  }
  img.src = "/Users/miketroianello/Desktop/Project1/STICKMAN.png"
}

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
      car.fire();

      break;
    
    case 65:
      car.c=1;
      car.changeColor();
      break;
    
    case 83:
      car.c=2;
      car.changeColor();
      break; 

    case 68:
      car.c=3;
      car.changeColor();
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
  
  let randomColor = Math.floor(Math.random() * 3);
  let randomSpawn= Math.floor(Math.random() * 5) * 182 + 55;
  
  enemies.push(new Enemy(randomColor, randomSpawn))
}

function drawEnemy () {
  for (let i = 0; i < enemies.length; i++){
   if (enemies[i].color == 1){
    actionCtx.fillStyle = 'red';
   }
   else if (enemies[i].color == 2){
    actionCtx.fillStyle = 'blue';
   }
   else if (enemies[i].color == 3){
    actionCtx.fillStyle = 'yellow';
   }
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
  actionCtx.arc(85, y1, 30, 0, 90);
  actionCtx.stroke();
  if(y1 >= 520) {
    y1=-30
  }
 window.requestAnimationFrame(moveEnemy);
}

// window.requestAnimationFrame(moveEnemy);

function updateCanvas(){
  ctx.clearRect(0,0, width ,height);
  drawBackground(ctx, width, height);
  animate();
}