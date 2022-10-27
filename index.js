const express = require("express");
const app = express();
var http = require("http");
// var cors = require('cors');
const port = process.env.PORT || 5000;
var server = http.createServer(app);
var io = require("socket.io")(server);
// let socket = io;




// middlewre
app.use(express.json());
var clients = {};  // clients is a map type of object
const routes = require("./routes");
app.use('/routes',routes); // from local host to routes
app.use('/uploads',express.static('uploads'));

io.on("connection",(socket)=>{
    console.log("connected");
    console.log(socket.id, "has joined");
    socket.on("signin", (id) =>{
        console.log(id);
        clients[id] = socket;
        console.log(clients);
    }); 
    socket.on("message",(msg)=>{
        console.log(msg);
        let targetId = msg.targetId;
        if(clients[targetId]) clients[targetId].emit("message", msg);
    });
});

app.route('/check').get((req,res) => {
    return res.json('Your app is working fine');
});


server.listen(port, '0.0.0.0',() => {
    console.log("server started");
});
  