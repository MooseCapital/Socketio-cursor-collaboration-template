import "dotenv/config";
import { instrument } from "@socket.io/admin-ui";
import { Server } from "socket.io";
import { App } from "uWebSockets.js";
import { appSetup } from "./src/controllers/app.js";

const app = App();
const port = Number(process.env.PORT) || 3005;

const io = new Server({
    cors: {
        origin: JSON.parse(process.env.CORS_ORIGIN),
    },
});

io.attachApp(app);

appSetup(io);

app.listen(port, (token) => {
    console.log("app ran", port);
    if (!token) {
        console.log(token);
        console.warn("port already in use");
    }
});
