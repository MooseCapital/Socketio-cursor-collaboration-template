const { mainMiddleware } = require("./middleware");
module.exports = { mainEvents };

function mainEvents(io) {
    //ideally connections would be stored in redis not a variable
    let userConnections = 0;

    mainMiddleware(io);

    io.on("connection", (socket) => {
        //dev mode connection test
        if (process.env.NODE_ENV === "development") {
            console.log(`${socket.id} connected, in dev mode`);
        } else {
            console.log("not in dev mode");
        }

        socket.on("ping", (callback) => {
            callback();
        });
    });
}

/* client latency to server ping test
setInterval(() => {
  const start = Date.now();

  socket.emit("ping", () => {
    const duration = Date.now() - start;
    console.log(duration);
  });
}, 1000);


*/
