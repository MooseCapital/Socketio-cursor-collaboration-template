export { mainMiddleware };

function mainMiddleware(io) {
    io.use((socket, next) => {
        /* if (1) {
            next();
            
        } else {
            next(new Error("invalid"));
        } */
        next();
    });
}

//
