/* 

 No. of Box on Board : 15 x 15  

*/

$(function(){
	
	$.ludo.socket = io.connect();
	
	$.ludo.socket.on("connect", function(){
		log("connected to the server");
		
		$.ludo.socket.on('moveTo', function (data) {
	     	var cord = data.cord,
				token = data.token;
			
			$("#" + token).animateTo(cord);	
			
			log(data);
	    });
		
	});
	
	$("#board").board();
	
	var token = $("<div />", {
		html : "<img class='token-img' src='/img/red.png' />", 
		class : "token",
		id : "token3", 
	});
	
	token.jumpTo($.ludo.startPoint.red);
	
	$("#board").append(token)
	


/*
	$("#7-14").css("background-color", "#da251c");
	$("#8-14").css("background-color", "#da251c");
	$("#8-13").css("background-color", "#da251c");	
	$("#8-12").css("background-color", "#da251c");
	$("#8-11").css("background-color", "#da251c");
	$("#8-10").css("background-color", "#da251c");
	
	
	
	
	$("#14-9").css("background-color", "#0093dd");
	$("#14-8").css("background-color", "#0093dd");
	$("#13-8").css("background-color", "#0093dd");	
	$("#12-8").css("background-color", "#0093dd");
	$("#11-8").css("background-color", "#0093dd");
	$("#10-8").css("background-color", "#0093dd");
	
	
	
	
	$("#2-7").css("background-color", "#85C226");
	$("#3-8").css("background-color", "#85C226");
	$("#4-8").css("background-color", "#85C226");	
	$("#5-8").css("background-color", "#85C226");
	$("#6-8").css("background-color", "#85C226");
	$("#2-8").css("background-color", "#85C226");
	
	
	
	$("#9-2").css("background-color", "#f8c301");
	$("#8-2").css("background-color", "#f8c301");
	$("#8-3").css("background-color", "#f8c301");	
	$("#8-4").css("background-color", "#f8c301");
	$("#8-5").css("background-color", "#f8c301");
	$("#8-6").css("background-color", "#f8c301");

*/	
	

	

	
});	









