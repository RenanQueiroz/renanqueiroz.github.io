var cnv;
var player;
var enemies;
var enemyQty;
var isGameOver;
var score;
var highScore;
var firstRun;
var playerAccelFactor;
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
var spriteScaleFactor;
var textScaleFactor;
var dragging;
var offsetX;
var offsetY;
var playerSize;
var version = 1.2;

function preventBehavior(e) {
    e.preventDefault(); 
};

document.addEventListener("touchmove", preventBehavior, {passive: false});

p5.disableFriendlyErrors = true; // disables FES for performance


function setup() {
	if(isMobile){
		spriteScaleFactor = 3;
		textScaleFactor = 4;
		movLimScaleFactor = 2;
	}
	else{
		spriteScaleFactor = 1;
		textScaleFactor = 1;
		movLimScaleFactor = 1;
	}

	if(isMobile){
		//Disable pixel scaling (reduces quality) to improve performance on mobile
		pixelDensity(1);
	}

	frameRate(60);

	playerSize = 50*spriteScaleFactor;
	playerAccelFactor = 8;
	dragging = false;

	score = 0;
	highScore = 0;
	isGameOver = true;

	if(isMobile){
		cnv = createCanvas(windowWidth, windowHeight);
	}
	else{
		cnv = createCanvas(500, windowHeight);

	}
	cnv.style('display', 'block');
	centerCanvas();
	player = createSprite(width/2, height-75, playerSize, playerSize);

	enemies = [];
	enemyQty = 7;

	for (i = 0; i < enemyQty; i++) {
		var enemy = createSprite(width/2, 0, 10*spriteScaleFactor, 30*spriteScaleFactor);
		enemies.push(enemy);
	}
}

function draw() {
	//console.log(score);

	if(firstRun){
		for (i = 0; i < enemyQty; i++) {
			enemies[i].position.y = 0;
			enemies[i].position.x = random(5, width-5);
		}
		firstRun = false;
	}

	if (isGameOver) {
        gameOver();
    } 
    else {
		for (i = 0; i < enemyQty; i++) {
			if(enemies[i].overlap(player)){
				isGameOver = true;
				gameOver();
			}
		}

		background(0, 0, 51);
		fill("white");
		textSize(32*textScaleFactor);
		textAlign(CENTER, CENTER);
		text(Math.floor(score/10), width / 2, 100);

		if (dragging) {
			//print("Current pos:" + player.position.x + ", " + player.position.y);
			var newX = mouseX + offsetX;
			if(newX > width - playerSize/2){
				newX = width - playerSize/2;
			}
			if(newX < playerSize/2){
				newX = playerSize/2;
			}

			var newY = mouseY + offsetY;
			if(newY > height - playerSize/2){
				newY = height - playerSize/2;
			}
			if(newY < playerSize/2){
				newY = playerSize/2;
			}


			player.position.x = newX;
			player.position.y = newY;
			
		}

		if ((keyDown(RIGHT_ARROW) || keyDown(68)) && player.position.x < (width - playerSize/2)) {
			player.position.x = player.position.x + playerAccelFactor;
		}
		if ((keyDown(LEFT_ARROW) || keyDown(65)) && player.position.x > playerSize/2) {
			player.position.x = player.position.x - playerAccelFactor;
		}
		if ((keyDown(DOWN_ARROW) || keyDown(83)) && player.position.y < (height - playerSize/2)) {
			player.position.y = player.position.y + playerAccelFactor;
		}
		if ((keyDown(UP_ARROW) || keyDown(87)) && player.position.y > playerSize/2) {
			player.position.y = player.position.y - playerAccelFactor;
		}

		posFactor = (5 + Math.round(Math.sqrt(score)/4))*spriteScaleFactor;

		for (i = 0; i < enemyQty; i++) {
			enemies[i].position.y = enemies[i].position.y + posFactor;
			posFactor++;
		}


		for (i = 0; i < enemyQty; i++) {
			if (enemies[i].position.y > height) {
				score++;
				enemies[i].position.y = 0;
				enemies[i].position.x = random(5, width-5);
			}
		}

		drawSprites();
	}
}

function gameOver() {
	if(Math.floor(score/10) > highScore){
		highScore = Math.floor(score/10);
	}
	background(0);
	textSize(16*textScaleFactor);
	textAlign(CENTER);
	fill("white");
	text("PLAY", width / 2, height / 2);
	if(isMobile){
		text("Tap anywhere to start!", width / 2, height / 1.5);
	}
	else{
		text("Click or tap any button to start!", width / 2, height / 1.5);
	}
	//text("PixelDensity is " + pixelDensity(), width / 2, height / 1.3);
	//text("isMobile is " + isMobile, width / 2, height / 1.1);
	if(highScore != 0){
		text("Your highest score is: " + highScore, width / 2, height / 1.7);
	}
	textAlign(RIGHT);
	textSize(16*textScaleFactor/1.5);
	text("v" + version, width-16, height-16);
}

function mouseClicked() {
	if (isGameOver){
		if(Math.floor(score/10) > highScore){
			highScore = Math.floor(score/10);
		}
		score = 0;
		firstRun = true;
		isGameOver = false;
		player.position.x = width/2;
		player.position.y = height-75;

		for (i = 0; i < enemyQty; i++) {
			enemies[i].position.x = width/2;
			enemies[i].position.y = 0;
		}
	}
}

function keyPressed() {
	mouseClicked();
}

function mousePressed() {
    if (mouseX > player.position.x - (playerSize)/2 && mouseX < player.position.x + (playerSize)/2 && mouseY > player.position.y - (playerSize)/2 && mouseY < player.position.y + (playerSize)/2) {
      //print("clicked on rect");
      dragging = true;
      offsetX = player.position.x - mouseX;
      offsetY = player.position.y - mouseY;
    }
}

function mouseReleased() {
	//print("mouse was released");
  	dragging = false;
}

function centerCanvas() {
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	cnv.position(x, y);
}

function windowResized() {
	if(isMobile){
		resizeCanvas(windowWidth, windowHeight);
		centerCanvas();
	}
	else{
		resizeCanvas(500, windowHeight);
		centerCanvas();
	}
}
