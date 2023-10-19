
const http = require("http").createServer(function(request, response) {
  response.writeHead(200, {
      'Content-Type': 'text/html'
  });
  response.write("Welcome Bun!");
  response.end();

});
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;
io.on("connection", (socket) => {
    console.log(`User ${socket.id} connected`)

    socket.on('message', (data) => {
        io.emit('message', {user: socket.id.substring(0, 4), counter: data.counter })
    })
});

http.listen(port, () => {
  console.log(`Socket.IO server running at ${port}`);
});