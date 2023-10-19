import express from 'express'
import { Server } from "socket.io"
import path from 'path'
const port = process.env.PORT || 3000;

const app = express()

app.use(express.static(path.join(__dirname, "public")))

const expressServer = app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

const io = new Server(expressServer, {
  cors: {
      origin: '*'
  }
})

io.on("connection", (socket) => {
    console.log(`User ${socket.id} connected`)

    socket.on('message', (data) => {
        io.emit('message', {user: socket.id.substring(0, 4), counter: data.counter })
    })
});