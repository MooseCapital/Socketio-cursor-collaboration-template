module.exports = { logDevMode };

//dev mode connection test
function logDevMode(socket) {
    if (process.env.NODE_ENV === "development") {
        console.log(`${socket.id} connected, in dev mode`);
    } else {
        console.log("not in dev mode");
    }
}
