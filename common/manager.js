var GameManager, SocketManager, game, shortcode, uuid,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

game = require('./game.js');

uuid = require('node-uuid');

shortcode = function() {
  var code, short;
  code = uuid.v4();
  short = code.split("-");
  return short[1];
};

SocketManager = (function() {

  function SocketManager(sockets) {
    var _this = this;
    this.sockets = sockets;
    this.sockets.on("connection", function(socket) {});
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
    var id;
    id = shortcode();
    console.log("" + id + " : " + name);
    return this.allGames[id] = game.createGame(id, name);
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
      names.push(game.name);
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
