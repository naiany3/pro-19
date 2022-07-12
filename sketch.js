var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  spookySound.loop();
  doorsGroup = new Group();
  climbersGroup = new Group();
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost",ghostImg);
  invisibleBlockGroup = new Group();

}

function draw() {
  background(200);
   if(gameState === "play"){
    if(tower.y > 400){
      tower.y = 300
    } 
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    if(keyDown("left_arrow")){
      ghost.x+=4;

    }
    if(keyDown("right_arrow")){
      ghost.x-=4;
    }
    ghost.velocityY+=0.8;
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityy = 0;
    }
    if(invisibleBlockGroup.isTounching(ghost)||ghost.y > 600){
      ghost.destroy();
      gameState = "end";
    }
      doors()
   }
   if(gameState === "end"){
    stroke("black");
    fill("yellow");
    textSize(30);
    text('fim de jogo',230,550);

   }
   drawSprites();

}

function doors(){
  if(frameCount % 240 ===0){
    door = createSprite(200,-50);
    door.addImage(doorImg);
    door.x = Math.round(random(120,400));
    door.lifeTime = 800;
    doorsGroup.add(door);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    climber = createSprite(200,10);
    climber.addimage(climberImg);
    climber.x = door.x;
    door.velocityY = 2;
    climber.velocityY = 2;
    ghost.depth = door.depth;
    ghost.depht+=1;
    climber.lifeTime = 800;
    invisibleBlock.lifeTime = 800;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);

  }
}
