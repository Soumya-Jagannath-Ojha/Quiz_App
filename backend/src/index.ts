// import http from 'http';
// import { Server } from 'socket.io';
import { IoManager } from './managers/IoManager';
import { UserManager } from './managers/UserManager';
// const server = http.createServer();

const io = IoManager.getIo();
// const IoManager = new IoManager(io);
const userManager =  new UserManager;

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
