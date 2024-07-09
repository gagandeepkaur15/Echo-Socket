require('dotenv').config()
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const app = express();

//Since we cannot directly use .listen() with sockets we use http
const server = http.createServer(app);
const io = new Server(server); //io will handle the sockets

io.on('connection', (socket) => {
    // Handle incoming messages from client
    console.log('A user connected with id: ', socket.id);
    socket.on("user-message", (message) => {
        console.log(message);
        // Emit the response message after a delay
        setTimeout(() => {
            io.emit('response-message', JSON.stringify({ title: 'Response Title', body: message })); 
        }, 9000);
    });
});

app.get("/", (req, res) => {
    res.status(200).json({message: "Server is running"});
});

server.listen(process.env.PORT, ()=> console.log(`Server started at port: ${process.env.PORT}`))