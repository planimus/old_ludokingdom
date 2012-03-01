var Game, app, config, express, games, io, routes, siteGlobals, sockets,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Game = (function() {

  Game.prototype.players = {};

  function Game(name) {
    this.name = name;
    this.bindGameEvents = __bind(this.bindGameEvents, this);
    this.join = __bind(this.join, this);
    console.log("Game created called " + this.name + " ");
  }

  Game.prototype.join = function(socket) {
    console.log("new user Joined");
    this.players["" + socket.id] = {
      type: "player",
      location: 0
    };
    return this.bindGameEvents(socket);
  };

  Game.prototype.bindGameEvents = function(socket) {
    return socket.on("moved", function(location) {
      return this.players[socket.id].location = location;
    });
  };

  return Game;

})();

express = require('express');

routes = require('./routes');

config = require('./config.json');

io = require('socket.io');

siteGlobals = {
  css: config.css,
  js: config.js,
  description: "A free online multiplayer board game based on the classic board game ludo.",
  author: "Planimus Games <support@planimus.com>"
};

app = module.exports = express.createServer();

app.configure(function() {
  app.set('views', "" + __dirname + "/views");
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static("" + __dirname + "/public"));
  return app.set('view options', {
    locals: siteGlobals
  });
});

games = {};

games["castle"] = new Game("castle");

sockets = io.listen(app).sockets;

sockets.on("connection", function(socket) {
  socket.emit("ready");
  return socket.on("join game", function(data, func) {
    games[data.name].join(socket);
    return func();
  });
});

app.get('/', routes.index);

app.listen(8081);

console.log("Game server listening on port %d in %s mode", app.address().port, app.settings.env);
