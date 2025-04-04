const http = require('http');
const app = require('./app');
const port = 3636;

const swaggerDocs = require('./swagger');

swaggerDocs(app)

const server = http.createServer(app);

server.listen(port);