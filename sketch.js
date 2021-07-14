// Feeding Nemo Game in Javascript by Deepali Mokashi
//defining required varibales for the game

var bg, nemo, nemoImg;
var fish1Group, fish2Group, shark1Group, shark2Group;
var fish1Img, fish2Img, shark2Img, shark2Img;
var score = 0;
var gulpImg, gameOverImg, restartImg, restart, gameOver;
var gameState = "play"
var scoreB, gulpSound;

function preload() {
  //loading all the game assests
  bg = loadImage("ocean.jpg");

  nemoImgRight = loadImage("nemo.png");
  nemoImgLeft = loadImage("nemo_left.png");
  shark1Img = loadImage("shark1.png");

  fish1Img = loadImage("fish1.png");

  gameOverImg = loadImage("GO.png")

}
function setup() {
  //creating the canvas
  createCanvas(windowWidth, windowHeight);

  //creating nemo sprite and adding image
  nemo = createSprite(400, 200, 50, 50);
  nemo.addImage(nemoImgLeft)
  nemo.scale = 0.5;

  gameOver = createSprite(windowWidth / 2, windowHeight / 2 - 100)
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;

  fishGroup = new Group();
  sharkGroup = new Group();

}


function draw() {
  //adding background image
  background(bg);
  drawSprites();

  if (gameState === "play") {

    // do this
    nemo.x = mouseX;
    nemo.y = mouseY;
    if (nemo.x < windowWidth / 2) {
      nemo.addImage(nemoImgLeft)
    }
    else {
      nemo.addImage(nemoImgRight)
    }
    spawnFish();
    spawnSharks();

    if (sharkGroup.isTouching(nemo)) {
      gameState = "end"
    }

    for (var i = 0; i < fishGroup.length; i++) {
      if (fishGroup.get(i).isTouching(nemo)) {
        fishGroup.get(i).destroy();
        score += 1;
        console.log('Score'+score)

      }
    }
    textSize(50);
    stroke("brown")
    fill("orange");
    strokeWeight(5);
    textFont('comic')
    text(score, 50, 100);
  }
  else if (gameState === "end") {
    //do this
    gameOver.visible = true;
    sharkGroup.destroyEach();
    fishGroup.destroyEach();
    nemo.visible = false;

   
  }

}

//defining spawnFish() function
function spawnFish() {
  if (frameCount % 80 === 0) {
    var fish1 = createSprite(windowWidth, random(0, windowHeight), 20, 20);
    fish1.velocityX = -8;
    fish1.addImage(fish1Img);
    fish1.scale = 0.2;
fishGroup.add(fish1);
  }
}

//defining spawnSharks() function
function spawnSharks() {
  if (frameCount % 130 === 0) {
    var shark1 = createSprite(0, random(0, windowHeight), 20, 20);
    shark1.velocityX = 5;
    shark1.addImage(shark1Img);
    shark1.scale = 0.8
    sharkGroup.add(shark1);
  }
}