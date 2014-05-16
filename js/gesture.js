function Gesture(posX, posY, bitmapW, bitmapH) {
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

    this.last = new Phaser.Point();
    this.current = new Phaser.Point();
    this.change=0;
    this.stroke=false;
 
}


Gesture.prototype.getPosX=function(){
    return this.posX;
}

Gesture.prototype.getPosY= function () {
    return this.posY;
}


Gesture.prototype.setPosX=function(posX){
    this.posX = posX;
}

Gesture.prototype.initializeBitmapData = function () {

    this.bmd = game.add.bitmapData(this.bitmapW, this.bitmapH);
    
    this.bmd.context.fillStyle = '#00CCFF';
    this.bmd.context.fillRect(0,0, this.bitmapW, this.bitmapH);


    this._points = new Array();
    this._r = new DollarRecognizer();

    this.rsize = 10;
    this.wsize = 5;

    this.bmd.context.fillStyle = '#FFFFFF';

}




Gesture.prototype.captureInputData = function () {

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
        
            } else {
            
            }
    }


    this.bmd.context.fillRect(this.current.x,this.current.y,this.wsize,this.wsize);
    this.savePoint(this.current.x,this.current.y);

    this.last.x = this.current.x;
    this.last.y = this.current.y;

    this.bmd.dirty = true;
    this.stroke=true;

    return 1;
}


Gesture.prototype.savePoint = function (x,y) {
    this._points[this._points.length] = new Point(x,y);
}


Gesture.prototype.checkInputData = function () {
    var res = {};

    if (this._points.length >= 10) {
        var result = this._r.Recognize(this._points, 0);//Attenzione che la funzione recognize modifica il vettore dei _points.
        res = { "point": 0, "npoint": 0, "type": result.Name };
    }
    else {
        res = { "point": 0, "npoint": 0, "type": 'null' };
    }
    point = 0;
    return res;
}

Gesture.prototype.clearInputData = function () {
    this._points = new Array();
    this.bmd.clear();
    this.bmd.context.fillStyle = '#00CCFF';
    this.bmd.context.fillRect(0,0, this.bitmapW, this.bitmapH);
    this.bmd.context.fillStyle = '#FFFFFF';
}



Gesture.prototype.isXY = function (x, y) {
    for (var i = 0; i < this._points.length; i++) {
        if (this._points[i].X == x && this._points[i].Y == y) {
            return 1;
        }
    }
    return 0;
}