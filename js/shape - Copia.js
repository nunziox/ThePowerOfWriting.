var _points, _r, bmd;
var pointR = { point: [] };

var rsize = 0;
var wsize = 0;
var point
var point = 0;



function Shape(posX, posY, bitmapW, bitmapH) {
    this.posX = posX;
    this.posY = posY;
    this.bitmapW = bitmapW;
    this.bitmapH = bitmapH;
}

function initializeBitmapData(posX,posY,bitmapW,bitmapH) {

    var oReq = new XMLHttpRequest();
    oReq.open("get", "../json/shape.json", false);
    oReq.send();
    var json=JSON.parse(oReq.responseText);

    bmd = game.add.bitmapData(bitmapW, bitmapH);
    bmd.context.fillStyle = '#ADDBEB';
    bmd.canvas.style.background = 'red';
    bmd.context.fillRect(0, 0, bitmapW, bitmapH);
    bmd.context.fillStyle = '#FFFFFF';
    game.add.sprite(posX, posY, bmd);

    _points = new Array();
    _r = new DollarRecognizer();

    rsize = bitmapH / 10;
    wsize = bitmapH / 30;

    addShape("[", json);
}

function captureInputData() {
    bmd.context.fillStyle = '#000000';
    var x = game.input.activePointer.position.x;
    var y = game.input.activePointer.position.y;
    bmd.context.fillRect(game.input.activePointer.position.x, game.input.activePointer.position.y, wsize, wsize);

    for (var i = 0; i < wsize; i++) {
        for (j = 0; j < wsize; j++) {
            if (!isXY(x + i, y + j)) {
                _points[_points.length] = new Point(x + i, y + j);
            }
        }
    }

    bmd.dirty = true;
    turn = 1;
}

function checkInputData() {

    var res = {};

    if (_points.length >= 10) {
        for (var i = 0; i < pointR.point.length; i++) {
            for (var j = 0; j < _points.length; j++) {

                var pixX = _points[j].X;
                var pixY = _points[j].Y;
                if ((pixX >= parseInt(pointR.point[i].x) && pixX < parseInt(pointR.point[i].x) + rsize) && (pixY > parseInt(pointR.point[i].y) && pixY <= parseInt(pointR.point[i].y) + rsize)) {
                    point += 1;
                }

            }
        }

        var points = _points;
        var result = _r.Recognize(points, 0);//Attenzione che la funzione recognize modifica il vettore dei _points.
        res = { "point": point, "npoint": _points.length, "type": result.Name };
    }
    else {
        res = { "point": 0, "npoint": 0, "type": 'null' };
    }
    point = 0;
    return res;
}



function addShape(shape_name, json) {
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
            var piX = (pixelArray[i].x * rsize) - parseInt(shape.centerX) * rsize + bitmapW / 2;
            var piY = (pixelArray[i].y * rsize) - parseInt(shape.centerY) * rsize + bitmapH / 2;
            bmd.context.fillRect(piX, piY, rsize, rsize);
            pointR.point.push({ "x": piX, "y": piY });
        }
    }
}

function isXY(x, y) {
    for (var i = 0; i < _points.length; i++) {
        if (_points[i].X == x && _points[i].Y == y) {
            //console.log("X:" + _points[i].X + "Now:" + x + "Y:" + _points[i].Y + "Now:"+ y);
            return 1;
        }
    }
    return 0;
}