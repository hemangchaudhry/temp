import React, { useContext, useEffect } from "react";
import { SocketContext } from "../SocketContext";
import UserList from "./UserList";
import ChatBox from "../components/ChatBox";
import Notifications from './Notifications'
import Options from "../components/Options";
import VideoPlayer from "./VideoPlayer";

const Doctor = () => {
  const { handleSelectedUser,  show, assignMySocket} =
    useContext(SocketContext);

    
  useEffect(() => {
    assignMySocket(localStorage.getItem("Doctor-uid"));
  },[]);

  return (
    <>
        
      <div className="row">
    
      <div className="">
        <main className="content">
          <div className="container p-0">
            <div className="card">
              <div className="row g-0">
                <div className="col-12 col-lg-5 col-xl-3 border-right">
                  <UserList usertype="SRC"  onclick={handleSelectedUser} />
                  <UserList usertype="Patient" onclick={handleSelectedUser} />
                </div>

                <div
                  className="col-12 col-lg-7 col-xl-9"
                  style={{ height: "100vh" }}
                >
                  {show ? <ChatBox usertype='Doctor' onclick={handleSelectedUser} /> : null}
                    <Notifications />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className="col-md-8">
       
      {/* <VideoPlayer /> */}
      </div>
      </div>
    </>
  );
};

export default Doctor;
