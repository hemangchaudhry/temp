import { Box, Button, Container, css, CssBaseline, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useContext, useState } from 'react';
import { SocketContext } from '../SocketContext';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import ScrollToBottom from "react-scroll-to-bottom";
// import VideoPlayer from './VideoPlayer';

const Chat = () => {
    const { name, callAccepted, myVideo, userVideo, callEnded, stream, call, connectedUsers, sendMessageToDoctor, currentMessage, setCurrentMessage, messageList, setMessageList, toggleButton, videoChat, setVideoChat, } = useContext(SocketContext);

  const [doctorTalk, setDoctorTalk] = useState('');

//  Patient 
  const patient = connectedUsers.filter((connect) =>{
    return connect?.type === 'Patient' 
  })

  console.log('Patient Type',patient[0]?.type)

//doctor
  const doctor = connectedUsers.filter((connect) =>{
    if(connect?.type === 'Doctor') {
      return connect.name;
    }
  })

  console.log('Doctor name',doctor)

  console.log('login Connected user', connectedUsers);

  // const classes = useStyles();
  
   console.log('messagelist,', messageList.currentMessage);

  const handleDoctor = () => {
    console.log('hi doctor', doctor)
    const doctorName = doctor.filter((doctors)=> {
      if(doctors.name !== doctor.name){
        return doctors.name;
      }
    })
    console.log('doctorName', doctorName);
    // if(doctor)
    // console.log('doctors name', doctorTalk)
  }

  return (
    <div>
        <main className="content">
        <div className="container p-0">

            <h1 className="h3 mb-3">Messages</h1>

            <div className="card">
                <div className="row g-0">
                    <div className="col-12 col-lg-5 col-xl-3 border-right">
                        <div className="px-4 d-none d-md-block">
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <input type="text" className="form-control my-3" placeholder="Search..." />
                                </div>
                            </div>
                        </div>

                    {/* chat list */}
                        {
                            doctor.map((doctors)=>{
                                return(
                                    <a href="#" className="list-group-item list-group-item-action border-0">
                                        {/* <div className="badge bg-success float-right">5</div> */}
                                        <div className="d-flex justify-content-between">
                                            <img src="https://bootdey.com/img/Content/avatar/avatar5.png" className="rounded-circle mr-1" alt="Vanessa Tucker" width="40" height="40" />
                                            <div className="flex-grow-1 ml-3">
                                                {doctors}
                                                
                                                <div class="flex-grow-1 ml-3">
                                                    Vanessa Tucker
                                                    <div class="small"><span class="fas fa-circle chat-online"></span> Online</div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                )
                            })
                        }
                    {/* chat list end */}

                        <hr className="d-block d-lg-none mt-1 mb-0" />
                    </div>
                    <div className="col-12 col-lg-7 col-xl-9" >
                        <div className="py-2 px-4 border-bottom d-none d-lg-block" style={{height: '100vh'}}>
                            <div className="d-flex align-items-center py-1">
                                <div className="position-relative">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
                                </div>
                                <div className="flex-grow-1 pl-3">
                                    <strong>Sharon Lessman</strong>
                                    <div className="text-muted small"><em>Typing...</em></div>
                                </div>
                                <div>
                                    <button className="btn btn-primary btn-lg mr-1 px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-phone feather-lg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></button>
                                    <button className="btn btn-info btn-lg mr-1 px-3 d-none d-md-inline-block"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-video feather-lg"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg></button>
                                    <button className="btn btn-light border btn-lg px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-more-horizontal feather-lg"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></button>
                                </div>
                            </div>
                        </div>

                        <div className="position-relative">
                            <div className="chat-messages p-4">

                                <div className="chat-message-right pb-4">
                                    <div> 
                                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle mr-1" alt="Chris Wood" width="40" height="40" />
                                        <div className="text-muted small text-nowrap mt-2">2:33 am</div>
                                    </div>
                                    <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                                        <div className="font-weight-bold mb-1">You</div>
                                        Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.
                                    </div>
                                </div>   
                            </div>
                        </div>
                        <div className="flex-grow-0 py-3 px-4 border-top">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Type your message" />
                                <button className="btn btn-primary">Send</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
</main>
    </div>
  )
}

export default Chat