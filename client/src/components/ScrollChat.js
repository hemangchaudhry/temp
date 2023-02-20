
import React, { useContext, useState } from 'react';
import VideoPlayer from '../pages/VideoPlayer';
import { SocketContext } from '../SocketContext';


const ScrollChat = () => {

  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call, connectedUsers, messageList, sendMessageToDoctor, setCurrentMessage, currentMessage, toggleButton, videoChat, setVideoChat, handleClose, toggleButton1, handleShow, show, setShow,} = useContext(SocketContext);
  const [doctorTalk, setDoctorTalk] = useState('');
  const [online, setOnline] = useState(false);



  //  Patient 
  const patient = connectedUsers.filter((connect) =>{
    return connect?.type === 'Patient' 
  })

  console.log('Patient Type',patient[0]?.type)

  const doctor = connectedUsers.filter((connect) =>{
    return connect?.type === 'Doctor' 
  })
  console.log('Doctor',doctor)

  console.log('login  Connected user', connectedUsers);

  return (
    <div>
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
                      {/* <span className="font-weight-bold mb-1 mx-2">{`you`}</span> */}
                      {/* <div className="text-muted small text-nowrap mt-2">{messageContent.time}</div> */}
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
    </div>
  );
};

export default ScrollChat;
