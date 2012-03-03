var Game,
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

exports.createGame = function(name) {
  return new Game(name);
};
