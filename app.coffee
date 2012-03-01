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

express = require 'express'
routes = require './routes'
config = require './config.json'
io = require 'socket.io'

siteGlobals = 
	css : config.css
	js 	: config.js
	description : "A free online multiplayer board game based on the classic board game ludo."
	author:	"Planimus Games <support@planimus.com>"


app = module.exports = express.createServer();

app.configure ->
  app.set 'views', "#{__dirname}/views"
  app.set 'view engine', 'jade'
  app.use express.bodyParser() 
  app.use express.methodOverride()
  app.use app.router
  app.use(express.static("#{__dirname}/public"));
  app.set 'view options', locals: siteGlobals

games = {}

games["castle"] = new Game("castle")


sockets = io.listen(app).sockets

sockets.on "connection", (socket) ->
  socket.emit("ready")

  socket.on "join game", (data, func) ->
    games[data.name].join socket 
    func()  

app.get '/', routes.index;
 
app.listen(8081);
console.log("Game server listening on port %d in %s mode", app.address().port, app.settings.env);
