import React, { useContext } from 'react';
import { Grid, Typography, Paper, makeStyles, Button, Container, } from '@material-ui/core';
import Notifications from './Notifications'

import { SocketContext } from '../SocketContext';
import Options from '../components/Options';
import { Phone, PhoneDisabled } from '@material-ui/icons';
import zIndex from '@material-ui/core/styles/zIndex';

const useStyles = makeStyles((theme) => ({
  userVideo: {
    position: 'absoute',
    zIndex: 2,
    width: 700,
    height: 450,
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  video: {
    position: 'relative',
    zIndex: 1,
    width: '200px',
    height: '150px',
    top: 10,
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
   
  },
  gridContainer: {
    
    justifyContent: 'center',
    
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper2: {
    // padding: '10px',
    border: '2px solid black',
    // margin: '10px',
  },
  paper: {
    position: 'absoute',
    zIndex: 2,
    border: '2px solid black',
    opacity: 0.8,
    width: 200,
    height: 200,
    // borderRadius: 100, 
    marginLeft: '75%',
    marginTop: '-25%',
    
  },
}));

const VideoPlayer = ({children, idToCall, me}) => {
  const { name , leaveCall, callAccepted, myVideo, userVideo, callEnded, stream, call, callUser } = useContext(SocketContext);
  const classes = useStyles();

  return ( 
    <>
    <Grid className={classes.gridContainer} >
    {/* <div onClick={toggleButton} className="overlay"></div> */}
    {callAccepted && !callEnded && (
        <Paper className={` ${classes.paper2}`}>
          <Grid item xs={12} md={6} >
            <Typography className='text-center' variant="h5" gutterBottom style={{display: 'flex', position: 'relative', marginLeft: 50}}>{me || 'Name'}</Typography>
            <video playsInline ref={userVideo} autoPlay className={classes.userVideo} />
          </Grid>
        </Paper>
      )}
     
      {stream && (
        <Paper className={` ${classes.paper}`}>
          <Grid item xs={12} md={6} >
            <Typography variant="h5" gutterBottom style={{postion: 'absolute', left: 0,}}>{name || 'Name'}</Typography>
            <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
          </Grid>

          <Container style={{display: 'flex', position: 'relative'}}>
          {callAccepted && !callEnded ? (
                <Button variant="contained" style={{position: 'absolute', left: -350, bottom: 12}} color="secondary" startIcon={<PhoneDisabled fontSize="large" />}  onClick={leaveCall} >
                  Hang Up
                </Button>
              ) : (
                <Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />}  onClick={() => callUser(idToCall)} >
                  Call
                </Button>   
              )}

          <Notifications />
          {children}
          </Container>
        </Paper>
      )}
      {/* <button className="close-modal" onClick={toggleButton}>
        CLOSE
      </button> */}
    </Grid>
    </>
  );

};


export default VideoPlayer;


