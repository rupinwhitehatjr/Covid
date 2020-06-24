var PLAY, END, START, REST, RESET, gameState, ground, invisibleGround, corona, precaution, count=0, heart=3, covid=null, prec, button, restart, Hscore=0, rand, boy, hearts1, hearts2, hearts3, tree, bench, treeGroup, benchGroup, bush, bushGroup, cloud, cloudGroup, rand2, pause, PAUSE, restartP, home, resume; 
var runningBoy, boyStart, covidImg, resetImg, prec1, prec2, prec3, prec4, heartImg, bgImg, footpathImg, bushImg, treeImg, benchImg, startImg, startButton, endImg, cloudImg, pauseImg, restartPImg, resumeImg, homeImg;
var bgSound, collect, die, bang;

function preload(){
  covidImg= loadImage("pics/covid.png");
  resetImg= loadImage("pics/restart.png");
  prec1= loadImage("pics/pre1.png");
  prec2= loadImage("pics/pre2.png");
  prec3= loadImage("pics/pre3.png");
  prec4= loadImage("pics/pre4.png");
  heartImg= loadImage("pics/heart.png");
  bgImg= loadImage("pics/bground.png");
  footpathImg= loadImage("pics/footpath.jpeg");
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
  bgSound= loadSound('sound/bgmusic.mp3');
  collect= loadSound("sound/life.mp3");
  die= loadSound("sound/die.mp3");
  bang= loadSound("sound/bang.mp3");
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
    boy = createSprite(windowHeight/4-100, windowWidth*4/5+100,20,50);
    boy.addAnimation("boy",runningBoy);
    boy.scale= 0.7;
    boyStand= createSprite(windowHeight/4-100, windowWidth*4/5+100,20,50);
    boyStand.addImage("stand", boyStart);
    boyStand.scale=0.7;
    boyStand.visible= false; 
    ground = createSprite(windowWidth/10+50,windowHeight/2+200);
    ground.addImage(footpathImg);
    button= createSprite(windowWidth/2+100,windowHeight/2,10,10);
    button.addImage("start",startButton);
    button.visible= false;
    restart= createSprite(windowHeight/2-10, windowWidth/2+100, 50, 50);
    restart.addImage("image", resetImg);
    restart.scale=0.6;
    restart.visible= false;
    pause= createSprite(windowWidth*9/10, windowHeight*4/5+200);
    pause.addImage("pause",pauseImg);
    pause.scale=0.5;
    pause.visible= false; 
    restartP= createSprite(windowHeight/2+100, windowWidth/2+50, 30, 30);
    restartP.addImage("restart",restartPImg);
    restartP.scale= 0.5;
    restartP.visible= false;
    resume= createSprite(windowHeight/2, windowWidth/2+50, 30, 30);
    resume.addImage("resumes",resumeImg);
    resume.scale=0.5;
    resume.visible= false; 
    home= createSprite(windowHeight/2-100, windowWidth/2+50, 30, 30);
    home.addImage("home",homeImg);
    home.scale= 0.5;
    home.visible= false;
    ground.y = ground.height /2;
    invisibleGround = createSprite(windowWidth/8-100,windowHeight/2,5,windowHeight*5);
    invisibleGround.visible = false;
    hearts1= createSprite(windowWidth*9/10,windowHeight/5+100);
    hearts1.addImage("life", heartImg);
    hearts1.scale= 0.4;
    hearts2= createSprite(windowWidth*9/10,windowHeight/5);
    hearts2.addImage("life", heartImg);
    hearts2.scale= 0.4;
    hearts3= createSprite(windowWidth*9/10,windowHeight/5-100);
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

  push();
  translate(windowWidth*9/10, windowHeight*4/5-100);
  fill("black");
  rotate(PI*28.5);
  textSize(40);
  text("Score: "+count,0,0);
  pop();
      

      if (gameState === START){
        background(startImg);
        button.visible=true; 
        hide();
      push();
      translate(windowWidth/2-100, windowHeight/2-100);
      fill("red");
      rotate(PI*28.5);
      textSize(30);
      text("TO BEAT COVID:",0,0);
      pop();

      push();
      translate(windowWidth/2-150, windowHeight/2-250);
      fill("red");
      rotate(PI*28.5);
      textSize(30);
      text("1.AVOID THE COVIDS IN YOUR PATH",0,0);
      pop();

      push();
      translate( windowWidth/2-200, windowHeight/2-250);
      fill("red");
      rotate(PI*28.5);
      textSize(30);
      text("2.COLLECT MASKS, SANITISERS, FOOD",0,0);
      pop();

      push();
      translate( windowWidtj/2-250, windowHeight/2-200);
      fill("red");
      rotate(PI*28.5);
      textSize(30);
      text("AND GLOVES FOR EXTRA LIVES",0,0);
      pop();

      push();
      translate( windowWidth/2-300, windowWidth/2-200);
      fill("red");
      rotate(PI*28.5);
      textSize(30);
      text("BEST OF LUCK CORONA WARRIOR",0,0);
      pop();
        
        //fill("red");
        //text("LETS BEAT COVID",windowHeight/2-125, windowWidth/2-200);
        
       
        if (mousePressedOver(button)||touches.length>0){
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
        if (!bgSound.isPlaying()){
          bgSound.play();
          bgSound.setVolume(0.3);
        }
        boy.visible=true;
        boyStand.visible= false; 
        count += Math.round(World.frameRate);
        ground.velocityY = -(6 + 3*count/100);

        //boy.debug= true; 
        boy.setCollider("rectangle",0,0,800,10);


        pause.visible= true;
  
        if (ground.y < 0){
          ground.y = ground.height/2;
        }

        if (mousePressedOver(pause)||((touches[0]>windowWidth*9/10-50 && touches[0]<windowWidth*9/10+50) && (touches[1]> windowHeight*4/5+100 && touches[1]< windowHeight*4/5+300))){
          gameState=PAUSE; 
          touches=[];
        }
         
        if(keyDown("space") ||touches.length>0 ){
          boy.velocityX= +10 ;
          touches=[];
        }
      
        
        boy.velocityX= boy.velocityX - 0.8;

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
            heart-=1;
            covid= null;
            bang.play();
        }
      }


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
          bang.stop();
          die.play();
        }

      if(precaution.isTouching(boy)){
        collect.play();
        precaution.destroyEach();
        if (heart<3){
          heart+=1;
        }
      }
    }

    if (gameState==PAUSE){
      background("black");
      pause.visible= false; 
      push();
      translate(windowHeight-100, windowWidth/2-50);
      fill("red");
      rotate(PI*28.5);
      textSize(50);
      text("PAUSE",0,0);
      pop();
      restartP.visible= true;
      resume.visible=true;
      home.visible= true;
      hide();
      boy.velocityY=0;
      ground.velocityY = 0;
      corona.setVelocityYEach(0);
      precaution.setVelocityYEach(0);
      treeGroup.setVelocityYEach(0);
      bushGroup.setVelocityYEach(0);
      benchGroup.setVelocityYEach(0);
      cloudGroup.setVelocityYEach(0);
      corona.setLifetimeEach(0);
        precaution.setLifetimeEach(0);
        treeGroup.setLifetimeEach(0);
        bushGroup.setLifetimeEach(0);
        benchGroup.setLifetimeEach(0);
        cloudGroup.setLifetimeEach(0);
      if (mousePressedOver(restartP)||(touches[0]===windowHeight/2 && touches[1]===windowWidth/2-100)){
        gameState=RESET;
        touches=[];
        restartP.visible= false;
      resume.visible=false;
      home.visible= false;
      }
      if (mousePressedOver(resume)||(touches[0]===windowHeight/2 && touches[1]===windowWidth/2)){
        gameState=PLAY;
        touches=[];
        restartP.visible= false;
      resume.visible=false;
      home.visible= false;
      boy.visible= true;
      ground.visible=true;
      }
      if (mousePressedOver(home)||(touches[0]===windowHeight/2 && touches[1]==windowWidth/2+100)){
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
        ground.velocityY = 0;
        corona.setVelocityYEach(0);
        precaution.setVelocityYEach(0);
        treeGroup.setVelocityYEach(0);
        bushGroup.setVelocityYEach(0);
        benchGroup.setVelocityYEach(0);
        cloudGroup.setVelocityYEach(0);
        if (keyDown("space")||touches.length>0){
          gameState=RESET;
          touches=[];
        }
      }

      else if (gameState==RESET){
        boyStand.visible=false; 
        pause.visible= false; 
        background(endImg);
        push();
        translate(windowHeight/2+150, windowWidth/2+50);
        fill("black");
        textSize(18);
        rotate(PI*28.5);
        text("YOUR SCORE:"+count,0,0);
        pop();
        push();
        translate(windowHeight/2+100,windowWidth/2+50);
        fill("black");
        textSize(18);
        rotate(PI*28.5);
        text("HIGH SCORE:"+Hscore,0,0);
        pop();
      
        push();
        translate(windowHeight/2+50,windowWidth/2);
        fill("black");
        rotate(PI*28.5);
        textSize(30);
        text("DON'T GIVE UP",0,0);
        pop();
       
        restart.visible=true;
        hide();
        corona.destroyEach();
        precaution.destroyEach();
        treeGroup.destroyEach();
        bushGroup.destroyEach();
        benchGroup.destroyEach();
        cloudGroup.destroyEach();
        if (mousePressedOver(restart)||touches.length>0){
          gameState=REST;
          restart.visible= false;
          heart=3;
          touches=[];
        }
      }

      boy.collide(invisibleGround);
      
      drawSprites();
    }

    function spawnTree(){
      if (frameCount%160===0){
      tree= createSprite(windowWidth/8+300,windowHeight+1500,40,80);
      tree.addImage("tree",treeImg);
      tree.scale=0.7;
      tree.depth= boy.depth;
      boy.depth++;
      boyStand.depth= boy.depth;
      tree.velocityY = - (6 + 3*count/100);
      tree.lifetime = 1000;
      treeGroup.add(tree);
      }
    }

    function spawnBench(){
      if (frameCount%200===0){
        bench=createSprite(windowWidth/8+200,windowHeight+1000,40,80);
        bench.addImage("bench",benchImg);
        bench.scale=0.4;
        bench.depth= boy.depth;
        boy.depth++;
        boyStand.depth= boy.depth;
        bench.velocityY = - (6 + 3*count/100);
        bench.lifetime = 1000;
        benchGroup.add(bench);
      }
    }

    function spawnBush(){
      if (frameCount%100===0){
        bush=createSprite(windowWidth/8+150,windowHeight+900,40,80);
        bush.addImage("bush", bushImg);
        bush.scale=0.4;
        bush.depth= boy.depth;
        boy.depth++;
        boyStand.depth= boy.depth;
        bush.velocityY = - (6 + 3*count/100);
        bush.lifetime = 1000;
        bushGroup.add(bush);
      }
    }

    function spawnClouds(){
      if (frameCount%120===0){
        rand2= Math.round(random(0, 50));
        var cloud= createSprite(windowWidth*2/3+rand2, windowWidth+1300, 50, 50);
        cloud.addImage("cloud", cloudImg);
        cloud.scale=0.5;
        cloud.depth= hearts1.depth;
        hearts1.depth++;
        cloud.depth= 5;
        cloud.velocityY= - (6 + 3*count/100);
        cloud.lifetime= 1000;
        cloudGroup.add(cloud);
      }
    }

    function hide(){
      boy.visible=false;
      ground.visible=false;
    }

    function spawnObstacles() {
      if(frameCount % 120 === 0){
        covid = createSprite(windowWidth/9+140,windowWidth+1000,10,40);
        covid.addImage("covid19", covidImg);
        covid.scale= 0.3;
        covid.velocityY = - (6 + 3*count/100);
        covid.lifetime = 1000;
        corona.add(covid);
      }
    }
  
      function mask(){
        if (frameCount%200===0){
          rand= Math.round(random(1,4));
          prec= createSprite(windowHeight/5+250, windowWidth+900, 20, 20);
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
          prec.velocityY= - (6 + 3*count/100);
          prec.lifetime= 1000;
          precaution.add(prec);
        }
      }