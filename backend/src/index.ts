// import http from 'http';
// import { Server } from 'socket.io';
import { IoManager } from './managers/IoManager';
// const server = http.createServer();

const io = IoManager.getIo();
// const IoManager = new IoManager(io);

io.on('connection', client => {
  client.on('event', data => { 
    console.log(data);
    const type = data.type;
    
  });
  client.on('disconnect', () => { /* … */ });
});
io.listen(3000);