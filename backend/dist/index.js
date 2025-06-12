"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import http from 'http';
// import { Server } from 'socket.io';
const IoManager_1 = require("./managers/IoManager");
const UserManager_1 = require("./managers/UserManager");
// const server = http.createServer();
const io = IoManager_1.IoManager.getIo();
// const IoManager = new IoManager(io);
const userManager = new UserManager_1.UserManager;
io.listen(3000);
io.on('connection', (socket) => {
    // client.on('event', data => { 
    //   console.log(data);
    //   const type = data.type;
    //   // 3 admin events
    //   // 2 client events
    //   // UserManager => QuizManager => Quiz => broadcast
    // });
    userManager.addUser(socket);
});
// client.on('disconnect', () => { /* … */ });
