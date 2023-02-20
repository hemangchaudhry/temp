import { PanoramaRounded } from "@material-ui/icons";
import React, { useContext, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import VideoPlayer from "../pages/VideoPlayer";
import { SocketContext } from "../SocketContext";

const PatientChatBox = () => {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
    connectedUsers,
    messageList,
    sendMessageToDoctor,
    setCurrentMessage,
    currentMessage,
    toggleButton,
    videoChat,
    setVideoChat,
    handleClose,
    toggleButton1,
    handleShow,
    show,
    setShow,
    param,
    doctor, 
    patient,
  } = useContext(SocketContext);

  console.log('all params here', param)

  return (
    <>
      <div>
        <div className="py-2 px-4 border-bottom d-none d-lg-block">
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
              <strong>{param.name}</strong>
              <div className="text-muted small">
               { name == '' ? null : <em>Typing...</em>}
              </div>
            </div>
            <div>
              {/* <button className="btn btn-primary btn-sm mr-1 px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-phone feather-lg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></button> */}
              <button
                className="btn btn-info btn-sm mr-1 mx-2 px-3 d-none d-md-inline-block"
                onClick={toggleButton}
              >
                {" "}
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
              <button className="btn btn-light border btn-sm px-3">
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
                  className="feather feather-more-horizontal feather-lg"
                >
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <ScrollToBottom>
          <div className="position-relative" style={{ height: "65vh" }}>
            <div className="chat-messages p-4">
              {videoChat ? <VideoPlayer /> : null}

              <div className="chat-message-right pb-4">
                <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                  {messageList.map((messageContent) => {
                    console.log("message content", messageContent);
                    return (
                      <div>
                        <div
                          className=""
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginTop: 5,
                          }}
                        >
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                            className="rounded-circle mr-1"
                            alt="Chris Wood"
                            width="40"
                            height="40"
                          />
                          <div className="msgContent mx-2">
                            <p>{` ${messageContent.currentMessage}`}</p>
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
            </div>
          </div>
        </ScrollToBottom>
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
      </div>  
  
      </>
  );
};

export default PatientChatBox;
