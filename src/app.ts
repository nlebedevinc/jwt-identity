import { Server } from '@hapi/hapi';

function init(): Server {
    const server = new Server({
        debug: false,
        port: 3000,
    });

    return server;
}

export default init;
