var PLAY, END, START, REST, RESET, gameState, ground, invisibleGround, corona, precaution, count=0, heart=3, covid=null, prec, button, restart, Hscore=0, rand, boy, hearts1, hearts2, hearts3, tree, bench, treeGroup, benchGroup, bush, bushGroup, cloud, cloudGroup, rand2, pause, PAUSE, restartP, home, resume; 
var runningBoy, boyStart, covidImg, resetImg, prec1, prec2, prec3, prec4, heartImg, bgImg, footpathImg, bushImg, treeImg, benchImg, startImg, startButton, endImg, cloudImg, pauseImg, restartPImg, resumeImg, homeImg;
var bgSound, collect, pass, bang;

function preload(){
  covidImg= loadImage("pics/covid.png");
  resetImg= loadImage("pics/restart.png");
  prec1= loadImage("pics/pre1.png");
  prec2= loadImage("pics/pre2.png");
  prec3= loadImage("pics/pre3.png");
  prec4= loadImage("pics/pre4.png");
  heartImg= loadImage("pics/heart.png");
  bgImg= loadImage("pics/bground.jpg");
  footpathImg= loadImage("pics/footpath.png");
  bushImg= loadImage("pics/bush.png");
  treeImg= loadImage("pics/tree.png");
  benchImg= loadImage("pics/bench.png");
  startImg= loadImage("pics/StartBg.jpg");
  startButton= loadImage("pics/start.png");
  endImg= loadImage("pics/end.jpg");
  cloudImg= loadImage("pics/cloud.png");
  pauseImg= loadImage("pics/pause.png");
  restartPImg= loadImage("pics/restarting.png");
  resumeImg= loadImage("pics/resume.png");
  homeImg= loadImage("pics/home.png");
  boyStart= loadImage("pics/boy.png");
  runningBoy= loadAnimation("pics/boy1.png","pics/boy2.png","pics/boy3.png","pics/boy4.png","pics/boy5.png","pics/boy6.png","pics/boy7.png","pics/boy8.png");
  bgSound= loadSound("sound/bgmusic.mp3");
  /*collect= loadSound("sound/life.mp3");
  pass= loadSound("sound/banging.mp3");
  bang= loadSound("sound/bang.mp3");*/
}

function setup(){
   createCanvas(windowWidth , windowHeight);
     PLAY = 1;
     END = 0;
     START= 2;
     REST = 3;
     RESET=4;
     PAUSE=5; 
    gameState = START;
    boy = createSprite(windowWidth/4, windowHeight*4/5-20,20,50);
    boy.addAnimation("boy",runningBoy);
    boy.scale= 0.5;
    boyStand= createSprite(windowWidth/4, windowHeight*4/5-20,20,50);
    boyStand.addImage("stand", boyStart);
    boyStand.scale=0.5;
    boyStand.visible= false; 
    ground = createSprite(windowWidth/2,windowHeight*4/5,windowWidth*2,20);
    ground.addImage(footpathImg);
    button= createSprite(windowWidth/2+50,windowHeight/2,10,10);
    button.addImage("start",startButton);
    button.visible= false;
    restart= createSprite(windowWidth/2-10, windowHeight/2+100, 50, 50);
    restart.addImage("image", resetImg);
    restart.scale=0.6;
    restart.visible= false;
    pause= createSprite(windowWidth-100, 100, 50, 50);
    pause.addImage("pause",pauseImg);
    pause.scale=0.5;
    pause.visible= false; 
    restartP= createSprite(windowWidth/2, windowHeight/2-100, 30, 30);
    restartP.addImage("restart",restartPImg);
    restartP.scale= 0.5;
    restartP.visible= false;
    resume= createSprite(windowWidth/2, windowHeight/2, 30, 30);
    resume.addImage("resumes",resumeImg);
    resume.scale=0.5;
    resume.visible= false; 
    home= createSprite(windowWidth/2, windowHeight/2+100, 30, 30);
    home.addImage("home",homeImg);
    home.scale= 0.5;
    home.visible= false;
    ground.x = ground.width /2;
    invisibleGround = createSprite(windowWidth/2,windowHeight*4/5-10,windowWidth,5);
    invisibleGround.visible = false;
    hearts1= createSprite((windowWidth/4)-100, windowHeight/8);
    hearts1.addImage("life", heartImg);
    hearts1.scale= 0.4;
    hearts2= createSprite((windowWidth/4)-200, windowHeight/8);
    hearts2.addImage("life", heartImg);
    hearts2.scale= 0.4;
    hearts3= createSprite((windowWidth/4)-300, windowHeight/8);
    hearts3.addImage("life", heartImg);
    hearts3.scale= 0.4;
    ground.depth= boy.depth;
    boy.depth++;
    corona = new Group();
    precaution= new Group(); 
    treeGroup= new Group();
    benchGroup= new Group();
    bushGroup= new Group();
    cloudGroup= new Group();
    
    textSize(18);
    textFont("Georgia");
    textStyle(BOLD);

    count = 0;
}

function draw(){

  
  background(bgImg);
  hearts1.visible= false;
  hearts2.visible= false;
  hearts3.visible= false;
      
      fill("black");
      textSize(40);
      text("Score: "+count,windowWidth*3/4-50, windowHeight/8);
      //text("Lives: "+heart,(windowWidth/4)-100, windowHeight/8);

      if (gameState === START){
        background(startImg);
        button.visible=true; 
        hide();
        textSize(30);
        fill("red");
        text("LETS BEAT COVID",windowWidth/2-125, windowHeight/2-200);
        text("TO BEAT COVID:",windowWidth/2-100, windowHeight*4/5);
        text("1.AVOID THE COVIDS IN YOUR PATH", windowWidth/2-250, windowHeight*4/5+50);
        text("2.COLLECT MASKS, SANITISERS, FOOD AND GLOVES FOR EXTRA LIVES", windowWidth/2-550, windowHeight*4/5+100);
        text("BEST OF LUCK CORONA WARRIOR", windowWidth/2-250, windowHeight*4/5+150);
        if (mousePressedOver(button)||(touches[0]===windowWidth/2 && touches[1]===windowHeight/2)){
          gameState= REST;
          touches=[];
      }
    }

      if (gameState==REST){
        pause.visible= false; 
        count=0;
        boyStand.visible= true; 
        button.visible=false;
        boy.visible=false;
        boyStand.collide(invisibleGround);
        ground.visible=true;
        if (keyDown("space")||touches.length>0){
          gameState=PLAY;
          touches=[];
        }
      }
      
      if(gameState === PLAY){
        bgSound.play();
        boy.visible=true;
        boyStand.visible= false; 
        count += Math.round(World.frameRate/60);
        ground.velocityX = -(6 + 3*count/100);

        //boy.debug= true;
        boy.setCollider("rectangle",0,0,10,400);

        //boy.addAnimation("boy",runningBoy);

        pause.visible= true;
  
        if (ground.x < 0){
          ground.x = ground.width/2;
        }

        //console.log(boy.y);

        if (mousePressedOver(pause)||(touches[0]===windowWidth-100 && touches[1]===100)){
          gameState=PAUSE; 
          touches=[];
        }
         
        if(keyDown("space") ||touches.length>0 ){
          boy.velocityY = -10 ;
          touches=[];
        }
      
        
        boy.velocityY= boy.velocityY + 0.8;

        if (count>Hscore){
          Hscore= count;
        }
      
        
        spawnObstacles();
        mask();
        spawnTree();
        spawnBench();
        spawnBush();
        spawnClouds();

        if (covid!==null){
        if (covid.isTouching(boy)){
          //if (heart>0){
            heart-=1;
            covid= null;
            //console.log("heart");
          //}
        }
      }

      /*for (var i=1; i<=heart; i++){
        hearts= createSprite((windowWidth/4)-(i*100), windowHeight/8);
        hearts.addImage("life",heartImg);
        hearts.scale=0.4;
      }*/

      if (heart==1){
        hearts1.visible= true;
      }

      if (heart==2){
        hearts1.visible= true;
        hearts2.visible= true;
      }

      if (heart==3){
        hearts1.visible= true;
        hearts2.visible= true;
        hearts3.visible= true;
      }

        
        if(heart==0){
          gameState = END;
        }

      if(precaution.isTouching(boy)){
        precaution.destroyEach();
        if (heart<3){
          heart+=1;
          //console.log("prec");
        }
      }
    }

    if (gameState==PAUSE){
      background("black");
      pause.visible= false; 
      fill("red");
      textSize(50);
      text("PAUSE", windowWidth/2-100, windowHeight/5);
      restartP.visible= true;
      resume.visible=true;
      home.visible= true;
      hide();
      boy.velocityY=0;
      ground.velocityX = 0;
      corona.setVelocityXEach(0);
      precaution.setVelocityXEach(0);
      treeGroup.setVelocityXEach(0);
      bushGroup.setVelocityXEach(0);
      benchGroup.setVelocityXEach(0);
      cloudGroup.setVelocityXEach(0);
      corona.setLifetimeEach(0);
        precaution.setLifetimeEach(0);
        treeGroup.setLifetimeEach(0);
        bushGroup.setLifetimeEach(0);
        benchGroup.setLifetimeEach(0);
        cloudGroup.setLifetimeEach(0);
      if (mousePressedOver(restartP)||(touches[0]===windowWidth/2 && touches[1]===windowHeight/2-100)){
        gameState=RESET;
        touches=[];
        restartP.visible= false;
      resume.visible=false;
      home.visible= false;
      }
      if (mousePressedOver(resume)||(touches[0]===windowWidth/2 && touches[1]===windowHeight/2)){
        gameState=PLAY;
        touches=[];
        restartP.visible= false;
      resume.visible=false;
      home.visible= false;
      boy.visible= true;
      ground.visible=true;
      }
      if (mousePressedOver(home)||(touches[0]===windowWidth/2 && touches[1]==windowHeight/2+100)){
        gameState=REST;
        touches=[];
        restartP.visible= false;
      resume.visible=false;
      home.visible= false;
      }
    }
      
      if(gameState === END) {
        bgSound.stop();

        boyStand.visible= true;
        boy.visible= false;
        
        corona.setLifetimeEach(-1);
        precaution.setLifetimeEach(-1);
        treeGroup.setLifetimeEach(-1);
        bushGroup.setLifetimeEach(-1);
        benchGroup.setLifetimeEach(-1);
        cloudGroup.setLifetimeEach(-1);
        
        
        boy.velocityY=0;
        ground.velocityX = 0;
        corona.setVelocityXEach(0);
        precaution.setVelocityXEach(0);
        treeGroup.setVelocityXEach(0);
        bushGroup.setVelocityXEach(0);
        benchGroup.setVelocityXEach(0);
        cloudGroup.setVelocityXEach(0);
        if (keyDown("space")||touches.length>0){
          gameState=RESET;
          touches=[];
        }
      }

      else if (gameState==RESET){
        boyStand.visible=false; 
        pause.visible= false; 
        background(endImg);
        fill("black");
        textSize(18);
        text("YOUR SCORE:"+count,windowWidth/2-100,windowHeight/4);
        text("HIGH SCORE:"+Hscore,windowWidth/2-100,windowHeight/4+100);
        textSize(30);
        text("DON'T GIVE UP",windowWidth/2-125, windowHeight/2);
        restart.visible=true;
        hide();
        corona.destroyEach();
        precaution.destroyEach();
        treeGroup.destroyEach();
        bushGroup.destroyEach();
        benchGroup.destroyEach();
        cloudGroup.destroyEach();
        if (mousePressedOver(restart)||(touches[0]===windowWidth/2 && touches[1]===windowHeight/2)){
          gameState=REST;
          restart.visible= false;
          heart=3;
          touches=[];
        }
      }

      boy.collide(invisibleGround);
      
      drawSprites();
      //console.log(windowWidth/20);
    }

    function spawnTree(){
      if (frameCount%150===0){
      tree= createSprite(windowWidth+400,windowHeight*4/5-200,30,100);
      tree.addImage("tree",treeImg);
      tree.scale=0.7;
      tree.depth= boy.depth;
      boy.depth++;
      boyStand.depth= boy.depth;
      tree.velocityX = - (6 + 3*count/100);
      tree.lifetime = 1000;
      treeGroup.add(tree);
      }
    }

    function spawnBench(){
      if (frameCount%500===0){
        bench=createSprite(windowWidth+700,windowHeight*4/5-100,40,80);
        bench.addImage("bench",benchImg);
        bench.scale=0.4;
        bench.depth= boy.depth;
        boy.depth++;
        boyStand.depth= boy.depth;
        bench.velocityX = - (6 + 3*count/100);
        bench.lifetime = 1000;
        benchGroup.add(bench);
      }
    }

    function spawnBush(){
      if (frameCount%300===0){
        bush=createSprite(windowWidth+900,windowHeight*4/5-80,40,80);
        bush.addImage("bush", bushImg);
        bush.scale=0.4;
        bush.depth= boy.depth;
        boy.depth++;
        boyStand.depth= boy.depth;
        bush.velocityX = - (6 + 3*count/100);
        bush.lifetime = 1000;
        bushGroup.add(bush);
      }
    }

    function spawnClouds(){
      if (frameCount%120===0){
        rand2= Math.round(random(0, 50));
        var cloud= createSprite(windowWidth+50, windowHeight/8+rand2, 50, 50);
        cloud.addImage("cloud", cloudImg);
        cloud.scale=0.5;
        cloud.depth= hearts1.depth;
        hearts1.depth++;
        cloud.depth= 5;
        cloud.velocityX= - (6 + 3*count/100);
        cloud.lifetime= 1000;
        cloudGroup.add(cloud);
      }
    }

    function hide(){
      boy.visible=false;
      ground.visible=false;
    }

    function spawnObstacles() {
      if(frameCount % (windowWidth/10) === 0){
        covid = createSprite(windowWidth+20,windowHeight*4/5-40,10,40);
        covid.addImage("covid19", covidImg);
        covid.scale= 0.3;
        covid.velocityX = - (6 + 3*count/100);
        covid.lifetime = 1000;
        corona.add(covid);
      }
    }
  
      function mask(){
        if (frameCount%(windowWidth/10)===0){
          rand= Math.round(random(1,4));
          prec= createSprite(windowWidth+600,windowHeight*4/5-350, 20, 20);
          if (rand==1){
            prec.addImage("precaution3",prec1);
          }
          if (rand==2){
            prec.addImage("precaution2",prec2);
          }
          if (rand==3){
            prec.addImage("precaution1",prec3);
          }
          if (rand==4){
            prec.addImage("precaution4",prec4);
          }
          prec.scale= 0.2;
          prec.velocityX= - (6 + 3*count/100);
          prec.lifetime= 1000;
          precaution.add(prec);
        }
      }