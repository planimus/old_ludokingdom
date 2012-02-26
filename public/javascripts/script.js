/* 

 No. of Box on Board : 15 x 15  

*/

$(function(){
	
	$.ludo.socket = io.connect();
	
	$.ludo.socket.on("connect", function (){
		log("connected to the server");
		$("#board").board();	
		
		$.ludo.socket.on("tokenLocations", function (tokens) {
			if($.ludo.present === undefined) {
				$.each(tokens, function (token, coord) {
					var token = $("<div />", {
						html : "<img class='token-img' src='/img/"+ token +".png' />", 
						class : "token",
						id : token + "token", 
					});
					token.jumpTo(coord);
					$("#board").append(token)
				});
			}
			$.ludo.present = true;
			$.ludo.socket.emit("request spot");

		});
		
		$.ludo.socket.on('Assign player', function (player) {
	     	$.ludo.player = player;
			log("You are now", player);
	    });
		
		$.ludo.socket.on('moveTo', function (data) {
	     	var cord = data.cord,
				token = data.token;
			
			$("#" + token + "token").animateTo(cord);	
	    });
	
		$.ludo.socket.on("free spot", function () {
			if($.ludo.player === undefined)
			{
				$.ludo.socket.emit("request spot");
			}
		}); 
		
		$.ludo.socket.on("disconnect", function () {
			$.ludo.player == undefined;
			log("you have been disconnected");
		});
		
	});
	
});	









