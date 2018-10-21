var player;
var level;
var enemy;
var enemy2;
var enemy3;
var enemy4;
var enemy5;
var levelWasCleared;
var isGameOver;

function setup() {
  levelWasCleared = false;
  isGameOver = true;
  createCanvas(windowWidth - 20,windowHeight - 20);
  clearedLevel = createSprite (2, 0, width*2, 100);
  player = createSprite(width/2, height-25, 50, 50);
  enemy = createSprite(width/2, 0, 10, 30);
  enemy2 = createSprite(width/2, 0, 10, 30);
  enemy3 = createSprite(width/2, 0, 10, 30);
  enemy4 = createSprite(width/2, 0, 10, 30);
  enemy5 = createSprite(width/2, 0, 10, 30);
}

function draw() {

    if (isGameOver || levelWasCleared) {
        gameOver();
    } else {
      if (player.overlap(clearedLevel) || clearedLevel.overlap(player)) {
        levelWasCleared = true;
        gameOver();
      } else if (enemy.overlap(player) || enemy2.overlap(player) || enemy3.overlap(player) || enemy4.overlap(player) || enemy5.overlap(player)){
          isGameOver = true;
          gameOver();
        }


  background(0, 0, 100);

  if (keyDown(RIGHT_ARROW) && player.position.x < (width-25)) {
    player.position.x = player.position.x + 4;
}
  if (keyDown(LEFT_ARROW) && player.position.x > 25) {
    player.position.x = player.position.x - 4;
}
  if (keyDown(DOWN_ARROW) && player.position.y < (height-25)) {
    player.position.y = player.position.y + 4;
}
  if (keyDown(UP_ARROW) && player.position.y > 25) {
    player.position.y = player.position.y - 4;
}


if (keyDown(68) && player.position.x < (width-25)) {
    player.position.x = player.position.x + 4;
}
  if (keyDown(65) && player.position.x > 25) {
    player.position.x = player.position.x - 4;
}
  if (keyDown(83) && player.position.y < (height-25)) {
    player.position.y = player.position.y + 4;
}
  if (keyDown(87) && player.position.y > 25) {
    player.position.y = player.position.y - 4;
}


  enemy.position.y = enemy.position.y + 8;
  enemy2.position.y = enemy2.position.y + 9;
  enemy3.position.y = enemy3.position.y + 10;
  enemy4.position.y = enemy4.position.y + 11;
  enemy5.position.y = enemy5.position.y + 12;

if (enemy.position.y > height) {
  enemy.position.y = 0;
  enemy.position.x = random(5, width-5);
}
if (enemy2.position.y > height) {
  enemy2.position.y = 0;
  enemy2.position.x = random(5, width-5);
}
if (enemy3.position.y > height) {
  enemy3.position.y = 0;
  enemy3.position.x = random(5, width-5);
}
if (enemy4.position.y > height) {
  enemy4.position.y = 0;
  enemy4.position.x = random(5, width-5);
}
if (enemy5.position.y > height) {
  enemy5.position.y = 0;
  enemy5.position.x = random(5, width-5);
}

    drawSprites();
  }
}

function gameOver() {
  background(0);
  textAlign(CENTER);
  fill("white");
  text("PLAY", width / 2, height / 2);

  if (levelWasCleared) { 
    text("Congratulations, you beat the game!", width / 2, height / 1.5);
    text("Click or tap any button to play again!", width / 2, height / 1.4);
  } else {
    text("Click or tap any button to start!", width / 2, height / 1.5);
  }
}

function mouseClicked() {
  if (isGameOver || levelWasCleared) {
    isGameOver = false;
    levelWasCleared = false;
    player.position.x = width/4;
    player.position.y = height-25;
    enemy.position.x = width/2;
    enemy.position.y = 0;
    enemy2.position.x = width/2;
    enemy2.position.y = 0;
    enemy3.position.x = width/2;
    enemy3.position.y = 0;
    enemy4.position.x = width/2;
    enemy4.position.y = 0;
    enemy5.position.x = width/2;
    enemy5.position.y = 0;
  }
  
}

function keyPressed() {
  mouseClicked();
}

function touchMoved() {
  	player.position.x = mouseX;
  	player.position.y = mouseY;
}
