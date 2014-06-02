function MenuState(){
  this.button=0;
  this.helpbutton=0;
}

MenuState.prototype = {


    preload : function(){
      game.load.image('star', 'assets/star.png');
      game.load.image('logo', 'assets/logo.png');
      game.load.image('exit', 'assets/exit.png');
      game.load.image('setting', 'assets/config.png');
      game.load.image('help', 'assets/help.png');
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