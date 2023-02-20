import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { SocketContext } from '../SocketContext';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ScrollToBottom from 'react-scroll-to-bottom';
import VideoPlayer from '../pages/VideoPlayer';

const PatientList = () => {

  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call, connectedUsers, messageList, sendMessageToDoctor, setCurrentMessage, currentMessage, toggleButton, videoChat, setVideoChat, } = useContext(SocketContext);
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
            <div className="px-4 d-none d-md-block ">
                <div className="d-flex align-items-center mt-3">
                    <div className="profile d-flex ">
                        <h6 className='my-2'>{patient[0]?.type} list</h6>
                    </div>
                </div>
            </div>
            <hr className='' style={{marginTop: 10,}} />

            {/* chat list */}
            {
                patient.map((doctor)=>{
                    return(
                        <a href="#" className="list-group-item list-group-item-action border-0 my-3 mx-3">
                            {/* <div className="badge bg-success float-right">5</div> */}
                            <div className='d-flex' >
                            <div>
                                <img src="https://bootdey.com/img/Content/avatar/avatar5.png" className="rounded-circle mr-1" alt="Vanessa Tucker" width="40" height="40" />
                            </div>
                                <div className="flex-grow-1 ml-3 d-flex mx-2" style={{display: 'flex', alignItems: 'center'}}>
                                    <div class="flex-grow-1 ml-3">
                                    {doctor.name}
                                    <div class="small"><span class="">
                                        <img alt="Online Icon" src='https://as2.ftcdn.net/v2/jpg/04/96/24/41/1000_F_496244122_AUmTfO6lVjki0SyUlaBl6Z292qWOVhao.jpg' style={{height: 20, width: 20, borderRadius: 20,}} />
                                    </span> Online</div>
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
  )
}

export default PatientList