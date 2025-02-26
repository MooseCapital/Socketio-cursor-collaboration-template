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
            console.log("not in dev mode, using / namespace");
        }

        socket.on("ping", (callback) => {
            callback();
        });
    });
}
