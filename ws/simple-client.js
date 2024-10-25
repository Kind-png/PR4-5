const WebSocket = require('ws').WebSocket;

const readline = require('readline');

const wsClientFactory = (id) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
    });

  const connect = () => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.on('error', console.error);

    ws.on('open', function open() {
      console.log(`client id=${id} connected to server`);
      ws.send(`message from client ${id}`);
    });

    ws.on('close', function close() {
      console.log(`client id=${id} disconnected from server`);
      setTimeout(() => {
        console.log(`attempting to reconnect...`);
        connect(); 
      }, 1000);
    });

    ws.on('message', function message(data) {
      console.log(`received: ${data}`);

      rl.question('Chat: ', (answer) => {
        ws.send(`message from client ${id}: ${answer}`);
      });
      

    });
  };

  connect(); 
};

const wsClient1 = wsClientFactory(Math.random().toString(36).substr(2, 9));

