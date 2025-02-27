const { mainMiddleware } = require("./middleware");
module.exports = { mainEvents };
let userConnections = 0;
//ideally connections would be stored in redis not a variable
function mainEvents(io, socket, connectionsOjb) {
    connectionsOjb.userConnections++;

    socket.on("ping", getPing);
    // socket.on("user:get", getUser);
}

function getPing(callback) {
    callback();
}

/* function getUser(socket) {
    console.log(socket.id);
} */

/* client latency to server ping test
setInterval(() => {
  const start = Date.now();

  socket.emit("ping", () => {
    const duration = Date.now() - start;
    console.log(duration);
  });
}, 1000);


*/
