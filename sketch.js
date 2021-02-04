var balloon, balloonImage;
var database, position;

function preload(){
 balloonImage = loadImage("Hot Air Balloon-01")
}

function setup() {
  createCanvas(800,400);

  database = firebase.database();

  balloon = createSprite(400, 200, 50, 50);
  balloon.addImage("flying",balloonImage)
}

function draw() {
  background("lightBlue");
    if (keyDown(LEFT_ARROW)) {
        changePosition(-1, 0);
    }
    else if (keyDown(RIGHT_ARROW)) {
        changePosition(1, 0);
    }
    else if (keyDown(UP_ARROW)) {
        changePosition(0, -1);
    }
    else if (keyDown(DOWN_ARROW)) {
        changePosition(0, +1);
    }
    readPosition()
    drawSprites();
}

function changePosition(x, y) {
  var position = database.ref("balloon").update({
      'x': balloon.x +x,
      'y': balloon.y +y
  })
}

function readPosition() {
   var position = database.ref("balloon").on("value", function (data) {
       pos = data.val()
       balloon.x = position.x
       balloon.y = position.y
   })


}