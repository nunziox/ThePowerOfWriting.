function OverState(){
  this.button=0;
}



OverState.prototype = {


    preload : function(){

    ;},


    create:  function(){
        var record=0;

        game.add.sprite(0,0,'finish');
        this.button = game.add.button(w-200,16, 'return', this.openGame, this, 2, 1, 0);

        game.add.text(200,58, scoreApple,{font: "59px Comic Sans MS",fill: '#FFF',stroke: "black", strokeThickness: 10});
        game.add.text(200,150, scoreBanana,{font: "59px Comic Sans MS",fill: '#FFF',stroke: "black", strokeThickness: 10});
        game.add.text(200,245, scoreCiliege,{font: "59px Comic Sans MS",fill: '#FFF',stroke: "black", strokeThickness: 10});
        game.add.text(200,335, scoreWord,{font: "59px Comic Sans MS",fill: '#FFF',stroke: "black", strokeThickness: 10});
        var point=2*scoreApple+4*scoreBanana+6*scoreCiliege+100*scoreWord;

        game.add.text(850,600,point,{font: "59px Comic Sans MS",fill: '#FFF',stroke: "black", strokeThickness: 10});

        if(point>localStorage.getItem("Record")){
         localStorage.setItem("Record",point);
         var record_label=game.add.text(970,700,point,{font: "59px Comic Sans MS",fill: '#FFF',stroke: "black", strokeThickness: 10});
         record_label.fill='red';
        }else{
         var record_label=game.add.text(970,700,localStorage.getItem("Record"),{font: "59px Comic Sans MS",fill: '#FFF',stroke: "black", strokeThickness: 10});
         record_label.fill='red';
        }

     

        /*$.ajax({
          type: "POST",
          dataType: "json",
          url: "readRecord.php", //Relative or absolute path to response.php file
          data: "",
          async: true,
          success: function(data) {
            var  xmlhttp=new XMLHttpRequest();
            xmlhttp.open("GET","writeRecord.php?rec="+point,true);
            xmlhttp.send();
         }
        });*/



       ;},

    update : function(){


    ;}

  
}

  OverState.prototype.openGame=function(){
     window.location = "";
   }