function Shape(posX, posY, bitmapW, bitmapH,img) {
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
    this.lecter = 0;
    this.numSymbol = 0;
    this.word = 0;
    this.writeWord = false;
    this.textSize=200;
    this.position='center';

    this.marginLine=0;
    this.upperBound=0;
    this.lowerBound=0;
    this.redPixel = 0;
    this.numex = 0;

    this.innerPoint=0;
    this.totalCountedPoint=0;

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

Shape.prototype.setTextSize=function(size){
 this.textSize=size;
}

Shape.prototype.setLecter = function (lecter) {
    this.lecter = lecter;
}



Shape.prototype.setPosition = function (position) {
 this.position=position;
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

    this.wsize = Math.floor(this.bitmapH / 40);

    this.writeLecter();

}



Shape.prototype.initializeBitmapData = function () {

    this.bmd = game.add.bitmapData(this.bitmapW, this.bitmapH);
    if(this.img!='null'){
     this.bmd.context.drawImage(this.img, 0, 0,this.bitmapW,this.bitmapH);
    }

    this.bmd.context.fillStyle = '#BBBBBB';
    this.bmd.context.lineWidth = 15;

    this._strokes = new Array();
    this._points = new Array();


    this._r = new NDollarRecognizer(0);
  
    this.wsize = Math.floor(this.bitmapH / 40);

    if (this.writeWord == true) {
        this.writeLecter(0);
    } else if (this.position == 'top-left'&&this.writeWord==false) {
        this.bmd.context.textBaseline = "top";
        this.bmd.context.textAlign = 'center';
        this.bmd.context.fillStyle = "Red";
        this.bmd.context.font = "Bold " + this.textSize + "px" + " Verdana";
        this.bmd.context.fillText(this.lecter, this.textSize / 3, -this.textSize / 5); 
    } else {
        this.writeLecter(1);
    }
        

}

Shape.prototype.getShapeMaxMin = function () {
    
    var margin=15;
    var minX = [];
    var minY = [];
    var maxX = [];
    var maxY = [];
    var lenW = 0;

    var symbols = JsonObj.exercises[this.numex].symbols;
    for (var k = 0; k < symbols.length; k++) {
        var strokes = symbols[k].strokes;
        /*Individuiamo punti di min e max*/
        for (var i = 0; i < strokes.length; i++) {
            var points = strokes[i].stroke;
            for (var j = 0; j < points.length; j++) {
                if (i === 0 && j === 0) {
                    minX[k] = parseInt(points[j].X);
                    minY[k] = parseInt(points[j].Y);
                    maxX[k] = parseInt(points[j].X);
                    maxY[k] = parseInt(points[j].Y);
                } else {
                    /*Controllare la pazzia del 99... cose assurde °.°*/
                    if (minX[k] > parseInt(points[j].X)) { minX[k] = parseInt(points[j].X); }
                    if (minY[k] > parseInt(points[j].Y)) { minY[k] = parseInt(points[j].Y); }
                    if (maxX[k] < parseInt(points[j].X)) { maxX[k] = parseInt(points[j].X); }
                    if (maxY[k] < parseInt(points[j].Y)) { maxY[k] = parseInt(points[j].Y); }
                }
            }
        }
        lenW += (maxX[k] - minX[k]) + margin;
    }
    lenW -= margin;

    return { "minX": minX, "maxX": maxX, "minY": minY, "maxY": maxY,"lenW":lenW };
}

Shape.prototype.getAbsoluteShapeMaxMin = function (minX,minY,maxX,maxY) {
   var maxWordY=maxY[0];
   var minWordY=minY[0];
   for(var i=0;i<maxY.length;i++){
     if(maxY[i]>maxWordY) maxWordY=maxY[i];
     if(minY[i]<minWordY) minWordY=minY[i];
    }     
    var maxWordX=maxX[0];
    var minWordX=minX[0];
    for(var i=0;i<maxX.length;i++){
        if(maxX[i]>maxWordX) maxWordX=maxX[i];
        if(minX[i]<minWordX) minWordX=minX[i];
    }
    return {"maxWordY":maxWordY,"minWordY":minWordY,"maxWordX":maxWordX,"minWordX":minWordX};
}

Shape.prototype.writeLecter = function (isSubWord) {

    var thereis = false;
    var lastSpace=0;
    var lenH=0;
    var margin=15;
    var offset=0;

    var x0=0;
    var y0=0;

    /*Array temporanei per l'inserimento degli stroke in $n*/
    var strokes_;
    var stroke;
    /********************************************************/

    if (this.position === "center") {
                
        this.bmd.context.beginPath();

        var _g = this.getShapeMaxMin();
        var minX = _g.minX;
        var minY = _g.minY;
        var maxX = _g.maxX;
        var maxY = _g.maxY;
        var lenW = _g.lenW;
                  
        /*Trovo l'altezza della lettera più alta*/
        var maxYWord = (maxY[0] - minY[0]);
        var symbols = JsonObj.exercises[this.numex].symbols;
        for(var k=0;k<symbols.length;k++){
            if((maxY[k]-minY[k]) > maxYWord) maxYWord=(maxY[k]-minY[k]);
        }

        _g = this.getAbsoluteShapeMaxMin(minX, minY, maxX, maxY);
        var maxWordY = _g.maxWordY;
        var minWordY = _g.minWordY;
        var maxWordX = _g.maxWordX;
        var minWordX = _g.minWordX
  

        var strokes_;
        var stroke;


        var indexWord = 0;

        strokes_ = [];

        for(var index=0;index<symbols.length;index++){
            offset = 0;
            if(index>0){
                lastSpace+=(maxX[index-1]-minX[index-1])+margin;
            }
            var strokes = symbols[index].strokes;
            for (var i = 0; i < strokes.length; i++) {
                var points = strokes[i].stroke;
                stroke = [];
                for (var j = 0; j < points.length ; j++) {
                    if (j === 0) {
                        if (isSubWord && symbols[index].symbol == this.lecter) {
                            this.bmd.context.moveTo(parseInt(points[j].X) - minX[index] + this.bitmapW / 2 - (maxX[index] - minX[index]) / 2, parseInt(points[j].Y) - minY[index] + this.bitmapH / 2 -(maxY[index] - minY[index]) / 2);
                            stroke[stroke.length]=new Point(parseInt(points[j].X),parseInt(points[j].Y));
                        } else if (!isSubWord) {
                            this.bmd.context.moveTo(parseInt(points[j].X) - minX[index] + lastSpace + this.bitmapW / 2 - lenW / 2, parseInt(points[j].Y) - minY[index] + this.bitmapH / 2 - maxYWord / 2);
                            stroke[stroke.length]=new Point(parseInt(points[j].X),parseInt(points[j].Y));
                        }
                    } else {
                        if (isSubWord && symbols[index].symbol == this.lecter) {
                            this.bmd.context.lineTo(parseInt(points[j].X) - minX[index] + this.bitmapW / 2 - (maxX[index] - minX[index]) / 2, parseInt(points[j].Y) - minY[index] + this.bitmapH / 2 - (maxY[index] - minY[index]) / 2);
                            indexWord = index;
                            stroke[stroke.length]=new Point(parseInt(points[j].X),parseInt(points[j].Y));
                        } else if (!isSubWord) {
                            this.bmd.context.lineTo(parseInt(points[j].X) - minX[index] + lastSpace + this.bitmapW / 2 - lenW / 2, parseInt(points[j].Y) - minY[index] + this.bitmapH / 2 - maxYWord / 2);
                            stroke[stroke.length]=new Point(parseInt(points[j].X),parseInt(points[j].Y));
                        }
                    }
                }
                if (isSubWord && symbols[index].symbol == this.lecter) strokes_[strokes_.length] = stroke;
            }
            this.bmd.context.strokeStyle = '#ff0000';
            this.bmd.context.stroke();
                  
        }

         

                
               //if(!this.writeWord) this._r.addMultiStroke(this.lecter,strokes_.slice());

                this.marginLine = 10;
             
                /*Inseriamo le righe*/
                if (isSubWord) lenW = (maxX[indexWord] - minX[indexWord]);

                    this.upperBound = this.bitmapH / 2 - maxYWord / 2;
                    this.lowerBound = maxYWord/2 + this.bitmapH / 2;
                    var x0 = this.bitmapW / 2 - lenW / 2;
                    this.bmd.context.fillRect(x0 - 10, this.upperBound - this.marginLine, lenW + 20, 2);
                    this.bmd.context.fillRect(x0 - 10, this.lowerBound + this.marginLine, lenW + 20, 2);           

         }
}



Shape.prototype.captureInputData = function () {
    
    this.bmd.context.fillStyle = '#000000';


    this.current.x =  Math.round(game.input.activePointer.position.x - this.posX);
    this.current.y = Math.round(game.input.activePointer.position.y - this.posY);

    var curX = this.current.x;
    var curY = this.current.y;

    var color = this.getpixelcolour(curX,curY);
    if (color[0] === 255 && color[1] === 0 && color[2] === 0) {
        this.innerPoint += 1;
    }
    if (!(color[0] === 0 && color[1] === 0 && color[2] === 0)) {
        this.totalCountedPoint += 1;
    }

    var color = this.getpixelcolour(curX+this.wsize, curY+this.wsize);
    if (color[0] === 255 && color[1] === 0 && color[2] === 0) {
        this.innerPoint += 1;
    }
    if (!(color[0] === 0 && color[1] === 0 && color[2] === 0)) {
        this.totalCountedPoint += 1;
    }



    if(this.stroke){
            if (this.last.x != 0 && this.last.y !=0 )
            {
                var dist = this.current.distance(this.last, true)
                var step = dist *this.wsize*2;
                for (var i = 0; i < step; i++){       
                    this.last = Phaser.Point.interpolate(this.last, this.current, (i/step), this.last);
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


Shape.prototype.getpixelcolour=function(x, y) {
  var pixels = this.bmd.context.getImageData(0, 0,this.bitmapW,this.bitmapH);
  var index = ((y * (pixels.width * 4)) + (x * 4));
  return new Array(pixels.data[index],pixels.data[index+1],pixels.data[index+2],pixels.data[index+3]);
}

Shape.prototype.upperBoundError = function () {
    var pixels = this.bmd.context.getImageData(0, 0, this.bitmapW, this.bitmapH);
    var amount = 0;
    for (var i = 0; i < this.bitmapW; i++) {
        for (var j = 0; j < this.upperBound - this.marginLine; j++) {
            var index = ((j * (pixels.width * 4)) + (i * 4));
            if (pixels.data[index] === 0 &&
                 pixels.data[index + 1] === 0 &&
                 pixels.data[index + 2] === 0) {
                amount++;
            }
        }
    }
    return amount;
}

Shape.prototype.lowerBoundError = function () {
    var pixels = this.bmd.context.getImageData(0, 0, this.bitmapW, this.bitmapH);
    var amount = 0;
    //console.log("LowerBound"+this.lowerBound);
    for (var i = 0; i < this.bitmapW; i++) {
        for (var j = this.lowerBound+this.marginLine; j < this.bitmapH; j++) {
            var index = ((j * (pixels.width * 4)) + (i * 4));
            if (pixels.data[index] === 0 &&
                 pixels.data[index + 1] === 0 &&
                 pixels.data[index + 2] === 0) {
                amount++;
            }
        }
    }
    return amount;
}



Shape.prototype.checkInputData = function () {
    var res = {};

    var percent = (this.innerPoint / this.totalCountedPoint) * 100;
    this.totalCountedPoint = 0;
    this.innerPoint = 0;
    this.isItalic = false;

    var errorUp = this.upperBoundError();
    var errorDown = this.lowerBoundError();


    var result;
    if (this.writeWord == false && this._strokes.length > 0) {
        result = this._r.Recognize(this._strokes, 0, 0, 1);
        res = { "matchPercent": percent, "errorUp": errorUp / this.totalCountedPoint, "errorDown": errorDown / this.totalCountedPoint, "point": this.round(result.Score, 2), "type": result.Name, "strokes": this._strokes };
        alert("Percentuale: " + percent + ", ErrorUp: " + errorUp + ", ErrorDown:" + errorDown + ", DollarNPoint:" + this.round(result.Score, 2)+", type: " + result.Name);
    } else if (this.writeWord) {
        res = { "matchPercent": percent, "errorUp": errorUp / this.totalCountedPoint, "errorDown": errorDown / this.totalCountedPoint, "point": 'null', "type": 'null', "strokes": this._strokes };
    }
    point = 0;

 
    this.clearInputData();
    return res;
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
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
