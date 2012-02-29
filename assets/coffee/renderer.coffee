###
	Will handle all user input events and UI details
###

class Render

	constructor : -> console.log("view ready")

	createBoard : (@paths) -> 
		boardEl = $("#board")

		boardEl.append @createBoxOverlay()

	createBoxOverlay: ->
		line = 1
		lineDiv = $ "<div />",  id : "line#{line}", class : "line"
		boxOverlay = $ "<div />", id : "boxOverlay", class : "boardOverlay"
		count = 0
		teamAreas = {}
		
		for t, points of @paths.teamAreas
			team = t	
			for point in @determineArea(points)
				teamAreas["x#{point[0]}y#{point[1]}"] = 
					cord: point
					team: team

		console.log teamAreas
				
		for i in [0..225]

			if count % 15 is 0 and count > 0 
				count = 0
				line += 1
				boxOverlay.append lineDiv					
				lineDiv = $ "<div />",  id : "line#{line}", class : "line"

			count++
			cord = 
				x	: count,
				y	: line
			
			cordinate = "#{cord.x},#{cord.y}"
			id = "x#{cord.x}y#{cord.y}"
			box = $ "<div />", 
				'id' : id, 
				'class' : "box", 
				'data-x' : cord.x, 
				'data-y' : cord.y,
				'line'   : line,

			box.addClass "path" if cordinate of @paths.mainPath
			box.addClass "center" if cordinate of @paths.center

			if cordinate of @paths.startPoint
				box.addClass @paths.startPoint[cordinate].team

			if id of teamAreas
				box.addClass teamAreas[id].team

			for team, paths of @paths.heavenPoint
				box.addClass team if cordinate of paths


			
			lineDiv.append box
			
			boxOverlay.append lineDiv if line is 15 and count is 15

		return boxOverlay


	determineArea : (startPoint) ->
		area = []
		for y in [startPoint[1]..(startPoint[1] + 5)]
			for x in [startPoint[1]..(startPoint[1] + 5)]
				area.push([x, y]);
		return area;

	



			