var JsonObj;

BootState.prototype = {


    preload : function(){


    ;},


    create:  function(){
       this.game.canvas.id = 'game';
       this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
       this.scale.setScreenSize(true);
       var req = new XMLHttpRequest();
       req.open('GET', 'pointsN.json', false);
       req.send(null);
       if (req.status === 200) {
           JsonObj = JSON.parse(req.responseText);
       }
        this.game.state.start('MenuState');
    ;},


    update : function(){


    ;}
}


