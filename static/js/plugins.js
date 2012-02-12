window.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){arguments.callee=arguments.callee.caller;var a=[].slice.call(arguments);(typeof console.log==="object"?log.apply.call(console.log,console,a):console.log.apply(console,a))}};
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());



(function( $ ){
  
 //SAFE GLOBALS
 $.ludo = {
	mainPath : [
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
	center : [
		[7, 7], [8, 7], [9, 7],
		[7, 8], [8, 8], [9, 8],
		[7, 9], [8, 9], [9, 9]
	],
	heavenPoint : {
		red :[ [8,14],[8,13],[8,12],[8,11],[8,10] ],
		blue :[ [14,8],[13,8],[12,8],[11,8],[10,8] ],
		green :[ [2,8],[3,8],[4,8],[5,8],[6,8] ],
		yellow :[ [8,2],[8,3],[8,4],[8,5],[8,6] ],
		
	},
	startPoint: {
		red	: [7, 14],
		blue : [14, 9],
		yellow : [9, 2],
		green  : [2, 7] 
	},
	playerAreas: {
		green	: [1, 1],
		yellow  : [10, 1], 
		red 	: [1, 10],
		blue 	: [10, 10]
	},
	ping : function() {
		var start = (new Date).getTime();
	
		$.ludo.socket.emit("ping", function() {
		 	var diff = (new Date).getTime() - start;
		
			log("ping", diff + "ms");
		});
		
	},		
	
 }


 //Creates the board
 var boardMethods = {
 	   init : function( options ) { 
            var fragment = document.createDocumentFragment()
			  , self = $(this);
			
			var start = (new Date).getTime();
	      	fragment.appendChild(self.board("createGridLinesOverlay")[0]);
			fragment.appendChild(self.board("createBoxOverlay")[0]);
			self.append(fragment);
			var diff = (new Date).getTime() - start;
		
			log("created board in", diff + "ms");
			
			self.delegate(".path", "click", function() {
				var x = parseInt($(this).attr("data-x")),
				    y = parseInt($(this).attr("data-y"));
				if($.ludo.player != undefined) {
					$.ludo.socket.emit("moveTo", {token: $.ludo.player, cord : [ x, y] });
				}
			});
			
			
	    },
	    createBoxOverlay : function( ) {
	       	var self = boardMethods, 
			line = 1,
			lineDiv = $("<div />", {
				id : "line" +  line,
				class : "line"
			}),
			boxOverlay = $("<div />", {
				id : "boxOverlay",
				"class" : "boardOverlay",
			}),
			count = 0;

			for (var i = 0; i < 225; i++) {
				
				   
				if(count % 15 === 0 && count > 0 ){
					
					count = 0;
					line += 1;
					
					boxOverlay.append(lineDiv);
										
					lineDiv = $("<div />", {
						id : "line" +  line,
						class : "line"
					});
				}

				count++;
				
				var cord = {
					x	: count,
					y	: line
				};

				var cordinate = cord.x + ", " + cord.y;

				var id = "x" + cord.x + "y" + cord.y;
				var	box = $("<div />", {
						'id' : id, 
						'class' : "box", 
						'data-x' : cord.x, 
						'data-y' : cord.y,
						'line'   : line,
					});
					

					lineDiv.append(box);
					
				if(line == 15 && count == 15)
					boxOverlay.append(lineDiv);
					
			};
			boxOverlay = self.markBoxes(boxOverlay);
			
			return boxOverlay;
			
	    },
	    createGridLinesOverlay : function( ) { 
			var lines = $("<div />", {
				id : "gridLinesOverlay",
				"class" : "boardOverlay"
			}); 	
			for (var i = 1; i <= 14; i++) {
				var horizontalLine = $("<div />",{
					id : "hl" + i,
					"class" : "hLine",
				});
				
				var verticalLine =  $("<div />",{
					id : "vl" + i,
					"class" : "vLine",
				});
				
				horizontalLine.css("top", (6.667 * i) + "%");
				verticalLine.css("left", (6.667 * i) + "%");
				
				lines.append(horizontalLine);
				lines.append(verticalLine);

			}
			
			return lines;
			
	    },
	    markBoxes : function(boxOverlay) { 
	        var self = boardMethods;
			//Match Path 
			for (var i = 0; i < $.ludo.mainPath.length; i++)
			{
				var x = $.ludo.mainPath[i][0],
					y = $.ludo.mainPath[i][1];

				$(boxOverlay).find("#x" + x + "y" + y ).addClass("path");
	
			}
			
			
			//Match Center 
			for (var i = 0; i < $.ludo.center.length; i++)
			{
				var x = $.ludo.center[i][0],
					y = $.ludo.center[i][1];

				$(boxOverlay).find("#x" + x + "y" + y ).addClass("center");
	
			}
			
			
			$.each($.ludo.playerAreas, function(player, areaPoint){

				var area = self.determineArea(areaPoint);

				$.each(area, function(index, path){

					var x = path[0],
						y = path[1];

					$(boxOverlay).find("#x" + x + "y" + y ).addClass(player + " player_area");

				});


			});
			
			$.each($.ludo.heavenPoint, function(player, points){
				
				for (var i = 0; i < points.length; i++)
				{
					var x = points[i][0],
						y = points[i][1];

					$(boxOverlay).find("#x" + x + "y" + y ).addClass(player);

				}	

			});
			
			
			$.each($.ludo.startPoint, function(player, point){

				var x = point[0],
					y = point[1];

				$(boxOverlay).find("#x" + x + "y" + y ).addClass(player);


			});
			
		   return boxOverlay;	
	    },
	
		determineArea : function(startPoint){
			var area = new Array();

			for (var y = startPoint[1]; y <= startPoint[1] + 5; y++) {

				for (var x = startPoint[0]; x <= startPoint[0] + 5; x++) {
					area.push([x, y]);
				};

			};

			return area;

		},
  };

  $.fn.board = function( method ) {

   	 // Method calling logic
	    if ( boardMethods[method] ) {
	      return boardMethods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	      return boardMethods.init.apply( this, arguments );
	    } else {
	      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
	    }    

  };


  $.fn.animateTo = function() {
	
	    if(arguments.length == 1)
	    {
			cord = arguments[0];
			callback = function(){};
	    }
		var left = (cord[0] - 1) * 6.69;
		var top = (cord[1] - 1) * 6.67;

		$(this).animate({ left : left + "%", top : top + "%"}, 500, function(){
			callback();
		});

  };

  $.fn.jumpTo = function( cord ) {

		var left = (cord[0] - 1) * 6.69;
		var top = (cord[1] - 1) * 6.67;

		$(this).css({ left : left + "%", top : top + "%"})
  };


})( jQuery );



