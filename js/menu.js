function MenuState(){
  this.button=0;
  this.helpbutton=0;
  this.loading_status=0;

  this.enemyH = 89,this.enemyW = 89;
  this.boomH = 94,this.boomW = 95;
  this.playerH = 150,this.playerW = 233;
} 

MenuState.prototype = {

    preload : function(){
      
      this.load.onFileComplete.add(function( progress ) { 
        if(this.menu_loading_finish==undefined){
          if(this.num_file_loading==undefined){
            this.num_file_loading=0;
            this.loading_status=this.game.add.text(w/2-130, h/2-80,'', { font: '59px Arial', fill: '#FFF' });      //stampo lo score attuale
          }else if(num_file_loading<55){
           this.loading_status.text ='Loading: '+progress.toString();
          }
          this.num_file_loading++;
        }
      });

      this.load.onLoadComplete.add(function( progress ) { 
          this.num_file_loading=0;
          this.menu_loading_finish=true;
      });


      /*Parte relativa al lesson*/
      game.load.image('lesson1', 'assets/lesson1.png');
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
      game.load.image('exitgame', 'assets/exitgame.png');
 
      /*Parte relativa al menu*/
      game.load.image('star', 'assets/star.png');
      game.load.image('logo', 'assets/logo.png');
      game.load.image('exit', 'assets/exit.png');
      game.load.image('setting', 'assets/config.png');
      game.load.image('help', 'assets/help.png');

      /*parte relativa al game*/
      game.load.image('checkmark', 'assets/checkmark.png');
      game.load.image('forest', 'assets/bksprite.png');
      game.load.image('ground', 'assets/solid.jpg');
      game.load.image('apple', 'assets/fruit.png');
      game.load.image('fumetto', 'assets/fumetto.jpg');
      game.load.image('bullet', 'assets/bullet.png');
      game.load.image('life', 'assets/newlife.png');
      game.load.image('cactus', 'assets/cactus.png');
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
      game.load.image('ananas', 'assets/ananas.png');

      game.load.image('applex2', 'assets/fruitx2.png');
      game.load.image('applex5', 'assets/fruitx5.png');
      game.load.image('bananax2', 'assets/bananax2.png');
      game.load.image('bananax5', 'assets/bananax5.png');
      game.load.image('ciliegex2', 'assets/ciliegex2.png');
      game.load.image('ciliegex5', 'assets/ciliegex5.png');

      game.load.image('exitgame', 'assets/exitgame.png');
      game.load.spritesheet('playstop', 'assets/stop.png',60,60);

      game.load.spritesheet('boom', 'assets/boom.png', this.boomW, this.boomH);
      game.load.spritesheet('enemy', 'assets/bombe_.png', this.enemyW, this.enemyH);

      game.load.spritesheet('dude', 'assets/playerbolla.png', this.playerW, this.playerH,10);

      game.load.audio('audio_game', 'assets/audio_game.mp3');
      game.load.audio('effect_sound', 'assets/effect_sound.mp3');


      /*parte relativa al finish*/
       game.load.image('finish', 'assets/finish.png');

    ;},


    create:  function(){
      this.button = game.add.button(0,0, 'logo', this.openGame, this, 2, 1, 0);
      this.button = game.add.button(w-100,20, 'exit', this.openSetting, this, 2, 1, 0);
      this.button = game.add.button(w-180,35, 'setting', this.openSettingUser, this, 2, 1, 0);
      this.helpbutton= game.add.button(16,16, 'help', this.openHelp, this, 2, 1, 0);
    ;},


    update : function(){
      
    ;}
}

MenuState.prototype.openGame=function(){
       if(localStorage.getItem("Help")==1){
          this.game.state.start('GameState');
       }else{
        localStorage.setItem("Help",1);
        this.game.state.start('LessonState');
       }
  
}
MenuState.prototype.openSetting=function(){
    window.open("logout.php","_self");
}
MenuState.prototype.openSettingUser=function(){
    window.open("account.php","_self");
}

MenuState.prototype.openHelp=function(){
    this.game.state.start('LessonState');
}