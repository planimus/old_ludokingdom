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
			console.log "connected to game server"
			Events["network.connected"].fire()

		@socket.on "ready", @onReady
			
	onReady: =>
		@joinGame()

	joinGame: =>
		console.log("joining castle")
		@socket.emit "join game", name: "castle", ->
			console.log("joined castle")




