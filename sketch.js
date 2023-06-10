var score = 0;
var bg, bgImg;
var backboard, backboardImg;
var rightWall;
var leftWall;
var logo, logoImg;
var net, netImg;
var catcher, catcherImg;
var pokeball, pokeballImg, pokeballGroup;
var charizard, charizardImg, blastoise, blastoiseImg, zekrom, zekromImg, venusaur, venusaurImg, mewtwo, mewtwoImg;
var charizardGroup, blastoiseGroup, zekromGroup, venusaurGroup, mewtwoGroup;
var gameover, gameoverImg, restart, restartImg;

var life = 3;
var PLAY = 1;
var END = 0;
var gameState = 1

function preload() {
  bgImg = loadImage("assets/Background.jpg");
  backboardImg = loadImage("assets/Backboard.jpg");
  logoImg = loadImage("assets/Logo.png");
  catcherImg = loadImage("assets/Ash.png");
  charizardImg = loadImage("assets/Charizard.png");
  blastoiseImg = loadImage("assets/Blastoise.png");
  zekromImg = loadImage("assets/Zekrom.png");
  venusaurImg = loadImage("assets/Venusaur.png");
  mewtwoImg = loadImage("assets/Mewtwo.png");
  pokeballImg = loadImage("assets/Pokeball.png");
  netImg = loadImage("assets/Net.png");
  gameoverImg = loadImage("assets/Gameover.png");
  restartImg = loadImage("assets/Restart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight)

  bg = createSprite(displayWidth / 2, displayHeight / 2);
  bg.addImage(bgImg);
  bg.velocityX = 0;
  bg.scale = 2

  backboard = createSprite(displayWidth / 2 + 50, displayHeight / 2 - 335);
  backboard.addImage(backboardImg)
  backboard.scale = 0.70

  rightWall = createSprite(215, 300, 10, 600);
  rightWall.visible = true;

  leftWall = createSprite(1165, 300, 10, 600);
  leftWall.visible = true;

  logo = createSprite(displayWidth / 2 - 500, displayHeight / 2 - 260);
  logo.addImage(logoImg);
  logo.scale = 0.50

  gameover = createSprite(width / 2, height / 2 - 75);
  gameover.addImage(gameoverImg)
  gameover.visible = false;
  gameover.scale = 0.75

  restart = createSprite(width / 2, height / 2 + 75);
  restart.addImage(restartImg)
  restart.visible = false;
  restart.scale = 0.30

  catcher = createSprite(665, 100, 20, 50);
  catcher.addAnimation("catcher", catcherImg);
  catcher.scale = 0.35;
  catcher.setCollider("rectangle", 0, 0, 1020, 450);

  charizard = createSprite(displayWidth / 2 + 70, displayHeight / 2 + 165);
  charizard.addImage(charizardImg);
  charizard.scale = 0.30
  //charizard.debug = true; 

  blastoise = createSprite(displayWidth / 2 - 325, displayHeight / 2 + 165);
  blastoise.addImage(blastoiseImg);
  blastoise.scale = 0.25
  //blastoise.debug = true; 

  zekrom = createSprite(displayWidth / 2 - 142.5, displayHeight / 2 + 165);
  zekrom.addImage(zekromImg);
  zekrom.scale = 0.25
  //zekrom.debug = true; 

  venusaur = createSprite(displayWidth / 2 + 435, displayHeight / 2 + 165);
  venusaur.addImage(venusaurImg);
  venusaur.scale = 0.25
  //venusaur.debug = true; 

  mewtwo = createSprite(displayWidth / 2 + 262.5, displayHeight / 2 + 165);
  mewtwo.addImage(mewtwoImg);
  mewtwo.scale = 0.25
  //mewtwo.debug = true; 

  charizardGroup = createGroup();
  blastoiseGroup = createGroup();
  zekromGroup = createGroup();
  venusaurGroup = createGroup();
  mewtwoGroup = createGroup();
  pokeballGroup = createGroup();

  heading = createElement("h1");
  scoreboard = createElement("h1");
}

function draw() {
  background(255, 255, 255);

  heading.html("Life: " + life)
  heading.style('color:red');
  heading.position(275, 0)

  scoreboard.html("Score: " + score)
  scoreboard.style('color:blue');
  scoreboard.position(width - 275, 0)

  if (gameState === PLAY) {

    catcher.x = mouseX
    catcher.debug = true;

    function draw() {
      // ...

      if (gameState === PLAY) {
        // ...

        // Limit catcher's movement within the boundaries
        catcher.x = constrain(mouseX, leftWall.position.x + leftWall.width / 2, rightWall.position.x - rightWall.width / 2);

        // ...
      }

      // ...
    }

    if (frameCount % 250 === 0) {
      drawcharizard();
    }

    if (frameCount % 250 === 0) {
      drawblastoise();
    }

    if (frameCount % 250 === 0) {
      drawzekrom();
    }

    if (frameCount % 250 === 0) {
      drawvenusaur();
    }

    if (frameCount % 250 === 0) {
      drawmewtwo();
    }

    //////////handleGameover

    if (charizardGroup.collide(backboard)) {
      handleGameover(charizardGroup);
    }

    if (blastoiseGroup.collide(backboard)) {
      handleGameover(blastoiseGroup);
    }

    if (zekromGroup.collide(backboard)) {
      handleGameover(zekromGroup);
    }

    if (venusaurGroup.collide(backboard)) {
      handleGameover(venusaurGroup);
    }

    if (mewtwoGroup.collide(backboard)) {
      handleGameover(mewtwoGroup);
    }

    if (keyIsDown(32)) {
      shootPokeball();
    }

    //////////handleCatcherCollision

    if (charizardGroup.collide(pokeballGroup)) {
      handlePokemonCollision(charizardGroup);
    }

    if (blastoiseGroup.collide(pokeballGroup)) {
      handlePokemonCollision(blastoiseGroup);
    }

    if (zekromGroup.collide(pokeballGroup)) {
      handlePokemonCollision(zekromGroup);
    }

    if (venusaurGroup.collide(pokeballGroup)) {
      handlePokemonCollision(venusaurGroup);
    }

    if (mewtwoGroup.collide(pokeballGroup)) {
      handlePokemonCollision(mewtwoGroup);

    } else {
      if (life === 0) {
        gameState = END;

      }
      drawSprites();
    }
  }
}

function drawcharizard() {
  charizard = createSprite(random(100, width - 100), random(1000, 780), 40, 40);
  charizard.addImage(charizardImg);
  charizard.scale = 0.25;
  charizard.velocityY = -5;
  charizard.lifetime = 500;
  charizardGroup.add(charizard);
}

function drawblastoise() {
  blastoise = createSprite(random(100, width - 100), random(1000, 780), 40, 40);
  blastoise.addImage(blastoiseImg);
  blastoise.scale = 0.25;
  blastoise.velocityY = -5;
  blastoise.lifetime = 500;
  blastoiseGroup.add(blastoise);
}

function drawzekrom() {
  zekrom = createSprite(random(100, width - 100), random(1000, 780), 40, 40);
  zekrom.addImage(zekromImg);
  zekrom.scale = 0.25;
  zekrom.velocityY = -5;
  zekrom.lifetime = 500;
  zekromGroup.add(zekrom);
}

function drawvenusaur() {
  venusaur = createSprite(random(100, width - 100), random(1000, 780), 40, 40);
  venusaur.addImage(venusaurImg);
  venusaur.scale = 0.25;
  venusaur.velocityY = -5;
  venusaur.lifetime = 500;
  venusaurGroup.add(venusaur);
}

function drawmewtwo() {
  mewtwo = createSprite(random(100, width - 100), random(1000, 780), 40, 40);
  mewtwo.addImage(mewtwoImg);
  mewtwo.scale = 0.25;
  mewtwo.velocityY = -5;
  mewtwo.lifetime = 500;
  mewtwoGroup.add(mewtwo);
}


var pokeballTimer = 0; // Timer variable to control pokeball shooting

function shootPokeball() {
  if (frameCount - pokeballTimer > 15) { // Shoot a pokeball every 0.5 seconds (30 frames)
    pokeball = createSprite(catcher.x, catcher.y - 25, 50, 20);
    pokeball.addImage(pokeballImg);
    pokeball.scale = 0.075;
    pokeball.velocityY = 5;
    pokeballGroup.add(pokeball);

    pokeballTimer = frameCount; // Reset the timer
  }
}


function handlePokemonCollision(pokemonGroup) {
  if (life > 0) {
    score = score + 1;
  }

  net = createSprite(pokeball.x + 60, pokeball.y, 50, 50);
  net.addImage(netImg);
  net.scale = 0.3;
  net.lifetime = 20;

  // Destroy the Pokemon and the net after collision
  pokemonGroup.destroyEach();
  pokeball.destroy();
  net.destroy();
}

function handleGameover(pokemonGroup) {
  if (life > 0) {
    life = life - 1;
  }

  pokemonGroup.destroyEach();

  if (life === 0) {
    gameState = END;
  }
}



