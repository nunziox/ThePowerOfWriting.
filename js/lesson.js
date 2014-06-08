function LessonState(){



    this.button=0,this.closebutton=0;
    this.solidH = 100,this.solidW = 100;
    this.pen=0;
    this.penrotating=0;
    this.pensquare=0;
    this.pentriangle=0;
    this.solid=0;
    this.rectangles=0,this.rectangle=0;

    this.platforms=0;
    
    this.gesture=0;
    this.gturn=0;
    this.playerl=0;

    this.lesson1=0,this.lesson2=0,this.lesson3=0,this.lesson4=0,this.lesson5=0;
    this.playerkilled=false;

    this.cilieges=0,this.apples=0,this.bananas=0;
    this.ciliege=0,this.apple=0,this.ciliege=0;
    this.status=0;

    this.DISEGNO = {
        SWIPE:{value: 0}, 
        CIRCLE:{value: 1},
        RECTANGLE:{value:2},
        TRIANGLE:{value:3},
        NORMAL:{value:4}
    };

}

LessonState.prototype = {


    preload : function(){

      /*this.load.onFileComplete.add(function( progress ) { 
        if(this.lesson_loading_finish==undefined){
          if(this.num_file_loading==0){
            this.num_file_loading=0;
            this.loading_status=this.game.add.text(w/2-130, h/2-80,'', { font: '59px Arial', fill: '#FFF' });      //stampo lo score attuale
          }else if(num_file_loading<16){
           this.loading_status.text ='Loading'+progress.toString();
          }
          this.num_file_loading++;
        }
      });

      this.load.onLoadComplete.add(function( progress ) { 
          this.num_file_loading=0;
          this.lesson_loading_finish=true;
      });*/

      /*game.load.image('lesson1', 'assets/lesson1.png');
      game.load.image('lesson2', 'assets/lesson2.png');
      game.load.image('lesson3', 'assets/lesson3.png');
      game.load.image('lesson4', 'assets/lesson4.png');
      game.load.image('lesson5', 'assets/lesson5.png');
      game.load.spritesheet('penswipe', 'assets/penswipe.png',200,220);
      game.load.spritesheet('penrotating', 'assets/penrotating.png',150,135);
      game.load.spritesheet('pensquare', 'assets/pensquare.png',150,135);
      game.load.spritesheet('pentriangle', 'assets/pentriangle.png',150,135);
      game.load.image('playerl', 'assets/playerl.png');
      game.load.image('gioca', 'assets/gioca.png');

      game.load.image('banana', 'assets/banana.png');
      game.load.image('ciliege', 'assets/ciliege.png');
      game.load.image('apple', 'assets/fruit.png');
      game.load.image('ground', 'assets/solid.jpg');
      game.load.image('exitgame', 'assets/exitgame.png');*/

    ;},


    create:  function(){
      this.status=this.DISEGNO.SWIPE;
      game.physics.startSystem(Phaser.Physics.ARCADE);      
      
      this.rectangles= game.add.group();  
      this.rectangles.enableBody = true;

      this.cilieges= game.add.group();  
      this.cilieges.enableBody = true;

      this.apples= game.add.group();  
      this.apples.enableBody = true;

      this.bananas= game.add.group();  
      this.bananas.enableBody = true;
      
      this.gesture = new Gesture(0,0,w,h);
      this.gesture.initializeBitmapData();  
      this.rectangle=this.rectangles.create(0,0,this.gesture.bmd); 

      this.solid=this.game.add.tileSprite(0,game.world.height - this.solidH,1280,800,'ground');
      this.game.physics.arcade.enable(this.solid); 
      this.solid.body.immovable=true;
      this.collideWorldBounds=true;
      this.lesson1=this.game.add.sprite(100,game.world.height - this.solidH-250,'lesson1');

      this.playerl=this.game.add.sprite(800,game.world.height - this.solidH-150,'playerl');
      this.game.physics.arcade.enable(this.playerl); 
      this.playerl.body.gravity.y = 600;     
      this.playerl.body.collideWorldBounds=true;
      this.playerl.body.velocity.x=0;

      this.pentriangle=this.game.add.sprite(280,100,'pentriangle');   
      this.pensquare=this.game.add.sprite(280,100,'pensquare');
      this.penrotating=this.game.add.sprite(280,100,'penrotating');
      this.pen=this.game.add.sprite(280,100,'penswipe');

   
      this.penrotating.animations.add('penrotating',  [0,1,2,3,4], 3, true);  
      this.pensquare.animations.add('pensquare',  [0,1,2,3,4,5], 3, true);  
      this.pentriangle.animations.add('pentriangle',  [0,1,2,3,4],2, true);  
      this.pen.animations.add('pen',  [0,1,2,3], 3, true);  

      this.pen.animations.play('pen');

       var element=game.add.button(w-100,16, 'exitgame', this.exitGame, this, 0,0,0);
       element.fixedToCamera=true;


       game.add.text(16, 16, 'Prima di iniziare . . .', { font: '30px Arial', fill: '#000' });

      //this.button = game.add.button(0,0, 'logo', this.openGame, this, 2, 1, 0);
      //this.button = game.add.button(w-100,20, 'exit', this.openSetting, this, 2, 1, 0);
      //this.button = game.add.button(w-180,35, 'setting', this.openSettingUser, this, 2, 1, 0);
    ;},


    update : function(){
            var element;
            this.game.physics.arcade.collide(this.playerl,this.solid); 



            if(this.playerl.body.position.y<300){
              this.playerkilled=true;
            }


            if(this.playerl.body.position.y==game.world.height - this.solidH-150&&this.playerkilled==true){
              this.playerl.destroy();
              this.pen.destroy();
              this.lesson1.destroy();
              this.lesson2=this.game.add.sprite(100,game.world.height - this.solidH-250,'lesson2');
              this.penrotating.scale.setTo(1.5,1.5);
              this.penrotating.animations.play('penrotating');
              this.playerkilled=false;
              this.status=this.DISEGNO.CIRCLE;
            }

            if (game.input.activePointer.isDown) {
              this.gturn= this.gesture.captureInputData();
            }

            if (game.input.activePointer.isUp) {
              
              var x = game.input.activePointer.position.x;
              var y = game.input.activePointer.position.y;

              if(this.gturn==1){
                var res=this.gesture.checkInputData();
                if(res.type=='null'){

                }else if(res.type=='circle'&&this.status==this.DISEGNO.CIRCLE){
                  this.penrotating.destroy();
                  this.lesson2.destroy();
                  this.lesson3=this.game.add.sprite(100,game.world.height - this.solidH-250,'lesson3');
                  this.pensquare.scale.setTo(1.5,1.5);
                  this.pensquare.animations.play('pensquare');
                  element = this.bananas.create(x+game.camera.x,y,'banana');
                  setCommonProperties(element);
                  this.status=this.DISEGNO.RECTANGLE;
                }else if(res.type=='rectangle'&&this.status==this.DISEGNO.RECTANGLE){
                  this.pensquare.destroy();
                  this.lesson3.destroy();
                  this.lesson4=this.game.add.sprite(100,game.world.height - this.solidH-250,'lesson4');
                  this.pentriangle.scale.setTo(1.5,1.5);
                  this.pentriangle.animations.play('pentriangle');
                  element = this.apples.create(x+game.camera.x,y,'apple');
                  setCommonProperties(element);
                  this.status=this.DISEGNO.TRIANGLE;
                }else if(res.type=='triangle'&&this.status==this.DISEGNO.TRIANGLE){
                  this.pentriangle.destroy();
                  this.lesson4.destroy();
                  this.lesson5=this.game.add.sprite(100,game.world.height - this.solidH-250,'lesson5');
                  element = this.cilieges.create(x+game.camera.x,y,'ciliege');
                  setCommonProperties(element);         
                  this.cilieges.getFirstAlive().destroy();
                  this.apples.getFirstAlive().destroy();  
                  this.bananas.getFirstAlive().destroy();  
                  this.button=game.add.button(w/2-235/2,h/2-261/2-50, 'gioca', this.nextGame, this, 0,0,0);
                  this.status=this.DISEGNO.NORMAL;
                }
              }
              this.gesture.stroke=false;
              this.gesture.clearInputData();
            }

             if (onSwipeUp()&&this.playerl.body.touching.down&&this.status==this.DISEGNO.SWIPE) {
                this.playerl.body.velocity.y = -700;   
             }
    ;}
}

/*tra 100 e 250*/
function onSwipeUp() {
  return ((game.input.activePointer.positionDown.y - game.input.activePointer.position.y) > 150 && game.input.activePointer.duration > 100 && game.input.activePointer.duration < 400);
}

function setCommonProperties(element){
      element.body.gravity.y = 0; 
      element.body.immovable = true; 
      element.body.collideWorldBounds = true;
}


LessonState.prototype.nextGame=function(){
 this.game.state.start('GameState');
}

LessonState.prototype.exitGame=function(){
 window.location="";
}


LessonState.prototype.openGame=function(){
    this.game.state.start('GameState');
}
