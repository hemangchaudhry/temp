
import { Box, Button, Container, css, CssBaseline, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useContext, useState } from 'react';
import { SocketContext } from '../SocketContext';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import ScrollToBottom from "react-scroll-to-bottom";

const ChatContent = () => {

  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call, connectedUsers, sendMessageToDoctor, currentMessage, setCurrentMessage, messageList, setMessageList } = useContext(SocketContext);

  const [doctorTalk, setDoctorTalk] = useState('');

 //Patient 
  const patient = connectedUsers.filter((connect) =>{
    return connect?.type === 'Patient' 
  })

  console.log('Patient Type',patient[0]?.type)

//doctor
  const doctor = connectedUsers.filter((connect) =>{
    // return connect.type === 'Doctor' 
    if(connect?.type === 'Doctor') {
      return connect.name;
    }
  })
  // console.log('Doctor data',doctor)

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
    <>
        <div className="col-md-6 bg-secondary">
          <div className="row d-flex">
          <h3 className='text-center text-white'>Support Consultancy</h3>
            <div className="col-md-12" style={{height: '75vh', backgroundColor: '#fff'}}>
                <ScrollToBottom style={{height: '75vh', }}>
                { messageList.map((messageContent) => {
                  return(
                    <div>
                      <div>
                        <div className='msgContent'><p>{messageContent.currentMessage}</p></div>
                        <div className='msgMeta'>
                          <p>{messageContent.time}</p>
                          <p>author</p>
                        </div>
                      </div>
                    </div>
                  )
                })
                }
                </ScrollToBottom>
            </div> 

            <div className="col-md-12">
              <TextField className='my-2 mx-1'  id="standard-basic" placeholder="text here..." value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)}  style={{width: '88%', backgroundColor: 'white', borderRadius: 8,}}/>
              <Button className='my-3' variant="contained" endIcon={<SendIcon />} onClick={sendMessageToDoctor}> Send </Button>
            </div>
          </div>
        </div>
    </>
  )
}

export default ChatContent