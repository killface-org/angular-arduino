//Basic requires
var http = require('http');
var node_static = require('node-static');


//Create static file server
var fileServer = new node_static.Server('../web-client',
    {
        cache:false
    }
);

//Create http server
var httpServer = http.createServer(function(req,res) {
    //Server files based on http requests
    fileServer.serve(req,res);
});

//Start http server
httpServer.listen(8080);

console.log('Server is listening');



