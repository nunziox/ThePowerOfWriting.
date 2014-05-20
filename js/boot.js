BootState.prototype = {


    preload : function(){


    ;},


    create:  function(){
       this.game.canvas.id = 'game';
       this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
       this.scale.setScreenSize(true);
       game.state.start('GameState');
    ;},


    update : function(){


    ;}
}


