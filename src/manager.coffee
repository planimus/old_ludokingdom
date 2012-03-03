game = require './game.js'
uuid = require 'node-uuid'

shortcode = ->
	code = uuid.v4()
	short = code.split "-"
	return short[1]


class SocketManager

	constructor: (@sockets) ->

		@sockets.on "connection", (socket) =>
			 socket.get "playerName", (error, playerName) =>   
			     if !playerName?
			        socket.emit "request player name", (name) =>
				          socket.set("playerName", name)
				          console.log("new player created called: #{name}")
			     else
			      	console.log playerName


		return @sockets



class GameManager

	allGames: {}

	constructor: (@sockets) ->

		@sockets.on "connection", (socket) =>			
			console.log "connected to the game manager"

			socket.on "join game", (data, func) =>
				@joinGame data.name, socket
				func()

			socket.on "request games list", (callback) =>
				callback @listGames()

	createGame: (name) =>
		id = shortcode()
		console.log "#{id} : #{name}"
		@allGames[id] = game.createGame id, name

	joinGame: (gameName, socket) =>
		@allGames[gameName].join socket

	listGames: =>
		names = []
		for name, game of @allGames
			names.push game.name

		return names



				   

exports.sockets = (sockets) ->
	new SocketManager(sockets)

exports.games = (sockets) ->
	new GameManager(sockets)