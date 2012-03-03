###
	Manages resources and handles the game logic
###

class Engine

	paths :
		mainPath :
			"7,1": [7, 1] 
			"8,1": [8, 1]
			"9,1": [9, 1]
			"9,2": [9, 2] 
			"9,3": [9, 3] 
			"9,4": [9, 4] 
			"9,5": [9, 5] 
			"9,6": [9, 6]
			"10,7": [10, 7] 
			"11,7": [11, 7] 
			"12,7": [12, 7] 
			"13,7": [13, 7] 
			"14,7": [14, 7]
			"15,7": [15, 7] 
			"15,8": [15, 8] 
			"15,9": [15, 9]
			"14,9": [14, 9] 
			"13,9": [13, 9] 
			"12,9": [12, 9] 
			"11,9": [11, 9] 
			"10,9": [10, 9]
			"9,10": [9, 10] 
			"9,11": [9, 11] 
			"9,12": [9, 12] 
			"9,13": [9, 13] 
			"9,14": [9, 14]
			"9,15": [9, 15] 
			"8,15": [8, 15] 
			"7,15": [7, 15]
			"7,14": [7, 14] 
			"7,13": [7, 13] 
			"7,12": [7, 12] 
			"7,11": [7, 11] 
			"7,10": [7, 10]
			"6,9": [6, 9]
			"5,9": [5, 9]
			"4,9": [4, 9]
			"3,9": [3, 9] 
			"2,9": [2, 9]
			"1,9": [1, 9] 
			"1,8": [1, 8] 
			"1,7": [1, 7]
			"2,7": [2, 7] 
			"3,7": [3, 7] 
			"4,7": [4, 7] 
			"5,7": [5, 7] 
			"6,7": [6, 7]
			"7,6": [7, 6] 
			"7,5": [7, 5] 
			"7,4": [7, 4] 
			"7,3": [7, 3] 
			"7,2": [7, 2]
		center :
			"7,7": [7, 7] 
			"8,7": [8, 7] 
			"9,7": [9, 7]
			"7,8": [7, 8] 
			"8,8": [8, 8] 
			"9,8": [9, 8]
			"7,9": [7, 9] 
			"8,9": [8, 9] 
			"9,9": [9, 9]
		heavenPoint : 
			red :
				"8,14": [8,14]
				"8,13": [8,13]
				"8,12": [8,12]
				"8,11": [8,11]
				"8,10": [8,10]	
			blue :
				"14,8": [14,8]
				"13,8": [13,8]
				"12,8": [12,8]
				"11,8": [11,8]
				"10,8": [10,8] 
			green :
				"2,8": [2,8]
				"3,8": [3,8]
				"4,8": [4,8]
				"5,8": [5,8]
				"6,8": [6,8]
			yellow :
				"8,2": [8,2]
				"8,3": [8,3]
				"8,4": [8,4]
				"8,5": [8,5]
				"8,6": [8,6]
		startPoint: 
			"7,14": 
				cord: [7, 14]
				team: "red"
			"14,9":
				cord: [14, 9]
				team: "blue"
			"9,2": 
				cord: [9, 2]
				team: "yellow"
			"2,7": 
				cord: [2, 7]
				team: "green"
		teamAreas: 
			green	: [1, 1]
			yellow  : [10, 1] 
			red 	: [1, 10]
			blue 	: [10, 10]
	

	constructor : ->
		#instantiate nesscary objects
		@network = new Network()
		@render = new Render()
		@bindEvents()
		
		#perform tasks when the engine is ready 
		@network.connect()
		#@render.createBoard(@paths)
		@displayGames()

	



	bindEvents: =>
		Events["network.request.name"].add @requestName


	requestName: (callback) =>
		@render.requestName (name) ->
			@name = name 
			callback @name 

	displayGames: => 
		@network.requestAvaliableGames (games) =>
			@render.showAvaliableGames games




