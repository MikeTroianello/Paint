  let canvas = document.getElementById('background');
  let actionCanvas = document.getElementById('main');
  let ctx = canvas.getContext('2d');
  let actionCtx = actionCanvas.getContext('2d');
  let height = canvas.height;
  let width = canvas.width;
  let y1 = -50;
  let health = 1;
  let score = 0;
  var pop = new Audio("pop.wav");
  var sludgePop = new Audio('sludge-pop.wav');
  var miss = new Audio('miss.flac');
  var switchSound = new Audio('switch.wav');
  var targetHit = new Audio('targetHit.wav');
  var win = new Audio('win.wav');
  var lose = new Audio('lose.wav');
  let gameOn = false;
  let endIt = 0;
  let speedIncrease = 0;
  var soundtrack = new Audio('Soundtrack.wav');
  

  // audio.play();

// window.onload = function() {
  window.onload = function() { 
  document.getElementById("start-button").onclick = function() {
    //cancelAnimationFrame(ANIM);
    if(!gameOn){
    playGame();
  };
};

}



function playGame(){
  cancelAnimationFrame(ANIM);
  soundtrack.play();
  assignTiles();
  console.log("PLAYING")
  gameOn = true;
  score = 0;
  document.getElementById("start-button").blur();
  drawBackground(ctx, width, height);
  createEnemy();
  animate();
  }

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
  tiles = []
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
  // if(enemies.length<=0 || health <=0){
  //   ctx.fillStyle = "#000";
  //   ctx.fillRect(0, 0, width, height)
  // }
  // else{
  let col = width/5;
  let row = 160;
  colorTiles();
  
  //SLUDGE TILES
  ctx.fillStyle = "#5b5037";
  ctx.fillRect(2, (row*3)+1, width-4, (row/2))
  
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
  // }
}

//PLAYER CHARACTER
var player = {
  x: 55,
  c: 1,
  moveLeft:  function() { this.x -= 182},
  moveRight: function() { this.x += 182},
  fire: function() {
   // console.log("FIRE")
    createBullet();

  },
}


//BULLETS
class Bullet{
  constructor(bulletColor, bulletX){
    this.color=bulletColor;
    this.x=bulletX;
    this.y=560;
  }


}


var bullets = [];

function createBullet(){
  bullets.push(new Bullet(player.c, player.x+15,))
}


function drawBullet() {
  if(bullets.length>0){
   // console.log(bullets[0]);
    
    if (bullets[0].color == 1){
      actionCtx.drawImage(redBullet, bullets[0].x, bullets[0].y);
     }
     else if (bullets[0].color == 2){
      actionCtx.drawImage(blueBullet, bullets[0].x, bullets[0].y);
     }
     else if (bullets[0].color == 3){
      actionCtx.drawImage(yellowBullet, bullets[0].x, bullets[0].y);
     }

   // actionCtx.beginPath();
    bullets[0].y-=20;
    if(bullets[0].y <= 0) {
      bullets.shift();
      console.log(bullets)
      return
     }
    if (bullets[0].y <= enemies[0].y && bullets[0].x == enemies[0].spawnPoint - 15){
      testShooting();
      enemies.shift();
      bullets.shift();
      if(enemies.length<=0){
        winScreen();
      }
    }
  }
  else{
    return
  } 
 }



 var redBullet = new Image();
 redBullet.onload = function() { 
 }
 redBullet.src = "Red_Paint/sprite_red1.png"

 
 
 var blueBullet = new Image();
 blueBullet.onload = function() { 
 }
 blueBullet.src = "Blue_Paint/sprite_blue1.png"


 var yellowBullet = new Image();
 yellowBullet.onload = function() { 
 }
 yellowBullet.src = "Yellow_Paint/sprite_yellow1.png"










//SHOOTING MECHANICS
function testShooting() {
  speedIncrease += .15;
 // console.log("TEST SHOOT")
  let zone = (enemies[0].spawnPoint - 85)/182;
  let zoneVertical = null
 // console.log(enemies[0].y)
  //console.log(enemies, player, tiles)
  if(enemies[0].y <= 159){
    if(enemies[0].color+bullets[0].color == tiles[zone][0].color && enemies[0].color != bullets[0].color){
      console.log("+4")
      pop.play();
      score += 5;
      // enemies.shift();
    }
    else{
      zoneVertical = 0;
      // enemies.shift();
      sludge(zone, zoneVertical);
    }
  }
  else if(enemies[0].y > 160 && enemies[0].y <=319){
    if(enemies[0].color+bullets[0].color == tiles[zone][1].color && enemies[0].color != bullets[0].color){
      console.log("+3")
      pop.play();
      score += 4;
      // enemies.shift();
    }
    else{
      zoneVertical = 1;
      // enemies.shift();
      sludge(zone, zoneVertical)
    }
  }
  else if(enemies[0].y > 320 && enemies[0].y <=479){
    if(enemies[0].color+bullets[0].color == tiles[zone][2].color && enemies[0].color != bullets[0].color){
      console.log("+2")
      pop.play();
      score += 3;
      // enemies.shift();
    }
    else{
      zoneVertical = 2;
      // enemies.shift();
      sludge(zone, zoneVertical);
    }
  }
  else{
    console.log("+1");
    sludgePop.play();
    //enemies.shift();
    score ++;
  }
}

function sludge(zone, zoneVertical){
  if(tiles[zone][zoneVertical].color != 0){
  ctx.fillStyle = "#5b5037";
  ctx.fillRect(tiles[zone][zoneVertical].spawnX, tiles[zone][zoneVertical].spawnY, tiles[zone][zoneVertical].finishX, 158);
  tiles[zone][zoneVertical].color = 0;
  sludgePop.play();
  score -=4
  }
  else {
    sludgePop.play();
  }
}

//PLAYER

var img = new Image();
img.onload = function() { 
}
if (endIt>0){
img.src = "Character_2.png"
}
else {
console.log("!!!!!!!!!")
img.src = "Character_1.png"
}
function draw(player) {
  console.log(player)
  ctx.drawImage(img, player.x-17, 565, 90, 120); 
} 


//PLAYER MOVEMENTS
document.onkeydown = function(e) {
  if (e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
  switch (e.keyCode) {
    case 37: 
      if(player.x >= 80) {
        player.moveLeft();  
          break;
        }
      else {
        break;
      }
   
    case 39: 
      if(player.x <= 700) { 
        player.moveRight(); 
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
  constructor(color, spawnPoint, r, grow){
    this.color=color;
    this.spawnPoint=spawnPoint;
    this.r = r;
    this.grow = grow;
    this.y = 0;
  }
}

function createEnemy() {
  for(let i = 0; i<10; i++){
  let randomColor = Math.floor(Math.random() * 3)+1;
  let randomSpawn= Math.floor(Math.random() * 5) * 182 + 85;
  r = Math.floor(Math.random() * 7)+ 37;
  if(Math.floor(Math.random() * 2) == 1){
    grow = true;
  }
  else{
    grow = false;
  }
  
  enemies.push(new Enemy(randomColor, randomSpawn, r, grow))
  }
}

function drawEnemy () {
  if(enemies.length>0){
    console.log(enemies[0].r)
    if(enemies[0].grow==true){
      enemies[0].r += .15;
      if(enemies[0].r >= 42){
        enemies[0].grow = false;
      }
     

    }
    if(enemies[0].grow==false){
      enemies[0].r -= .15;
      enemies[0].y += .1
      if(enemies[0].r <= 37){
        enemies[0].grow = true;
      }

    }
    enemies[0].y += 1 + speedIncrease;
    actionCtx.beginPath();
    actionCtx.arc(enemies[0].spawnPoint, enemies[0].y, enemies[0].r, 270, 360);
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
      score --;
      enemies = 0;
      loseScreen();
      // setTimeout(()=>{ //Taking it all out of scope 
      //   window.cancelAnimationFrame(ANIM)
      //   loseScreen();
      // },0)
      
      }  
  }
  else{
    return
  } 
}

function clearCanvas() {
  actionCtx.clearRect(0,0,width, height);
  // ctx.clearRect(0,0,width, height);
  // drawBackground(ctx, width, height);
}

//ANIMATION
var ANIM; 
function animate(){
  clearCanvas();
  draw(player);
  drawEnemy();
  drawBullet();
  if(enemies.length<=0){
    return;
  }
  ANIM = window.requestAnimationFrame(animate);
}
function updateCanvas(){
  ctx.clearRect(0,0, width ,height);
  drawBackground(ctx, width, height);
}

function loseScreen() {
  soundtrack.pause();
  // console.log(ANIM)
  speedIncrease = 0;
  enemies = [];
  endIt = 1;
  //cancelAnimationFrame(ANIM);
  lose.play();
  ctx.clearRect(0,0, width ,height);
  actionCtx.clearRect(0,0, width ,height);
  ctx.fillStyle = "#000";
  ctx.fillRect(0,0, width ,height);
  ctx.font = "120px monospace";
  ctx.fillStyle = "RED";
  ctx.fillText("YOU LOSE!", 50,200);
  ctx.fillStyle = "white";
  ctx.font = "50px monospace";
  setInterval(function(){}, 3000);ctx.fillText("Your final Score: ", 150,300);
  window.setTimeout(function(){
  ctx.fillText("" + score, 480, 400)}, 1200);
  ctx.font = "40px monospace";
  window.setTimeout(function(){
    ctx.fillText("(Press the start button to replay)", 300, 800)}, 1400);
  assignTiles();

  gameOn=false;

  // document.onkeydown = function(e) {
  //   if (e.keyCode == 32 && e.target == document.body) {
  //     e.preventDefault();
  //   }
  //   switch (e.keyCode) {
  //     case 100: 
  //       //restart();
  //       break;
  //     }
  // }
};


function winScreen () {
  //soundtrack.pause();
  window.cancelAnimationFrame(ANIM)
  win.play();
  endIt=1
  enemies = [];
  ctx.clearRect(0,0, width ,height);
  actionCtx.clearRect(0,0, width ,height);
  ctx.fillStyle = "#000";
  // actionCtx.fillStyle = "#000";
  ctx.fillRect(0,0, width ,height);
  // actionCtx.fillRect(0,0, width ,height);
  ctx.font = "100px monospace";
  ctx.fillStyle = "blue";
  ctx.fillText("LEVEL COMPLETE!", 50,200);
  ctx.fillStyle = "white";
  ctx.font = "50px monospace";
  setInterval(function(){}, 3000);ctx.fillText("Your final Score: ", 150,300);
  window.setTimeout(function(){
  ctx.fillText("" + score, 480, 400)}, 1000);
  //assignTiles();
  finalGrade();
  document.onkeydown = function(e) {
    if (e.keyCode == 32 && e.target == document.body) {
      e.preventDefault();
    }
    switch (e.keyCode) {
      case 100: 
        assignTiles();
        createEnemy();
        break;
      }
      return;
  }

}


// $('body').on('keyup', function(){
//   if(!gameOn){
//     console.log('restart')
//     restart()
//     gameOn = true; 
//   }
// })

function finalGrade() {
  var critique = [];
  let randomChance = Math.floor(Math.random() * 11) ;
  let rq = Math.floor(Math.random() * 5);
  if (randomChance == 7) {
    critique = randomQuote;
  }
  else {
    if(score <= 0) {
      critique= badScore;
    }
    else if(score > 0 && score <= 20)  {
      critique=lowScore;
    }
    else if(score > 20 && score <= 40)  {
      critique=goodScore;
    }
    else if(score > 40)  {
      critique=highScore;
    }
  }

  window.setTimeout(function(){
    ctx.font = "35px monospace";
    ctx.fillText("What the people say:", 130, 460)}, 2000);
 
  window.setTimeout(function(){
    ctx.font = "20px monospace";
    ctx.fillText(critique[rq].quote, critique[rq].start_placement, 520)}, 3500);
 
  window.setTimeout(function(){
    ctx.font = "16px monospace";
    ctx.fillText(critique[rq].source, 200, 550)}, 5500);

  // window.setTimeout(function(){
  //     ctx.font = "25px monospace";
  //     ctx.fillText("Press enter to play level 2", 50, 650)}, 5500);
 }


//ART CRITIQUE
var badScore = [
  {
    quote:"I am legitimately offended by this.",
    source:"-The Briggsdale Pornographer",
    start_placement: 175,
  },
  {
    quote:"I wish general misfortune on this artist",
    source:"-Notably irate patron",
    start_placement: 175,
  },
  {
    quote:"We're not angry, we're just disappointed",
    source:"-Your parents",
    start_placement: 175,
  },
  {
    quote:"This is worse than the time the raccoon got in the copier",
    source:"-Hoser(2004)",
    start_placement: 175,
  },
  {
    quote:"I don't like this",
    source:"-The only honest person in the room",
    start_placement: 175,
  },


];

var lowScore = [
  {
    quote:"meh...",
    source:"-Overall consensus of the room",
    start_placement: 175,
  },
  {
    quote:"You sure got $40,000 out of that art education, didn't you?",
    source:"-Dad",
    start_placement: 145,
  },
  {
    quote:"Like a less coherent Jackson Pollack",
    source:"-Local art reviewer",
    start_placement: 175,
  },
  {
    quote:"Reminds me of that art they have inside Taco Bell",
    source:"-Taco Bell frequenter",
    start_placement: 165,
  },
  {
    quote:"It's no MC Escher. Or MC Hammer, for that matter. I miss parachute pants...",
    source:"-Grumpy Gen-Xer",
    start_placement: 10,
  },
  
];

var goodScore = [
  {
    quote:"I see they really took the Claude Manet approach. Real impressionable",
    source:"-Flummoxed guy trying to impress his date",
    start_placement: 30,
  },
  {
    quote:"How very Kaftkaesque",
    source:"-The worst kind of person",
    start_placement: 175,
  },
  {
    quote:"Better than the macaroni art on my fridge. Probably tastes better too",
    source:"-Parent of mediocre child",
    start_placement: 55,
  },
  {
    quote:"I mean, it's kinda cool",
    source:"-Likely the best compliment you'll get",
    start_placement: 175,
  },
  {
    quote:"I'd hang it in my bathroom. Probably",
    source:"-Frugal patron",
    start_placement: 175,
  },
  
];

var highScore = [
  {
    quote:"Oh, I just Louvre this!",
    source:"-Father of embarrassed teenager",
    start_placement: 175,
  },
  {
    quote:"It's great! I just knew you had to be good at something.",
    source:"-Mom",
    start_placement: 135,
  },
  {
    quote:"It's like a Lite-Brite mixed with the sadder parts of the early 2000's",
    source:"-Surprisinly apt analysis",
    start_placement: 45,
  },
  {
    quote:"Good job! I thought all these years you were just huffing the paint.",
    source:"-Close friend",
    start_placement: 50,
  },
  {
    quote:"#SLaYYAYYYY",
    source:"-Try not to acknowledge this person",
    start_placement: 175,
  },
  
];

var randomQuote = [
  {
    quote:"But no, I'm the bad guy for eating the glue. At least I HAVE both my arms.",
    source:"-Overheard conversation (probably not pertaining to the art exhibit)",
    start_placement: 10,
  },
  {
    quote:"I WANNA GO HOME!",
    source:"-Crying child",
    start_placement: 175,
  },
  {
    quote:"What is this now? And where are we?",
    source:"-Confused elderly woman",
    start_placement: 175,
  },
  {
    quote:"Attention: hot dogs are now $2 off at the gift shop",
    source:"-Overhead speaker",
    start_placement: 175,
  },
  {
    quote:"...",
    source:"-A silent room (take that how you will)",
    start_placement: 175,
  },
  
];

// function restart() {
//   cancelAnimationFrame(ANIM)
//   enemies = [];
//   health = 1;
//   score = 0;
//   draw(player);
//   ctx.clearRect(0,0, width ,height);
//   actionCtx.clearRect(0,0, width ,height);
//   drawBackground(ctx, width, height);
//   assignTiles();
//   createEnemy();
//   animate()
// }