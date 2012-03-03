var GameManager, SocketManager;

SocketManager = (function() {

  function SocketManager(sockets) {
    this.sockets = sockets;
    this.sockets.on("connection", function(socket) {
      console.log(socket.id, "connected");
      return socket.on("join game", function(data, func) {
        games[data.name].join(socket);
        return func();
      });
    });
  }

  return SocketManager;

})();

GameManager = (function() {

  function GameManager(sockets) {
    this.sockets = sockets;
    console.log("hi i have sockets now");
  }

  return GameManager;

})();

exports.sockets = function(sockets) {
  return new SocketManager(sockets);
};
