###
	Will handle all user input events and UI details
###

class Render

	constructor : -> 
		@main = $("#main")
		@viewCache = {}

	createBoard : (@paths) -> 

		boardEl = $ "<div />", id : "board"
		@overlay = $ "<div />", id : "overlay", class : "boardOverlay"

		@overlay = @createGridLinesOverlay(@overlay)
		@overlay = @createBoxOverlay(@overlay)
		@overlay = @createTeamArea(@overlay)

		boardEl.append @overlay

		@main.append boardEl

	createBoxOverlay: (board) ->
		line = 1
		lineDiv = $ "<div />",  id : "line#{line}", class : "line"
		boxOverlay = board	
		count = 0
		teamAreas = {}
		
		for t, points of @paths.teamAreas
			team = t	
			for point in @determineArea(points)
				teamAreas["x#{point[0]}y#{point[1]}"] = 
					cord: point
					team: team

				
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

	createGridLinesOverlay : (board) -> 
		lines = board
		for i in [1..14]
			horizontalLine = $ "<div />", id : "hl" + i, "class" : "hLine"
			verticalLine =  $ "<div />", id : "vl" + i, "class" : "vLine"
			
			spacing = 6.667 * i
			
			horizontalLine.css "top", "#{spacing}%"
			verticalLine.css "left", "#{spacing}%"
			
			lines.append horizontalLine
			lines.append verticalLine

			
		return lines

	createTeamArea : (board) -> 
		areas = board
		for team, point of @paths.teamAreas
			area = $ "<div />", id : "#{team}_area" , "class" : "team_area"
			areas.append area

		return areas	
		
	determineArea : (startPoint) ->
		area = []
		for y in [startPoint[1]..(startPoint[1] + 5)]
			for x in [startPoint[0]..(startPoint[0] + 5)]
				area.push([x, y]);
		return area;


	showAvaliableGames: (games) =>
		console.log games
		@view "gameList", "games" : games, (html) =>
			@main.append html 	


	requestName: (callback) ->
		name = null 
		template =  '<div class="modal-header">
					    <h3>What should we call yah</h3>
				  	</div>
				  	<div class="modal-body">
				    	<form class="well">
							  <label>Your Name</label>
							  <input type="text" id="your_name" class="span3" placeholder="Type it here">
							  <span class="help-inline">:)</span>	
							  <p><button id="request_name" type="submit" class="btn">Save</button><p>
						</form>
				  	</div>'

		modal = @createModalIfNone()
		modal.html template
		modal.modal "show"

		$("#request_name").click (e) ->
			e.preventDefault()
			name = $("#your_name").val()
			if name?
				modal.modal "hide"
			return false

		modal.on "hide", ->
			console.log name
			callback(name)
			
	createModalIfNone: =>
		if @elementExists $ "#modal"
			modal = $ "#modal"
		else
			modal = $ "<div />",  id : "#modal", class: "modal fade"
			modal.modal
				keyboard: false
				show: false	
			$("body").append modal

		return modal

	view: (template, view, callback) =>
		if @viewCache[template]?
			console.log "loading from cache"
			processed = Mustache.render @viewCache[template], view
			callback processed
		else	
			$.get "views/#{template}.html", (templateHtml) =>
				console.log "requesting over http request"
				@viewCache[template] = templateHtml
				processed = Mustache.render templateHtml, view
				callback processed
			
	elementExists: (el) ->
		return false
		return true if el.lenght isnt 0	



			