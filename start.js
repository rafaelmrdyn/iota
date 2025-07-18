/**
 * Express application startup file
 */

// Load environment variables
require('dotenv').config();

// Import dependencies
const http = require('http');
const app = require('./app');

// Get port from environment and store in Express
const port = process.env.PORT || 3000;
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);

// Listen on provided port
server.listen(port);

// Handle server events
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // Handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log(`Server listening on ${bind}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // It's usually better to exit after an uncaught exception
  process.exit(1);
});