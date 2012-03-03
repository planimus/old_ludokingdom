class Game
  players: {}

  constructor: (@name) -> console.log("Game created called #{@name} ")

  join: (socket) =>
    console.log("new user Joined")
    @players["#{socket.id}"] =
      type: "player"
      location: 0
    
    @bindGameEvents(socket)

  bindGameEvents: (socket) =>
    socket.on "moved", (location) ->
      @players[socket.id].location = location



exports.createGame = (name) ->
  return new Game(name)
