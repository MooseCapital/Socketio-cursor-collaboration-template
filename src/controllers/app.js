import { loadTestEvents } from "../services/loadTestEvents.js";
import { mainEvents } from "../services/mainEvents.js";
import { mainMiddleware } from "../services/middleware.js";
import { logDevMode } from "../utils/allUtils.js";

export { appSetup };

function appSetup(io) {
    const connectionsObj = { userConnections: 0, loadTestConnections: 0 };
    const mainUsers = {};

    mainMiddleware(io);
    io.on("connection", (socket) => {
        logDevMode(socket);
        mainEvents(io, socket, connectionsObj, mainUsers);
        //other events..
    });

    // loadtest path setup
    const loadTestNamespace = io.of("/test");
    loadTestNamespace.on("connection", (socket) => {
        loadTestEvents(io, socket, connectionsObj);
    });
}
