
var joinedText;
var alphabet;
var drawLetters = [];

var posX;
var posY;

var drawLines = false;
var drawText = true;

function preload() {
  joinedText = loadStrings('6work6.txt');
}

function setup() {
  let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");


  textFont('monospace', 20);
  fill(255, 227, 246);

  joinedText = joinedText.join(' ');
  alphabet = getUniqCharacters();
  for (var i = 0; i < alphabet.length; i++) {
    drawLetters[i] = true;
  }
}


function draw() {
  background(38, 40, 33);

  posX = 20;
  posY = 40;
  var oldX = 0;
  var oldY = 0;

  // go through all characters in the text to draw them
  for (var i = 0; i < joinedText.length; i++) {
    // again, find the index of the current letter in the character set
    var upperCaseChar = joinedText.charAt(i).toUpperCase();
    var index = alphabet.indexOf(upperCaseChar);
    if (index < 0) continue;

    var sortY = index * 20 + 40;
    var m = map(mouseX, 50, width - 50, 0, 1);
    m = constrain(m, 0, 1);
    var interY = lerp(posY, sortY, m);

    if (drawLetters[index]) {
      if (drawLines) {
        if (oldX != 0 && oldY != 0) {
          stroke(181, 157, 0, 100);
          line(oldX, oldY, posX, interY);
        }
        oldX = posX;
        oldY = interY;
      }

      if (drawText) {
        noStroke();
        text(joinedText.charAt(i), posX, interY);
      }
    } else {
      oldX = 0;
      oldY = 0;
    }

    posX += textWidth(joinedText.charAt(i));
    if (posX >= width - 200 && upperCaseChar == ' ') {
      posY += 30;
      posX = 20;
    }
  }
}

function getUniqCharacters() {
  var charsArray = joinedText.toUpperCase().split('');
  var uniqCharsArray = charsArray.filter(function (char, index) {
    return charsArray.indexOf(char) == index;
  }).sort();
  return uniqCharsArray.join('');
}

function keyReleased() {
  if (keyCode == CONTROL) saveCanvas(gd.timestamp(), 'png');

  if (key == '1') drawLines = !drawLines;
  if (key == '2') drawText = !drawText;
  if (key == '3') {
    for (var i = 0; i < alphabet.length; i++) {
      drawLetters[i] = false;
    }
  }
  if (key == '4') {
    drawText = true;
    for (var i = 0; i < alphabet.length; i++) {
      drawLetters[i] = true;
    }
  }

  var index = alphabet.indexOf(key.toUpperCase());
  if (index >= 0) {
    drawLetters[index] = !drawLetters[index];
  }
}
