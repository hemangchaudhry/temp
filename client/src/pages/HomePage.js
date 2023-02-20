
import React, { useContext } from 'react';
import { Grid, Typography, Paper, makeStyles, Button, Container, } from '@material-ui/core';
import Notifications from './Notifications'

import { SocketContext } from '../SocketContext';
import Options from '../components/Options';
import { Phone } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    video: {
      // marginTop: 10,
      width: 900,
      height: '90vh',
      [theme.breakpoints.down('xs')]: {
        width: '300px',
      },
    },
    userVideo: {
      width: '100px',
      height: '100px',
      margin: 30,
      [theme.breakpoints.down('xs')]: {
        width: '300px',
      },
      // borderRadius: '50%',
    },
    gridContainer: {
      justifyContent: 'center',
      
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    paper: {
      padding: '10px',
      border: '2px solid black',
      margin: '10px',
    },
  }));
  


const HomePage = ({idToCall, children}) => {
    const { name , toggleButton, callAccepted, myVideo, userVideo, callEnded, stream, call, callUser } = useContext(SocketContext);

    const classes = useStyles();


const myStyles = {
    video: {
        'height': '80vh',
        'width': '900px',
     },
     userVideo:{ 
        position: 'absolute',
        height: "40%",
        width: '20%', borderRadius: '50%',
        bottom: 10, 
        right: '1%'
     }
}

  return (
    <Grid className="container ">
    <Options/>
        <div onClick={toggleButton} className="overlay"></div>
        <div className='row ' style={{position: 'relative', }}>   
        {/* {stream && ( */}
            <div className="col-md-10 bg-warning " >
                <Grid item xs={'12'} md={6} >
                  <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
                  <video playsInline muted ref={myVideo} autoPlay style={myStyles.video}  />
                </Grid>
                <Button style={{position: 'absolute', bottom: 0, marginLeft: "50%", marginRight: '50%'}} variant="contained" color="primary" startIcon={<Phone fontSize="large" />}  onClick={() => callUser(idToCall)} >
                    Call
                </Button>
                {/* <Container className='text-center'> */}
                    <Notifications />
                    {children}
                {/* </Container> */}
            </div>
        {/* )} 
        {callAccepted && !callEnded && (  */}
            <div className="col-md-2 bg-white" >
                <Grid item xs={12} md={6} style={{height: 30,}}>
                    <Typography variant="h5" gutterBottom style={{marginTop: '90%', marginLeft: 70,}}>{call.name || 'Name'}</Typography>
                    <video playsInline ref={userVideo} autoPlay style={myStyles.userVideo} />
                </Grid>
            </div>
        {/* )} */}
        </div>
        <button className="close-modal btn btn-dark" style={{borderRadius: '10px'}} onClick={toggleButton}>
        CLOSE
      </button>
    </Grid>
  )
}

export default HomePage