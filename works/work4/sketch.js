let count = 0;
let tileCountX = 6;
let tileCountY = 6;

let drawMode = 1;

function setup() {
  let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");

  rectMode(CENTER);
  noFill();
  stroke("rgb(0,255,0)");
}

function draw() {
  background(0);

  count = mouseX / 20 + 5;
  let para = min(height, mouseY) / height - 0.5;

  let tileWidth = width / tileCountX;
  let tileHeight = height / tileCountY;

  for (let gridY = 0; gridY <= tileCountY; gridY++) {
    for (let gridX = 0; gridX <= tileCountX; gridX++) {
      let posX = tileWidth * gridX + tileWidth / 2;
      let posY = tileHeight * gridY + tileHeight / 2;

      push();
      translate(posX, posY);

      // switch between modules
      switch (drawMode) {
        case 1:
          translate(-tileWidth / 2, -tileHeight / 2);
          for (let i = 0; i < count; i++) {
            line(
              0,
              (para + 0.5) * tileHeight,
              tileWidth,
              (i * tileHeight) / count
            );
            line(
              0,
              (i * tileHeight) / count,
              tileWidth,
              tileHeight - (para + 0.5) * tileHeight
            );
          }
          break;
        case 2:
          for (let i = 0; i <= count; i++) {
            line(
              para * tileWidth,
              para * tileHeight,
              tileWidth / 2,
              (i / count - 0.5) * tileHeight
            );
            line(
              para * tileWidth,
              para * tileHeight,
              -tileWidth / 2,
              (i / count - 0.5) * tileHeight
            );
            line(
              para * tileWidth,
              para * tileHeight,
              (i / count - 0.5) * tileWidth,
              tileHeight / 2
            );
            line(
              para * tileWidth,
              para * tileHeight,
              (i / count - 0.5) * tileWidth,
              -tileHeight / 2
            );
          }
          break;
        case 3:
          for (let i = 0; i <= count; i++) {
            line(
              0,
              para * tileHeight,
              tileWidth / 2,
              (i / count - 0.5) * tileHeight
            );
            line(
              0,
              para * tileHeight,
              -tileWidth / 2,
              (i / count - 0.5) * tileHeight
            );
            line(
              0,
              para * tileHeight,
              (i / count - 0.5) * tileWidth,
              tileHeight / 2
            );
            line(
              0,
              para * tileHeight,
              (i / count - 0.5) * tileWidth,
              -tileHeight / 2
            );
          }
          break;
      }

      pop();
    }
  }
}

function keyReleased() {
  if (key == "s" || key == "S") saveCanvas(gd.timestamp(), "png");
  if (key == "1") drawMode = 1;
  if (key == "2") drawMode = 2;
  if (key == "3") drawMode = 3;
  if (keyCode == DOWN_ARROW) tileCountY = max(tileCountY - 1, 1);
  if (keyCode == UP_ARROW) tileCountY += 1;
  if (keyCode == LEFT_ARROW) tileCountX = max(tileCountX - 1, 1);
  if (keyCode == RIGHT_ARROW) tileCountX += 1;
}
