const {mainEvents} = require("../services/mainEvents");
const {mainMiddleware} = require("../services/middleware");
const {loadTestEvents} = require("../services/loadTestEvents");
module.exports = {socketSetup}

function socketSetup(io) {
    
    mainEvents(io);
    
    loadTestEvents(io)
}






