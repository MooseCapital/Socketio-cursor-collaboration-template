module.exports = { loadTestEvents };

function loadTestEvents(io) {
    let loadTestConnections = 0;

    const loadTestNamespace = io.of("/test");

    loadTestNamespace.use((socket, next) => {
        // testMiddleware(socket, next)
        next();
    });

    loadTestNamespace.on("connection", (socket) => {
        console.log(`${socket.id} connected, in test mode`);
        loadTestConnections++;

        if (loadTestConnections % 50 === 0) {
            console.log("user connections:", loadTestConnections);
        }

        socket.on("message", (data) => {
            socket.emit("message", data);
        });

        socket.on("disconnect", () => {
            loadTestConnections--;
            if (loadTestConnections % 50 === 0) {
                console.log("user leaving connections:", loadTestConnections);
            }
        });
    });
}
