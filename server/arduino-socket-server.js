var ArdunioContoller = require('./arduino_control');
var MyDevice = new ArdunioContoller('/dev/ttyACM0');
var io = require('socket.io').listen(3000);

var lastState = null;

MyDevice.on('connected', function() {
    console.log('connected to device');
});

MyDevice.on('message', function(data) {

    var cleanData = data.replace(/'/g,'\"');
    try {
        var obj = JSON.parse(cleanData);
        lastState = obj;
        io.sockets.emit('statechange',obj);
    } catch(err) {
        console.log('error parsing json:' + err);
    }
});

io.sockets.on('connection', function (socket) {
    if (lastState !== null) {
        socket.emit('statechange',lastState);
    }
    socket.on('setpin', function (pn,ps,cb) {
        MyDevice.setPinState(pn,ps,function(err,result) {
            if(err) {
                cb(err,result);
                return;
            }
            cb(null,result);
        });
    });
    socket.on('setlcd', function (msg,cb) {
        MyDevice.writeLCDLine1(msg,function(err,result) {
            if(err) {
                cb(err,result);
                return;
            }
            cb(null,result);
        });
    });
});



