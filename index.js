const  express = require('express');
const path = require("path");

const  app = express();
const http = require('http');
const server = require("http").createServer(app);

const { Server } = require("socket.io");
const io = new Server(server); 

app.use(express.static(path.join(__dirname + '/public')))

// app.get('/',(req,res)=>{
//     res.sendFile(__dirname + '/index.html'); 
// });

io.on('connection', function(socket){
  socket.on("newuser",function(username){
    socket.broadcast.emit("update", username + " joined the conversation");
  });
  socket.on("exituser",function(username){
    socket.broadcast.emit("update", username + " left the conversation");
  });
  socket.on("chat",function(username){
    socket.broadcast.emit("chat", message);
  });
});

// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//       console.log('user disconnected');
//     });
//     socket.on('chat message', (msg) => {
//         console.log('message: ' + msg);
//         io.emit('chat message', msg);
//       });
//   });

server.listen(3000, ()=>{
    console.log('listening on port 3000');
});