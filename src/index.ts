import { Server as HapiServer } from '@hapi/hapi';
import init from './app';

async function start() {
    const server: HapiServer = init();
    await server.start();

    console.log('Server started');
}

start().catch((error: Error) => {
    console.error(`Failed to start server: ${error}`);
});
