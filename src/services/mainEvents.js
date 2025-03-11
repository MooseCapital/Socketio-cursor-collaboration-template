const { mainMiddleware } = require("./middleware");
module.exports = { mainEvents };

//ideally connections would be stored in redis not a variable
//if event is more than 2 lines, move to its own function, personal preference
function mainEvents(io, socket, connectionsOjb) {
    connectionsOjb.userConnections++;
    socket.emit("connections", connectionsOjb.userConnections);

    socket.on("message", (data) => message(data, socket));

    socket.on("latency", (start) => {
        socket.emit("latency", Date.now() - start);
    });

    // socket.on("connections", () => connections(connectionsOjb, socket));
    socket.on("disconnect", () => disconnect(socket));
    io.engine.on("connection_error", connectError);
}

function message(data, socket) {
    console.log(socket?.emit);
    socket.emit("message", data?.body);
    console.log(data);
}

function connections(connectionsObj, socket) {
    console.log(`connections: ${connectionsObj.userConnections}`);
    socket.emit("connections", connectionsObj.userConnections);
}

function connectError(err) {
    console.log(err.req); // the request object
    console.log(err.code); // the error code, for example 1
    console.log(err.message); // the error message, for example "Session ID unknown"
    console.log(err.context); // some additional error context
}
function disconnect(socket) {
    console.log(`${socket.id.slice(0, 5)} disconnected`);
}
