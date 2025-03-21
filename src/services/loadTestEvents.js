export { loadTestEvents };

function loadTestEvents(io, socket, connectionsObj) {
    connectionsObj.loadTestConnections++;

    if (connectionsObj.loadTestConnections % 50 === 0) {
        console.log("user connections:", connectionsObj.loadTestConnections);
    }

    socket.on("message", (data) => {
        // socket.broadcast.emit("message", data);
    });

    socket.on("disconnect", () => {
        connectionsObj.loadTestConnections--;
        if (connectionsObj.loadTestConnections % 50 === 0) {
            console.log("user leaving connections:", connectionsObj.loadTestConnections);
        }
    });
}
