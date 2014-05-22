function MenuState(){
  this.button=0;
}

MenuState.prototype = {


    preload : function(){
      game.load.image('star', 'assets/star.png');
      game.load.image('logo', 'assets/logo.png');
    ;},


    create:  function(){
      this.button = game.add.button(0,0, 'logo', this.openGame, this, 2, 1, 0);
    ;},


    update : function(){
    ;}
}

MenuState.prototype.openGame=function(){
    this.game.state.start('GameState');
}