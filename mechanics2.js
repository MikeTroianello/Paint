  let canvas = document.getElementById('background');
  let actionCanvas = document.getElementById('main');
  let ctx = canvas.getContext('2d');
  let actionCtx = actionCanvas.getContext('2d');
  let height = canvas.height;
  let width = canvas.width;
  let y1 = -50;
  let health = 3;
  let score = 0;
  var pop = new Audio("/Users/miketroianello/Desktop/Project1/pop.wav");
  var sludgePop = new Audio('/Users/miketroianello/Desktop/Project1/sludge-pop.wav');
  var miss = new Audio('/Users/miketroianello/Desktop/Project1/miss.flac');
  var switchSound = new Audio('switch.wav');
  var targetHit = new Audio('targetHit.wav');
  var win = new Audio('/Users/miketroianello/Desktop/Project1/win.wav');
  var lose = new Audio('/Users/miketroianello/Desktop/Project1/lose.wav');
  
  // audio.play();

window.onload = function() {

  assignTiles();
  document.getElementById("start-button").onclick = function() {
    console.log('start')
    document.getElementById("start-button").blur();
    drawBackground(ctx, width, height);
    // assignTiles();
    // colorTiles();
    createEnemy();

    moveEnemy();
  };

};

//TILES
var tiles = [];

class Tile {
  constructor(color, spawnX, spawnY, finishX){
    this.color=color;
    this.spawnX=spawnX;
    this.spawnY=spawnY
    this.finishX=finishX;
  }
}



function assignTiles() {
  for(let i=0; i<5; i++){
    let mini = []
    for(let n=0; n<3; n++){
      let randomColor = Math.floor(Math.random() * 3)+3;
      let spawnX = (i*180)+2;
      let spawnY = (n*160)+2
      if(i==0){
        spawnX = (i*180)+2;
        finishX = 178;
      }
      else if (i==4){
        spawnX = (i*180)+3;
        finishX = 175;
      }
      else {
        spawnX = (i*180)+3;
        finishX = 177;
      }
      mini.push(new Tile(randomColor, spawnX, spawnY, finishX))
        if (n==2){
          do{
            mini[1].color = Math.floor(Math.random() * 3)+3;
          }
          while(mini[0].color === mini[1].color);
          do{
            mini[2].color = Math.floor(Math.random() * 3)+3;
          }
          while(mini[2].color === mini[1].color || mini[2].color === mini[0].color);
           tiles.push([mini[0], mini[1], mini[2]])
        } 
      }
    }
}

function colorTiles(){
  for(let i = 0; i < tiles.length; i++){
    for(let n=0; n<3; n++){
      if(tiles[i][n].color == 3) {
        ctx.fillStyle = "purple";
      }
      else if(tiles[i][n].color == 4) {
        ctx.fillStyle = "#fb7f00";
      }
      else if(tiles[i][n].color == 5) {
        ctx.fillStyle = "green";
      }
      else{
        ctx.fillStyle = "#5b5037";
      }
      ctx.fillRect(tiles[i][n].spawnX, tiles[i][n].spawnY, tiles[i][n].finishX, 158)
    }
  }
}





//DRAW BACKGROUND
function drawBackground(ctx, width, height) {
  let col = width/5;
  let row = 160;
  // ctx.fillStyle = "#f7f7e3";
  // ctx.fillRect(0, 0, width, height)  
  colorTiles();
  
  
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
  if(player.c==1){
    ctx.fillStyle = "red";
  }
  if(player.c==2){
    ctx.fillStyle = "blue";
  }
  if(player.c==3){
    ctx.fillStyle = "yellow";
  }
  ctx.fillRect(2, (row*3.5)+4, width-4, 125)
}

//PLAYER CHARACTER
var player = {
  x: 55,
  c: 1,
  moveLeft:  function() { this.x -= 182},
  moveRight: function() { this.x += 182},
  fire: function() {

    if (player.x == enemies[0].spawnPoint - 30){    
      testShooting();
      
      enemies.shift();
      
      if (enemies.length <= 0){
        win.play();
        alert(`YOU WIN! Score: ${score}. Health: ${health}`)
      }
      enemies[0].y = -50;
    }
    else{
      console.log("MISS");
      miss.play();
      score --;
    }
  },
}

function testShooting() {
  let zone = (enemies[0].spawnPoint - 85)/182;
  let zoneVertical = null
  console.log(enemies[0].y)
  if(enemies[0].y <= 159){
    if(enemies[0].color+player.c == tiles[zone][0].color && enemies[0].color != player.c){
      console.log("+4")
      pop.play();
      score += 5;
    }
    else{
      zoneVertical = 0;
      sludge(zone, zoneVertical);
    }
  }
  else if(enemies[0].y > 160 && enemies[0].y <=319){
    if(enemies[0].color+player.c == tiles[zone][1].color && enemies[0].color != player.c){
      console.log("+3")
      pop.play();
      score += 4;
    }
    else{
      zoneVertical = 1;
      sludge(zone, zoneVertical)
    }
  }
  else if(enemies[0].y > 320 && enemies[0].y <=479){
    if(enemies[0].color+player.c == tiles[zone][2].color && enemies[0].color != player.c){
      console.log("+2")
      pop.play();
      score += 3;
    }
    else{
      zoneVertical = 2;
      sludge(zone, zoneVertical);
    }
  }
  else{
    console.log("+1");
    //mySound = new sound("/Users/miketroianello/Desktop/Project1/sludge-pop.wav");
    sludgePop.play();
    score ++;
  }
  // debugger
}

function sludge(zone, zoneVertical){
  ctx.fillStyle = "#5b5037";
  ctx.fillRect(tiles[zone][zoneVertical].spawnX, tiles[zone][zoneVertical].spawnY, tiles[zone][zoneVertical].finishX, 158);
  tiles[zone][zoneVertical].color = 0;
  //mySound = new sound("/Users/miketroianello/Desktop/Project1/sludge-pop.wav");
  sludgePop.play();
  score ++
}



var img = new Image();
img.onload = function() { 
}
img.src = "/Users/miketroianello/Desktop/Project1/STICKMAN.png"
function draw(player) {
  ctx.drawImage(img, player.x, 575, 60, 100); 
}

//PLAYER MOVEMENTS
document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 37: 
      if(player.x >= 80) {
        player.moveLeft();  
          // console.log('left',  player); 
          break;
        }
      else {
        break;
      }
   
    case 39: 
      if(player.x <= 700) { 
        player.moveRight(); 
          // console.log('right', player); 
          break;
        } 
      else{
        break;
      }
    
    case 32: 
      player.fire();
      break;
    
    case 65:
      player.c=1;
      switchSound.play();
      break;
    
    case 83:
      player.c=2;
      switchSound.play();
      break; 

    case 68:
      player.c=3;
      switchSound.play();
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
  console.log(enemies)
}

function drawEnemy () {
  
   enemies[0].y += 1;
   actionCtx.beginPath();
   // actionCtx.fillStyle="red;"
   actionCtx.arc(enemies[0].spawnPoint, enemies[0].y, 30, 270, 360);
   actionCtx.fill()
   actionCtx.stroke();
   
   if (enemies[0].color == 1){
    actionCtx.fillStyle = 'red';
   }
   else if (enemies[0].color == 2){
    actionCtx.fillStyle = 'blue';
   }
   else if (enemies[0].color == 3){
    actionCtx.fillStyle = 'yellow';
   }
   if(enemies[0].y >= 532) {
    targetHit.play();
    health--;
    score --;
    enemies.shift()
    enemies[0].y=-50


   // drawEnemy()
  }
  if (health<=0){
      lose.play();
      alert("YOU LOSE. " + "Final score: " + score)
      health=3;
      enemies = [];
  }   
}

function clearCanvas() {
  actionCtx.clearRect(0,0,900,690);
}



function moveEnemy(){
  clearCanvas();
  draw(player);
  drawEnemy();
window.requestAnimationFrame(moveEnemy);
}



function updateCanvas(){
  ctx.clearRect(0,0, width ,height);
  drawBackground(ctx, width, height);
}

// function fire() {
//   console.log(player.x);
//   console.log(enemies[0].spawnPoint)
//   if (player.x == enemies[0].spawnPoint - 30){
//     console.log("HIT");
//     y1 = -50;
//     score ++;
//     enemies.shift();
//     if (enemies.length <= 0){
//       alert(`YOU WIN! Score: ${score}. Health: ${health}`)
//     }
    
//   }
//   else{
//     console.log("MISS");
//     score --;
//   }
// }

// function assignTiles() {
//   for(let i=0; i<5; i++){
//     let mini = []
//     for(let n=0; n<3; n++){
//       let randomColor = Math.floor(Math.random() * 3)+3;
//       let spawnX = (i*180)+2;
//       let spawnY = (n*160)+2
//       mini.push(new Tile(randomColor, spawnX, spawnY))
//         if (n==2){
//           do{
//             mini[1].color = Math.floor(Math.random() * 3)+3;
//           }
//           while(mini[0].color === mini[1].color);
//           do{
//             mini[2].color = Math.floor(Math.random() * 3)+3;
//           }
//           while(mini[2].color === mini[1].color || mini[2].color === mini[0].color);
//            tiles.push([mini[0], mini[1], mini[2]])
//         } 
//       }
//     }
//   console.log(tiles);
// }

// function assignTiles() {
//   for(let i=0; i<5; i++){
//     for(let n=0; n<3; n++){
//       let randomColor = Math.floor(Math.random() * 3)+3;
//       if(i==0){
//         spawnX = (i*180)+2;
//         finishX = 178;
//       }
//       else if (i==4){
//         spawnX = (i*180)+3;
//         finishX = 175;
//       }
//       else {
//         spawnX = (i*180)+3;
//         finishX = 177;
//       }
        
//         let spawnY = (n*160)+2;
//       tiles.push(new Tile(randomColor, spawnX, spawnY, finishX))
//     }
    
//   }
//   console.log(tiles)
// }