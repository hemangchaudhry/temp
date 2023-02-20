const app = require("express")()
const server = require("http").createServer(app)
const cors = require("cors")
const { emit } = require("process")
// const { Socket } = require('socket.io');
app.use(cors())
let connectedUsers = []
let onlineUsers = []
let chathistory = {}

// connect users when they login
function connectUser(data) {
  let foundUser = connectedUsers.filter((user) => {
    return user.uid === data.uid
  })
  if (foundUser && foundUser.length == 0) connectedUsers.push(data)
}

// set online users
function setOnlineUsers(data) {
  let user1 = data

  let user2 = connectedUsers.filter((user) => {
    // console.log(user.uid, data.myuid);
    return user.uid === data.myuid
  })
  if (user2.length > 0) user2 = user2[0]

  let connection = {}

  if (user2.type === "Patient") {
    connection.patient = user2
    connection.doctor = user1
  } else {
    connection.doctor = user2
    connection.patient = user1
  }

  const foundMapping = onlineUsers.filter((mapping) => {
    return (
      mapping.patient.uid === connection.patient.uid &&
      mapping.doctor.uid === connection.doctor.uid
    )
  })
  if (!foundMapping || foundMapping.length == 0) onlineUsers.push(connection)
}

// make io server
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
  },
})

const PORT = process.env.PORT || 4000

app.get("/", (req, resp) => {
  resp.send("Server is running.")
})

//now socket connection

io.on("connection", (socket) => {
  // every user will get a socket id when connect to the client
  console.log("COnnected Socketid", socket.id)

  socket.emit("me", socket.id)
  socket.emit("userlistupdated", connectedUsers)
  socket.emit("receive_online_users", onlineUsers)
  console.log(socket.handshake.query.user)

  // when user get disconnected
  socket.on("disconnect", () => {
    console.log("user disconnected")
    socket.broadcast.emit("callended")
    socket.emit("userlistupdated", connectedUsers)
    socket.emit("receive_online_users", onlineUsers)
  })

  // when user log in in the login page
  socket.on("login", (data) => {
    console.log("login data", data)
    data["socketid"] = socket.id

    // add user with the data you are getting
    connectUser(data)
    socket.join(data.uid)
    console.log("connected user", connectedUsers)
    io.emit("userlistupdated", connectedUsers)
    io.emit("receive_online_users", onlineUsers)
  })

  socket.on("assign_my_socket", (uid) => {
    console.log(uid, "changed for socketid", socket.id)
    // UPdate online users
    connectedUsers.map((user) => {
      if (user.uid === uid) user.socketid = socket.id
    })

    onlineUsers.map((user) => {
      if (user.patient.uid === uid) user.patient.socketid = socket.id
      if (user.doctor.uid === uid) user.doctor.socketid = socket.id
    })
    io.emit("userlistupdated", connectedUsers)
    io.emit("receive_online_users", onlineUsers)
  })

  // for sending messages
  socket.on("send_message", (data) => {
    console.log(
      "send message",
      data,
      "uid",
      data.uid,
      "name",
      data.name,
      "socketid",
      socket.id
    )
    // socket.to(data.to.uid).emit("receive_message", data);
    socket.in(data.to.uid).emit("receive_message", data)
    // io.to(data.socketId).emit('receive_message', {message: data, uid: data.uid, name: data.name });
    // socket.to(data.uid).emit('receive_message', {message: data.message, uid: data.uid, name: data.name });
  })

  // to initiate the call
  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    console.log(
      "userToCall:",
      userToCall,
      "signalData:",
      signalData,
      "from:",
      from,
      "name:",
      name
    )
    io.to(userToCall).emit("callUser", { signal: signalData, from, name })
  })

  // to answer the call
  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal)
  })

  // to show online users
  socket.on("online_users", (data) => {
    console.log("online users ", data)
    setOnlineUsers(data)
    io.emit("receive_online_users", onlineUsers)
  })
})

server.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
)
