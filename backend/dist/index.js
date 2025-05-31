"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import http from 'http';
// import { Server } from 'socket.io';
const IoManager_1 = require("./managers/IoManager");
// const server = http.createServer();
const io = IoManager_1.IoManager.getIo();
// const IoManager = new IoManager(io);
io.on('connection', client => {
    client.on('event', data => {
        console.log(data);
        const type = data.type;
        // 3 admin events
        // 2 client events
        // UserManager => QuizManager => Quiz => broadcast
    });
    client.on('disconnect', () => { });
});
io.listen(3000);
