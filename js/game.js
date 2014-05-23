 function GameState(){

    /*groups and sprite*/
    this.platforms=0,this.ground=0;
    this.background=0,this.backgrounds=0;
    this.stars=0,this.star=0;
    this.enemies=0,this.enemy=0;
    this.diamonds=0,this.diamon=0;  
    this.player=0;
    this.medicals=0,this.medical=0;
    this.lecters=0,this.lecter=0;
    this.lect=0,this.lects=0;
    this.shelves=0,this.shelf=0;
    this.lives=0,this.live=0;
    this.explosions=0,this.boom=0;
    this.audio_game=0,this.effect_sound=0;
    this.symbols=0,this.symbol=0;
    this.clouds=0,this.cloud=0;
    this.bananas=0,this.banana=0;
    this.cilieges=0,this.ciliege=0;

   /*size of all elements*/
    this.starH=60,this.starW=60;
    this.playerH = 150,this.playerW = 233;
    this.enemyH = 89,this.enemyW = 89;
    this.boomH = 94,this.boomW = 95;
    this.solidH = 100,this.solidW = 100;
    this.bitmapW=250,this.bitmapH=250;
    this.platformW=400,this.platformH=64;
    this.cactusW=80,this.cactusH=120;
    this.medicalW=32,this.medicalH=32;
    this.diamondW=32,this.diamondH=32;
    this.shelfW=400,this.shelfH=32;
    this.cloudW=200,this.cloudH=150;
    this.lectW=75,this.lectH=80;
    this.bananaH=60,this.bananaW=60;
    this.ciliegeH=60,this.ciliegeW=60;

    /*x velocity elements*/
    this.playerV=180;

    /*state variable*/
    this.turn = 0;                                                               
    this.gturn=0;
    this.dino_state=0;

    this.DINO = {
        NORMAL:{value: 0}, 
        SUPERBLU:{value: 1},
        STOPPED:{value:2},
        WRITER:{value:3}
    };

    this.shape=0;
    this.lectshape=0;
    this.gesture=0;

    this.score = 0,this.scoreText=0;
    this.scoreBanana=0,this.scoreTextBanana=0;
    this.scoreCiliege=0,this.scoreTextCiliege=0;
    this.sentenceText={};
    this.reservedArea = { area: [] };
    this.dictionary = {};

    this.text=[];
    this.choseText=0;
    this.textGroup=0;
 }


 GameState.prototype = {

    preload : function(){
      this.loadAllContent();
    ;},


    create:  function() {
        
        game.physics.startSystem(Phaser.Physics.ARCADE);                                   
     

        this.createGroup();
        this.createStaticElement();
        this.createAudioElement();
        this.configureAnimationElement();                                                                                          
        this.setCamera();
        this.initializeElementParameter();


    ;},


   update : function(){
        this.updateSpeed();
        game.physics.arcade.collide(this.player,this.platforms); 
        game.physics.arcade.collide(this.player,this.shelves); 
        game.physics.arcade.collide(this.enemies,this.platforms);

        game.physics.arcade.collide(this.stars,this.platforms);
        game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this); /* se c'è un overlap tra  players e stars viene invocato il metodo collectStar*/
        game.physics.arcade.overlap(this.player, this.cactuses,this.matchCactus, null, this);    
        game.physics.arcade.overlap(this.player, this.diamonds,this.matchDiamond, null, this);  
        game.physics.arcade.overlap(this.player, this.lects,this.matchLect, null, this);
        game.physics.arcade.overlap(this.player, this.diamonds,this.matchDiamond, null, this);
        game.physics.arcade.overlap(this.player, this.enemies,this.matchEnemy, null, this);
        game.physics.arcade.overlap(this.player, this.bananas,this.matchBanana, null, this);
        game.physics.arcade.overlap(this.player, this.cilieges,this.matchCiliege, null, this);


        if(this.medicals.countLiving()>0){
         game.physics.arcade.overlap(this.medicals.getFirstAlive(),this.player, this.matchMedical, null, this);
        }

 
        var rand=Math.random()*100;
        this.createRandomElementInMap(game.camera.x+w,game.world.height-this.playerH-this.solidH-2*this.platformH,this.shelves,50,263,'platform',rand%3,this.platformW+this.platformW/4,0,0,true,true);

        this.createRandomElementInMap(game.camera.x+w,game.world.height-this.solidH-this.medicalH,this.medicals,50,6000,'medical',1,0,0,0,true,true);
  
        this.createRandomElementInMap(game.camera.x+w,game.world.height-this.solidH-this.starH,this.stars,50,13,'star',10,this.starW+this.starW/4,0,0,true,true);

        this.createRandomElementInMap(game.camera.x+w,game.world.height-this.solidH-this.bananaH,this.bananas,1340,13,'banana',10,this.bananaW+this.bananaW/4,0,0,true,true);

        this.createRandomElementInMap(game.camera.x+w,game.world.height-this.solidH-this.ciliegeH,this.cilieges,2769,13,'ciliege',10,this.ciliegeW+this.ciliegeW/4,0,0,true,true);
        
        this.createRandomElementInMap(game.camera.x+w,game.world.height-this.solidH-this.diamondH,this.diamonds,50,2000,'diamond',1,0,0,0,true,true);
    
        this.createRandomElementInMap(game.camera.x+w,0,this.clouds,50,4*this.cloudW,'cloud',rand%10,this.cloudW+rand%10,0,0,true,true);

        this.createRandomElementInMap(game.camera.x+w,game.world.height-this.enemyH-this.solidH,this.enemies,30,1500,'enemy',1,0,0,0,true,true);
         if(this.enemies.countLiving()>0){
          this.enemies.getFirstAlive().frame = 1;
          this.enemies.getFirstAlive().body.velocity.x = -80;
         }

        if(!this.lectshape){
            var xLecter = game.camera.x+w;
            var yLecter = game.world.height-this.solidH-this.lectH;

            this.lectshape = new Shape(0,0,this.lectW,this.lectH,'null');
            this.lectshape.setPosition('top-left');
            this.lectshape.setLecter(this.text[this.choseText].charAt(parseInt(Math.random()*100%this.text[this.choseText].length)));
            this.lectshape.setTextSize(100);
            this.lectshape.initializeBitmapData();
        }


        this.createRandomElementInMap(game.camera.x+w,game.world.height-this.solidH-this.lectH,this.lects,30,60,this.lectshape.bmd,1,0,0,0,true,true);

        if(this.lects.countLiving()>0){
            this.lects.getFirstAlive().anchor.setTo(0.5,0.5);
            this.lects.getFirstAlive().angle+=2;
        }

        if (game.input.activePointer.isDown) {
           
                var x = game.input.activePointer.position.x;
                var y = game.input.activePointer.position.y;
             

                if ((x >= (this.reservedArea.area[0].x - game.camera.x) && x <= (this.reservedArea.area[0].x_ - game.camera.x)) && (y >= this.reservedArea.area[0].y && y <= this.reservedArea.area[0].y_)) {
                    this.turn = this.shape.captureInputData();
                } else{
                    this.gturn= this.gesture.captureInputData();
                } 
        } 
   
   
        var tmp=updateTimer();
        if(tmp>=(this.start_time+9)&&tmp<=(this.start_time+10)){
            this.player.animations.play('right');
            this.dino_state=this.DINO.NORMAL;
            this.player.body.velocity.x=this.playerV;
            this.player.body.collideWorldBounds=true;
            this.player.body.position.y=game.world.height-this.playerH-this.solidH;
        }


        if(this.dino_state==this.DINO.CLOUD){
            this.player.body.position.y=h/2-this.playerH-this.shelfH;
            this.player.body.velocity.x=this.playerV*3;
            this.score += 10;//aumento di 20 punti
            this.scoreText.text = 'Score: ' + this.score; //inserisco un nuovo valore nella scritta
        }


     

        if (onSwipeUp() && this.player.body.touching.down) {
            if(this.dino_state==this.DINO.NORMAL||this.dino_state==this.DINO.SUPERBLU){
             this.player.body.velocity.y = -700;
             this.player.body.velocity.x=this.playerV;
            }
        }

        if (onSwipeRight()) {                                                      //Controllo se l'utente fa uno Swap a destra
            if(this.dino_state==this.DINO.NORMAL||this.dino_state==this.DINO.SUPERBLU){
                this.player.body.velocity.x = this.playerV;                                          //Muovi a destra
                this.player.animations.play('right');
            }
        }

        if (game.input.activePointer.isUp) {
                 
           if(this.gturn==1){

             if(this.dino_state!=this.DINO.WRITER){
                    var res=this.gesture.checkInputData();
                    if(res.type=='null'){
                        if(this.player.body.touching.down) {
                
                        } 
                    }else if(res.type=='circle'){
                        if(this.symbols.countLiving()>0){
                            this.player.animations.play('ice');
                            this.start_time=updateTimer();
                            this.dino_state=this.DINO.SUPERBLU;
                            this.symbols.getFirstAlive().kill();
                        }
                    }else if(res.type=='rectangle'){
                        if(this.symbols.countLiving()>0){
                            this.player.animations.play('cloud');
                            this.start_time=updateTimer();
                            this.dino_state=this.DINO.CLOUD;
                            this.symbols.getFirstAlive().kill();
                            this.player.body.velocity.x=2*this.playerV;
                            this.player.body.collideWorldBounds=false;
                            this.player.body.position.y=h/2-this.playerH;
                            
                            if(this.enemies.countLiving>0){
                                this.enemies.getFirstAlive().kill();
                            }
                    }
                }
            }else{
                 if(this.shape){
                  var ris=this.shape.checkInputData();
                    if(ris.type==this.lectshape.lecter&&ris.point>4){
                        
                        this.colorSentenceLecter(this.shape.lecter);
                        var tmp=this.countRedWord(this.text[this.choseText].length);
                        if(tmp==this.text[this.choseText].length){
                           this.generateText();
                        }
                        this.lecters.getFirstAlive().kill();
                        this.setDinoNormal();
                        this.lectshape=0;
                    }else{
                        this.shape.clearInputData();
                    }
                 }
           }

                    this.gturn=0;
                    this.gesture.stroke=false;
                    this.gesture.clearInputData();
            }

            if (this.turn == 1) {
                this.shape.saveStroke();
                this.shape.stroke=false;
                this.turn = 0;
            }
        }
    

   

        this.background.position.x = -game.camera.x; //aggiorno la posizione del background
        this.clearAll();
    
    ;}
}
  
  GameState.prototype.createRandomElementInMap=function(x,y,group,prob,scale,type,number,offsetX,offsetY,gravity,immovable,collide){
            var position = game.camera.x % scale;
            var element;
            if ((position>= 0&&position<=10&&group.countLiving()==0) && game.camera.x != 0) {
                 if (Phaser.Math.chanceRoll(prob)){
                     for(var i=0;i<number;i++){

                      if(group==this.clouds){
                         element = group.create(x+(i*offsetX),y+(i*Math.random()*25),type);
                       }else{
                         element = group.create(x+(i*offsetX),y-(i*offsetY),type);
                       }

                       element.body.gravity.y = gravity; 
                       element.body.immovable = immovable; 
                       element.body.collideWorldBounds = collide;

                      if(group==this.shelves){
                        for(var j=0;j<5;j++){
                            this.star = this.stars.create(x+(i*offsetX)+j*(40+this.starW/2),y-(i*offsetY)-this.platformH-this.starH,'star');
                            this.star.body.immovable = true; 
                            this.star.body.collideWorldBounds = true;
                            this.star.body.gravity.y = 0; 
                         }
                         if (Phaser.Math.chanceRoll(50)){
                            this.cactus = this.cactuses.create(x+(i*offsetX),game.world.height-this.solidH-this.cactusH,'cactus');
                            this.cactus.body.immovable = true; 
                            this.cactus.body.collideWorldBounds = true;
                            this.cactus.body.gravity.y = 0; 
                         }
                      }
                     }
                }
            }
        }
   
   GameState.prototype.colorSentenceLecter= function(lecter){
     for(var i=0;i<this.text[this.choseText].length;i++){
      if(this.sentenceText[i].text==lecter){
       this.sentenceText[i].fill='#FF0000';
       this.sentenceText[i].stroke='#FF0000';
      }
     }
      return 0;
   }

   GameState.prototype.countRedWord= function(len){
     var c=0;
     for(var i=0;i<len;i++){
      if(this.sentenceText[i].fill=='#FF0000'){
       c++;
      }
     }
     return c;
   }

   GameState.prototype.decreseLife= function(){
        if(this.dino_state!=this.DINO.SUPERBLU){
            if (this.lives.countLiving() > 1) {
                this.lives.getFirstAlive().kill();
            } else {
                this.lives.getFirstAlive().kill();
                this.player.kill();
                this.audio_game.stop('audio_game');
                this.effect_sound.play('game_over');
                this.game.state.start('BootState');
            }
        }else{
          this.score += 1000;                                //aumento lo score di 10 punti
          this.scoreText.text = 'Score: ' + this.score;         //inserisco un nuovo valore nella scritta
        }            
    }

 
    GameState.prototype.collectStar=function(player, star) {
        star.kill();                                          //rimuove la stella in cui c'è stato l'overlap.
        this.score += 1;                                     //aumento lo score di 10 punti
        this.scoreText.text = this.score;         //inserisco un nuovo valore nella scritta
    }

    GameState.prototype.matchBanana=function(){
      this.bananas.getFirstAlive().kill();
      this.scoreBanana += 1; 
      this.scoreTextBanana.text = this.scoreBanana;
    }

    GameState.prototype.matchCiliege=function(){
      this.cilieges.getFirstAlive().kill();
      this.scoreCiliege += 1; 
      this.scoreTextCiliege.text = this.scoreBanana;
    }

    GameState.prototype.matchDiamond=function(){
        /*this.diamonds.getFirstAlive().kill();
        if(this.symbols.countLiving()==0){
         this.symbol = this.symbols.create(10,500, 'diamond');
         this.symbol.fixedToCamera = true;  
        }else if(this.symbols.countLiving()==1){
         this.symbols.getFirstAlive().kill();
         this.symbol = this.symbols.create(10,500, 'diamond');
         this.symbol.fixedToCamera = true; 
         this.symbol = this.symbols.create(10,570, 'diamond');
         this.symbol.fixedToCamera = true; 
        }else if(this.symbols.countLiving()==2){
         this.symbols.getFirstAlive().kill();
         this.symbols.getFirstAlive().kill();
         this.symbol = this.symbols.create(10,500, 'diamond');
         this.symbol.fixedToCamera = true; 
         this.symbol = this.symbols.create(10,570, 'diamond');
         this.symbol.fixedToCamera = true; 
         this.symbol = this.symbols.create(10,630, 'diamond');
         this.symbol.fixedToCamera = true; 
        }*/
    }
    
    GameState.prototype.matchEnemy=function(){
            var x = this.enemies.getFirstAlive().position.x;
            var y = this.enemies.getFirstAlive().position.y;
            this.decreseLife();
            this.effect_sound.play('boom');
            this.enemies.getFirstAlive().kill();
            this.createBoom(x,y);
    }

    GameState.prototype.matchLect=function(){

        this.player.frame = 0;
        this.player.body.velocity.x = 0;

        this.setDinoWriter();

        var xLecter = this.player.position.x+this.playerW-30;
        var yLecter = game.world.height - this.bitmapH - this.solidH - this.enemyH;
        this.createLecter(xLecter, yLecter);
        
        this.lects.getFirstAlive().kill();
    }

    GameState.prototype.matchCactus=function(){
     this.decreseLife();
     this.cactuses.getFirstAlive().kill();
    }
     
   
    GameState.prototype.matchMedical=function(){
        this.medicals.getFirstAlive().kill();
        if(this.lives.countLiving()==1){
            this.lives.getFirstAlive().kill();
            this.life = this.lives.create(w - 123, 16, 'life');
            this.life = this.lives.create(w - 70, 16, 'life');
        }else if(this.lives.countLiving()==2){
            this.lives.getFirstAlive().kill();
            this.lives.getFirstAlive().kill();
            this.life = this.lives.create(w - 176, 16, 'life');
            this.life = this.lives.create(w - 123, 16, 'life');
            this.life = this.lives.create(w - 70, 16, 'life');
        }
    }

      GameState.prototype.clearAll=function(){
        if(this.stars.countLiving()>0){
            var posStarX = this.stars.getFirstAlive().x;
            if (game.camera.x > posStarX+this.starW) {
                this.stars.getFirstAlive().kill();
            }
        }

        if(this.shelves.countLiving()>0){
            var posPlatformX = this.shelves.getFirstAlive().x;
            if (game.camera.x > posPlatformX+this.platformW) {
                this.shelves.getFirstAlive().kill();
            }
        }

       if(this.enemies.countLiving()>0){
            var posEnemyX = this.enemies.getFirstAlive().x;
            if (game.camera.x > posEnemyX+this.enemyW) {
                this.enemies.getFirstAlive().kill();
            }
        }

        if(this.explosions.countLiving()>0){
            var posBoomX = this.explosions.getFirstAlive().x;
            if (game.camera.x > posBoomX) {
                this.explosions.getFirstAlive().kill();
            }
        }

        if(this.cactuses.countLiving()>0){
            var posBoomX = this.cactuses.getFirstAlive().x;
            if (game.camera.x > posBoomX) {
                this.cactuses.getFirstAlive().kill();
            }
        }


        if(this.medicals.countLiving()>0){
            var posBoomX = this.medicals.getFirstAlive().x;
            if (game.camera.x > posBoomX) {
                this.medicals.getFirstAlive().kill();
            }
        }

        if(this.diamonds.countLiving()>0){
            var posBoomX = this.diamonds.getFirstAlive().x;
            if (game.camera.x > posBoomX) {
                this.diamonds.getFirstAlive().kill();
            }
        }

        if(this.clouds.countLiving()>0){
            var posBoomX = this.clouds.getFirstAlive().x;
            if (game.camera.x > posBoomX+this.cloudW) {
                this.clouds.getFirstAlive().kill();
            }
        }

       if(this.bananas.countLiving()>0){
            var posBoomX = this.bananas.getFirstAlive().x;
            if (game.camera.x > posBoomX+this.bananaW) {
                this.bananas.getFirstAlive().kill();
            }
        }        

        if(this.cilieges.countLiving()>0){
            var posBoomX = this.cilieges.getFirstAlive().x;
            if (game.camera.x > posBoomX+this.ciliegeW) {
                this.cilieges.getFirstAlive().kill();
            }
        }  

    }

    GameState.prototype.setDinoNormal=function(){
        this.player.animations.play('right');
        this.player.body.velocity.x=this.playerV;
        this.dino_state=this.DINO.NORMAL;
    }

    GameState.prototype.setDinoWriter=function(){
        this.player.animations.stop();
        this.player.body.velocity.x=0;
        this.dino_state=this.DINO.WRITER;
    }

    GameState.prototype.setDinoStopped=function(){
        this.player.animations.stop();
        this.player.body.velocity.x=0;
        this.dino_state=this.DINO.STOPPED;
    }

    GameState.prototype.createBoom=function(x, y) {
        this.boom = this.explosions.create(x, y, 'boom');
        this.boom.body.collideWorldBounds = true;
        this.boom.animations.add('stop', [0, 1, 2, 3, 4, 5], 10, false);
        this.boom.animations.play('stop');
    }

    GameState.prototype.createLecter=function(x, y) {
        var xLecter = x;
        var yLecter = y;
        this.shape = new Shape(xLecter-game.camera.x, yLecter,this.bitmapW,this.bitmapH,game.cache.getImage('fumetto'))
        this.shape.setLecter(this.lectshape.lecter);

        this.shape.initializeBitmapData();
        this.lecter=this.lecters.create(xLecter,yLecter,this.shape.bmd);
        this.reservedArea.area.splice(0,1);
        this.reservedArea.area.push({ "x": xLecter, "y": yLecter, "x_": xLecter + this.bitmapW, "y_": yLecter + this.bitmapH, "posX": xLecter });
    }

    function updateTimer(){
        var seconds = Math.floor(game.time.time / 1000) % 60;
        return seconds;
    }

     GameState.prototype.updateSpeed=function(){
        if(updateTimer()%10==0){
            this.playerV+=1/3;
        }
    }

    function onSwipeUp() {
            return ((game.input.activePointer.positionDown.y - game.input.activePointer.position.y) > 50 && game.input.activePointer.duration > 100 && game.input.activePointer.duration < 250);
    }

    function onSwipeRight() {
            return ((game.input.activePointer.position.x - game.input.activePointer.positionDown.x) > 50 && game.input.activePointer.duration > 100 && game.input.activePointer.duration < 250);
    }

    GameState.prototype.loadAllContent=function(){
        game.load.image('medical', 'assets/firstaid.png');
        game.load.image('forest', 'assets/bksprite.png');
        game.load.image('ground', 'assets/solid.jpg');
        game.load.image('star', 'assets/fruit.png');
        game.load.image('fumetto', 'assets/fumetto.jpg');
        game.load.image('bullet', 'assets/bullet.png');
        game.load.image('life', 'assets/life.png');
        game.load.image('cactus', 'assets/cactus.png');
        game.load.image('platform', 'assets/platform.png');
        game.load.image('platform', 'assets/platform.png');
        game.load.image('diamond', 'assets/diamond.png');
        game.load.image('cloud', 'assets/cloud.png');
        game.load.image('banana', 'assets/banana.png');
        game.load.image('ciliege', 'assets/ciliege.png');
        
        game.load.spritesheet('boom', 'assets/boom.png', this.boomW, this.boomH);
        game.load.spritesheet('enemy', 'assets/bombe_.png', this.enemyW, this.enemyH);
        game.load.spritesheet('dude', 'assets/playerbolla.png', this.playerW, this.playerH);

        game.load.audio('audio_game', 'assets/audio_game.mp3');
        game.load.audio('effect_sound', 'assets/effect_sound.mp3');

    }

  GameState.prototype.createGroup=function(){
    this.backgrounds= game.add.group();  
    this.backgrounds.enableBody = true;

    this.platforms = game.add.group();                                                     
    this.platforms.enableBody = true;

    this.enemies = game.add.group();
    this.enemies.enableBody = true;  

    this.stars = game.add.group();                                                          //creaiamo il gruppo stars
    this.stars.enableBody = true;                                                           //abilitiamo tutte le stelle che sono state create in questo gruppo

    this.shelves = game.add.group();
    this.shelves.enableBody = true;

    this.lecters = game.add.group();
    this.lecters.enableBody = true;

    this.clouds=game.add.group();
    this.clouds.enableBody = true;
    
    this.lives = game.add.group();
    this.lives.fixedToCamera = true;

    this.explosions = game.add.group();
    this.explosions.enableBody = true;

    this.cactuses =game.add.group();
    this.cactuses.enableBody = true;

    this.medicals =game.add.group();
    this.medicals.enableBody = true;

    this.diamonds=game.add.group();
    this.diamonds.enableBody = true;

    this.symbols=game.add.group();
    this.symbols.enableBody = true;

    this.lects=game.add.group();
    this.lects.enableBody = true;

    this.bananas=game.add.group();
    this.bananas.enableBody = true;

    this.cilieges=game.add.group();
    this.cilieges.enableBody = true;

    this.textGroup=game.add.group();
                                                     
  }

  GameState.prototype.createStaticElement=function(){

       this.gesture = new Gesture(0,0,w,h);
       this.gesture.initializeBitmapData();  
       this.background=this.backgrounds.create(0,0,this.gesture.bmd); 

       this.ground = this.platforms.create(0, game.world.height - this.solidH, 'ground');                    


       this.player = game.add.sprite(0, game.world.height- this.solidH-this.playerH, 'dude');
 

       this.life = this.lives.create(w - 176, 16, 'life');
       this.life = this.lives.create(w - 123, 16, 'life');
       this.life = this.lives.create(w - 70, 16, 'life');

       var element=game.add.sprite(10, 16,'star');
       element.fixedToCamera=true;
       element=game.add.sprite(10, 80,'banana');
       element.fixedToCamera=true;
       element=game.add.sprite(10, 150,'ciliege');
       element.fixedToCamera=true;
       
       this.scoreText = game.add.text(90, 36, '0', { fontSize: '200 px', fill: '#000' });      //stampo lo score attuale
       this.scoreText.fixedToCamera = true;

       this.scoreTextBanana = game.add.text(90, 96, '0', { fontSize: '200 px', fill: '#000' });      //stampo lo score attuale
       this.scoreTextBanana.fixedToCamera = true;

       this.scoreTextBanana = game.add.text(90, 161, '0', { fontSize: '200 px', fill: '#000' });      //stampo lo score attuale
       this.scoreTextBanana.fixedToCamera = true;

       this.text[0]="PINI";
       this.text[1]="TINTI"
       this.text[2]='DINI';
       
       this.generateText();
       
  }



 function generateHexColor() { 
    return '#' + ((0.5 + 0.5 * Math.random()) * 0xFFFFFF << 0).toString(16);
 }

  GameState.prototype.generateText=function(){

    game.world.remove(this.textGroup);
    

    this.textGroup=game.add.group();
    this.sentenceText=[];
    this.choseText=parseInt((Math.random()*100)%(this.text.length));
    for(var i=0;i<this.text[this.choseText].length;i++){
        this.sentenceText[i]=game.make.text(w - 50,60+i*35, this.text[this.choseText].charAt(i), { font: '40px Verdana', fill: '#FFF',stroke: "black", strokeThickness:1,align:'center'});
        this.sentenceText[i].fixedToCamera = true;
        this.textGroup.add(this.sentenceText[i]);
    }
  }

  GameState.prototype.createAudioElement=function(){
      this.audio_game = game.add.audio('audio_game');
      this.effect_sound = game.add.audio('effect_sound');
      this.audio_game.addMarker('audio_game', 0, 7.8, 0.2, true);
      this.effect_sound.addMarker('boom', 0, 2, 0.7, false);
      this.effect_sound.addMarker('game_over', 2.2, 3.75, 1, false);  
  }

  GameState.prototype.configureAnimationElement=function(){
       this.player.animations.add('ice', [3,4,5], 10, true);                             
       this.player.animations.add('right', [0,1,2], 10, true);
       this.player.animations.add('cloud', [6], 10, true);     

       this.enemies.callAll('animations.add', 'animations', 'left', [1], 10, true);   
       this.enemies.callAll('animations.add', 'animations', 'right', [0], 10, true);
  }

  GameState.prototype.setCamera=function(){
       game.world.setBounds(0, 0, 9999999999, 0);                                            
       this.background.fixedToCamera = true;                                                    
       this.ground.fixedToCamera = true;                                                         
       this.ground.scale.setTo(w /this.solidW,1);
       game.camera.follow(this.player);                                                            
       game.camera.deadzone = new Phaser.Rectangle(w / 2 + this.playerW / 2, 200, 0, 0);
  }

  GameState.prototype.initializeElementParameter=function(){
       game.physics.arcade.enable(this.player);  
       this.player.body.bounce.y = 0.2;                                                  
       this.player.body.gravity.y = 600;                                                      
       this.player.body.collideWorldBounds = true;                                                                                   
       this.player.body.velocity.x = this.playerV;
       this.player.animations.play('right');

       this.ground.body.immovable = true;                                                      
       this.ground.body.collideWorldBounds=true;

       this.audio_game.play('audio_game');

       this.reservedArea.area.push({ "x": 0, "y": 0, "x_": 0, "y_": 0,"posX":0}); 
       this.dino_state=this.DINO.NORMAL;

       this.dictionary[0]='T',
       this.dictionary[1]='N',
       this.dictionary[2]='D',
       this.dictionary[3]='P',
       this.dictionary[4]='X',
       this.dictionary[5]='H',
       this.dictionary[6]='I'
   }
