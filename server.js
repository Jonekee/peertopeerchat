var express = require('express');
var app = express();
var server=require('http').Server(app);
var io=require('socket.io')(server);

app.get('/',function(req,res){
    res.sendfile(__dirname+'/index.html');
});
app.get("/static.js",function(req,res){
    res.sendfile(__dirname+"/static.js");
});
app.get("/webrtc.io.js",function(req,res){
	res.sendfile(__dirname+"/webrtc.io.js");
});


server.listen(8080);

io.sockets.on('connection',function(socket){    
    socket.on('emitice',function(data){
    	console.log('got ice candidate');
        io.sockets.emit('sendice',data);
    });
    socket.on('emitoffer',function(data){
    	console.log("got offer");
        io.sockets.emit('reciveoffer',data);
    });
    socket.on('emitanswer',function(data){
    	console.log("emit answer");
    	io.sockets.emit('reciveanswer',data);
    });
});