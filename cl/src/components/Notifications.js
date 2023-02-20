import React, { useContext } from "react"
import { Button } from "@material-ui/core"
import { SocketContext } from "../Context"

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext)

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <h1>{call.name} is calling:</h1>
          <button type="button" className="btn">
            answer call
          </button>
        </div>
      )}
    </>
  )
}

export default Notifications
