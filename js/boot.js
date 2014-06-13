var JsonObj;
var text = [];
var numex = [];
var exitalic = [];
var exword = [];
var exid = [];


BootState.prototype = {


    preload : function(){
        this.load.image('loaderFull', 'assets/full_loader.png');
        this.load.image('loaderEmpty', 'assets/pre_loader.png');
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
       for (var i = 0; i < JsonObj.exercises.length; i++) {
           //if (JsonObj.exercises[i].isWord === true) {
           text[i] = JsonObj.exercises[i].text.toString();
           numex[i] = i;
           exitalic[i] = JsonObj.exercises[i].isItalic;
           exword[i] = JsonObj.exercises[i].isWord;
           exid[i] = JsonObj.exercises[i].id;
           //}
       }
        this.game.state.start('MenuState');
    ;},


    update : function(){


    ;}
}


