const express = require('express');
const WebSocket = require('ws');

// Create an Express app
const app = express();
app.use(express.json());

// Create a WebSocket server
const wss = new WebSocket.Server({ noServer: true });

// Handle WebSocket connections
wss.on('connection', (ws) => {
// console.log(message);
  // Handle incoming messages
  ws.on('message', (message) => {
    console.log('Received message:', message);

    // Send a response back to the client
    // ws.send('Message received');

    ws.send(JSON.stringify({ type: 'chat', sender: 'Server', text: "I have received your message" }));
  });

  // Handle WebSocket close event
  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

// Create an HTTP server using the Express app
const server = app.listen(3010, () => {
  console.log('Server started on port 3010');
});

// Upgrade incoming HTTP requests to WebSocket
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});
