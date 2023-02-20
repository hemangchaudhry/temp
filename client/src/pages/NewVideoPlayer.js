import React, { useContext } from 'react';
import { Grid, Typography, Paper, makeStyles, Button, Container, } from '@material-ui/core';
import Notifications from './Notifications'

import { SocketContext } from '../SocketContext';
import Options from '../components/Options';
import { Phone } from '@material-ui/icons';

// const useStyles = makeStyles((theme) => ({
//   video: {
//     // marginTop: 10,
//     width: 900,
//     height: '90vh',
//     [theme.breakpoints.down('xs')]: {
//       width: '300px',
//     },
//   },
//   // userVideo: {
//   //   width: '100px',
//   //   height: '100px',
//   //   margin: 30,
//   //   [theme.breakpoints.down('xs')]: {
//   //     width: '300px',
//   //   },
//   //   // borderRadius: '50%',
//   // },
//   gridContainer: {
//     // justifyContent: 'center',
    
//     // [theme.breakpoints.down('xs')]: {
//     //   flexDirection: 'column',
//     // },
//   },
//   // paper: {
//   //   padding: '10px',
//   //   border: '2px solid black',
//   //   margin: '10px',
//   // },
// }));

const NewVideoPlayer = ({children, idToCall}) => {
  const { name , toggleButton, callAccepted, myVideo, userVideo, callEnded, stream, call, callUser } = useContext(SocketContext);
//   const classes = useStyles();

  const myStyles = {
    video: {
        'height': '95vh',
        'width': '90vw',
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
    <div container className='modal'>
    <div onClick={toggleButton} className="overlay"></div>
      {/* {stream && ( */}
            <div className='modal-content'>
                <div className='row' style={{position: 'relative', }}>   

                    <div className="col-md-10 bg-dark" style={myStyles.video}>
                        <Container className='text-center'>
                            <Button  variant="contained" color="primary" startIcon={<Phone fontSize="large" />}  onClick={() => callUser(idToCall)} >
                                Call
                            </Button>
                            <Notifications />
                            {children}
                        </Container>
                    </div>
                {/* )} */}
                {/* {callAccepted && !callEnded && ( */}
                    <div className="col-md-2 bg-white" style={myStyles.userVideo}>
                        <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
                        <video playsInline ref={userVideo} autoPlay className='' />
                    </div>
                {/* )} */}
              
                </div>
            </div>
        {/* <button className="close-modal" onClick={toggleButton}>
            CLOSE
        </button> */}
    </div>
  );
};

export default NewVideoPlayer;


