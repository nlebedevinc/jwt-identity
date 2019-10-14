import * as Hapi from '@hapi/hapi';
import namespace from '../lib/namespace';
import { login } from '../controllers/users.controller';

export default function(server: Hapi.Server, prefix: string) {
    namespace(server, prefix, [
        {
            method: 'POST',
            path: '/login',
            handler: login,
            options: {
                notes: '',
                tags: ['api', 'auth', 'login'],
                description: 'Login user with a given credentials'
            }
        }
    ]);
}
