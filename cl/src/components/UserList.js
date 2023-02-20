import React, { useContext } from "react"
import { SocketContext } from "../Context"

const UserList = ({ usertype, onclick }) => {
  const { connectedUsers, onlineUsers, getMyInfo } = useContext(SocketContext)

  const myInfo = getMyInfo()
  console.log("My Info", myInfo)
  let users = []
  if (usertype === "SRC" || myInfo.type === "SRC") {
    users = connectedUsers.filter((connect) => {
      return connect?.type === usertype
    })
  } else if (usertype === "Doctor") {
    users = onlineUsers.filter((user) => {
      return user.patient.uid === myInfo.uid
    })
    users = users.map((user) => {
      return user.doctor
    })
    console.log(users)
  } else {
    users = onlineUsers.filter((user) => {
      return user.doctor.uid === myInfo.uid
    })
    users = users.map((user) => {
      return user.patient
    })
    console.log(users)
  }

  return (
    <div>
      <div className="px-4 d-none d-md-block ">
        <div className="d-flex align-items-center mt-3">
          <div className="profile d-flex ">
            <h6 className="my-2">{usertype} List</h6>
          </div>
        </div>
      </div>
      <hr className="" style={{ marginTop: 10 }} />

      {/* chat list */}
      {users.map((user) => {
        return (
          <a
            href="#"
            className="list-group-item list-group-item-action border-0 my-3 mx-3"
          >
            <div
              className="d-flex"
              onClick={(e) => {
                onclick(user)
              }}
            >
              <div>
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar5.png"
                  className="rounded-circle mr-1"
                  alt="Vanessa Tucker"
                  width="40"
                  height="40"
                />
              </div>
              <div
                className="flex-grow-1 ml-3 d-flex mx-2"
                style={{ display: "flex", alignItems: "center" }}
              >
                <div class="flex-grow-1 ml-3">
                  {user.name}({user.socketid.substring(0, 6)})
                  <div class="small">
                    <span class="">
                      <img
                        alt="Online Icon"
                        src="https://as2.ftcdn.net/v2/jpg/04/96/24/41/1000_F_496244122_AUmTfO6lVjki0SyUlaBl6Z292qWOVhao.jpg"
                        style={{ height: 20, width: 20, borderRadius: 20 }}
                      />
                    </span>{" "}
                    Online
                  </div>
                </div>
              </div>
            </div>
          </a>
        )
      })}
      {/* chat list end */}

      <hr className="d-block d-lg-none mt-1 mb-0" />
    </div>
  )
}

export default UserList
