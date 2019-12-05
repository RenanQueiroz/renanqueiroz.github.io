var player;
var enemies;
var enemyQty;
var isGameOver;
var score;
var firstRun;
var playerAccelFactor = 8;

function setup() {
	score = 0;
	isGameOver = true;
	createCanvas(500, 500);
	player = createSprite(width/2, height-25, 50, 50);

	enemies = [];
	enemyQty = 5;

	for (i = 0; i < enemyQty; i++) {
		var enemy = createSprite(width/2, 0, 10, 30);
		enemies.push(enemy);
	}
}

function draw() {
	console.log(score);

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

		background(0, 0, 100);
		fill("white");
		textSize(32);
		textAlign(CENTER, CENTER);
		text(Math.floor(score/10), width / 2, 64);

		if (keyDown(RIGHT_ARROW) && player.position.x < (width-25)) {
			player.position.x = player.position.x + playerAccelFactor;
		}
		if (keyDown(LEFT_ARROW) && player.position.x > 25) {
			player.position.x = player.position.x - playerAccelFactor;
		}
		if (keyDown(DOWN_ARROW) && player.position.y < (height-25)) {
			player.position.y = player.position.y + playerAccelFactor;
		}
		if (keyDown(UP_ARROW) && player.position.y > 25) {
			player.position.y = player.position.y - playerAccelFactor;
		}

		if (keyDown(68) && player.position.x < (width-25)) {
			 player.position.x = player.position.x + playerAccelFactor;
		}
		if (keyDown(65) && player.position.x > 25) {
			player.position.x = player.position.x - playerAccelFactor;
		}
		if (keyDown(83) && player.position.y < (height-25)) {
			player.position.y = player.position.y + playerAccelFactor;
		}
		if (keyDown(87) && player.position.y > 25) {
			player.position.y = player.position.y - playerAccelFactor;
		}

		posFactor = 5 + Math.round(Math.sqrt(score)/5);

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
	background(0);
	textAlign(CENTER);
	fill("white");
	text("PLAY", width / 2, height / 2);
	text("Click or tap any button to start!", width / 2, height / 1.5);
}

function mouseClicked() {
	if (isGameOver){
		score = 0;
		firstRun = true;
		isGameOver = false;
		player.position.x = width/2;
		player.position.y = height-25;

		for (i = 0; i < enemyQty; i++) {
			enemies[i].position.x = width/2;
			enemies[i].position.y = 0;
		}
	}
}

function keyPressed() {
	mouseClicked();
}

function touchMoved() {
	var a = player.position.x - mouseX;
	var b = player.position.y - mouseY;

	var distance = Math.sqrt( a*a + b*b );

	if(distance <= 50){
		if(mouseX < (width-25) && mouseX > 25 && mouseY < (height-25) && mouseY > 25){
			player.position.x = mouseX;
			player.position.y = mouseY;
		}
	}
}
