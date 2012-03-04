###
	Manages resources and handles the game logic
###
class Token

	constructor: (@team, @id, @render) ->
		@position = 2

		@el = @render.createToken @team, @id, =>
			min = 1
			max = 6
			oldPosition = @position
			random = Math.floor(Math.random() * (max - min + 1)) + min
			@position += random
			if @position > @render.paths.mainPathArray.length
				diff =  @position - @render.paths.mainPathArray.length
				@position = diff

			@walkTo @render.paths.mainPathArray[oldPosition], @render.paths.mainPathArray[@position]
			

	
	animateTo: (cord) ->
		@render.animateTokenTo(@el, cord)

	walkTo: (cordStart, cordEnd) =>
		#map out full path
		currPosition = @render.paths.mainPathStrings.indexOf "#{cordStart[0]},#{cordStart[1]}"
		endPosition = @render.paths.mainPathStrings.indexOf "#{cordEnd[0]},#{cordEnd[1]}"
		queue = []
		queueStart = currPosition
		path = []

		if currPosition > endPosition
			reset = false
			len = @render.paths.mainPathArray.length - currPosition + endPosition 

			for i in [0..len]

				pos = currPosition + i if reset is false
				pos += 1 if reset

				if pos is @render.paths.mainPathArray.length
					reset = true
					pos = 0

				if i is len
					queue.push [queueStart, pos]
				else if @render.animationBreakPoints.indexOf("#{@render.paths.mainPathStrings[pos]}") > -1
					if i is currPosition

					else	 
						queue.push [queueStart, pos]
						queueStart = pos	
		

		else	
			for i in [currPosition..endPosition]

				if i is endPosition
					queue.push [queueStart, i]
				else if @render.animationBreakPoints.indexOf("#{@render.paths.mainPathStrings[i]}") > -1
					if i is currPosition

					else	 
						queue.push [queueStart, i]
						queueStart = i		
						
				path.push @render.paths.mainPathArray[i]

			
		for x in queue
			@animateTo(@render.paths.mainPathArray[x[1]])

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
		#some stuff im regretting
		@paths.mainPathArray = @toArray @paths.mainPath
		@paths.mainPathStrings = @arraytoString @paths.mainPathArray

		#instantiate nesscary objects
		@network = new Network()
		@render = new Render()
		@bindEvents()
		
		@tokens = {}
		#perform tasks when the engine is ready 
		@network.connect()
		@render.createBoard(@paths)
		#@displayGames()

		@tokens["red1"] = new Token("red", 1 , @render)

		@tokens["red1"].animateTo @paths.mainPathArray[2]
	



	bindEvents: =>
		Events["network.request.name"].add @requestName


	requestName: (callback) =>
		@render.requestName (name) ->
			@name = name 
			callback @name 

	displayGames: => 
		@network.requestAvaliableGames (games) =>
			@render.showAvaliableGames games

	toArray: (obj) ->
		array = []
		for key, value of obj
			array.push value
		return array

	arraytoString: (array) ->
		array2 = []
		for x in array
			array2.push "#{x[0]},#{x[1]}"
		return array2



