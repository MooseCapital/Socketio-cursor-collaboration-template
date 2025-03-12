export { mainEvents };

//ideally connections would be stored in redis not a variable
//if event is more than 2 lines, move to its own function, personal preference
function mainEvents(io, socket, connectionsOjb, mainUsers) {
    connectionsOjb.userConnections++;
    //emit to everyone
    io.emit("connections", connectionsOjb.userConnections);

    socket.on("message", (data) => message(data, socket));

    socket.on("latency", (start) => {
        socket.emit("latency", Date.now() - start);
    });

    socket.on("newUser", (userData) => {
        const { id, cursorColor, cursorRGBA, flag, countryCode, region } = userData;
        console.log(`new user ${id}, typeof: ${typeof userData}`);
        mainUsers[socket.id] = userData;
        socket.broadcast.emit("newUser", userData);
        console.log(mainUsers);
    });
    // socket.on("connections", () => connections(connectionsOjb, socket));
    socket.on("disconnect", () => {
        console.log(`${socket.id.slice(0, 5)} disconnected`);
        console.log(typeof connectionsOjb.userConnections, connectionsOjb.userConnections);
        connectionsOjb.userConnections--;
        io.emit("connections", connectionsOjb.userConnections);
        //emit remove user event, remove from mainUsers
        io.emit("removeUser", mainUsers[socket.id].id);
        delete mainUsers[socket.id];
        console.log(mainUsers);
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
