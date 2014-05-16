function Shape(posX, posY, bitmapW, bitmapH,type) {
    this.posX = posX;
    this.posY = posY;
    this.bitmapW = bitmapW;
    this.bitmapH = bitmapH;
    this.rsize = 0;
    this.wsize = 0;
    this.point = 0;
    this.pointR = { point: [] };
    this._points = 0;
    this._r = 0;
    this.bmd = 0;
    this.type = type;

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

Shape.prototype.initializeBitmapData = function (img) {
    /*var oReq = new XMLHttpRequest();
    oReq.open("get", "../json/shape.json", false);
    oReq.send();
    var json=JSON.parse(oReq.responseText);*/

    var json = {
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
    };

    this.bmd = game.add.bitmapData(this.bitmapW, this.bitmapH);
    if(img!='null'){
     this.bmd.context.drawImage(img, 0, 0,this.bitmapW,this.bitmapH);
    }
    //this.bmd.context.fillStyle = '#00CCFF';
    //this.bmd.context.fillRect(0, 0, this.bitmapW, this.bitmapH);
    this.bmd.context.fillStyle = '#BBBBBB';

    this._points = new Array();
    this._r = new DollarRecognizer();

    this.rsize = this.bitmapH / 10;
    this.wsize = this.bitmapH / 30;

    this.addShape(this.type, json);
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


Shape.prototype.checkInputData = function () {
    var res = {};

    if (this._points.length >= 10) {
        for (var i = 0; i < this.pointR.point.length; i++) {
            for (var j = 0; j < this._points.length; j++) {

                var pixX = this._points[j].X;
                var pixY = this._points[j].Y;
                if ((pixX >= parseInt(this.pointR.point[i].x) && pixX < parseInt(this.pointR.point[i].x) + this.rsize) && (pixY > parseInt(this.pointR.point[i].y) && pixY <= parseInt(this.pointR.point[i].y) + this.rsize)) {
                    this.point += 1;
                }

            }
        }

        var points = this._points;
        var result = this._r.Recognize(points, 0);//Attenzione che la funzione recognize modifica il vettore dei _points.
        res = { "point": this.point, "npoint": this._points.length, "type": result.Name };
    }
    else {
        res = { "point": 0, "npoint": 0, "type": 'null' };
    }
    point = 0;
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