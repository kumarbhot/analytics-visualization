// TODO: ESModule syntax
const path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
const axios = require('axios');
const qs = require('querystring');

const server = new Hapi.Server({
    port: 8000,
    routes: {
        files: {
            relativeTo: path.join(__dirname, 'dist')
        }
    }
});

async function provision () {
    await server.register(Inert);

    server.route({
        method: 'GET',
        path: '/api/{resource*}',
        async handler (req, h) {
            const res = await axios
                .get([
                    'http://localhost:3000/',
                    req.params.resource, '?', qs.stringify(req.query)
                ].join(''));

            return res.data;
        }
    });

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
                index: true
            }
        }
    });

    await server.start();

    // console.log('Server running at:', server.info.uri);
}

provision();
