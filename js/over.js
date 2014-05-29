function OverState(){
  this.button=0;
}



OverState.prototype = {


    preload : function(){
       game.load.image('finish', 'assets/finish.png');
    ;},


    create:  function(){
        this.button = game.add.button(0,0, 'finish', this.openGame, this, 2, 1, 0);

        game.add.text(200,58, scoreApple,{font: "59px Comic Sans MS",fill: '#FFF',stroke: "black", strokeThickness: 10});
        game.add.text(200,150, scoreBanana,{font: "59px Comic Sans MS",fill: '#FFF',stroke: "black", strokeThickness: 10});
        game.add.text(200,245, scoreCiliege,{font: "59px Comic Sans MS",fill: '#FFF',stroke: "black", strokeThickness: 10});
        game.add.text(200,335, scoreWord,{font: "59px Comic Sans MS",fill: '#FFF',stroke: "black", strokeThickness: 10});


        game.add.text(850,600, 2*scoreApple+4*scoreBanana+6*scoreCiliege+100*scoreWord,{font: "59px Comic Sans MS",fill: '#FFF',stroke: "black", strokeThickness: 10});
        var record_label=game.add.text(970,700, '0',{font: "59px Comic Sans MS",fill: '#FFF',stroke: "black", strokeThickness: 10});
        record_label.fill='red';
    ;},


    update : function(){


    ;}

  
}

  OverState.prototype.openGame=function(){
     window.location = "";
   }