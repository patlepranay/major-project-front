import React, { useContext, useState } from 'react';
import { Grid, Typography, Paper, makeStyles } from '@material-ui/core';


import { SocketContext } from '../../../Context';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  videoSelf: {
    width: '200px',
    [theme.breakpoints.down('xs')]: {
      width: '100px',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    margin: '10px',
  },
}));

const VideoPlayer = () => {
  const { callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
  const classes = useStyles();
  const [user] = useState(JSON.parse(localStorage.getItem('profile')));

  return (
    <Grid container className={classes.gridContainer}>
      {callAccepted && !callEnded && (
        <Paper className={classes.paper} elevation={12}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
            <video playsInline ref={userVideo} autoPlay className={classes.video} />
          </Grid>
        </Paper>
      )
      }
      {
        stream && (
          <Paper className={classes.paper} elevation={12} >
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>{user.result.name}</Typography>
              <video playsInline muted ref={myVideo} autoPlay className={user.result.type === 'doctor' ? ("classes.videoSelf") : ("classes.video")} />
            </Grid>
          </Paper>
        )
      }

    </Grid >
  );
};

export default VideoPlayer;
