const { Server } = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ['POST', 'GET'],
    }
})

export const getReceiverSocketId = (receiverID) => {
    return userSocketMap[receiverID];
}

const userSocketMap = {};

io.on("connection",(socket) => {

})
