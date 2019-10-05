import { Server as HapiServer } from '@hapi/hapi';
import init from './app';

async function start(): Promise<void> {
    try {
        const server: HapiServer =  await init();
        await server.start();

        console.log('Server started');
    } catch (error) {
        console.error(`Failed to start server: ${error}`);
    }
}

start();
    