const { mainEvents } = require("../services/mainEvents");
const { loadTestEvents } = require("../services/loadTestEvents");
module.exports = { appSetup };

function appSetup(io) {
    mainEvents(io);

    loadTestEvents(io);
}
