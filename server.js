//setup Dependencies
var connect = require('connect')
    , express = require('express')
    , io = require('socket.io')
    , port = (process.env.PORT || 8081);

//Setup Express
var server = express.createServer();
server.configure(function(){
    server.set('views', __dirname + '/views');
    server.use(connect.bodyParser());
    server.use(express.cookieParser());
    server.use(express.session({ secret: "shhhhhhhhh!"}));
    server.use(connect.static(__dirname + '/static'));
    server.use(server.router);
});

//setup the errors
server.error(function(err, req, res, next){
    if (err instanceof NotFound) {
        res.render('404.jade', { locals: { 
                  title : '404 - Not Found'
                 ,description: ''
                 ,author: ''
                 ,analyticssiteid: 'XXXXXXX' 
                },status: 404 });
    } else {
        res.render('500.jade', { locals: { 
                  title : 'The Server Encountered an Error'
                 ,description: ''
                 ,author: ''
                 ,analyticssiteid: 'XXXXXXX'
                 ,error: err 
                },status: 500 });
    }
});
server.listen( port);


var Game = function ()
{
	this.board = {
		path:  [
			[7, 1], [8, 1],	[9, 1],
			[9, 2], [9, 3], [9, 4], [9, 5], [9, 6],
			[10, 7], [11, 7], [12, 7], [13, 7], [14, 7],
			[15, 7], [15, 8], [15, 9],
			[14, 9], [13, 9], [12, 9], [11, 9], [10, 9],
			[9, 10], [9, 11], [9, 12], [9, 13], [9, 14],
			[9, 15], [8, 15], [7, 15],
			[7, 14], [7, 13], [7, 12], [7, 11], [7, 10],
			[6, 9], [5, 9], [4, 9], [3, 9], [2, 9],
			[1, 9], [1, 8], [1, 7],
			[2, 7], [3, 7], [4, 7], [5, 7], [6, 7],
			[7, 6], [7, 5], [7, 4], [7, 3], [7, 2]
		],
		startPoint: {
			red	: [7, 14],
			blue : [14, 9],
			yellow : [9, 2],
			green  : [2, 7] 
		},
	};	
	
	this.players = {
		red : {},
		blue : {},
		green : {},
		yellow : {}
	};
}

Game.prototype.init = function () {

	for(player in this.players) {		
		this.players[player].token = this.board.startPoint[player]; 
	}
	
}

var ludo = new Game();
ludo.init();



//Setup Socket.IO
var io = io.listen(server);

io.enable('browser client minification');  // send minified client
io.enable('browser client etag');          // apply etag caching logic based on version number
io.enable('browser client gzip');          // gzip the file
//io.set('log level', 1);                    // reduce logging
io.set('transports', [                     // enable all transports (optional if you want flashsocket)
    'websocket'
  , 'flashsocket'
  , 'htmlfile'
  , 'xhr-polling'
  , 'jsonp-polling'
]);

io.sockets.on('connection', function(socket){
    
    socket.emit("tokenLocations", {
		red : ludo.players.red.token,
		blue: ludo.players.blue.token,
		yellow: ludo.players.yellow.token,
		green : ludo.players.green.token
	});
	
	socket.on("request spot", function () {
		//Check if free space 
		for(player in ludo.players) {
			if(ludo.players[player].socket == undefined || ludo.players[player].socket == socket.id) {
				ludo.players[player].socket = socket.id;
				socket.set("player", player, function () {
					socket.emit("Assign player", player);
				});
				break;
			}
			else {
				console.log(player, "is not free");
			}
		}
		
		console.log(ludo.players)
	});
	
	socket.on("moveTo", function(data){
		var cord = data.cord,
			token = data.token;
		
		ludo.players[token].token = cord;	
		io.sockets.emit("moveTo", data);
	});
	
	socket.on("ping", function(fn){
		fn();
	});

	socket.on('disconnect', function () {
		
	    socket.get("player", function (err, player){
			console.log(player, "is now free");

			if(!err && player != undefined) {
				
				ludo.players[player].socket = undefined;
				io.sockets.emit("free spot");
			}
		});
	});

});


///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////

/////// ADD ALL YOUR ROUTES HERE  /////////

server.get('/', function(req,res){
  res.render('index.jade', {
    locals : { 
              title : 'Ludo Kingdom'
             ,description: 'This is about ludo kingdom'
             ,author: 'Kenrick Beckett'
             ,analyticssiteid: 'XXXXXXX' 
            }
  });
});


server.get('/game', function(req,res){
  res.render('game.jade', {
    locals : {
	        title : 'Ludo Kingdom'
            ,description: 'This is about ludo kingdom'
            ,author: 'Kenrick Beckett'
			,text: 'say somthing!'
	
    }
  });
});



//A Route for Creating a 500 Error (Useful to keep around)
server.get('/500', function(req, res){
    throw new Error('This is a 500 Error');
});

//The 404 Route (ALWAYS Keep this as the last route)
server.get('/*', function(req, res){
    throw new NotFound;
});

function NotFound(msg){
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}


console.log('Listening on http://0.0.0.0:' + port );
