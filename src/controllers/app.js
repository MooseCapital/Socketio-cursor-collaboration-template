const { mainEvents } = require("../services/mainEvents");
const { loadTestEvents } = require("../services/loadTestEvents");
const { mainMiddleware } = require("../services/middleware");
const { logDevMode } = require("../utils/allUtils");
module.exports = { appSetup };

function appSetup(io) {
    //test if passing connections works since it passes by value, and mainEvents
    //may not change the value here, so we may have to use object reference
    // let userConnections = 0; let loadTestConnections = 0;
    const connectionsObj = { userConnections: 0, loadTestConnections: 0 };

    mainMiddleware(io);
    io.on("connection", (socket) => {
        logDevMode(socket);
        mainEvents(io, socket, connectionsObj);
        //other events..
    });

    // loadtest path setup
    const loadTestNamespace = io.of("/test");
    loadTestNamespace.on("connection", (socket) => {
        loadTestEvents(io, socket, connectionsObj);
    });
}
