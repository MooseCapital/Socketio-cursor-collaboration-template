export { mainEvents };

//ideally connections would be stored in redis not a variable
//if event is more than 2 lines, move to its own function, personal preference
function mainEvents(io, socket, connectionsOjb, mainUsers, mainPositions) {
    connectionsOjb.userConnections++;
    //emit to everyone
    io.emit("connections", connectionsOjb.userConnections);
    socket.emit("getAllUsers", mainUsers);
    //refactor back to socketio inside mainUsers obj, not its key

    socket.on("message", (data) => message(data, socket));

    socket.on("user:position", (data) => {
        // new users get updated color state from server
        // socket.broadcast.emit("user:position", data);
        mainPositions.push(data);
    });

    socket.on("user:new", (userData) => {
        const { id, cursorColor, cursorRGBA, flag, countryCode, region } = userData;
        console.log(`new user ${id}, typeof: ${typeof userData}, total users: ${connectionsOjb.userConnections}`);
        mainUsers[id] = userData;
        mainUsers[id].socketID = socket.id;

        socket.broadcast.emit("user:new", userData);
        // console.log(mainUsers);
    });

    socket.on("latency", (start) => {
        socket.emit("latency", Date.now() - start);
    });

    socket.on("disconnect", () => {
        connectionsOjb.userConnections--;
        io.emit("connections", connectionsOjb.userConnections);
        //emit remove user event, remove from mainUsers
        const id = Object.keys(mainUsers).find((key) => {
            return mainUsers[key].socketID === socket.id;
        });
        io.emit("user:remove", id);
        delete mainUsers[id];
        console.log(
            `${socket.id.slice(0, 5)} disconnected, users: ${connectionsOjb.userConnections} all users:`,
            mainUsers,
        );
    });

    io.engine.on("connection_error", connectError);
}

function message(data, socket) {
    console.log(socket?.emit);
    socket.emit("message", data?.body);
    console.log(data);
}

function connectError(err) {
    console.log(err.req); // the request object
    console.log(err.code); // the error code, for example 1
    console.log(err.message); // the error message, for example "Session ID unknown"
    console.log(err.context); // some additional error context
}
