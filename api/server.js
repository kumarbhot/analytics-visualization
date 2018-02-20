const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router(require('./db.js'));

server.use(jsonServer.defaults());
server.use(router);

server.listen(3000, () => {
    console.log('JSON Server is running');
});
