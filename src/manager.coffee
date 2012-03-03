class SocketManager

	constructor: (@sockets) ->

		@sockets.on "connection", (socket) ->
			console.log socket.id, "connected"
			#socket.emit("ready")

			socket.on "join game", (data, func) ->
				games[data.name].join socket 
				func()



class GameManager

	constructor: (@sockets) ->
		console.log "hi i have sockets now"





				   

exports.sockets = (sockets) ->
	new SocketManager(sockets)