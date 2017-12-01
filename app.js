var app = require('express')(),
server = require('http').createServer(app),
io = require('socket.io').listen(server),
ent = require('ent'),
fs = require('fs');

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});


app.get('/jquery', function (req, res) {
        res.sendfile(__dirname + '/jquery-1.10.1.min.js');
});




io.sockets.on('connection', function (socket) {
	socket.on('message', function (message) {
		var tri = new Array();
		tri = tirage(6);
		socket.emit('message', tri);
		socket.broadcast.emit('message', tri);
	}); 
});


function tirage(n){
	var type = ['feu', 'eau', 'plante','normal','vol','combat',
	'tenebre','psy','fee','spectre','dragon','glace',
	'insecte','poison','acier','roche','sol','electrique'
	];
	var liste = new Array();
	for (i=0;i<n;i++){
		if (type.length==0) {break;}
		type.sort(randsort);
		liste.push(type.pop())      
	}
	return liste;
}

function randsort(){
	return (Math.random()*2 & 1)?-1:1;
}

console.log("serveur run:1423");
server.listen(1423);
