import React, { createContext, useState, useRef, useEffect } from "react"
import { io } from "socket.io-client"
import Peer from "simple-peer"

const SocketContext = createContext()

const socket = io("http://localhost:5000")

const ContextProvider = ({ children }) => {
  const [myInfo, setMyInfo] = useState(null)
  const [threeDot, setThreeDot] = useState(null)

  // login the user
  const login = (data) => {
    // emit login event to the server
    socket.emit("login", data)
    // construct an object with name type and uid
    const myinfodata = { name: data.name, type: data.type, uid: data.uid }
    // set my info in the localstorage
    localStorage.setItem("mydata", JSON.stringify(data))

    // set the state variable of my info to the object constructed
    setMyInfo(data)

    // set state variable setThree dot to type and name
    setThreeDot({ type: data.type, name: data.name })
  }

  return (
    <SocketContext.Provider
      value={{
        login,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export { ContextProvider, SocketContext }
