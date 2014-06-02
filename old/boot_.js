BootState.prototype = {


    preload : function(){


    ;},


    create:  function(){
       this.game.canvas.id = 'game';
       this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
       this.scale.setScreenSize(true);
       this.game.state.start('MenuState');
    ;},


    update : function(){


    ;}
}


