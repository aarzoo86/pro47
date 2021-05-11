// to create variable
var monster,alien_moving,fruit,fruitImage,fruit1,fruit2,fruit3,fruit4;
var sword,swordImage;
var gameOverImage,bgImage;
var score;
var fruitGroup,enemyGroup;

var PLAY = 1;
var END = 0;
var gameState = 1;

function preload(){
  
 //to load animation
  alien_moving = loadAnimation("alien1.png","alien2.png");
  
  //to load images
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  swordImage = loadImage("sword.png");
  bgImage = loadImage("bg.png");
  gameOverImage = loadImage("gameover.png");
  
  }

function setup() {

 //to create canvas
  createCanvas(600, 600);
  
//sword
  sword = createSprite(40,200,20,20);
sword.addImage(swordImage);
sword.scale = 0.5;
  
 //score
  score = 0
  
  //groups
  fruitGroup = new Group();
  enemyGroup = new Group();
  
}

function draw(){
  
  //bg
  background(bgImage);
  //displaying score
  text("Score: "+ score, 500,50);
  fill("black")
  
  //game stae play
  if(gameState === PLAY) {
    
   //to move sword along with mouse
    sword.y = World.mouseY;
    sword.x = World.mouseX;
    
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score = score+5;
       }
    
    fruits();
  Enemy();
  }
    
   //gamestate end
  if(enemyGroup.isTouching(sword)){
     gameState = END;
     
    //to destroy groups
    fruitGroup.destroyEach();
     enemyGroup.destroyEach();
     //group velocity
    fruitGroup.setVelocityXEach(0);
     enemyGroup.setVelocityXEach(0);
     
     sword.addImage(gameOverImage);
    gameOverImage.scale = 6;
    gameOverImage.x = 300;
    //to reposition sword
    sword.x = 200;
     sword.y = 200;
     }

//to enable sprites
  drawSprites();
  
}

//function for fruits
function fruits(){
  
 if(World.frameCount%80===0){
   fruit = createSprite(500,300,20,20);
   fruit.scale=0.2;
   //fruit.debug = true;
   r = Math.round(random(1,4));
   if(r ===1){
     fruit.addImage(fruit1);
 } else if (r === 2) {
   fruit.addImage(fruit2);         
  }else if (r === 3) {
   fruit.addImage(fruit3);         
  }else{
    fruit.addImage(fruit4);
   }
   
   fruit.y = Math.round(random(50,340))
   
   fruit.velocityX = -7;
   fruit.setLifetime = 100;
   
   fruitGroup.add(fruit);
    }
 }

//function for enemy
function Enemy(){
  if(World.frameCount%200===0){
    monster = createSprite(400,200,20,20);
    monster.addAnimation("moving",alien_moving);
    monster.y = Math.round(random(100,300));
    monster.velocityX = -8;
    monster.setLifetime = 50;
    
    enemyGroup.add(monster);
     
     }
}