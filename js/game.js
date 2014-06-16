 var scoreApple=0;
 var scoreBanana=0;
 var scoreCiliege=0;
 var scoreWord=0;

 function GameState(){
    /*groups and sprite*/
    this.platforms=0,this.ground=0;
    this.background=0,this.backgrounds=0;
    this.stars=0,this.apple=0;
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
    this.trees=0,this.tree=0;
    this.fruits = 0, this.fruit = 0;
    this.ananases = 0; this.ananas = 0;
    this.blackbarries = 0, this.blackbarry = 0;
    this.fragola = 0; this.fragoles = 0;
    this.bananasx2=0,this.bananasx5=0,this.ciliegex2=0,this.ciliegex5=0,this.applex2=0,this.applex5=0;

   /*size of all elements*/
    this.starH=60,this.starW=60;
    this.playerH = 150,this.playerW = 233;
    this.enemyH = 89,this.enemyW = 89;
    this.boomH = 94,this.boomW = 95;
    this.solidH = 100,this.solidW = 100;
    this.bitmapW=250,this.bitmapH=250;
    this.platformW=400,this.platformH=64;
    this.minaW=80,this.minaH=120;
    this.medicalW=32,this.medicalH=32;
    this.diamondW=32,this.diamondH=32;
    this.shelfW=400,this.shelfH=32;
    this.cloudW=200,this.cloudH=150;
    this.lectW=75,this.lectH=80;
    this.bananaH=60,this.bananaW=60;
    this.ciliegeH=60,this.ciliegeW=60;
    this.treeW=296,this.treeH=566;
    this.fruitW=60,this.fruitH=60;
    this.lifeW=80,this.lifeH=50;
    this.blackbarryW = 60, this.blackbarryH = 60;
    this.ananasW = 60, this.ananasH = 60;
    this.genericButtonW = 60, this.genericButtonH = 60;
    this.fragolaW = 60, this.fragolaH = 60;

    /*x velocity elements*/
    this.playerV = 180;
    this.plusVelocity = true;
    this.enemyV=60;

    /*state variable*/
    this.turn = 0;                                                               
    this.gturn=0;
    this.dino_state=0;
    this.busy_fruit_space=0;
    this.busy_cloud_space=0;
    this.busy_tree_space=0;
    this.button_pausa=0;
    this.upcount = 0;
     

    this.DINO = {
        NORMAL:{value: 0}, 
        SUPERBLU:{value: 1},
        STOPPED:{value:2},
        WRITER:{value:3},
        SUPERMAN:{value:3}
    };

    this.shape=0;
    this.lectshape=0;
    this.gesture=0;

    this.score = 0,this.scoreText=0;
    this.scoreBanana=0,this.scoreTextBanana=0;
    this.scoreCiliege = 0, this.scoreTextCiliege = 0;
    this.scoreRecord = 0;
    this.sentenceText={};
    this.reservedArea = { area: [] };
    this.dictionary = {};

    this.actualId;
    this.isWord = 0;
    this.isItalic = 0;
    this.actualText = 0;
    this.actualIndex=0;
    

    this.choseText=0;
    this.textGroup = 0;

    this.writeWord = 0;

    this.posCreate = 0;
    this.nextStep = 0;
    this.checkmarkbutton = 0;
    this.wordIsCompleted = false;
    this.tutorial = true;

    this.outjson = [];
    this.json = 0;
    this.traceSymbol = 0;
 }


 GameState.prototype = {

    preload : function(){

    ;},


    create:  function() {

        game.physics.startSystem(Phaser.Physics.ARCADE);                                   
     

        this.createGroup();
        this.createStaticElement();
        this.createAudioElement();
        this.configureAnimationElement();                                                                                          
        this.setCamera();
        this.initializeElementParameter();


        game.input.onDown.add(this.unpause, self);

    ;},


   update : function(){
 
        this.button_pausa.setFrames(0,0,0);
        this.updateSpeed();
        game.physics.arcade.collide(this.player,this.platforms); 
        game.physics.arcade.collide(this.player,this.shelves); 
        game.physics.arcade.collide(this.enemies,this.platforms);

        game.physics.arcade.collide(this.stars,this.platforms);
        game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this); /* se c'è un overlap tra  players e stars viene invocato il metodo collectStar*/
        game.physics.arcade.overlap(this.player, this.minaes,this.matchmina, null, this);    
        game.physics.arcade.overlap(this.player, this.diamonds,this.matchDiamond, null, this);  
        game.physics.arcade.overlap(this.player, this.lects,this.matchLect, null, this);
        game.physics.arcade.overlap(this.player, this.diamonds,this.matchDiamond, null, this);
        game.physics.arcade.overlap(this.player, this.enemies,this.matchEnemy, null, this);
        game.physics.arcade.overlap(this.player, this.bananas,this.matchBanana, null, this);
        game.physics.arcade.overlap(this.player, this.cilieges,this.matchCiliege, null, this);
        game.physics.arcade.overlap(this.player, this.fruits, this.matchFruit, null, this);
        game.physics.arcade.overlap(this.player, this.ananases, this.matchAnanas, null, this);
        game.physics.arcade.overlap(this.player, this.blackbarries,this.matchBlackBarries, null, this);

      
        game.physics.arcade.overlap(this.player, this.ciliegex2,this.matchCiliegeX2, null, this);
        game.physics.arcade.overlap(this.player, this.ciliegex5,this.matchCiliegeX5, null, this);
        game.physics.arcade.overlap(this.player, this.applex2,this.matchAppleX2, null, this);
        game.physics.arcade.overlap(this.player, this.applex5,this.matchAppleX5, null, this);
        game.physics.arcade.overlap(this.player, this.bananasx2,this.matchBananaX2, null, this);
        game.physics.arcade.overlap(this.player, this.bananasx5,this.matchBananaX5, null, this);


        var rand=Math.random()*100;
       
        
        if (this.player.body.position.x > this.busy_fruit_space && this.nextStep === 0) {
            var num_mele = rand % 40;
            var num_banana = rand % 25;
            var num_ciliegie = rand % 10;
            this.busy_fruit_space = this.createElementInMap(game.camera.x + w + 150, num_mele, num_banana, num_ciliegie, 0);
            this.posCreate = game.camera.x;
            this.nextStep = 1;
        }

        if (this.nextStep === 1) {
            this.busy_fruit_space = this.createElementInMap(this.posCreate + w + 150, num_mele, num_banana, num_ciliegie, this.busy_fruit_space);
            this.nextStep = 2;
        }

        if (this.nextStep === 2) {
            this.busy_fruit_space = this.createElementInMap(this.posCreate + w + 150, num_mele, num_banana, num_ciliegie, this.busy_fruit_space);
            this.busy_fruit_space += game.camera.x + w;
            this.nextStep = 0;
        }

        if (game.camera.x + w > this.busy_cloud_space && game.camera.x - this.posCreate >= 70) {
            this.busy_cloud_space = this.createCloudInMap(game.camera.x + w + 150);
            this.busy_cloud_space += game.camera.x + w;
        }

        if (game.camera.x + w > this.busy_tree_space && game.camera.x - this.posCreate >= 140) {
            this.busy_tree_space = this.createTreeInMap(game.camera.x + w + 150);
            this.busy_tree_space += game.camera.x + w;
        }

        if(this.lects.countLiving()>0){
            this.lects.getFirstAlive().anchor.setTo(0.5,0.5);
            this.lects.getFirstAlive().angle+=2;
        }

        if (this.ananases.countLiving()>0) {
            this.ananases.getFirstAlive().anchor.setTo(0.5, 0.5);
            this.ananases.getFirstAlive().angle += 2;
        }

        for(var i=0;i<this.fruits.countLiving();i++){
         this.fruits.getAt(i).angle+=1;
        }

        for(var i=0;i<this.blackbarries.countLiving();i++){
         this.blackbarries.getAt(i).angle+=1;
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
        if(tmp>=(this.start_time+15)){
            this.player.animations.play('right');
            this.dino_state=this.DINO.NORMAL;
            this.player.body.velocity.x=this.playerV;
            this.player.body.collideWorldBounds=true;
            this.player.body.position.y=game.world.height-this.playerH-this.solidH;
        }


     

        if (onSwipeUp() && this.player.body.touching.down) {
            if(this.dino_state==this.DINO.NORMAL||this.dino_state==this.DINO.SUPERBLU||this.dino_state==this.DINO.SUPERMAN){
             this.player.body.velocity.y = -700;   
            }
        }


        if (onSwipeRight()) {                                                      //Controllo se l'utente fa uno Swap a destra
            if (this.dino_state == this.DINO.NORMAL || this.dino_state == this.DINO.SUPERBLU || this.dino_state == this.DINO.SUPERMAN) {
                this.player.body.velocity.x = this.playerV;   
                if(this.dino_state==this.DINO.NORMAL){                                       
                 this.player.animations.play('right');
                }else if(this.dino_state==this.DINO.SUPERMAN){
                  this.player.animations.play('superman');
                } else if (this.dino_state == this.DINO.SUPERBLU) {
                    this.player.animations.play('ice');
                }
            }
        }
 
  
        if (game.input.activePointer.isUp) {
            
            var x = game.input.activePointer.position.x;
            var y = game.input.activePointer.position.y;

           if(this.gturn==1){

               if (this.dino_state != this.DINO.WRITER && this.player.body.velocity.x != 0) {
                    var res=this.gesture.checkInputData();
                    if(res.type=='null'){
                        if(this.player.body.touching.down) {
                
                        } 
                    }else if(res.type=='circle'){
                      if(this.dino_state==this.DINO.SUPERMAN){
                        element = this.bananasx5.create(x+game.camera.x,y,'bananax5');
                        setCommonProperties(element);
                      }else if(this.dino_state==this.DINO.SUPERBLU){
                        element = this.bananasx2.create(x+game.camera.x,y,'bananax2');
                        setCommonProperties(element);
                      }else{
                        element = this.bananas.create(x+game.camera.x,y,'banana');
                        setCommonProperties(element);
                      }
                    }else if(res.type=='rectangle'){
                       if(this.dino_state==this.DINO.SUPERMAN){
                        element = this.applex5.create(x+game.camera.x,y,'applex5');
                        setCommonProperties(element);
                      }else if(this.dino_state==this.DINO.SUPERBLU){
                        element = this.applex2.create(x+game.camera.x,y,'applex2');
                        setCommonProperties(element);
                      }else{
                        element = this.stars.create(x+game.camera.x,y,'apple');
                        setCommonProperties(element);
                      }
                    }else if(res.type=='triangle'){
                      if(this.dino_state==this.DINO.SUPERMAN){
                        element =  this.ciliegex5.create(x+game.camera.x,y,'ciliegex5');
                        setCommonProperties(element);
                      }else if(this.dino_state==this.DINO.SUPERBLU){
                        element =  this.ciliegex2.create(x+game.camera.x,y,'ciliegex2');
                        setCommonProperties(element);
                      }else{
                        element = this.cilieges.create(x+game.camera.x,y,'ciliege');
                        setCommonProperties(element);
                      }
                    }
            }else{
         
           }

                
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

        if (this.player.body.velocity.x == 0) {
            if (this.dino_state == this.DINO.NORMAL)
                this.player.animations.stop(0);
            else if (this.dino_state == this.DINO.SUPERBLU)
                this.player.animations.stop(3);
            else if (this.dino_state == this.DINO.SUPERMAN)
                this.player.animations.stop(7);
        }
    
    ;},

    shutdown : function(){
      this.clearShutdown();
    ;}

}
  
  GameState.prototype.unpause=function(event){
     if(game.paused){
      game.paused=false;
     }
  }

  function setCommonProperties(element){
      element.body.gravity.y = 0; 
      element.body.immovable = true; 
      element.body.collideWorldBounds = true;
  }


  GameState.prototype.createCloudInMap=function(x){
     var element, total=0,unit=this.cloudW;

     /*creo nuvole*/
     for(var i=0;i<30;i++){
      element = this.clouds.create(x+(i*unit),Math.random()*100%50*3,'cloud');
      setCommonProperties(element);
      total+=unit;
     }

     return total;
  }

  GameState.prototype.createTreeInMap=function(x){
     var element, total=0,unit=this.treeW-60;
     var origin=0;


     return total;
  }



  GameState.prototype.createElementInMap = function (x, num_mele, num_banana, num_ciliege, total) {
      var element, unit = 70;
      var origin = 0;

      if (this.nextStep === 0) {
          /*creo mele*/
          for (var i = 0; i < num_mele; i++) {
              element = this.stars.create(x + (i * unit), game.world.height - this.solidH - this.starH - 5, 'apple');
              setCommonProperties(element);
              total += unit;
          }

          /*creo primo tipo di albero sopra le mele*/
          for (var i = 0; i < 2; i++) {
              if (Phaser.Math.chanceRoll(50)) {
                  element = this.trees.create(x + (i * this.treeW - 60), game.world.height - this.solidH - this.treeH, 'tree');
              } else {
                  element = this.trees.create(x + (i * this.treeW - 60), game.world.height - this.solidH - this.treeH, 'tree2');
                  setCommonProperties(element);
              }
          }

          if (num_mele < 10) {
              total += unit * 5;
          }

          /*creo ripiani*/
          element = this.shelves.create(x + total + unit, game.world.height - this.playerH - this.solidH - this.platformH - (2 / 3) * this.platformH, 'platform');
          setCommonProperties(element);

          /*creo bombe*/
          if (Phaser.Math.chanceRoll(60)) {
              element = this.enemies.create(x + total + unit, game.world.height - this.solidH - this.enemyH, 'enemy');
              element.body.velocity.x = -60;
              element.frame = 1;
              setCommonProperties(element);
          }

          if (Phaser.Math.chanceRoll(50)) {
              for (var j = 0; j < 5; j++) {
                  this.apple = this.stars.create(x + total + unit + j * (45 + (2 / 3) * this.starW), game.world.height - this.playerH - this.solidH - this.platformH - (2 / 3) * this.platformH - this.starH - 5, 'apple');
                  setCommonProperties(element);
              }
          } else {
              for (var j = 0; j < 5; j++) {
                  this.ciliege = this.cilieges.create(x + total + unit + j * (45 + (2 / 3) * this.ciliegeW), game.world.height - this.playerH - this.solidH - this.platformH - (2 / 3) * this.platformH - this.ciliegeH, 'ciliege');
                  setCommonProperties(element);
              }
          }

          total += this.shelfW + 2 * unit;

      }

      if (this.nextStep === 1) {

          /*creo banane*/
          origin = parseInt(total / unit);
          for (var i = origin; i < num_banana + origin; i++) {
              element = this.bananas.create(x + (i * unit), game.world.height - this.solidH - this.bananaH - 5, 'banana');
              setCommonProperties(element);
              total += unit;
          }

          /*creo secondo tipo di albero*/
          for (var i = origin; i < 2 + origin; i++) {
              element = this.trees.create(x + (i * unit) + (i - origin) * (this.treeW - 60), game.world.height - this.solidH - this.treeH, 'tree3');
              setCommonProperties(element);
          }

          /*creo ciliege*/
          origin = parseInt(total / unit);
          for (var i = origin; i < num_ciliege + origin; i++) {
              element = this.cilieges.create(x + (i * unit), game.world.height - this.solidH - this.ciliegeH, 'ciliege');
              setCommonProperties(element);
              total += unit;
          }

          if (num_banana < 5) {
              total += unit * 5;
          }

          if (num_ciliege < 5) {
              total += unit * 5;
          }

          if (Phaser.Math.chanceRoll(50)) {
              /*creo altri due ripiani - questo è il primo*/
              element = this.shelves.create(x + total + unit, game.world.height - this.playerH - this.solidH - this.platformH - (2 / 3) * this.platformH, 'platform');
              setCommonProperties(element);

              if (Phaser.Math.chanceRoll(25)) {
                  element = this.fruits.create(x + total + unit + this.platformW / 2, game.world.height - this.playerH - this.solidH - this.platformH - (2 / 3) * this.platformH - this.fruitH - 10, 'morared');
                  element.anchor.setTo(0.5, 0.5);
                  setCommonProperties(element);
              }

              if (Phaser.Math.chanceRoll(20)) {
                  element = this.blackbarries.create(x + total + unit + this.platformW / 2, game.world.height - this.solidH - this.fruitH - 10, 'morablack');
                  element.anchor.setTo(0.5, 0.5);
                  setCommonProperties(element);
              }

              total += this.shelfW + 2 * unit;

          }
      }

      if (this.nextStep === 2) {

          if (Phaser.Math.chanceRoll(50)) {
              /*creo altri due ripiani -questo è il secondo*/
              element = this.shelves.create(x + total + unit, game.world.height - this.playerH - this.solidH - this.platformH - (2 / 3) * this.platformH, 'platform');
              setCommonProperties(element);

              if (Phaser.Math.chanceRoll(100)) {
                  element = this.blackbarries.create(x + total + unit + this.platformW / 2, game.world.height - this.playerH - this.solidH - this.platformH - (2 / 3) * this.platformH - this.fruitH - 10, 'morablack');
                  element.anchor.setTo(0.5, 0.5);
                  setCommonProperties(element);
              }

              if (Phaser.Math.chanceRoll(35)) {
                  element = this.fruits.create(x + total + unit + this.platformW / 2, game.world.height - this.solidH - this.fruitH - 10, 'morared');
                  element.anchor.setTo(0.5, 0.5);
                  setCommonProperties(element);
              }

              total += this.shelfW + unit;
          }

          total += unit * 8;

          if (!this.lectshape) {
              var xLecter = game.camera.x + w;
              var yLecter = game.world.height - this.solidH - this.lectH;

              this.lectshape = new Shape(0, 0, this.lectW, this.lectH, 'null');
              this.lectshape.setPosition('top-left');

  
              this.lectshape.setLecter(text[this.choseText].charAt(this.firstNotRed(text[this.choseText].length)));
           
              this.lectshape.setTextSize(100);
              this.lectshape.initializeBitmapData();
          }


          /*MOMENTANEO COMMENT*/
          //if (Phaser.Math.chanceRoll(80)) {

          if (this.wordIsCompleted) {
              element = this.ananases.create(x + total, game.world.height - this.solidH - this.ananasH - this.ananasH / 2, 'ananas');
          } else {
              element = this.lects.create(x + total, game.world.height - this.solidH - this.lectH - this.lectH / 2, this.lectshape.bmd);
          }

          setCommonProperties(element);

          total += unit * 11;

          if (Phaser.Math.chanceRoll(50)) {
              element = this.minaes.create(x + total + unit, game.world.height - this.solidH - this.minaH, 'mina');
              setCommonProperties(element);
              total += this.minaW + unit;
          }

          //}

          /*SOSTITUTO MOMENTANEO*/
          //if (Phaser.Math.chanceRoll(80)) {
             //element = this.ananases.create(x + total, game.world.height - this.solidH - this.ananasH - this.ananasH / 2, 'ananas');
             //setCommonProperties(element);
          //}

          total += unit * 10;
      }

      return total;
  }


  GameState.prototype.createRandomElementInMap=function(x,y,group,prob,scale,type,number,offsetX,offsetY,gravity,immovable,collide){
            var position = game.camera.x % scale;
            var element;
            if ((position>= 0&&position<=10&&group.countLiving()==0) && game.camera.x != 0) {
                 if (Phaser.Math.chanceRoll(prob)){
                     for(var i=0;i<number;i++){ 
                       element = group.create(x+(i*offsetX),y-(i*offsetY),type);
                       element.body.gravity.y = gravity; 
                       element.body.immovable = immovable; 
                       element.body.collideWorldBounds = collide;
                     }
                }
            }
        }
   
   GameState.prototype.colorSentenceLecter= function(lecter){
     for(var i=0;i<text[this.choseText].length;i++){
      if(this.sentenceText[i].text==lecter&&this.sentenceText[i].fill!='#FF0000'){
       this.sentenceText[i].fill='#FF0000';
       this.sentenceText[i].stroke='#FF0000';
       break;
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

   GameState.prototype.firstNotRed= function(len){
     for(var i=0;i<len;i++){
      if(this.sentenceText[i].fill!='#FF0000'){
          return i;
      }
     }
     return i;
   }

   GameState.prototype.decreseLife= function(){
        if(this.dino_state==this.DINO.SUPERMAN||this.dino_state==this.DINO.SUPERBLU){
          this.setDinoNormal();
        }else{
         this.player.kill();
         this.audio_game.stop('audio_game');
         this.effect_sound.play('game_over');
         this.game.world.removeAll();
         this.game.state.start('OverState');
         this.game.state.start('OverState');
        }         
    }

 
    GameState.prototype.collectStar=function(player, apple) {
        apple.kill();                                          //rimuove la stella in cui c'è stato l'overlap.
        this.score += 1;                                     //aumento lo score di 10 punti
        this.scoreText.text = this.score;         //inserisco un nuovo valore nella scritta
        scoreApple=this.score;
    }

    GameState.prototype.matchAnanas = function (player, ananas) {
        this.player.frame = 0;
        this.player.body.velocity.x = 0;

        this.setDinoWriter();

        var xLecter = this.player.position.x + this.playerW - 30;
        var yLecter = game.world.height - this.bitmapH - this.solidH - this.enemyH;

        //this.isWord = true;
        this.writeWord = true;
        this.createLecter(xLecter, yLecter);
        ananas.kill();
    }

    GameState.prototype.matchBanana=function(player,banana){
      banana.kill();
      this.scoreBanana += 1;
      scoreBanana=this.scoreBanana; 
      this.scoreTextBanana.text = this.scoreBanana;
    }

    GameState.prototype.matchCiliege=function(player,ciliege){
      ciliege.kill();
      this.scoreCiliege += 1; 
      scoreCiliege=this.scoreCiliege;
      this.scoreTextCiliege.text = this.scoreCiliege;
    }

    GameState.prototype.matchCiliegeX2=function(player,ciliege){
      ciliege.kill();
      this.scoreCiliege += 2; 
       scoreCiliege=this.scoreCiliege;
      this.scoreTextCiliege.text = this.scoreCiliege;
    }

    GameState.prototype.matchCiliegeX5=function(player,ciliege){
      ciliege.kill();
      this.scoreCiliege += 5;
       scoreCiliege=this.scoreCiliege;
      this.scoreTextCiliege.text = this.scoreCiliege;
    }

    GameState.prototype.matchAppleX2=function(player,apple){
      apple.kill();
      this.score+=2;
      this.scoreText.text = this.score;         //inserisco un nuovo valore nella scritta
      scoreApple=this.score;
    }
    GameState.prototype.matchAppleX5=function(player,apple){
      apple.kill();
      this.score+=5;
      this.scoreText.text = this.score;         //inserisco un nuovo valore nella scritta
      scoreApple=this.score;
    }
    GameState.prototype.matchBananaX2=function(player,banana){
      banana.kill();
      this.scoreBanana += 2;
           scoreBanana=this.scoreBanana; 
      this.scoreTextBanana.text = this.scoreBanana;
    }
     GameState.prototype.matchBananaX5=function(player,banana){
       banana.kill();
       this.scoreBanana += 5;
            scoreBanana=this.scoreBanana; 
      this.scoreTextBanana.text = this.scoreBanana;
    }



    GameState.prototype.matchDiamond=function(){

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

        //this.isWord = false;
        this.writeWord = false;
        this.createLecter(xLecter, yLecter);
        this.lects.getFirstAlive().kill();
    }

    GameState.prototype.matchmina = function () {
        /*var repeat = true;
        while (repeat) {
            var wordRand = Math.round(Math.random() * JsonObj.exercises.length - 1);
            if (JsonObj.exercises[wordRand].isWord == 1) {
                repeat = false;
            }
        }

        this.player.frame = 0;
        this.player.body.velocity.x = 0;

        this.setDinoWriter();
        var word = JsonObj.exercises[wordRand].text;
        var xWord = this.player.position.x + this.playerW - 30;
        var yWord = game.world.height - this.bitmapH - this.solidH - this.enemyH - this.player.position.y;
        this.createWord(xWord, yWord, word);*/
        this.decreseLife();
        this.effect_sound.play('boom');
        var x = this.minaes.getFirstAlive().position.x;
        var y = this.minaes.getFirstAlive().position.y;
        this.minaes.getFirstAlive().kill();
        this.createBoom(x, y);
    }
     
    GameState.prototype.matchFruit=function(player,fruit){
      fruit.kill();
      this.player.animations.play('superman');
      this.dino_state=this.DINO.SUPERMAN;
    }

    GameState.prototype.matchBlackBarries=function(player,blackbarry){
        blackbarry.kill();
        this.player.animations.play('ice');
        this.dino_state=this.DINO.SUPERBLU;
    }
   



    GameState.prototype.matchMedical=function(){
        this.medicals.getFirstAlive().kill();
        if(this.lives.countLiving()==1){
            this.lives.getFirstAlive().kill();
            this.life = this.lives.create(w - 2*this.lifeW-85, 20, 'life');
            this.life = this.lives.create(w - this.lifeW-85, 20, 'life');
        }else if(this.lives.countLiving()==2){
            this.lives.getFirstAlive().kill();
            this.lives.getFirstAlive().kill();           
            this.life = this.lives.create(w - 3*this.lifeW-85, 20, 'life');
            this.life = this.lives.create(w - 2*this.lifeW-85, 20, 'life');
            this.life = this.lives.create(w - this.lifeW-85, 20, 'life');
        }
    }


   GameState.prototype.clearShutdown = function () {

        /*destroy sound*/
        this.audio_game.stop();
        this.audio_game=null;
        this.effect_sound.stop();
        this.effect_sound=null;

        /*destroy group*/
        clearS(this.stars);
        clearS(this.shelves);
        clearS(this.enemies);
        clearS(this.explosions);
        clearS(this.minaes);
        clearS(this.clouds);
        clearS(this.bananas);
        clearS(this.cilieges);
        clearS(this.trees);
        clearS(this.lects);
        clearS(this.blackbarries);
        clearS(this.backgrounds);

        this.background=0;
        this.ground=0;

        /*destroy object*/
         this.shape=0;
         this.lectshape=0;
         this.gesture=0;

        /*reinitialize variable*/
        this.playerV=180;
        this.enemyV=60;

        /*destroy bitmaptext*/
        this.score = 0,this.scoreText=0;
        this.scoreBanana=0,this.scoreTextBanana=0;
        this.scoreCiliege=0,this.scoreTextCiliege=0;
        this.sentenceText={};
        this.reservedArea = { area: [] };
        this.dictionary = {};

        this.player.destroy();      

}

    function clearS(group){
      for(var i=0;i<group.countLiving();i++){
          group.getAt(i).kill();
          group.getAt(i).destroy();
      }
      group=null;
    }

    GameState.prototype.clearAll = function () {
        clear(this.stars,this.appleW);
        clear(this.shelves,this.shelfW);
        clear(this.enemies,this.enemyW);
        clear(this.explosions,0);
        clear(this.minaes,this.minaW);
        clear(this.clouds,this.cloudW);
        clear(this.bananas,this.bananaW);
        clear(this.cilieges,this.ciliegeW);
        clear(this.trees,this.treeW);
        clear(this.lects, this.lectW);
        clear(this.ananases, this.ananasW);
        clear(this.blackbarries, this.blackbarryW);
        clear(this.fragoles, this.fragolaW);
    }

    function clear(group,dim){
      if (group.countLiving() > 0) {
          var pos = group.getFirstAlive().x;
        if (game.camera.x > pos + dim) {
          group.getFirstAlive().destroy();
        }
      }
    }



    GameState.prototype.setDinoNormal=function(){
        this.player.animations.play('right');
        this.player.body.velocity.x=this.playerV;
        this.dino_state=this.DINO.NORMAL;
    }

    GameState.prototype.setDinoIce=function(){
        this.player.animations.play('ice');
        this.player.body.velocity.x=this.playerV;
        this.dino_state=this.DINO.SUPERBLU;
    }

    GameState.prototype.setDinoSuperMan=function(){
        this.player.animations.play('superman');
        this.player.body.velocity.x=this.playerV;
        this.dino_state=this.DINO.SUPERMAN;
    }

 

    GameState.prototype.setDinoWriter=function(){
       this.player.animations.stop();

       if(this.dino_state==this.DINO.NORMAL){
          this.player.frame = 0;
       }else if(this.dino_state==this.DINO.SUPERBLU){
          this.player.frame = 3;
       }else if(this.dino_state==this.DINO.SUPERMAN){
         this.player.frame = 7;
       }
        
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

        this.shape = new Shape(xLecter - game.camera.x, yLecter, this.bitmapW, this.bitmapH, game.cache.getImage('fumetto'))
        if (this.isItalic) this.shape.isItalic = true;
        else this.shape.isItalic = false;
        if (!this.writeWord) this.shape.setLecter(this.lectshape.lecter);
        this.shape.writeWord = this.writeWord;
        this.shape.numex = this.actualIndex;
        
        if (this.writeWord) {
            var bitmapMarginW = 200;
            var bitmapMarginH = 200;

            var _g = this.shape.getShapeMaxMin();
            var _c = this.shape.getAbsoluteShapeMaxMin(_g.minX, _g.minY, _g.maxX, _g.maxY);
            this.shape.bitmapW = _g.lenW + bitmapMarginW;
            //this.bitmapH = (_c.maxWordY - _c.minWordY) + bitmapMarginH;
            //this.shape.posY = this.shape.posY + this.bitmapH - this.shape.bitmapH - 900;
            //this.bitmapW = this.shape.bitmapW;
            //this.bitmapH = this.shape.bitmapH;
        }

        this.lectshape.setPosition('center');
        this.shape.initializeBitmapData();
        this.lecter=this.lecters.create(xLecter,yLecter,this.shape.bmd);
        this.reservedArea.area.splice(0,1);
        this.reservedArea.area.push({ "x": xLecter, "y": yLecter, "x_": xLecter + this.shape.bitmapW, "y_": yLecter + this.bitmapH, "posX": xLecter });
        this.checkmarkbutton = game.add.button((xLecter - game.camera.x) + this.shape.bitmapW, yLecter + this.bitmapH - this.genericButtonH, 'checkmark', this.confirmShape, this, 0, 0, 0);
        this.checkmarkbutton.fixedToCamera = true;
        if (this.writeWord) {
            //this.bitmapH = 250;
            //this.bitmapW = 250;
            this.writeWord = false;
            this.shape.writeWord = this.writeWord;
        }
            
        }

    GameState.prototype.createWord = function (x, y, word) {
        var xWord = x;
        var yWord = y;
        this.shape = new Shape(xWord - game.camera.x, yWord, this.bitmapW, this.bitmapH, game.cache.getImage('fumetto'))

        this.shape.initializeBitmapData();
        this.lecter = this.lecters.create(xWord, yWord, this.shape.bmd);
        this.reservedArea.area.splice(0, 1);
        this.reservedArea.area.push({ "x": xWord, "y": yWord, "x_": xWord + this.bitmapW, "y_": yWord + this.bitmapH, "posX": xWord });
        this.checkmarkbutton = game.add.button(xWord - game.camera.x + this.bitmapW - 60, yWord + this.bitmapH - 60, 'checkmark', this.confirmShape, this, 0, 0, 0);
        this.checkmarkbutton.fixedToCamera = true;
    }

/**************SALVATAGGIO STATISTICHE******************/

    GameState.prototype.saveStats = function (id,percent,errorUp,errorDown,totalPoint,dollarNPoint,symbol,strokes) {
     

        var json = {
            "id": id,
            "userId": "",
            "matching": percent,
            "upperBoundExeceed": errorUp,
            "lowerBoundExeceed": errorDown,
            "totalPoint": totalPoint,
            "dollarNRating": dollarNPoint,
            "symbols": [
              {
                  "symbol": "",
                  "strokes": []
              }
            ]
        };

        if (this.isWord && this.wordIsCompleted) {
            for (var k = 0; k < symbol.length; k++) {
                json.symbols[k].symbol = symbol[k];
                var dimStrokes = JsonObj.exercises[this.choseText].symbols[k].strokes.length;
                for (var i = 0; i < dimStrokes; i++) {
                    var array = [];
                    var dimStroke = JsonObj.exercises[this.choseText].symbols[k].strokes[i].length;
                    for (var j = 0; j < dimStroke; j++) {
                        array[j] = ({ "X": strokes[i][j].X, "Y": strokes[i][j].Y });
                    }
                    json.symbols[k].strokes.push({ "stroke": array });
                }
            }
        } else {
            json.symbols[0].symbol = symbol;
            for (var i = 0; i < strokes.length; i++) {
                var array = [];
                for (var j = 0; j < strokes[i].length; j++) {
                    array[j] = ({ "X": strokes[i][j].X, "Y": strokes[i][j].Y });
                }
                json.symbols[0].strokes.push({ "stroke": array });
            }
        }/*

        var requestNumber = JSONRequest.post("127.0.0.1/ThePowerOfWriting", json,
            function (requestNumber, value, exception) {
                if (value) {

                } else {

                }
            });
            */
    }

/**********************************************/



    GameState.prototype.confirmShape = function () {

                var percent,errorUp,errorDown,totalPoint,dollarNPoint,strokes; 
        
                if (this.shape) { 
                    var ris = this.shape.checkInputData();
                    percent = ris.matchPercent;
                     errorUp = ris.errorUp;
                     errorDown = ris.errorDown;
                     totalPoint = ris.totalPoint;
                     dollarNPoint = ris.point;
                     strokes = ris.strokes;

                     if (!this.isWord) {
                         if (ris.matchPercent > 60) {
                           scoreWord += 1;
                           var symbol = JsonObj.exercises[this.choseText].symbols[0].symbol;
                             //this.saveStats(this.actualId, percent, errorUp, errorDown,totalPoint, dollarNPoint, symbol, strokes);
                           this.generateText();
                       } else {
                           this.shape.clearInputData();
                       }
                   }else if (this.isItalic && this.isWord) {
                       if (ris.matchPercent > 60) {
                           var symbol = JsonObj.exercises[this.choseText].symbols[this.traceSymbol].symbol;
                           this.traceSymbol++;
                           //this.saveStats(this.actualId, percent, errorUp, errorDown,totalPoint, dollarNPoint, symbol, strokes);
                           this.colorSentenceLecter(this.shape.lecter);
                       } else {
                           this.shape.clearInputData();
                       }

                       var tmp = this.countRedWord(text[this.choseText].length);
                       if (tmp == text[this.choseText].length) {
                           scoreWord += 1;
                           this.generateText();
                       } else {
                           this.shape.clearInputData();
                       }

                   } else if (this.isWord && this.wordIsCompleted) {
                       if (ris.matchPercent > 60) {
                           this.traceSymbol = 0;
                           scoreWord += 1;
                           this.wordIsCompleted = false;
                           this.generateText();
                           var symbol = [];
                           for (var i = 0; i < JsonObj.exercises[this.choseText].symbols.length[i]; i++)
                               symbol[i] = JsonObj.exercises[this.choseText].symbols[i].symbol;
                           //this.saveStats(this.actualId, percent, errorUp, errorDown,totalPoint, dollarNPoint, symbol, strokes);
                       } else {
                           this.shape.clearInputData();
                       }
                   } else if (this.isWord && !this.wordIsCompleted) {
                       if (ris.type == this.lectshape.lecter && ris.point > 2) {
                           var symbol = JsonObj.exercises[this.choseText].symbols[this.traceSymbol].symbol;
                           this.traceSymbol++;
                           //this.saveStats(this.actualId, percent, errorUp, errorDown,totalPoint, dollarNPoint, symbol, strokes);
                           this.colorSentenceLecter(this.shape.lecter);
                       } else {
                           this.shape.clearInputData();
                       }

                       var tmp = this.countRedWord(text[this.choseText].length);
                       if (tmp == text[this.choseText].length) {
                           this.wordIsCompleted = true;
                       }
                   }

                    if (this.lecters.countLiving() > 0) {
                        this.lecters.getFirstAlive().kill();
                    }

                    if(this.player.frame ==0){
                      this.setDinoNormal();
                    }else if(this.player.frame ==3){
                      this.setDinoIce();    
                    }else if(this.player.frame ==7){
                      this.setDinoSuperMan();
                    }
                    this.lectshape=0;
                    this.checkmarkbutton.kill();
                 }
    }

    function updateTimer(){
        var seconds = Math.floor(game.time.time / 1000) % 60;
        return seconds;
    }

     GameState.prototype.updateSpeed=function(){
         if ((game.camera.x % 251) >= 0 && (game.camera.x % 251) <= 7 && this.plusVelocity) {
             if (this.dino_state == this.DINO.NORMAL) {
                 this.plusVelocity = false;
                 if (this.playerV < 450) {
                     this.playerV += 3;
                 }
             }
         }else if (!this.plusVelocity) {
             if ((game.camera.x % 251) > 7) this.plusVelocity = true;
         }
    }

    /*tra 100 e 250*/
    function onSwipeUp() {
            return ((game.input.activePointer.positionDown.y - game.input.activePointer.position.y) > 50 && game.input.activePointer.duration > 100 && game.input.activePointer.duration < 250);
    }

    function onSwipeDown() {
            return ((game.input.activePointer.position.y-game.input.activePointer.positionDown.y) > 50 && game.input.activePointer.duration > 100 && game.input.activePointer.duration < 400);
    }


    function onSwipeRight() {
            return ((game.input.activePointer.position.x - game.input.activePointer.positionDown.x) > 50 && game.input.activePointer.duration > 100 && game.input.activePointer.duration < 250);
    }

    GameState.prototype.loadAllContent=function(){
        game.load.image('checkmark', 'assets/checkmark.png');
        game.load.image('forest', 'assets/bksprite.png');
        game.load.image('ground', 'assets/solid.jpg');
        game.load.image('apple', 'assets/fruit.png');
        game.load.image('fumetto', 'assets/fumetto.jpg');
        game.load.image('bullet', 'assets/bullet.png');
        game.load.image('life', 'assets/newlife.png');
        game.load.image('mina', 'assets/mina.png');
        game.load.image('platform', 'assets/platform.png');
        game.load.image('platform', 'assets/platform.png');
        game.load.image('diamond', 'assets/diamond.png');
        game.load.image('cloud', 'assets/cloud.png');
        game.load.image('banana', 'assets/banana.png');
        game.load.image('ciliege', 'assets/ciliege.png');
        game.load.image('tree', 'assets/tree.png');
        game.load.image('tree2', 'assets/tree2.png');
        game.load.image('tree3', 'assets/tree3.png');
        game.load.image('morared', 'assets/morared.png');
        game.load.image('morablack', 'assets/morablack.png');

        game.load.image('applex2', 'assets/fruitx2.png');
        game.load.image('applex5', 'assets/fruitx5.png');
        game.load.image('bananax2', 'assets/bananax2.png');
        game.load.image('bananax5', 'assets/bananax5.png');
        game.load.image('ciliegex2', 'assets/ciliegex2.png');
        game.load.image('ciliegex5', 'assets/ciliegex5.png');
        game.load.image('samsungpen','assets/samsungpen.png');

        game.load.image('exitgame', 'assets/exitgame.png');
        game.load.spritesheet('playstop', 'assets/stop.png',60,60);

        game.load.spritesheet('boom', 'assets/boom.png', this.boomW, this.boomH);
        game.load.spritesheet('enemy', 'assets/bombe_.png', this.enemyW, this.enemyH);
        game.load.spritesheet('dude', 'assets/playerbolla.png', this.playerW, this.playerH,10);

        game.load.audio('audio_game', 'assets/audio_game.mp3');
        game.load.audio('effect_sound', 'assets/effect_sound.mp3');

    }

  GameState.prototype.createGroup=function(){
    this.backgrounds= game.add.group();  
    this.backgrounds.enableBody = true;

    this.clouds=game.add.group();
    this.clouds.enableBody = true;

    this.trees=game.add.group();
    this.trees.enableBody = true;

    this.platforms = game.add.group();                                                     
    this.platforms.enableBody = true;


    this.stars = game.add.group();                                                          //creaiamo il gruppo stars
    this.stars.enableBody = true;                                                           //abilitiamo tutte le stelle che sono state create in questo gruppo

    this.shelves = game.add.group();
    this.shelves.enableBody = true;

    this.lecters = game.add.group();
    this.lecters.enableBody = true;
  
    this.lives = game.add.group();
    this.lives.fixedToCamera = true;

    this.explosions = game.add.group();
    this.explosions.enableBody = true;

    this.minaes =game.add.group();
    this.minaes.enableBody = true;

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

    this.fruits=game.add.group();
    this.fruits.enableBody = true;

    this.enemies = game.add.group();
    this.enemies.enableBody = true;

    this.blackbarries=game.add.group();
    this.blackbarries.enableBody = true;

    this.ananases = game.add.group();
    this.ananases.enableBody = true;

    this.fragoles = game.add.group();
    this.fragoles.enableBody = true;

    this.textGroup=game.add.group();

     this.bananasx2=game.add.group();
     this.bananasx2.enableBody = true;
     this.bananasx5=game.add.group();
     this.bananasx5.enableBody = true;
     this.ciliegex2=game.add.group();
     this.ciliegex2.enableBody = true;
     this.ciliegex5=game.add.group();
     this.ciliegex5.enableBody = true;
     this.applex2=game.add.group();
     this.applex2.enableBody = true;
     this.applex5=game.add.group();
     this.applex5.enableBody = true;
                                                     
  }

  
  GameState.prototype.pausaGame=function(){
      this.button_pausa.setFrames(1,1,1);
      game.paused=true;  
  }

    GameState.prototype.exitGame=function(){
      window.location="";
      //this.game.state.start('BootState');
  }

  GameState.prototype.createStaticElement=function(){

       this.gesture = new Gesture(0,0,w,h);
       this.gesture.initializeBitmapData();  
       this.background=this.backgrounds.create(0,0,this.gesture.bmd); 

       this.ground = this.platforms.create(0, game.world.height - this.solidH, 'ground');                    


       this.player = game.add.sprite(0, game.world.height- this.solidH-this.playerH, 'dude');
  
       var element;


       this.button_pausa=game.add.button(w-180,30, 'playstop', this.pausaGame, this, 0,0,0);
       this.button_pausa.fixedToCamera=true;

       element=game.add.button(w-100,16, 'exitgame', this.exitGame, this, 0,0,0);
       element.fixedToCamera=true;

        /*this.life = this.lives.create(w - 3*this.lifeW-85, 20, 'life');
        this.life = this.lives.create(w - 2*this.lifeW-85, 20, 'life');
        this.life = this.lives.create(w - this.lifeW-85, 20, 'life');*/

       element=game.add.sprite(10, 16,'apple');
       element.fixedToCamera=true;
       element=game.add.sprite(10, 80,'banana');
       element.fixedToCamera=true;
       element=game.add.sprite(10, 150,'ciliege');
       element.fixedToCamera=true;
       
       this.scoreText = game.add.text(90, 36, '0', { fontSize: '200 px', fill: '#000' });      //stampo lo score attuale
       this.scoreText.fixedToCamera = true;

       this.scoreTextBanana = game.add.text(90, 96, '0', { fontSize: '200 px', fill: '#000' });      //stampo lo score attuale
       this.scoreTextBanana.fixedToCamera = true;

       this.scoreTextCiliege = game.add.text(90, 161, '0', { fontSize: '200 px', fill: '#000' });      //stampo lo score attuale
       this.scoreTextCiliege.fixedToCamera = true;

       if (localStorage.getItem("Record") != null) {
           this.scoreRecord = game.add.text(10, game.world.height - this.solidH / 2, 'Record: ' + localStorage.getItem("Record"), { fontSize: '200 px', fill: '#000' });
       } else {
           this.scoreRecord = game.add.text(10, game.world.height - this.solidH / 2, 'Record: ' + '0', { fontSize: '200 px', fill: '#000' });
       }
       this.scoreRecord.fixedToCamera = true;
      /*
       text[0]="PINI";
       text[1]="TINTI"
       text[2]='DINI';
       */

       this.generateText();
      
       
  }



 function generateHexColor() { 
    return '#' + ((0.5 + 0.5 * Math.random()) * 0xFFFFFF << 0).toString(16);
 }

 GameState.prototype.generateText = function () {

     game.world.remove(this.textGroup);

     this.textGroup = game.add.group();
     this.sentenceText = [];
     this.choseText = parseInt((Math.random() * 100) % (text.length));

     this.actualId = exid[this.choseText];
     this.isWord = exword[this.choseText];
     this.actualText = text[this.choseText];
     this.isItalic = exitalic[this.choseText];
     this.actualIndex=numex[this.choseText];

     var posx = 0;
     var width = 0
     for (var i = 0; i < text[this.choseText].length; i++) {
         if (posx == 0)
             this.sentenceText[i] = game.make.text(w / 2 - text[this.choseText].length * 30 / 2, 10, text[this.choseText].charAt(i), { font: '50px Verdana', fill: '#FFF', stroke: "black", strokeThickness: 5, align: 'left'});
         else
             this.sentenceText[i] = game.make.text(posx + width, 10, text[this.choseText].charAt(i), { font: '50px Verdana', fill: '#FFF', stroke: "black", strokeThickness: 5, align: 'left'});
         posx = this.sentenceText[i].x;
         width = this.sentenceText[i].width;
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
       this.player.animations.add('superman', [7, 8, 9], 10, true);

       this.enemies.callAll('animations.add', 'animations', 'left', [1], 10, true);   
       this.enemies.callAll('animations.add', 'animations', 'right', [0], 10, true);
  }

  GameState.prototype.setCamera=function(){
       game.world.setBounds(0, 0, 9999999999, 0);                                            
       this.background.fixedToCamera = true;                                                    
       this.ground.fixedToCamera = true;                                                         
       this.ground.scale.setTo(w /this.solidW,1);
       game.camera.follow(this.player);
       //game.camera.deadzone = new Phaser.Rectangle(w / 2 + this.playerW / 2, 200, 0, 0);
       game.camera.deadzone = new Phaser.Rectangle(3 * w / 8, 200, 0, 0);
  }

  GameState.prototype.initializeElementParameter=function(){
       game.physics.arcade.enable(this.player);  
       this.player.body.bounce.y = 0.2;                                                  
       this.player.body.gravity.y = 630;                                                      
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
