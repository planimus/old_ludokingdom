game = require './game.js'

class SocketManager

	constructor: (@sockets) ->

		@sockets.on "connection", (socket) ->
			console.log socket.id, "connected"
			socket.emit("ready")

		return @sockets



class GameManager

	allGames: {}

	constructor: (@sockets) ->

		@sockets.on "connection", (socket) =>			
			console.log "connected to the game manager"

			socket.on "join game", (data, func) =>
				@joinGame(data.name, socket)
				func()

			socket.on "request games list", (callback) =>
				callback @listGames()

	createGame: (name) =>
		@allGames[name] = game.createGame(name)

	joinGame: (gameName, socket) =>
		@allGames[gameName].join socket

	listGames: =>
		names = []
		for name, game of @allGames
			console.log game
			names.push name

		return names



				   

exports.sockets = (sockets) ->
	new SocketManager(sockets)

exports.games = (sockets) ->
	new GameManager(sockets)