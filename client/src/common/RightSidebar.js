
import { Box, Button, Container, css, CssBaseline, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useContext, useState } from 'react';
import { SocketContext } from '../SocketContext';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import ScrollToBottom from "react-scroll-to-bottom";


const RightSidebar = () => {

  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call, connectedUsers, sendMessageToDoctor, currentMessage, setCurrentMessage, messageList, setMessageList } = useContext(SocketContext);
  const [doctorTalk, setDoctorTalk] = useState('');

 //Patient 
  const patient = connectedUsers.filter((connect) =>{
    return connect?.type === 'Patient' 
  })

  console.log('Patient Type',patient[0]?.type)
  console.log('Patient data',patient)

//doctor
  const doctor = connectedUsers.filter((connect) =>{
    // return connect.type === 'Doctor' 
    if(connect?.type === 'Doctor') {
      return connect.name;
    }
  })
  console.log('Doctor data',doctor)

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
      {/* <div className="row"> */}
        <div className="col-md-3 bg-dark text-white" style={{height: '100vh',}}>
              <div className=" p-1 chatHeader bg-secondary d-flex justify-content-between">
                  <div className="profile d-flex">
                      <h6 className='my-2'>{doctor[0]?.type} list</h6>
                  </div>
                  <div className="dotDocs d-flex justify-content-center align-item-center">
                    <Grid item xs={3}>
                      <MoreVertIcon />
                    </Grid>
                  </div>
                </div>
                <div className='text-white' >
                  {
                    doctor.map((doctor)=> {
                      {console.log('get doctor name', doctor.name)}
                     return (
                      <>
                         <div className="w-100" style={{display: 'flex', flexDirection: 'column', marginTop: 20, }}>
                        <ul className="list-group" style={{}}>
                        {/* logic lagana hai */}
                          {/* <li className="list-group-item text-center" style={{}} onClick={() => setDoctorTalk(doctor.name)}>{doctor.name}</li> */}
                          <li className="list-group-item text-center" style={{display: 'flex', justifyContent: 'space-between'}} onClick={() => setDoctorTalk(doctor.name)}>
                          <div>
                              {doctor.name}
                            </div>
                            <div key={name} className="activeItem" style={{display: 'flex', alignItems: 'center'}}>
                                <img alt="Online Icon" src='https://as2.ftcdn.net/v2/jpg/04/96/24/41/1000_F_496244122_AUmTfO6lVjki0SyUlaBl6Z292qWOVhao.jpg' style={{height: 20, width: 20, borderRadius: 20,}} />
                            </div>
                          </li>
                        </ul>
                      </div>
                      
                      </>
                      )
                    })
                  }
                </div>
        </div>
      {/* </div> */}
    </>
  )
}

export default RightSidebar