module.exports = { loadTestEvents };

function loadTestEvents(io) {
    
    let loadTestConnections = 0;
    
    const testNamespace = io.of("/test");
    
    /* testNamespace.use((socket, next) => {
        // chatMiddleware(socket, next)
    }); */
    
    testNamespace.on("connection", (socket) => {
        console.log(`${socket.id} connected, in dev mode`);
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

