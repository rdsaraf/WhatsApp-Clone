const http = require('http');
const express =  require('express');
const cors = require('cors');
const socketIo = require('socket.io');

const { PORT=3000, LOCAL_ADDRESS='0.0.0.0' } = process.env;
const app = express();

const users = [{}];

app.use(cors());
app.get("/", (req, res)=>{
    res.send("Hello its working!"); 
})

const server = http.createServer(app);

const io = socketIo(server);

io.on("connection", (socket)=>{
    socket.on("joined",({user})=>{
        users[socket.id] = user;
        socket.emit("welcome",{user:"Admin", message:`Hello ${user}! Welcome to the chat`});
        socket.broadcast.emit("userJoined",{user:"Admin",message:`${users[socket.id]} has Joined`});
    })
    socket.on("message",({message, id})=>{
        io.emit("sendMessage",{user:users[id],message,id})
    })
    socket.on("disconnect",()=>{
        socket.broadcast.emit("leave",{user:"Admin",message:`${users[socket.id]} has left`});
    })
})

server.listen(PORT, LOCAL_ADDRESS, ()=>{
    console.log(`server is working on http://localhost:${PORT}`);
})