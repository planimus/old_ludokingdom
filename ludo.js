/* 

	Ludo Kingdom 
*/

var Game = {
	
	players : {
		red		: {
			tokens: {
				1 : {},
				2 : {},
				3 : {},
				4 : {}
			}
			
		},
		blue	: {
			tokens: {
				1 : {},
				2 : {},
				3 : {},
				4 : {}
			}
		},
		yellow	: {
			tokens: {
				1 : {},
				2 : {},
				3 : {},
				4 : {}
			}
		}, 
		green	: {
			tokens: {
				1 : {},
				2 : {},
				3 : {},
				4 : {}
			}
		}  
	},
	
	board :{
		path: [
			
		
		];
		
	}
	
};

var io = require('socket.io').listen(80);

io.sockets.on('connection', function (socket) {
 
	socket.on("message", function(data){
		console.log(data);
	});



});
