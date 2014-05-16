/*utility variable*/
var w = window.innerWidth * window.devicePixelRatio,h = window.innerHeight * window.devicePixelRatio;


/*groups and sprite*/
 var platforms,ground;
 var background,backgrounds;
 var stars,star;
 var enemies, enemy;
 var diamonds,diamon;  
 var player;
 var medicals,medical;
 var lecters,lecter;
 var shelves,shelf;
 var lives,live;
 var explosions,boom;
 var audio_game,effect_sound;
 var symbols,symbol;

 /*size of all elements*/
 var starH=22,starW=24;
 var playerH = 150,playerW = 233;
 var enemyH = 89,enemyW = 89;
 var boomH = 94,boomW = 95;
 var solidH = 100,solidW = 100;
 var bitmapW=400,bitmapH=300;
 var platformW=400,platformH=32;
 var cactusW=80,cactusH=120;
 var medicalW=32,medicalH=32;
 var diamondW=32,diamondH=28;


/*x velocity elements*/
 var playerV=150;
dino_state

/*state variable*/
 var turn = 0;                                                               
 var gturn=0;

 var dino_state;
 var DINO = {
  NORMAL : {value: 0}, 
  SUPERBLU: {value: 1}
};

 /*istance variable*/
 var shape=0;
 var gesture=0;

 /*flow control variable*/
 var start_time;
 var score = 0,scoreText;
 this.reservedArea = { area: [] };



  function gameSet(){
	/*Imposta limiti di risoluzione fullhd */
    game.scale.maxWidth = 1920;
    game.scale.maxHeight = 1080;

    /*Vogliamo scalare fino a quando possibile, ma proporzionalmente*/
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.setScreenSize();
  }

  function loadAllContent(){
  	 game.load.image('medical', 'assets/firstaid.png');
     game.load.image('forest', 'assets/bksprite.png');
     game.load.image('ground', 'assets/solid.jpg');
     game.load.image('star', 'assets/star.png');
     game.load.image('fumetto', 'assets/fumetto.jpg');
     game.load.image('bullet', 'assets/bullet.png');
     game.load.image('life', 'assets/life.png');
     game.load.image('cactus', 'assets/cactus.png');
     game.load.image('platform', 'assets/platform.png');
     game.load.image('platform', 'assets/platform.png');
     game.load.image('diamond', 'assets/diamond.png');
        
     game.load.spritesheet('boom', 'assets/boom.png', boomW, boomH);
     game.load.spritesheet('enemy', 'assets/bombe_.png', enemyW, enemyH);
     game.load.spritesheet('dude', 'assets/playerbolla.png', playerW, playerH);

     game.load.audio('audio_game', 'assets/audio_game.mp3');
     game.load.audio('effect_sound', 'assets/effect_sound.mp3');
  }

  function createGroup(){

  	backgrounds= game.add.group();  
  	backgrounds.enableBody = true;

 	platforms = game.add.group();                                                     
    platforms.enableBody = true;

    enemies = game.add.group();
    enemies.enableBody = true;

    stars = game.add.group();                                                          //creaiamo il gruppo stars
    stars.enableBody = true;                                                           //abilitiamo tutte le stelle che sono state create in questo gruppo

    shelves = game.add.group();
    shelves.enableBody = true;

    lecters = game.add.group();
    lecters.enableBody = true;

    lives = game.add.group();
    lives.fixedToCamera = true;

    explosions = game.add.group();
    explosions.enableBody = true;

    cactuses =game.add.group();
    cactuses.enableBody = true;

    medicals =game.add.group();
    medicals.enableBody = true;

    diamonds=game.add.group();
    diamonds.enableBody = true;

    symbols=game.add.group();
    symbols.enableBody = true;
                                                     
  }

  function createStaticElement(){


       gesture = new Gesture(0,0,w,h);
       gesture.initializeBitmapData();  
       background=backgrounds.create(0,0,gesture.bmd); 

       ground = platforms.create(0, game.world.height - solidH, 'ground');                    


       player = game.add.sprite(0, game.world.height- solidH-playerH, 'dude');
 

       life = lives.create(w - 176, 16, 'life');
       life = lives.create(w - 123, 16, 'life');
       life = lives.create(w - 70, 16, 'life');

       scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });      //stampo lo score attuale
       scoreText.fixedToCamera = true;

  }

  function createAudioElement(){
    	audio_game = game.add.audio('audio_game');
      effect_sound = game.add.audio('effect_sound');
      audio_game.addMarker('audio_game', 0, 7.8, 0.2, true);
      effect_sound.addMarker('boom', 0, 2, 0.7, false);
      effect_sound.addMarker('game_over', 2.2, 3.75, 1, false);  
  }

  function configureAnimationElement(){
       player.animations.add('ice', [3,4,5], 10, true);                             
       player.animations.add('right', [0,1,2], 10, true);   

       enemies.callAll('animations.add', 'animations', 'left', [1], 10, true);   //invoco la funzione animations.add come se la stessero chiamando i figli del gruppo   
       enemies.callAll('animations.add', 'animations', 'right', [0], 10, true);
  }

  function setCamera(){
  	   game.world.setBounds(0, 0, 9999999999, 0);                                             //imposto l'area di copertura della camera
  	   background.fixedToCamera = true;                                                    
       ground.fixedToCamera = true;                                                         
       ground.scale.setTo(w /solidW,1);
       game.camera.follow(player);                                                            
       game.camera.deadzone = new Phaser.Rectangle(w / 2 + playerW / 2, 200, 0, 0);
  }

  function initializeElementParameter(){
  	   game.physics.arcade.enable(player);  
       player.body.bounce.y = 0.2;                                                  
       player.body.gravity.y = 600;                                                      
       player.body.collideWorldBounds = true;                                                                                   
       player.body.velocity.x = playerV;
       player.animations.play('right');

       ground.body.immovable = true;                                                      
       ground.body.collideWorldBounds=true;

       audio_game.play('audio_game');

       reservedArea.area.push({ "x": 0, "y": 0, "x_": 0, "y_": 0,"posX":0}); 
   }
