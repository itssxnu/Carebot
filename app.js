const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const  MQTTService  = require('./services/mqttService');  // Import MQTT Service
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/public')));

// define users from here
const users = [
    { username: 'admin', password: 'password123', role: 'admin' },  // Admin user
    { username: 'user1', password: 'userpass', role: 'user' },       // Regular user 1
    { username: 'user2', password: 'userpass2', role: 'user' }       // Regular user 2
];

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        if (user.role === 'admin') {
            res.redirect('/nurse.html');
        } else if (user.role === 'user') {
            res.redirect('/user-dashboard.html');
        }
    } else {
        res.status(401).send('Mn dnna ubw and mt mthka na ubwa');
    }
});


/*app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});*/

// Instantiate the MQTT Service
const mqttService = new MQTTService("ws://localhost:9001/mqtt", {
  onConnect: () => console.log("MQTT Connected"),
  onMessage: (topic, message) => {
    console.log(`MQTT Message: ${message}`);
    io.emit('sensorData', message);  // Emit sensor data to the client
  },
  onError: (error) => console.error(`MQTT Error: ${error}`),
  onClose: () => console.log("MQTT Disconnected"),
});

// Connect the MQTT client
mqttService.connect();

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});