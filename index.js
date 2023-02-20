const app = require("express")()
const server = require("http").createServer(app)
const cors = require("cors")

app.use(cors())
let connectedUsers = []
let onlineUsers = []
let chathistory = {}

const connectUser = (user) => {
  const foundUser = connectedUsers.filter((user) => {
    return user.uid === user.uid
  })
  console.log(foundUser)
  // add the functionality of connected users lated
  connectedUsers.push(user)
  console.log(connectedUsers)
}
// create socket server
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

// app.use(express.json())

app.get("/", (req, res) => {
  res.send("Running")
})

app.get("/patient", (req, res) => {
  console.log(req.body)
  res.send("hello patient")
})

app.post("/setUsers", (req, res) => {
  console.log(req.body)
})

io.on("connection", (socket) => {
  socket.emit("me", socket.id)

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded")
  })

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from, name })
  })

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal)
  })
  socket.on("login", (data) => {
    // console.log("login data", { ...data, id: socket.id })
    //  data["socketid"] = socket.id
    connectUser({ ...data, socketid: socket.id })
    //  socket.join(data.uid)
    //  console.log("connected user", connectedUsers)
    //  io.emit("userlistupdated", connectedUsers)
    //  io.emit("receive_online_users", onlineUsers)
  })
})

// start server
const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
