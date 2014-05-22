 GameState.prototype = {

    preload : function(){
        loadAllContent();
    ;},


    create:  function() {
        
        game.physics.startSystem(Phaser.Physics.ARCADE);                                   
     

        createGroup();
        createStaticElement();
        createAudioElement();
        configureAnimationElement();                                                                                          
        setCamera();
        initializeElementParameter();
    ;},


   update : function(){
        updateSpeed();
        game.physics.arcade.collide(player,platforms); 
        game.physics.arcade.collide(player,shelves); 

        game.physics.arcade.collide(stars, platforms);
        game.physics.arcade.overlap(player, stars, collectStar, null, this); /* se c'è un overlap tra  players e stars viene invocato il metodo collectStar*/
        game.physics.arcade.overlap(player, cactuses,matchCactus, null, this); /* se c'è un overlap tra  players e stars viene invocato il metodo collectStar*/    
        game.physics.arcade.overlap(player, diamonds,matchDiamond, null, this); /* se c'è un overlap tra  players e stars viene invocato il metodo collectStar*/ 
        game.physics.arcade.overlap(player, lects,matchLect, null, this);
        game.physics.arcade.overlap(player, diamonds,matchDiamond, null, this);game.physics.arcade.collide(enemies, platforms);



        if(medicals.countLiving()>0){
         game.physics.arcade.overlap(medicals.getFirstAlive(), player, matchMedical, null, this);
        }

 
        var rand=Math.random()*100;
        createRandomElementInMap(game.camera.x+w,game.world.height-playerH-solidH-2*platformH,shelves,50,263,'platform',rand%3,platformW+platformW/4,0,0,true,true);

        createRandomElementInMap(game.camera.x+w,game.world.height-solidH-medicalH,medicals,50,6000,'medical',1,0,0,0,true,true);
  
        createRandomElementInMap(game.camera.x+w,game.world.height-solidH-starH,stars,50,13,'star',10,starW*2,0,0,true,true);

        createRandomElementInMap(game.camera.x+w,game.world.height-solidH-diamondH,diamonds,50,2000,'diamond',1,0,0,0,true,true);
    
        createRandomElementInMap(game.camera.x+w,0,clouds,50,4*cloudW,'cloud',rand%10,cloudW+rand%10,0,0,true,true);


        if(!lectshape){
            var xLecter = game.camera.x+w;
            var yLecter = game.world.height-solidH-lectH;

            lectshape = new Shape(0,0,lectW,lectH,'null');
            lectshape.setPosition('top-left');
            lectshape.setLecter(dictionary[parseInt(Math.random()*100%6)]);
            lectshape.setTextSize(100);
            lectshape.initializeBitmapData();
        }
        createRandomElementInMap(game.camera.x+w,game.world.height-solidH-lectH,lects,50,2000,lectshape.bmd,1,0,0,0,true,true);

        if(lects.countLiving()>0){
            lects.getFirstAlive().anchor.setTo(0.5,0.5);
            lects.getFirstAlive().angle+=2;
        }

        if (game.input.activePointer.isDown) {
           
                var x = game.input.activePointer.position.x;
                var y = game.input.activePointer.position.y;
             

                if ((x >= (reservedArea.area[0].x - game.camera.x) && x <= (reservedArea.area[0].x_ - game.camera.x)) && (y >= reservedArea.area[0].y && y <= reservedArea.area[0].y_)) {
                    turn = shape.captureInputData();
                } else{
                    gturn=gesture.captureInputData();
                } 
        } 
   
   
        var tmp=updateTimer();
        if(tmp>=(start_time+9)&&tmp<=(start_time+10)){
            player.animations.play('right');
            dino_state=DINO.NORMAL;
            player.body.velocity.x=playerV;
            player.body.collideWorldBounds=true;
            player.body.position.y=game.world.height-playerH-solidH;
        }


        if(dino_state==DINO.CLOUD){
            player.body.position.y=h/2-playerH-shelfH;
            player.body.velocity.x=playerV*3;
            score += 10;//aumento di 20 punti
            scoreText.text = 'Score: ' + score; //inserisco un nuovo valore nella scritta
        }


       

        if (onSwipeUp() && player.body.touching.down) {
            if(dino_state==DINO.NORMAL||dino_state==DINO.SUPERBLU){
             player.body.velocity.y = -600;
             player.body.velocity.x=playerV;
            }
        }

        if (onSwipeRight()) {                                                      //Controllo se l'utente fa uno Swap a destra
            if(dino_state==DINO.NORMAL||dino_state==DINO.SUPERBLU){
                player.body.velocity.x = playerV;                                          //Muovi a destra
                player.animations.play('right');
            }
        }

        if (game.input.activePointer.isUp) {

            if(gturn==1){
                var res=gesture.checkInputData();

                if(res.type=='null'){
                   if(player.body.touching.down) {
                
                   } 
                }else if(res.type=='circle'){
                    if(symbols.countLiving()>0){
                     player.animations.play('ice');
                     start_time=updateTimer();
                     dino_state=DINO.SUPERBLU;
                     symbols.getFirstAlive().kill();
                    }
                }else if(res.type=='rectangle'){
                    if(symbols.countLiving()>0){
                     player.animations.play('cloud');
                     start_time=updateTimer();
                     dino_state=DINO.CLOUD;
                     symbols.getFirstAlive().kill();
                     player.body.velocity.x=2*playerV;
                     player.body.collideWorldBounds=false;
                     player.body.position.y=h/2-playerH;
                     if(enemies.countLiving>0){
                      enemies.getFirstAlive().kill();
                     }
                    }
                }else if(res.type=='check'){
                 if(shape){
                  var ris=shape.checkInputData();
                    if(ris.type==lectshape.lecter&&ris.point>5){
                        lecters.getFirstAlive().kill();
                        setDinoNormal();
                        lectshape=0;
                    }else{
                        shape.clearInputData();
                    }
                 }
                }

                    gturn=0;
                    gesture.stroke=false;
                    gesture.clearInputData();
            }

            if (turn == 1) {
                shape.saveStroke();
                shape.stroke=false;
                turn = 0;
            }
        }
    

   

        background.position.x = -game.camera.x; //aggiorno la posizione del background
        clearAll();
    
    ;}
}
  
        function createRandomElementInMap(x,y,group,prob,scale,type,number,offsetX,offsetY,gravity,immovable,collide){
            var position = game.camera.x % scale;
            var element;
            if ((position>= 0&&position<=10&&group.countLiving()==0) && game.camera.x != 0) {
                 if (Phaser.Math.chanceRoll(prob)){
                     for(var i=0;i<number;i++){
                      if(group==clouds){
                         element = group.create(x+(i*offsetX),y+(i*Math.random()*25),type);
                       }else{
                         element = group.create(x+(i*offsetX),y-(i*offsetY),type);
                       }

                       element.body.gravity.y = gravity; 
                       element.body.immovable = immovable; 
                       element.body.collideWorldBounds = collide;

                      if(group==shelves){
                        for(var j=0;j<10;j++){
                            star = stars.create(x+(i*offsetX)+j*40,y-(i*offsetY)-platformH-starH,'star');
                            star.body.immovable = true; 
                            star.body.collideWorldBounds = true;
                            star.body.gravity.y = 0; 
                         }
                         if (Phaser.Math.chanceRoll(30)){
                            cactus = cactuses.create(x+(i*offsetX),game.world.height-solidH-cactusH,'cactus');
                            cactus.body.immovable = true; 
                            cactus.body.collideWorldBounds = true;
                            cactus.body.gravity.y = 0; 
                         }
                      }
                     }
                }
            }
        }
    
    function decreseLife(){
        if(dino_state!=DINO.SUPERBLU){
            if (lives.countLiving() > 1) {
                lives.getFirstAlive().kill();
            } else {
                lives.getFirstAlive().kill();
                player.kill();
                audio_game.stop('audio_game');
                effect_sound.play('game_over');
            }
        }else{
          score += 1000;                                //aumento lo score di 10 punti
          scoreText.text = 'Score: ' + score;         //inserisco un nuovo valore nella scritta
        }            
    }

 
    function collectStar(player, star) {
        star.kill();                                //rimuove la stella in cui c'è stato l'overlap.
        score += 10;                                //aumento lo score di 10 punti
        scoreText.text = 'Score: ' + score;         //inserisco un nuovo valore nella scritta
    }


    function matchDiamond(){
        diamonds.getFirstAlive().kill();
        if(symbols.countLiving()==0){
         symbol = symbols.create(5+diamondH/2,50, 'diamond');
         symbol.fixedToCamera = true;  
        }else if(symbols.countLiving()==1){
         symbols.getFirstAlive().kill();
         symbol = symbols.create(5+2*diamondH,50, 'diamond');
         symbol.fixedToCamera = true; 
         symbol = symbols.create(5+diamondH/2,50, 'diamond');
         symbol.fixedToCamera = true; 
        }else if(symbols.countLiving()==2){
         symbols.getFirstAlive().kill();
         symbols.getFirstAlive().kill();
         symbol = symbols.create(5+3.5*diamondH,50, 'diamond');
         symbol.fixedToCamera = true; 
         symbol = symbols.create(5+2*diamondH,50, 'diamond');
         symbol.fixedToCamera = true; 
         symbol = symbols.create(5+diamondH/2,50, 'diamond');
         symbol.fixedToCamera = true; 
        }else{
         score += 100;//aumento di 20 punti
         scoreText.text = 'Score: ' + score; //inserisco un nuovo valore nella scritta
        }
    }

    function matchLect(){

        player.frame = 0;
        player.body.velocity.x = 0;

        setDinoStopped();

        var xLecter = player.position.x+playerW-30;
        var yLecter = game.world.height - bitmapH - solidH - enemyH;
        createLecter(xLecter, yLecter, "left square bracket");
        
        lects.getFirstAlive().kill();
    }

    function matchCactus(){
     decreseLife();
     cactuses.getFirstAlive().kill();
    }
     

    function matchMedical(){
        medicals.getFirstAlive().kill();
        if(lives.countLiving()==1){
            lives.getFirstAlive().kill();
            life = lives.create(w - 123, 16, 'life');
            life = lives.create(w - 70, 16, 'life');
        }else if(lives.countLiving()==2){
            lives.getFirstAlive().kill();
            lives.getFirstAlive().kill();
            life = lives.create(w - 176, 16, 'life');
            life = lives.create(w - 123, 16, 'life');
            life = lives.create(w - 70, 16, 'life');
        }
    }

    function clearAll() {
        if(stars.countLiving()>0){
            var posStarX = stars.getFirstAlive().x;
            if (game.camera.x > posStarX+starW) {
                stars.getFirstAlive().kill();
            }
        }

        if(shelves.countLiving()>0){
            var posPlatformX = shelves.getFirstAlive().x;
            if (game.camera.x > posPlatformX+platformW) {
                shelves.getFirstAlive().kill();
            }
        }

       if(enemies.countLiving()>0){
            var posEnemyX = enemies.getFirstAlive().x;
            if (game.camera.x > posEnemyX+enemyW) {
                enemies.getFirstAlive().kill();
            }
        }

        if(explosions.countLiving()>0){
            var posBoomX = explosions.getFirstAlive().x;
            if (game.camera.x > posBoomX) {
                explosions.getFirstAlive().kill();
            }
        }

        if(cactuses.countLiving()>0){
            var posBoomX = cactuses.getFirstAlive().x;
            if (game.camera.x > posBoomX) {
                cactuses.getFirstAlive().kill();
            }
        }


        if(medicals.countLiving()>0){
            var posBoomX = medicals.getFirstAlive().x;
            if (game.camera.x > posBoomX) {
                medicals.getFirstAlive().kill();
            }
        }

        if(diamonds.countLiving()>0){
            var posBoomX = diamonds.getFirstAlive().x;
            if (game.camera.x > posBoomX) {
                diamonds.getFirstAlive().kill();
            }
        }

        if(clouds.countLiving()>0){
            var posBoomX = clouds.getFirstAlive().x;
            if (game.camera.x > posBoomX+cloudW) {
                clouds.getFirstAlive().kill();
            }
        }

    }

    function setDinoNormal(){
        player.animations.play('right');
        player.body.velocity.x=playerV;
        console.log("normal");
        dino_state=DINO.NORMAL;
    }

    function setDinoStopped(){
        player.animations.stop();
        player.body.velocity.x=0;
        dino_state=DINO.STOPPED;
    }

    function createBoom(x, y) {
        boom = explosions.create(x, y, 'boom');
        boom.body.collideWorldBounds = true;
        boom.animations.add('stop', [0, 1, 2, 3, 4, 5], 10, false);
        boom.animations.play('stop');
    }


    function createLecter(x, y, type) {
        var xLecter = x + enemyW / 2;
        var yLecter = y;
        //shape = new Shape(xLecter-game.camera.x, yLecter, bitmapW, bitmapH, type);
        //shape.initializeBitmapData(game.cache.getImage('fumetto'));
        shape = new Shape(xLecter-game.camera.x, yLecter,bitmapW, bitmapH,game.cache.getImage('fumetto'))
        shape.setLecter(lectshape.lecter);


        shape.initializeBitmapData();
        lecter = lecters.create(xLecter, yLecter, shape.bmd);
        reservedArea.area.splice(0,1);
        reservedArea.area.push({ "x": xLecter, "y": yLecter, "x_": xLecter + bitmapW, "y_": yLecter + bitmapH, "posX": xLecter });
    }

    function updateTimer(){
        var seconds = Math.floor(game.time.time / 1000) % 60;
        return seconds;
    }

    function updateSpeed(){
        if(updateTimer()%10==0){
            playerV+=1;
        }
    }

    function onSwipeUp() {
            return ((game.input.activePointer.positionDown.y - game.input.activePointer.position.y) > 50 && game.input.activePointer.duration > 100 && game.input.activePointer.duration < 250);
    }

    function onSwipeRight() {
            return ((game.input.activePointer.position.x - game.input.activePointer.positionDown.x) > 50 && game.input.activePointer.duration > 100 && game.input.activePointer.duration < 250);
    }
