import { Server } from '@hapi/hapi';
import validate from './validate';

export default (): any => ({
    register: async (server: Server): Promise<void> => {
        try {
            await server.register(require('hapi-auth-jwt2'));

            // defining new auth strategy
            server.auth.strategy('jwt', 'jwt', {
                key: 'private_key',
                verifyOptions: { algorithms: ['HS256'] },
                validate,
            });

            // setting default auth strategy as JWT
            server.auth.default('jwt');
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
});