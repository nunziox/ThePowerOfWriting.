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
    this.fruits=0,this.fruit=0;
    this.blackbarries=0,this.blackbarry=0;

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
    this.treeW=296,this.treeH=566;
    this.fruitW=60,this.fruitH=60;
    this.lifeW=80,this.lifeH=50;
    this.blackbarryW=60,this.blackbarryH=60;

    /*x velocity elements*/
    this.playerV=180;
    this.enemyV=60;

    /*state variable*/
    this.turn = 0;                                                               
    this.gturn=0;
    this.dino_state=0;
    this.busy_fruit_space=0;
    this.busy_cloud_space=0;
    this.busy_tree_space=0;
    this.button_pausa=0;
    this.upcount=0;

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
    this.scoreCiliege=0,this.scoreTextCiliege=0;
    this.sentenceText={};
    this.reservedArea = { area: [] };
    this.dictionary = {};

    this.text=[];
    this.choseText=0;
    this.textGroup = 0;

    this.posCreate = 0;
    this.nextStep = 0;
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
        game.physics.arcade.overlap(this.player, this.cactuses,this.matchCactus, null, this);    
        game.physics.arcade.overlap(this.player, this.diamonds,this.matchDiamond, null, this);  
        game.physics.arcade.overlap(this.player, this.lects,this.matchLect, null, this);
        game.physics.arcade.overlap(this.player, this.diamonds,this.matchDiamond, null, this);
        game.physics.arcade.overlap(this.player, this.enemies,this.matchEnemy, null, this);
        game.physics.arcade.overlap(this.player, this.bananas,this.matchBanana, null, this);
        game.physics.arcade.overlap(this.player, this.cilieges,this.matchCiliege, null, this);
        game.physics.arcade.overlap(this.player, this.fruits,this.matchFruit, null, this);
        game.physics.arcade.overlap(this.player, this.blackbarries,this.matchBlackBarries, null, this);

      

 
        var rand=Math.random()*100;
       
        
        if (game.camera.x + w > this.busy_fruit_space && this.nextStep === 0) {
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


        /*if(this.dino_state==this.DINO.CLOUD){
            this.player.body.position.y=h/2-this.playerH-this.shelfH;
            this.player.body.velocity.x=this.playerV*2;
        }*/

        if (onSwipeUp() && this.player.body.touching.down) {
            if(this.dino_state==this.DINO.NORMAL||this.dino_state==this.DINO.SUPERBLU||this.dino_state==this.DINO.SUPERMAN){
             this.player.body.velocity.y = -700;   
             this.player.body.velocity.x=this.playerV;
            }
        }


        if (onSwipeRight()) {                                                      //Controllo se l'utente fa uno Swap a destra
            if(this.dino_state==this.DINO.NORMAL||this.dino_state==this.DINO.SUPERBLU){
                this.player.body.velocity.x = this.playerV;   
                if(this.dino_state==this.DINO.NORMAL){                                       
                 this.player.animations.play('right');
                }else if(this.dino_state==this.DINO.SUPERMAN){
                  this.player.animations.play('superman');
                }
            }
        }
 
  
        if (game.input.activePointer.isUp) {
            
            var x = game.input.activePointer.position.x;
            var y = game.input.activePointer.position.y;

           if(this.gturn==1){

             if(this.dino_state!=this.DINO.WRITER){
                    var res=this.gesture.checkInputData();
                    if(res.type=='null'){
                        if(this.player.body.touching.down) {
                
                        } 
                    }else if(res.type=='circle'){
                        element = this.stars.create(x+game.camera.x,y,'banana');
                        setCommonProperties(element);
                    }else if(res.type=='rectangle'){
                        element = this.stars.create(x+game.camera.x,y,'apple');
                        setCommonProperties(element);
                    }else if(res.type=='triangle'){
                        element = this.stars.create(x+game.camera.x,y,'ciliege');
                        setCommonProperties(element);
                    }
            }else{
                 if(this.shape){

                   //if(this.shape._strokes[0].length>10)
                   var ris=this.shape.checkInputData();


                    if(ris.type==this.lectshape.lecter&&ris.point>2){                      
                        this.colorSentenceLecter(this.shape.lecter);           
                    }else{
                        this.shape.clearInputData();
                    }

                    this.lecters.getFirstAlive().kill();

                    var tmp=this.countRedWord(this.text[this.choseText].length);
                    if(tmp==this.text[this.choseText].length){
                       this.generateText();
                       scoreWord+=1;
                    }

                    if(this.player.frame ==0){
                      this.setDinoNormal();
                    }else if(this.player.frame ==3){
                          
                    }else if(this.player.frame ==7){
                      this.setDinoSuperMan();
                    }

                    this.lectshape=0;

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
    
    ;},

    shutdown : function(){
       
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

     /*for(var i=0;i<2;i++){
      if (Phaser.Math.chanceRoll(50)){
       element = this.trees.create(x+(i*unit),game.world.height-this.solidH-this.treeH,'tree');
      }else{
        element = this.trees.create(x+(i*unit),game.world.height-this.solidH-this.treeH,'tree2');
        setCommonProperties(element);
      }
      total+=unit;
     }

     total=total+5*unit;
     
     origin=parseInt(total/unit);
      for(var i=origin;i<2+origin;i++){
       element = this.trees.create(x+(i*unit),game.world.height-this.solidH-this.treeH,'tree3');
       setCommonProperties(element);
       total+=unit;
      }

          total=total+5*unit;*/

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

          if (Phaser.Math.chanceRoll(50)) {
              element = this.cactuses.create(x + total + unit, game.world.height - this.solidH - this.cactusH, 'cactus');
              setCommonProperties(element);
              total += this.cactusW + unit;
          }

          total += unit * 10;

          if (!this.lectshape) {
              var xLecter = game.camera.x + w;
              var yLecter = game.world.height - this.solidH - this.lectH;

              this.lectshape = new Shape(0, 0, this.lectW, this.lectH, 'null');
              this.lectshape.setPosition('top-left');

              //this.lectshape.setLecter(this.text[this.choseText].charAt(parseInt(Math.random() * 100 % this.text[this.choseText].length)));
              this.lectshape.setLecter(this.text[this.choseText].charAt(this.firstNotRed(this.text[this.choseText].length)));
              this.lectshape.setTextSize(100);
              this.lectshape.initializeBitmapData();
          }


          if (Phaser.Math.chanceRoll(80)) {
              element = this.lects.create(x + total, game.world.height - this.solidH - this.lectH - this.lectH / 2, this.lectshape.bmd);
              setCommonProperties(element);
          }

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
     for(var i=0;i<this.text[this.choseText].length;i++){
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
        this.createLecter(xLecter, yLecter);
        
        this.lects.getFirstAlive().kill();
    }

    GameState.prototype.matchCactus=function(){
     this.decreseLife();
     this.cactuses.getFirstAlive().kill();
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

    GameState.prototype.clearAll = function () {
        clear(this.stars,this.appleW);
        clear(this.shelves,this.shelfW);
        clear(this.enemies,this.enemyW);
        clear(this.explosions,0);
        clear(this.cactuses,this.cactusW);
        clear(this.clouds,this.cloudW);
        clear(this.bananas,this.bananaW);
        clear(this.cilieges,this.ciliegeW);
        clear(this.trees,this.treeW);
        clear(this.lects,this.lectW);
        clear(this.blackbarries,this.blackbarryW);
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
           if(this.dino_state==this.DINO.NORMAL){
            if(this.playerV<450){
             this.playerV+=1/3;
            }
          }
        }
    }

    /*tra 100 e 250*/
    function onSwipeUp() {
            return ((game.input.activePointer.positionDown.y - game.input.activePointer.position.y) > 50 && game.input.activePointer.duration > 100 && game.input.activePointer.duration < 400);
    }

    function onSwipeDown() {
            return ((game.input.activePointer.position.y-game.input.activePointer.positionDown.y) > 50 && game.input.activePointer.duration > 100 && game.input.activePointer.duration < 400);
    }


    function onSwipeRight() {
            return ((game.input.activePointer.position.x - game.input.activePointer.positionDown.x) > 50 && game.input.activePointer.duration > 100 && game.input.activePointer.duration < 250);
    }

    GameState.prototype.loadAllContent=function(){
        game.load.image('medical', 'assets/firstaid.png');
        game.load.image('forest', 'assets/bksprite.png');
        game.load.image('ground', 'assets/solid.jpg');
        game.load.image('apple', 'assets/fruit.png');
        game.load.image('fumetto', 'assets/fumetto.jpg');
        game.load.image('bullet', 'assets/bullet.png');
        game.load.image('life', 'assets/newlife.png');
        game.load.image('cactus', 'assets/cactus.png');
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

    this.fruits=game.add.group();
    this.fruits.enableBody = true;

    this.enemies = game.add.group();
    this.enemies.enableBody = true;

    this.blackbarries=game.add.group();
    this.blackbarries.enableBody=true;    

    this.textGroup=game.add.group();
                                                     
  }

  
  GameState.prototype.pausaGame=function(){
      this.button_pausa.setFrames(1,1,1);
      game.paused=true;  
  }

  GameState.prototype.createStaticElement=function(){

       this.gesture = new Gesture(0,0,w,h);
       this.gesture.initializeBitmapData();  
       this.background=this.backgrounds.create(0,0,this.gesture.bmd); 

       this.ground = this.platforms.create(0, game.world.height - this.solidH, 'ground');                    


       this.player = game.add.sprite(0, game.world.height- this.solidH-this.playerH, 'dude');
  
       var element;


        this.button_pausa=game.add.button(w-80,16, 'playstop', this.pausaGame, this, 0,0,0);
        this.button_pausa.fixedToCamera=true;

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

       this.text[0]="PINI";
       this.text[1]="TINTI"
       this.text[2]='DINI';
       
       this.generateText();
       
  }



 function generateHexColor() { 
    return '#' + ((0.5 + 0.5 * Math.random()) * 0xFFFFFF << 0).toString(16);
 }

 GameState.prototype.generateText = function () {

     game.world.remove(this.textGroup);


     this.textGroup = game.add.group();
     this.sentenceText = [];
     this.choseText = parseInt((Math.random() * 100) % (this.text.length));
     var posx = 0;
     var width = 0;
     for (var i = 0; i < this.text[this.choseText].length; i++) {
         if (posx == 0)
             this.sentenceText[i] = game.make.text(w / 2 - this.text[this.choseText].length * 30 / 2, 10, this.text[this.choseText].charAt(i), { font: '40px Verdana', fill: '#FFF', stroke: "black", strokeThickness: 1, align: 'left' });
         else
             this.sentenceText[i] = game.make.text(posx + width, 10, this.text[this.choseText].charAt(i), { font: '40px Verdana', fill: '#FFF', stroke: "black", strokeThickness: 1, align: 'left' });
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
       this.player.animations.add('superman', [7,8,9], 10, true);      

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
