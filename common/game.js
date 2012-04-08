(function() {
  var Game, Player,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Player = (function() {

    function Player(socket) {
      var _this = this;
      this.socket = socket;
      this.socket.get("playerName", function(error, playerName) {
        if (!(playerName != null)) {
          return _this.socket.emit("request player name", function(name) {
            _this.socket.set("playerName", name);
            _this.name = name;
            return console.log("new player created called: " + _this.name);
          });
        } else {
          _this.name = playerName;
          return console.log("playerName is: " + _this.name);
        }
      });
    }

    return Player;

  })();

  Game = (function() {

    Game.prototype.players = {};

    function Game(id, name) {
      this.id = id;
      this.name = name;
      this.getName = __bind(this.getName, this);
      this.bindGameEvents = __bind(this.bindGameEvents, this);
      this.join = __bind(this.join, this);
    }

    Game.prototype.join = function(socket) {
      this.players["" + socket.id] = new Player(socket);
      return this.bindGameEvents(socket);
    };

    Game.prototype.bindGameEvents = function(socket) {
      return socket.on("moved", function(location) {
        return this.players[socket.id].location = location;
      });
    };

    Game.prototype.getName = function() {
      return this.name;
    };

    return Game;

  })();

  exports.createGame = function(id, name) {
    return new Game(id, name);
  };

}).call(this);
