import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";
import VideoPlayer from "../pages/VideoPlayer";
import { SocketContext } from "../SocketContext";
import "./Modal.css";
import Notifications from "../pages/Notifications";

const ChatBox = () => {
  const { messageList, connectedUsers, threeDot, setThreeDot, callUser, sendMessageToDoctor, setCurrentMessage, currentMessage, toggleButton, videoChat, selectedChatUser, patient, doctor, handleOnlineUsers,
  } = useContext(SocketContext);

  const connectedUserName = connectedUsers.map((user) => {
    return user.name;
  });

  return (
    <>
      <div>
        <div className="py-2 px-4 border-bottom d-none d-lg-block ">
          <div className="d-flex align-items-center py-1">
            <div className="position-relative">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar3.png"
                className="rounded-circle mr-1"
                alt="Sharon Lessman"
                width="40"
                height="40"
              />
            </div>
            <div className="flex-grow-1 pl-3">
              <strong>{selectedChatUser.name}</strong>
              <div className="text-muted small"></div>
            </div>
            <div>
              <button
                className="btn btn-info btn-sm mr-1 mx-2 px-3 d-none d-md-inline-block"
                onClick={() => {
                  toggleButton();
                  callUser(selectedChatUser.uid);
                }}
              >
                {/* {videoChat ? <VideoPlayer idToCall = {selectedChatUser.uid} me={selectedChatUser.name} /> : null} */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-video feather-lg"
                >
                  <polygon points="23 7 16 12 23 17 23 7"></polygon>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </svg>
              </button>
              {threeDot.type === "SRC" ? (
                <button
                  className="btn btn-light border btn-sm px-3"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-more-horizontal feather-lg"
                  >
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </button>
              ) : null}

              {selectedChatUser.type === "Doctor" ? (
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true"
                >
                
                  <div className="modal-dialog modal-dialog-scrollable">
                  
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1
                          className="modal-title fs-5"
                          id="staticBackdropLabel"
                        >
                          {patient[0]?.type} List
                        </h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        {patient.map((patients) => {
                          return (
                            <ul className="list-group">
                              <li
                                className="list-group-item my-2"
                                onClick={() => handleOnlineUsers(patients)}
                                data-bs-dismiss="modal"
                              >
                                {patients.name}
                              </li>
                            </ul>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="modal fade"
                  id="staticBackdrop"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1
                          className="modal-title fs-5"
                          id="staticBackdropLabel"
                        >
                          {" "}
                          {doctor[0]?.type} List
                        </h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        {doctor.map((doctors) => {
                          return (
                            <ul className="list-group">
                              <li
                                className="list-group-item my-2"
                                onClick={() => handleOnlineUsers(doctors)}
                                data-bs-dismiss="modal"
                              >
                                {doctors.name}
                              </li>
                            </ul>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {videoChat ? (
          <VideoPlayer
            idToCall={selectedChatUser.uid}
            me={selectedChatUser.name}
          />
        ) : null}

        {videoChat === false ? (
          <ScrollToBottom>
            <div className="position-relative" style={{ height: "65vh" }}>
              <div className="chat-messages p-4">
                <div className="chat-message-right pb-4">
                  <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                    {console.log("message list...............", messageList)}
                    {messageList.map((messageContent) => {
                      {
                        /* selectedChatUser.name === connectedUserName.name ? */
                      }
                      console.log("message content.........", messageContent);
                      return (
                        <div>
                          <div
                            className=""
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              marginTop: 5,
                            }}
                            key={messageContent.socketid}
                          >
                            <div>
                              <img
                                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                className="rounded-circle mr-1"
                                alt="Chris Wood"
                                width="40"
                                height="40"
                              />
                              <div className="text-muted small text-nowrap mt-2">
                                2:34 am
                              </div>
                              <div className="msgContent mx-2">
                                <p>{` ${messageContent.currentMessage}`}</p>
                              </div>
                            </div>
                            <div className="msgMeta">
                              <p></p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* <div className="chat-message-left pb-4">
                        <div>
                          <img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
                          <div className="text-muted small text-nowrap mt-2">2:34 am</div>
                        </div>
                        <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                          <div className="font-weight-bold mb-1">Sharon Lessman</div>
                            Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.
                        </div>
                    </div> */}
              </div>
            </div>
          </ScrollToBottom>
        ) : null}

        {videoChat === false ? (
          <div className="flex-grow-0 py-3 px-4 border-top">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Type your message"
                value={currentMessage}
                onKeyPress={(event) =>
                  event.key === "Enter" && sendMessageToDoctor()
                }
                onChange={(e) => setCurrentMessage(e.target.value)}
              />
              <button className="btn btn-primary" onClick={sendMessageToDoctor}>
                Send
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ChatBox;
