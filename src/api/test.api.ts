import * as Hapi from '@hapi/hapi';
import namespace from '../lib/namespace';
import { get } from '../controllers/test.controller';

export default function(server: Hapi.Server, prefix: string) {
    namespace(server, prefix, [
        {
            method: 'GET',
            path: '/test',
            handler: get,
            options: {
                notes: 'Test purpose',
                tags: ['api', 'test'],
                description: 'Test route',
            }
        }
    ]);
}