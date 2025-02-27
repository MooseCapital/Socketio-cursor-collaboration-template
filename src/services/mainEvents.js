const { mainMiddleware } = require("./middleware");
module.exports = { mainEvents };

/* client latency to server ping test
setInterval(() => {
  const start = Date.now();

  socket.emit("ping", () => {
    const duration = Date.now() - start;
    console.log(duration);
  });
}, 1000);


*/

//ideally connections would be stored in redis not a variable
function mainEvents(io) {
    let userConnections = 0;

    mainMiddleware(io);

    io.on("connection", (socket) => {
        isDevMode(socket);
        socket.on("ping", getPing);
        socket.on("user:get", getUser);
    });
}

//dev mode connection test
function isDevMode(socket) {
    if (process.env.NODE_ENV === "development") {
        console.log(`${socket.id} connected, in dev mode`);
    } else {
        console.log("not in dev mode");
    }
}

function getPing(callback) {
    callback();
}

function getUser(socket) {
    console.log(socket.id);
}
