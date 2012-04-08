class Player
  constructor: (@socket) ->

    @socket.get "playerName", (error, playerName) =>
      
      if !playerName?
        @socket.emit "request player name", (name) =>
          @socket.set("playerName", name)
          @name = name
          console.log("new player created called: #{@name}")
      else
        @name = playerName
        console.log "playerName is: #{@name}"

class Game
  players: {}

  constructor: (@id, @name) ->

  join: (socket) =>
  
    @players["#{socket.id}"] = new Player(socket)
    
    @bindGameEvents(socket)

  bindGameEvents: (socket) =>
    socket.on "moved", (location) ->
      @players[socket.id].location = location

  getName: =>
    return @name


exports.createGame = (id, name) ->
  return new Game(id, name)
