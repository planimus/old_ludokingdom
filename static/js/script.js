/* 

 No. of Box on Board : 15 x 15  

*/

var socket = undefined;

$(function(){
	socket = io.connect();
	
	socket.on("connect", function(){
		log("connected to the server");
		
		socket.on('moveTo', function (data) {
	     	var cord = data.cord,
				token = data.token;
			
			animateTo($("#" + token), cord, function(){
				
			
			});	
				
			
	    });
		
	});

	//Define Paths
	
	var mainPath = [
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
			[7, 6], [7, 5], [7, 4], [7, 3], [7, 2]];
			
	var center = [
			[7, 7], [8, 7], [9, 7],
			[7, 8], [8, 8], [9, 8],
			[7, 9], [8, 9], [9, 9]
	];
	
	var startPoint = {
		red	: [7, 14],
		blue : [14, 9]
	};
	
	var playerAreas = {
			green	: [1, 1],
			yellow  : [10, 1], 
			red 	: [1, 10],
			blue 	: [10, 10]
	};		
	
	
	//Create Board
	var line = 1,
		count = 0;
	for (var i=0; i < 225; i++) {
		
		if(count % 15 === 0 && count > 0 ){
			count = 0;
			line += 1;
		}
		
		count++;
		var cord = {
			x	: count,
			y	: line
		};
		
		var cordinate = cord.x + ", " + cord.y;
		
		var id = cord.x + "-" + cord.y;
			boxHtml = "<div id='"+ id +"' data-x='"+ cord.x +"' data-y='"+ cord.y +"' class='box'> <span></span> </div>";
		
		$("#board").append(boxHtml);
		
	};
	
	//Label the path with class
	$.each(mainPath, function(index, path){
		
		var x = path[0],
			y = path[1];
			
		$("#" + x + "-" +  y).addClass("path");	
			
	});
	
	//Label the center
	$.each(center, function(index, path){
		
		var x = path[0],
		y = path[1];
			
		$("#" + x + "-" +  y ).addClass("center");
		
	});
	
	//Determine where the user areas are :
	function determineArea(startPoint){
		var area = new Array();
		
		for (var y = startPoint[1]; y <= startPoint[1] + 5; y++) {
			
			for (var x = startPoint[0]; x <= startPoint[0] + 5; x++) {
				area.push([x, y]);
			};
			
		};
		
		return area;
		
	}
	
	$.each(playerAreas, function(player, areaPoint){
		
		var area = determineArea(areaPoint);
		
		$.each(area, function(index, path){
			
			var x = path[0],
				y = path[1];

			$("#" + x + "-" +  y).addClass(player);
			
		});
		
		
	});	

	
	//Animmate around the board
	function animateTo(token ,cord, callback){

		//derive the position
		var left = (cord[0] - 1) * 40;
		var top = (cord[1] - 1) * 40;

		token.animate({ left : left + "px", top : top + "px"}, 500, function(){
			callback();
		}) 
	}
	


	function around(loc){
		var black = $("#black");
		if(loc != mainPath.length - 1)
			loc = loc + 1;
		else
			loc = 0;
		
		
		var cord = mainPath[loc];
		animateTo(black, cord, function(){
			around(loc)
		});

	}


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
	
	
	animateTo($("#token1"), startPoint.red, function(){});
	
	$(".box").click(function(){
		var x = parseInt($(this).attr("data-x")),
			y = parseInt($(this).attr("data-y"));
		
		socket.emit("moveTo", {token: "token1", cord : [ x, y] });
	});
	
});	









