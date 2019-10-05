import * as Hapi from '@hapi/hapi';

/**
 * Hapi namespace function to declare all routes with given prefix
 * @param server 
 * @param prefix 
 * @param routes 
 */
export default function(server: Hapi.Server, prefix: string, routes: Hapi.ServerRoute[]): void {
    routes.forEach(route => {
        route.path = prefix + route.path;
        server.route(route);
    });
}