// import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
// import React, { useContext, useState } from "react";
// import { SocketContext } from "../SocketContext";
// import SendIcon from "@mui/icons-material/Send";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
// import PhotoCamera from "@mui/icons-material/PhotoCamera";
// import ScrollToBottom from "react-scroll-to-bottom";
// import VideoPlayer from "../pages/VideoPlayer";

// const ChatBox = () => {
//   const {
//     name,
//     callAccepted,
//     myVideo,
//     userVideo,
//     callEnded,
//     stream,
//     call,
//     connectedUsers,
//     messageList,
//     sendMessageToDoctor,
//     setCurrentMessage,
//     currentMessage,
//     toggleButton,
//     videoChat,
//     setVideoChat,
//   } = useContext(SocketContext);
//   const [doctorTalk, setDoctorTalk] = useState("");
//   const [online, setOnline] = useState(false);

//   //  Patient
//   const patient = connectedUsers.filter((connect) => {
//     return connect?.type === "Patient";
//   });

//   console.log("Patient Type", patient[0]?.type);

//   const doctor = connectedUsers.filter((connect) => {
//     return connect?.type === "Doctor";
//   });
//   console.log("Doctor", doctor);

//   console.log("login  Connected user", connectedUsers);

//   return (
//     <>
//       <div className="py-2 px-4 border-bottom d-none d-lg-block">
//         <div className="d-flex align-items-center py-1">
//           <div className="position-relative">
//             <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"
//             />
//           </div>
//           <div className="flex-grow-1 pl-3">
//             <strong>Sharon Lessman</strong>
//             <div className="text-muted small">
//               <em>Typing...</em>
//             </div>
//           </div>
//           <div>
//             <button className="btn btn-light border btn-sm px-3">
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-more-horizontal feather-lg"
//               >
//                 <circle cx="12" cy="12" r="1"></circle>
//                 <circle cx="19" cy="12" r="1"></circle>
//                 <circle cx="5" cy="12" r="1"></circle>
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//       <ScrollToBottom >
//         <div className="position-relative" style={{height: '65vh'}}>
//           <div className="chat-messages p-4">
//             {videoChat ? (
//               <div>
//                 <VideoPlayer />
//               </div>
//             ) : null}
//             <div className="chat-message-right pb-4">
//               <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3" >
//                 {messageList.map((messageContent) => {
//                   console.log("message content", messageContent);
//                   return (
//                     <div>
//                       <div>
//                         <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle mr-1" alt="Chris Wood" width="40" height="40"
//                         />
//                         <span className="font-weight-bold mb-1 mx-2">{`you`}</span>
//                         <div className="text-muted small text-nowrap mt-2">
//                           2:33 am
//                         </div>
//                         <div className="msgContent">
//                           <p>{` ${messageContent.currentMessage}`}</p>
//                         </div>
//                         <div className="msgMeta">
//                           <p></p>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </ScrollToBottom>

//       <div className="flex-grow-0 py-3 px-4 border-top">
//         <div className="input-group">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Type your message"
//             value={currentMessage}
//             onKeyPress={(event) =>
//               event.key === "Enter" && sendMessageToDoctor()
//             }
//             onChange={(e) => setCurrentMessage(e.target.value)}
//           />
//           <button className="btn btn-primary" onClick={sendMessageToDoctor}>
//             Send
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ChatBox;
