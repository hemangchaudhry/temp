import React, { useContext, useEffect } from "react";
import { SocketContext } from "../SocketContext";
import UserList from "./UserList";
import ChatBox from "../components/ChatBox";
import Notifications from './Notifications'

const Patient = () => {
  const { handleSelectedUser, connectedUsers, show, onlineUsers, assignMySocket } =
    useContext(SocketContext);

    useEffect(() => {
      assignMySocket(localStorage.getItem("Patient-uid"));
    },[]);

    const onlineDoctors = onlineUsers.filter((users)=>{
      return users?.type === 'Doctor';
    })
    



  return (
    <>
    
      <div>
      <Notifications />
        <main className="content">
          <div className="container p-0">
            <div className="card">
              <div className="row g-0">
                <div className="col-12 col-lg-5 col-xl-3 border-right">
                <UserList  usertype="SRC" onclick={handleSelectedUser} />
                  <UserList usertype="Doctor" onclick={handleSelectedUser} />
                </div>
                <div
                  className="col-12 col-lg-7 col-xl-9"
                  style={{ height: "100vh" }}
                >
                  {show ? <ChatBox /> : null}

                 
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Patient;