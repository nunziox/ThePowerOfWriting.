﻿function Shape(posX, posY, bitmapW, bitmapH,img) {
    this.posX = posX;
    this.posY = posY;
    this.bitmapW = bitmapW;
    this.bitmapH = bitmapH;
    this.rsize = 0;
    this.wsize = 0;
    this.point = 0;
    this.pointR = { point: [] };
    this._points = 0;
    this._strokes = 0;
    this._r = 0;
    this.bmd = 0;
    this.type = 0;
    this.img=img;

    this.last = new Phaser.Point();
    this.current = new Phaser.Point();
    this.change=0;
    this.stroke=false;
}


Shape.prototype.getPosX=function(){
    return this.posX;
}

Shape.prototype.getPosY= function () {
    return this.posY;
}


Shape.prototype.setPosX=function(posX){
    this.posX = posX;
}

Shape.prototype.clearInputData = function () {
    this.bmd.clear();
    if(this.img!='null'){
     this.bmd.context.drawImage(this.img, 0, 0,this.bitmapW,this.bitmapH);
    }

    this.bmd.context.fillStyle = '#BBBBBB';

    this._strokes = new Array();
    this._points = new Array();
    this._r = new NDollarRecognizer(0);

    this.rsize = this.bitmapH / 10;
    this.wsize = this.bitmapH / 30;

}

Shape.prototype.initializeBitmapData = function () {
    /*var oReq = new XMLHttpRequest();
    oReq.open("get", "../json/shape.json", false);
    oReq.send();
    var json=JSON.parse(oReq.responseText);*/

    /*var json = {
        "shape": [
            {
                "name": "left square bracket",
                "pixelArray": [{ "x": 0, "y": 0 }, { "x": 0, "y": 1 }, { "x": 0, "y": 2 }, { "x": 0, "y": 3 }, { "x": 0, "y": 4 }, { "x": 0, "y": 5 }, { "x": 0, "y": 6 }, { "x": 0, "y": 7 },
                              { "x": 1, "y": 0 }, { "x": 2, "y": 0 }, { "x": 3, "y": 0 },
                              { "x": 1, "y": 7 }, { "x": 2, "y": 7 }, { "x": 3, "y": 7 }
                ],
                "centerX": 2,
                "centerY": 4
            }
        ]
    };*/

    this.bmd = game.add.bitmapData(this.bitmapW, this.bitmapH);
    if(this.img!='null'){
     this.bmd.context.drawImage(this.img, 0, 0,this.bitmapW,this.bitmapH);
    }

    this.bmd.context.fillStyle = '#BBBBBB';

    this._strokes = new Array();
    this._points = new Array();
    this._r = new NDollarRecognizer(0);

    this.rsize = this.bitmapH / 10;
    this.wsize = this.bitmapH / 30;

    //this.addShape(this.type, json);
}

Shape.prototype.captureInputData = function () {
    
    this.bmd.context.fillStyle = '#000000';
    this.current.x = game.input.activePointer.position.x-this.posX;
    this.current.y = game.input.activePointer.position.y-this.posY;

    if(this.stroke){
            if (this.last.x != 0 && this.last.y !=0 )
            {
                var dist = this.current.distance(this.last, true)
                var step = dist *this.wsize*2;

                for (var i = 0; i < step; i++){            
                    this.last = Phaser.Point.interpolate(this.last, this.current, i/step, this.last)
                    this.bmd.context.fillRect(this.last.x,this.last.y, this.wsize, this.wsize);
                    this.savePoint(this.last.x,this.last.y);
                }
        
            } 
    }

    this.last.x = this.current.x;
    this.last.y = this.current.y;

    this.bmd.context.fillRect(this.current.x,this.current.y,this.wsize,this.wsize);
    this.savePoint(this.current.x,this.current.y);
    this.stroke=true;
    this.bmd.dirty = true;
    return 1;
}

Shape.prototype.savePoint = function (x,y) {
    this._points[this._points.length] = new Point(x,y);
}




Shape.prototype.saveStroke = function () {
  if(this._points.length > 0){
    this._strokes[this._strokes.length] = this._points.slice();
    this._points=new Array();
  }
}
    
Shape.prototype.round=function(n, d){
    d = Math.pow(10, d);
    return Math.round(n * d) / d;
}



Shape.prototype.checkInputData = function () {
    var res = {};

    if (this._strokes.length > 0){
        var points = this._points;
        var result= this._r.Recognize(this._strokes,0,0,1);
        res = { "point": this.round(result.Score,2), "type": result.Name };
    }
    else {
        res = { "point": 0, "type": 'null' };
    }
    point = 0;
    this.clearInputData();
    return res;
}


Shape.prototype.addShape = function (shape_name, json) {
    var pixelArray = '0';
    var shape;
    for (var i = 0; i < json.shape.length; i++) {
        if (json.shape[i].name == shape_name) {
            pixelArray = json.shape[i].pixelArray;
            shape = json.shape[i];
        }
    }

    if (pixelArray !== '0') {
        for (var i = 0; i < pixelArray.length; i++) {
            var piX = (pixelArray[i].x * this.rsize) - parseInt(shape.centerX) * this.rsize + this.bitmapW / 2;
            var piY = (pixelArray[i].y * this.rsize) - parseInt(shape.centerY) * this.rsize + this.bitmapH / 2;
            this.bmd.context.fillRect(piX, piY, this.rsize, this.rsize);
            this.pointR.point.push({ "x": piX, "y": piY });
        }
    }
}

Shape.prototype.isXY = function (x, y) {
    for (var i = 0; i < this._points.length; i++) {
        if (this._points[i].X == x && this._points[i].Y == y) {
            return 1;
        }
    }
    return 0;
}