var MainPageController = function($scope) {
    var self = this;
    this.socket = io.connect('http://192.168.1.105:3000');
    this.scope = $scope;
    this.redState = 0;
    this.blueState = 0;
    this.greenState = 0;
    this.lcdText='';
    this.socket.on('statechange', function (data) {
        console.log(data);
        self.redState = data.red;
        self.blueState = data.blue;
        self.greenState = data.green;
        self.lcdText = data.lcd;
        $scope.$apply();
    });
};

MainPageController.prototype.onRedClick = function() {
    this.redState = !this.redState;
    this.socket.emit('setpin',10,this.redState,function(err,result) {
        if(err) {
            console.log(err);
            return;
        }
        console.log('set red pin ' + result);
    });
};


MainPageController.prototype.onBlueClick = function() {
    this.blueState = !this.blueState;
    this.socket.emit('setpin',8,this.blueState,function(err,result) {
        if(err) {
            console.log(err);
            return;
        }
        console.log('set blue pin ' + result);
    });
};


MainPageController.prototype.onGreenClick = function() {
    this.greenState = !this.greenState;
    this.socket.emit('setpin',9,this.greenState,function(err,result) {
        if(err) {
            console.log(err);
            return;
        }
        console.log('set green pin ' + result);
    });
};

MainPageController.prototype.setLCDText = function() {
    this.socket.emit('setlcd',this.lcdText,function(err,result) {
        if(err) {
            console.log(err);
            return;
        }
        console.log('set lcd text ' + result);
    });
};

angular.module('app',['ngTouch']);
angular.module('app').controller('MainPage',['$scope',MainPageController]);