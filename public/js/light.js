/**
 * @author Jake Armendariz
 * THis file is literally so I don't fuck up the game by changing too many things wbile trying to clean code
 * */
//Instance variables
var startTime = 0;
var counter = 0;
var gameStarted = false;
var xPos;
var yPos;
var aHeight;
var aWidth;
var direction = 0;
var explosion = false;
var explosionSize;
var astDestroyed = 0;
var hitCounter = [];
var highScore = 0;
//Increases difficulty
var speedInc = 0.2;
var gameSpeed = 0.2;
var canRestart = true;
var bullets;
var bullet;
var spaceObjects;
var ave;
var bigFlame = true;
var drawAsteroid;
var drawEndingScreen;
var starsX;
var starsY;
var keys;
var moving = false;
//Where to add images and fonts
function preload() {}
setup = function () {
  keys = 1;
  createCanvas(900, 900);
  background(0, 0, 0);
  ave = (width + height) / 2;
  explosionSize = 0.025 * height;
  aHeight = 0.2 * ave;
  aWidth = aHeight * (50 / 175);
  xPos = 0.5 * width - aWidth / 2;
  yPos = 0.8 * height - aHeight;
  speedInc = 0.0035 * ave;
  gameSpeed = 0.01 * ave;
  //Rocket Shots
  starsX = [];
  starsY = [];
  for (var i = 0; i < 50; i++) {
    starsX[i] = random(0, width);
    starsY[i] = random(0, height);
  }
  bullets = [];
  bullet = function (x, y) {
    this.x = x;
    this.y = y;
  };

  spaceObjects = [{
      x: random(1, width - 20),
      y: random(-1, -100),
      size: random(0.075 * width, 0.175 * width),
      speed: random(1, 2) + speedInc
    },
    {
      x: random(1, width - 20),
      y: random(-100, -200),
      size: random(0.05 * width, 0.125 * width),
      speed: random(1, 2) + speedInc
    },
    {
      x: random(1, width - 20),
      y: random(-200, -300),
      size: random(0.07 * width, 0.1125 * width),
      speed: random(1, 3) + speedInc
    },
    {
      x: random(1, width),
      y: random(-50, -150),
      size: random(0.015 * width, 0.075 * width),
      speed: random(random(1, 2), random(2, 3)) + speedInc
    },
    {
      x: random(1, width),
      y: random(-200, -300),
      size: random(0.0375 * width, 0.075 * width),
      speed: random(1, 3) + speedInc
    }
  ];
  for (var i = 0; i < spaceObjects.length; i++) {
    hitCounter[i] = 0;
  }

  keyPressed = function () {
    if (!gameStarted) {

      gameStarted = true;
      startTime = millis();
      aHeight = 0.085 * ave;
      aWidth = aHeight * (50 / 175);
      xPos = 0.5 * width - aWidth / 2;
      yPos = 0.9 * height - aHeight;
      counter = 0;
    }
    if (keyCode === 32) {
      addShot();

    }
    if (keyCode == 191) {
      addShot();
    }
    if (keyCode === 37) {
      direction = 3;
      moving = true;
    }
    if (keyCode === 38) {
      direction = 0;
      moving = true;
    }
    if (keyCode === 39) {
      direction = 1;
      moving = true;
    }
    if (keyCode === 40) {
      direction = 2;
      moving = true;
    }

  };
};


function drawAst(xloc, yloc, size, num) {
  const grayvalues = 180 / num;
  const steps = size / num;
  for (let i = 20; i < num; i++) {
    fill(i * grayvalues);
    ellipse(xloc, yloc, size - i * steps, size - i * steps);
  }
}



function drawPlanet(xloc, yloc, size, num) {
  const grayvalues = 180 / num;
  const steps = size / num;
  for (let i = 20; i < num; i++) {
    fill(i * grayvalues, i * grayvalues, 255);
    ellipse(xloc, yloc, size - i * steps, size - i * steps);
  }
}



function drawSun(xloc, yloc, size, num) {
  const grayvalues = 180 / num;
  const steps = size / num;
  for (let i = 20; i < num; i++) {
    fill(205 + i * i * grayvalues / 2, 205 + i * grayvalues / 2, i * grayvalues);
    ellipse(xloc, yloc, size - i * steps, size - i * steps);
  }
}



function mouseClicked() {
  addShot();
}

var up = function () {
  console.log("pls");
  direction = 3;
}


var left = function () {
  direction = 1;
}

var right = function () {
  direction = 2;
}

var down = function () {
  direction = 0;
}


//This is all for fun
var drawRocket = function () {
  noStroke();
  if (counter % 10) {
    bigFlame = !bigFlame;
  }

  fill(220, 220, 220);
  rect(xPos, yPos, aWidth, aHeight);
  fill(200, 200, 200);
  rect(xPos, yPos, aWidth / 6, aHeight);
  fill(180, 180, 180);
  rect(xPos + aWidth / 3, yPos, (aWidth * 2) / 3, aHeight);
  fill(130, 130, 130);
  rect(xPos + (aWidth * 2) / 3, yPos, (aWidth * 1) / 3, aHeight);

  fill(160, 1, 70);
  triangle(
    xPos,
    yPos,
    xPos + aWidth / 2,
    yPos - aHeight * (7 / 16),
    xPos + aWidth,
    yPos
  );
  ellipse(xPos + aWidth / 2, yPos + aHeight * 0.01, aWidth, aHeight * 0.2);
  fill(160 + 20, 1 + 20, 70 + 20);
  triangle(
    xPos,
    yPos + aHeight,
    xPos - aWidth / 2,
    yPos + aHeight,
    xPos,
    yPos + aHeight / 4
  );
  fill(160, 1, 70);
  triangle(
    xPos + (3 / 2) * aWidth,
    yPos + aHeight,
    xPos + aWidth,
    yPos + aHeight,
    xPos + aWidth,
    yPos + aHeight / 4
  );

  triangle(
    xPos + aWidth / 3,
    yPos + aHeight,
    xPos + aWidth * (2 / 3),
    yPos + aHeight,
    xPos + aWidth / 2,
    yPos + aHeight / 4
  );

  if (bigFlame) {
    fill(255, 100, 10);
    triangle(
      xPos,
      yPos + aHeight,
      xPos + aWidth,
      yPos + aHeight,
      xPos + aWidth / 2,
      yPos + aHeight * (9 / 6)
    );
    fill(210, 230, 0);
    triangle(
      xPos + aWidth / 4,
      yPos + aHeight,
      xPos + aWidth - aWidth / 4,
      yPos + aHeight,
      xPos + aWidth / 2,
      yPos + aHeight * (8 / 6)
    );
  } else {
    fill(255, 100, 10);
    triangle(
      xPos,
      yPos + aHeight,
      xPos + aWidth,
      yPos + aHeight,
      xPos + aWidth / 2,
      yPos + aHeight * (11 / 6)
    );
    fill(210, 230, 0);
    triangle(
      xPos + aWidth / 4,
      yPos + aHeight,
      xPos + aWidth - aWidth / 4,
      yPos + aHeight,
      xPos + aWidth / 2,
      yPos + aHeight * (10 / 6)
    );
  }
};

var addShot = function () {
  var b = new bullet(xPos + aWidth / 2, yPos - aHeight * (1 / 2));
  bullets.push(b);
};
var displayBullets = function () {
  fill(255, 238, 0);
  for (var i = 0; i < bullets.length; i++) {
    rect(bullets[i].x, bullets[i].y, 0.0075 * height, aHeight / 5);
  }
};
//Move up continously unless they contact a asteroid
var updateBullets = function () {
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].y -= gameSpeed;
  }
};

//Draws all asteroids at their updated positions. When destroyed they will be shot out of view
var drawObjects = function () {
  for (var i = 0; i < spaceObjects.length; i++) {
    if (spaceObjects[i].size > 0.1425 * width) {
      fill(255, 238, 0);
      drawSun(spaceObjects[i].x,
        spaceObjects[i].y,
        spaceObjects[i].size * 1.2, 50);
    } else if (spaceObjects[i].size < 0.1125 * width) {
      fill(140, 138, 140);
      drawAst(spaceObjects[i].x,
        spaceObjects[i].y,
        spaceObjects[i].size * 1.2, 50);
    } else {
      fill(65, 72, 163);
      drawPlanet(spaceObjects[i].x,
        spaceObjects[i].y,
        spaceObjects[i].size * 1.2, 50);
    }
    /*
        ellipse(
          spaceObjects[i].x,
          spaceObjects[i].y,
          spaceObjects[i].size,
          spaceObjects[i].size
        );*/

    fill(247, 244, 244);
    textSize(12);
    //text(i, spaceObjects[i].x, spaceObjects[i].y);
  }
};

//Problem here
var intersection = function () {
  var place = -1;
  var aPlace = -1;
  var bigHit = false;
  var hit = 0;
  for (var i = 0; i < spaceObjects.length; i++) {
    for (var j = 0; j < bullets.length; j++) {
      var di = dist(
        bullets[j].x,
        bullets[j].y,
        spaceObjects[i].x,
        spaceObjects[i].y
      );
      if (di < spaceObjects[i].size / 2) {
        hit++;
        place = i;
        aPlace = j;
      }
    }
    hitCounter[i] += hit;
    hit = 0;
  }
  //Depending on size it takes # of hits to destroy
  if (place !== -1) {
    if (spaceObjects[place].size < 0.1125 * width) {
      spaceObjects[place].y = -75;
      spaceObjects[place].x = random(0, width);
      hitCounter[place] = 0;
      astDestroyed++;
    } else if (
      hitCounter[place] >= 2 &&
      spaceObjects[place].size < 0.1425 * width
    ) {
      spaceObjects[place].y = -75;
      spaceObjects[place].x = random(0, width);
      hitCounter[place] = 0;
      astDestroyed++;
    } else if (hitCounter[place] >= 3) {
      spaceObjects[place].y = -75;
      spaceObjects[place].x = random(0, width);
      hitCounter[place] = 0;
      astDestroyed++;
    }
    // print("before: " + bullets.length);
    //This should be enough but sometimes it gets rid of all bullets
    bullets.splice(aPlace, 1);
    // println("after " + bullets.length);
    counter += 20;
  }
};

//leftArrow = 37 //TopArrow = 38 //rightArrow = 39 //leftArrow = 40
//= 0 north, 1= east, 2 = south, 3 = west

drawAsteroid = function (x, y, w, h) {
  stroke(2);
  fill(140, 138, 140);
  ellipse(x, y, w, h);
  fill(80, 80, 80);
  ellipse(x + w * 0.3, y + h * 0.3, w * 0.2, h * 0.2);
};

drawEndingScreen = function () {
  fill(255, 180, 0);
  textAlign(CENTER);
  textSize(0.1 * width);
  fill(0, 0, 0);
  text("Score: " + counter, width / 2, Math.round(0.3 * height));
  if (counter > highScore) {
    highScore = counter;
  }
  textSize(Math.round(0.06 * width));
  textFont("Georgia");
  text("High score: " + highScore, width / 2, 0.4275 * height);
  text(
    "Asteroids Destroyed: " + astDestroyed,
    width / 2,
    Math.round(0.55 * height)
  );
  text("Press any button to restart", width / 2, Math.round(0.665 * height));
};
/**
 * updateRocket
 *
 * Depending on the direction it will increase the speed
 */
var updateRocket = function () {
  if (keyIsPressed) {
    if (moving) {
      if (direction === 0) {
        yPos -= gameSpeed;
      } else if (direction === 1) {
        xPos += gameSpeed;
      } else if (direction === 2) {
        yPos += gameSpeed;
      } else if (direction === 3) {
        xPos -= gameSpeed;
      } else {}
    }
  } else {
    keys = 0;
    moving = false;
  }

  if (xPos < -1 * aWidth) {
    xPos = width;
  } else if (xPos >= width + aWidth) {
    xPos = -1 * aWidth;
  }

  if (yPos + aHeight > height) {
    yPos = height - aHeight;
  } else if (yPos < 0) {
    yPos = 0;
  }
};

var updateObjects = function () {
  for (var i = 0; i < spaceObjects.length; i++) {
    spaceObjects[i].y += spaceObjects[i].speed;
    if (spaceObjects[i].y > height * 1.15) {
      spaceObjects[i].y = -50;
      spaceObjects[i].x = random(0, width);
      spaceObjects[i].size += random(-10, 15);
    }
    if (spaceObjects[i].size < 0.0375 * width) {
      spaceObjects[i].size = 0.0375 * width;
    }
    var d = dist(
      xPos + aWidth / 2,
      yPos - aHeight / 2,
      spaceObjects[i].x,
      spaceObjects[i].y
    );
    if (
      (spaceObjects[i].x > xPos &&
        spaceObjects[i].x < xPos + 0.08 * width &&
        spaceObjects[i].y > yPos &&
        spaceObjects[i].y < yPos + 0.15 * height) ||
      d < spaceObjects[i].size / 2
    ) {
      explosion = true;
      startTime = millis();
    }
  }
  //Adds Asteroids to increase difficulty as program continues
  if (counter % 1000 === 0) {
    spaceObjects.push({
      x: random(1, width),
      y: random(-50, -150),
      size: random(0.0375 * width, 0.1 * width),
      speed: random(counter / 1000, counter / 1500 + 2) + speedInc
    });
  }
};
var restart = function () {
  explosionSize = 10;
  explosion = false;
  gameStarted = true;
  counter = 0;
  xPos = 0.4875 * width;
  yPos = 0.805 * height;
  bullets.splice(0);
  spaceObjects.splice(5); //Starts with 5 space objects
  astDestroyed = 0;
  for (var i = 0; i < spaceObjects.length; i++) {
    spaceObjects[i].y = random(-200, -40);
    if (spaceObjects[i].size > 0.0875 * width) {
      spaceObjects[i].size = random(0.0375 * width, 0.1 * width);
    }
  }
};

//Main method of the program
draw = function () {
  // console.log(direction);
  background(0, 0, 0);
  fill(255, 245, 92);
  var starSize = ave * 0.003;
  for (var i = 0; i < starsX.length; i++) {
    ellipse(starsX[i], starsY[i], starSize, starSize);
  }

  if (!gameStarted) {
    counter++;
    textAlign(CENTER);
    fill(255, 255, 100);
    textSize(0.1075 * width);
    textFont("Helvetica");
    textFont("Times new Roman");
    text("LIGHTSPEED", 0.5 * width, 0.3 * height);
    textSize(0.05 * width);
    text("Press any button to begin", 0.5 * width, 0.4 * height);

    drawRocket();
  } else if (!explosion) {
    canRestart = false;
    counter++;
    updateRocket();
    updateObjects();
    displayBullets();
    updateBullets();
    drawRocket();
    drawObjects();
    intersection();
    textSize(width * 0.05);
    fill(255, 0, 0);
    text(counter, 0.875 * width, 0.08 * height);
  } else if (explosionSize < ave * 2) {
    drawRocket();
    drawObjects();
    fill(255, 180, 0);
    ellipse(xPos, yPos, explosionSize, explosionSize);
    explosionSize += 0.025 * width;
    if (explosionSize > width / 2) {
      drawEndingScreen();
    }

    if (millis() - startTime > 1500) {
      canRestart = true;
    }
    if (keyIsPressed && canRestart) {
      restart();
    }
  } else {
    background(255, 180, 0);
    drawEndingScreen();
    if (keyIsPressed) {
      restart();
    }
  }
};