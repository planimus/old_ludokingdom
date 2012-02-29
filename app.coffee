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



sockets = io.listen(app).sockets

sockets.on "connection", (socket) ->
  console.log "we are ready2"
  socket.emit("ready")

app.get '/', routes.index;
 
app.listen(8081);
console.log("Game server listening on port %d in %s mode", app.address().port, app.settings.env);
