var GameManager, SocketManager, game,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

game = require('./game.js');

SocketManager = (function() {

  function SocketManager(sockets) {
    this.sockets = sockets;
    this.sockets.on("connection", function(socket) {
      console.log(socket.id, "connected");
      return socket.emit("ready");
    });
    return this.sockets;
  }

  return SocketManager;

})();

GameManager = (function() {

  GameManager.prototype.allGames = {};

  function GameManager(sockets) {
    var _this = this;
    this.sockets = sockets;
    this.listGames = __bind(this.listGames, this);
    this.joinGame = __bind(this.joinGame, this);
    this.createGame = __bind(this.createGame, this);
    this.sockets.on("connection", function(socket) {
      console.log("connected to the game manager");
      socket.on("join game", function(data, func) {
        _this.joinGame(data.name, socket);
        return func();
      });
      return socket.on("request games list", function(callback) {
        return callback(_this.listGames());
      });
    });
  }

  GameManager.prototype.createGame = function(name) {
    return this.allGames[name] = game.createGame(name);
  };

  GameManager.prototype.joinGame = function(gameName, socket) {
    return this.allGames[gameName].join(socket);
  };

  GameManager.prototype.listGames = function() {
    var game, name, names, _ref;
    names = [];
    _ref = this.allGames;
    for (name in _ref) {
      game = _ref[name];
      console.log(game);
      names.push(name);
    }
    return names;
  };

  return GameManager;

})();

exports.sockets = function(sockets) {
  return new SocketManager(sockets);
};

exports.games = function(sockets) {
  return new GameManager(sockets);
};
