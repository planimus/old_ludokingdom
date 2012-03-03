#Network.js
###
	Handles the state and data transfer between the server and the client.
###
class Network

	constructor: ->	

	connect: => 
		@socket = io.connect()
		@bindEvents()
	
	bindEvents: =>
		@socket.on "connect", ->
			Events["network.connected"].fire()

		@socket.on "ready", @onReady

		@socket.on "request player name", (fn) ->
			Events["network.request.name"].fire(fn)
			
			
	onReady: =>
		#@joinGame()

	joinGame: =>
		@socket.emit "join game", name: "castle", ->
			console.log("joined castle")

	requestAvaliableGames: (callback) =>
		@socket.emit "request games list", (games) ->
			callback(games)



