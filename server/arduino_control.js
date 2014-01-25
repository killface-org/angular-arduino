var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var util = require('util');
var events = require('events');

var SET_PIN_STATE = 25;
var SET_LCD_LINE1 = 26;
var SET_LCD_LINE2 = 27;

var ArduinoControl = function(port) {
    var self = this;
    events.EventEmitter.call(this);
    this._sp = new SerialPort(port, {
        baudrate: 9600,
        parser: serialport.parsers.readline("\n")
    },false);
    this._isConnected = false;

    this._sp.on('data',this._onDataFromSerial.bind(this));
    this._sp.on('error',function(error) {
        self.emit('error',error);
    });
    this._sp.on('close',function() {
        self._isConnected = false;
    });

    this._establishConnection();
};

util.inherits(ArduinoControl, events.EventEmitter);

ArduinoControl.prototype._establishConnection = function() {
    var self = this;
    this._sp.open(function(err) {
        if (err) {
            self.emit('error',err);
            return;
        }
        setTimeout(function() {
            self._isConnected = true;
            self.emit('connected');
        },2000);
    });
};

ArduinoControl.prototype._onDataFromSerial = function(data) {
    this.emit('message',data);
};

ArduinoControl.prototype.setPinState = function(pinNumber,pinState,callback) {
    var self = this;
    if (!this._isConnected) {
        callback('not connected',null);
        return;
    }
    this._sp.write([SET_PIN_STATE,pinNumber,pinState], function(err,result) {
        if(err) {
            callback(err,null);
            return;
        }
        self._sp.drain(function() {
            callback(null,result);
        });
    });
};

ArduinoControl.prototype.writeLCDLine1 = function(msg,callback) {
    var self = this;
    var cmdBuff = new Buffer([SET_LCD_LINE1]);
    var msgBuff = new Buffer(msg+'\n');
    var sendBuff = Buffer.concat([cmdBuff,msgBuff]);
    this._sp.write(sendBuff,function(err,result) {
        if(err) {
            callback(err,null);
            return;
        }
        self._sp.drain(function() {
            callback(null,result);
        });
    });
};

module.exports = ArduinoControl;