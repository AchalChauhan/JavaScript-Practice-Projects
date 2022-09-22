//Select Canvas
const cvs = document.getElementById("breakout");
const ctx = cvs.getContext("2d");

ctx.lineWidth = 5;

//Player life
let LIFE = 3;
let SCORE = 0;
let SCORE_UNIT = 10;
let LEVEL = 1;
const MAX_LEVEL = 3;
let GAME_OVER = false

//Dimensions of the platform
const platform_Width = 100;
const platform_height = 20;
const platform_Margin_bottom = 50;
let leftArrow = false;
let rightArrow = false;

const platform = {
  x: cvs.width / 2 - platform_Width / 2, // X-Position of platform
  y: cvs.height - platform_Margin_bottom - platform_height, // Y-Position of platform
  width: platform_Width,
  height: platform_height,
  dx: 5, // amount of pixels that platform will move
};

//Dimensions for ball
const ballRadious = 12;

const ball = {
  x: cvs.width / 2,
  y: platform.y - ballRadious,
  radius: ballRadious,
  speed: 6,
  dx: 3 * (Math.random() * 2 - 1),
  dy: -3,
};
// Dimensions of bricks
const brick = {
  row: 1,
  column: 5,
  width: 55,
  height: 20,
  offSetLeft: 20,
  offSetTop: 20,
  marginTop: 40,
  fillColor: "#800000",
  strokeColor: "#3B3938",
};

let bricks = [];

function createBricks() {
  for (let r = 0; r < brick.row; r++) {
    bricks[r] = [];
    for (let c = 0; c < brick.column; c++) {
      bricks[r][c] = {
        x: c * (brick.offSetLeft + brick.width) + brick.offSetLeft,
        y:
          r * (brick.offSetTop + brick.height) + brick.offSetTop + brick.height,
        status: true,
      };
    }
  }
}
createBricks();

function DrawBricks() {
  for (let r = 0; r < brick.row; r++) {
    for (let c = 0; c < brick.column; c++) {
      let b = bricks[r][c];
      if (b.status) {
        ctx.fillStyle = brick.fillColor;
        ctx.fillRect(b.x, b.y, brick.width, brick.height);
        ctx.strokeStyle = brick.strokeColor;
        ctx.strokeRect(b.x, b.y, brick.width, brick.height);
      }
    }
  }
}

function DrawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#ffcd05";
  ctx.fill();

  ctx.strokeStyle = "#2e3548";
  ctx.stroke();
  ctx.closePath();
}

function DrawPlatform() {
  ctx.fillStyle = "#2e3548";
  ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  ctx.strokeStyle = "#ffcd05";
  ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
}

document.addEventListener("keydown", function (event) {
  if (event.keyCode == 37) {
    leftArrow = true;
  } else if (event.keyCode == 39) {
    rightArrow = true;
  }
});
document.addEventListener("keyup", function (event) {
  if (event.keyCode == 37) {
    leftArrow = false;
  } else if (event.keyCode == 39) {
    rightArrow = false;
  }
});

// to move the platform
function movePlatform() {
  if (rightArrow && platform.x + platform.width < cvs.width) {
    platform.x += platform.dx;
  } else if (leftArrow && platform.x > 0) {
    platform.x -= platform.dx;
  }
}

// Moveing the ball
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
}
// ball and wall collision detection
function ballWallCollision() {
  if (ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0) {
    ball.dx = -ball.dx;
    wallHit.play();
  }
  if (ball.y - ball.radius < 0) {
    ball.dy = -ball.dy;
  }
  if (ball.y + ball.radius > cvs.height) {
    LIFE--;
    lifeLost.play();
    resetBall();
  }
}
//Ball and Platform Collision
function ballPlatformCollision() {
  if (ball.x < platform.x + platform.width && ball.x > platform.x && platform.y < platform.y + platform.height &&
    ball.y > platform.y
  ) {
    platformhit.play();
    let collidePoint = ball.x - (platform.x + platform.width/2);
    collidePoint = collidePoint / (platform.width/2);
    let angle = collidePoint + Math.PI/3;

    ball.dx = ball.speed * Math.sin(angle);
    ball.dy = -ball.speed * Math.cos(angle);
  }
}
//ball and brick collision
function ballBrickCollision(){
  for(let r = 0; r < brick.row; r++){
    for(let c = 0; c < brick.column; c++){
      let b = bricks[r][c];
      if(b.status){
        if(ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brick.width && ball.y + ball.radius > b.y && ball.y -ball.radius < b.y + brick.height){
          brickHit.play();
          ball.dy = -ball.dy;
          b.status = false; 
          SCORE += SCORE_UNIT;
        }
      }
    }
  }
}


// show game status 
function showGameStatus(text, textX, textY, img, imgX, imgY){
  ctx.fillStyle = "#FFF";
  ctx.font = "25px Germania One";
  ctx.fillText(text, textX, textY);

  //draw image
  ctx.drawImage(img, imgX, imgY, width = 25, height = 25);
}

function gameOver(){
  if(LIFE <= 0){
    showYouLose();
    GAME_OVER = true;
  }
}
// levelUp

function levelUp(){
  let isLevelDone = true;
  for(let r=0; r<brick.row; r++){
    for(let c=0; c<brick.column; c++){
      isLevelDone = isLevelDone && ! bricks[r][c].status;
    }
  }
  if(isLevelDone){
    Win.play();
    if(LEVEL >= MAX_LEVEL){
      showYouWin();
      GAME_OVER = true;
      return;
    }
    brick.row++;
    createBricks();
    ball.speed += 0.5;
    resetBall();
    LEVEL++;
  }
}


//Reset Ball
function resetBall() {
  ball.x = cvs.width / 2;
  ball.y = platform.y - ballRadious;
  ball.dx = 3 * (Math.random() * 2 - 1);
  ball.dy = -3;
}



function draw() {
  DrawPlatform();
  DrawBall();
  DrawBricks();
  showGameStatus(SCORE, 35, 25, scoreImg, 5, 5);
  showGameStatus(LIFE, cvs.width-25, 25, lifeImg, cvs.width-55, 5);
  showGameStatus(LEVEL, cvs.width/2, 25, levelImg, cvs.width/2-30, 5);
}

function update() {
  movePlatform();
  moveBall();
  ballWallCollision();
  ballPlatformCollision();
  ballBrickCollision();
  gameOver();
  levelUp();
}

function loop() {
  ctx.drawImage(bgImage, 0, 0, 400, 600);
  draw();

  update();
if(! GAME_OVER)
{
  requestAnimationFrame(loop);
}
  
}

loop();


// SELECT SOUND ELEMENT
const soundElement  = document.getElementById("sound");

soundElement.addEventListener("click", audioManager);

function audioManager(){
    // CHANGE IMAGE SOUND_ON/OFF
    let imgSrc = soundElement.getAttribute("src");
    let SOUND_IMG = imgSrc == "img/SOUND_ON.png" ? "img/SOUND_OFF.png" : "img/SOUND_ON.png";
    
    soundElement.setAttribute("src", SOUND_IMG);
    
    // MUTE AND UNMUTE SOUNDS
    wallHit.muted = wallHit.muted ? false : true;
    platformhit.muted = platformhit.muted ? false : true;
    brickHit.muted = brickHit.muted ? false : true;
    Win.muted = Win.muted ? false : true;
    lifeLost.muted = lifeLost.muted ? false : true;
}

// SHOW GAME OVER MESSAGE
/* SELECT ELEMENTS */
const gameover = document.getElementById("gameover");
const youwin = document.getElementById("youwin");
const youlose = document.getElementById("youlose");
const restart = document.getElementById("restart");

// CLICK ON PLAY AGAIN BUTTON
restart.addEventListener("click", function(){
    location.reload(); // reload the page
})

// SHOW YOU WIN
function showYouWin(){
    gameover.style.display = "block";
    youwon.style.display = "block";
}

// SHOW YOU LOSE
function showYouLose(){
    gameover.style.display = "block";
    youlose.style.display = "block";
}