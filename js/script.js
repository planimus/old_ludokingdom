/* 

 No. of Box on Board : 15 x 15  

*/


$(function(){
	var socket = io.connect('http://localhost');
	
	socket.on("connect", function(){
		log("connected to the server");
		
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
		
		var id = cord.x + "" + cord.y;
			boxHtml = "<div id='"+ id +"' data-x='"+ cord.x +"' data-y='"+ cord.y +"' class='box'>"+ cordinate +"</div>";
		
		$("#board").append(boxHtml);
		
	};
	
	//Label the path with class
	$.each(mainPath, function(index, path){
		
		var x = path[0],
			y = path[1];
			
		$("#" + x + y).addClass("path");	
			
	});
	
	//Label the center
	$.each(center, function(index, path){
		
		var x = path[0],
		y = path[1];
			
		$("#" + x + y).addClass("center");
		
	});
	
	//Determine where the user areas are :
	function determineArea(startPoint){
		var area = new Array();
		
		for (var i = 0; i < 36; i++) {
			
	
			area.push(point); 
			
		};
		
	}
	
	

});	
























