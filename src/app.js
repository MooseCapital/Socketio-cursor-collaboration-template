require('dotenv').config()
const {App} = require("uWebSockets.js");
const {Server} = require("socket.io");
const {socketSetup} = require("./controllers/main");
const app = App();
const port = Number(process.env.PORT) || 3005;

const io = new Server({
        cors: {
            origin: `${process.env.CORS_ORIGIN}`,
            // methods: ["GET", "POST"],
        }
    }
)
io.attachApp(app);

socketSetup(io)

app.listen(port, (token) => {
    console.log('app ran', port)
    if (!token) {
        console.log(token)
        console.warn("port already in use");
    }
});