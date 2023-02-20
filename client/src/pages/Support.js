import React, { useContext, useEffect } from "react";
import ChatBox from "../components/ChatBox";
import { SocketContext } from "../SocketContext";
import UserList from "./UserList";
const Support = () => {
  const { handleSelectedUser, show, myInfo, onlineUsers, assignMySocket } =
    useContext(SocketContext);

  useEffect(() => {
    assignMySocket(localStorage.getItem("SRC-uid"));
  },[]);

  return (
    <>
      <div className="row">
        <main className="content">
          <div className="container p-0">
            <div className="card">
              <div className="row g-0">
                <div className="col-12 col-lg-2 col-xl-3 border-right">
                  <UserList usertype="Patient" onclick={handleSelectedUser} />
                  <UserList usertype="Doctor" onclick={handleSelectedUser} />
                </div>
                <div
                  className="col-12 col-lg-7 col-xl-6"
                  style={{ height: "100vh" }}
                >
                  {show ? <ChatBox /> : null}
                </div>
                <div className="col-md-12 col-lg-2 col-xl-3">
                  {/* <h5 className="text-center">Assign List</h5> */}
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Doctor </th>
                        <th scope="col">Patient</th>
                      </tr>
                    </thead>
                    <tbody>
                      {onlineUsers.map((user) => {
                        return (
                          <tr>
                            <td>
                              {user.doctor.name}(
                              {user.doctor.socketid.substring(0, 6)})
                            </td>
                            <td>
                              {user.patient.name}(
                              {user.patient.socketid.substring(0, 6)})
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Support;
