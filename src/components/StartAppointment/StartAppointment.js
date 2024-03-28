import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";

import { Typography, Paper, Grid, TextField, Button, Accordion, AccordionSummary, AccordionDetails, TableContainer, TableBody, Table, TableHead, TableRow, TableCell } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { SocketContext } from '../../Context';

import { getAppointmentById, sendEmail, endAppointment, sendOtp, verifyOtp } from '../../actions/appointment';
import { addPrescription } from '../../actions/prescription';

import VideoPlayer from './helper/VideoPlayer';
import Sidebar from './helper/Sidebar';
import Notifications from './helper/Notifications';

import useStyles from './styles';

const Appointment = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    let history = useHistory();
    const { id } = useParams();
    const { me, setStream, myVideo, leaveCall, callAccepted, callEnded } = useContext(SocketContext);


    const [user] = useState(JSON.parse(localStorage.getItem('profile')));

    const [medicine, setMedicine] = useState([{ name: null, days: null, description: null }]);
    const [submitted, setSubmitted] = useState(false);
    const [otp, setOTP] = useState();

    const appointment = useSelector((state) => state.appointment);
    const prescriptions = useSelector((state) => state.prescription);

    useEffect(() => {
        if (!user?.result) {
            history.push('/');
        }
        else {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then((currentStream) => {
                    setStream(currentStream);
                    myVideo.current.srcObject = currentStream;
                });
            dispatch(getAppointmentById(id));
        }
    },  // eslint-disable-next-line
        [dispatch]);




    const handleOTP = (e) => {
        setOTP(e.target.value);
    }

    const sendOTP = () => {
        dispatch(sendOtp(appointment[0].patientId));
    }

    // eslint-disable-next-line
    const verifyOTP = () => {

        dispatch(verifyOtp(otp, appointment[0].patientId));
    }

    const handleMedicine = (i, event) => {
        const values = [...medicine];
        values[i].name = event.target.value;
        setMedicine(values);
    }

    const handleDescription = (i, event) => {
        const values = [...medicine];
        values[i].description = event.target.value;
        setMedicine(values);
    }


    const handleDays = (i, event) => {
        const values = [...medicine];
        values[i].days = event.target.value;
        setMedicine(values);
    }



    const handleAdd = () => {
        const values = [...medicine];
        values.push({ name: null, days: null });
        setMedicine(values);
    }

    const handleRemove = (i) => {
        const values = [...medicine];
        values.splice(i, 1);
        setMedicine(values);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { doctorId: appointment[0].doctorId, patientId: appointment[0].patientId, medicine: medicine, appointmentId: appointment[0]._id }
        dispatch(addPrescription(formData));
        setSubmitted(true);
    }

    const endSession = async (e) => {
        leaveCall();
        alert(appointment[0]._id);
        dispatch(endAppointment(appointment[0]._id));
        history.push('/dashboard');
    }

    const endPatientSession = async (e) => {
        alert("Your appointment is completed");
        history.push('/dashboard');
    }

    const send = () => {
        if (user.result.type === 'doctor') {
            dispatch(sendEmail({ patientId: appointment[0].patientId, callerId: me }))
        }
    }

    return (
        <div className={classes.content}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper} elevation={12} justify>
                        <Typography variant="h5" align="center">{`Welcome to the Appointments ${id}`} </Typography>
                    </Paper>
                </Grid>
                {user.result.type === 'doctor' ? (
                    <>
                        <Grid item xs={12} sm={12}>
                            <Paper className={classes.paper} elevation={12} justify>
                                <VideoPlayer />
                                <Sidebar>
                                    <Notifications />
                                </Sidebar>
                                <Button onClick={send}>Send Email</Button>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes.paper} elevation={12} justify>
                                <Typography className={classes.typo} variant='h5' >Enter Prescription</Typography>
                                <form className={classes.form} onSubmit={handleSubmit} validate>
                                    <Grid container spacing={2} >
                                        {medicine.map((medicine, idx) => {
                                            return (
                                                <Grid container xs={12} spacing={2} key={`${medicine}-${idx}`}>
                                                    <Grid item xs={6}>
                                                        <TextField className={classes.tf} id="outlined-basic" label="Medication" value={medicine.name || ""} onChange={(e) => handleMedicine(idx, e)} required fullWidth variant="outlined" />

                                                        <TextField className={classes.tf} id="outlined-basic" label="Days" value={medicine.days || ""} onChange={(e) => handleDays(idx, e)} required fullWidth variant="outlined" />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <TextField className={classes.tf} id="outlined-basic" label="Description" value={medicine.description || ""} onChange={(e) => handleDescription(idx, e)} required fullWidth variant="outlined" />
                                                        <Button fullWidth variant="contained" color="secondary" className={classes.button} onClick={() => handleRemove(idx)}>
                                                            Remove Medication</Button>
                                                    </Grid>
                                                </Grid>
                                            );
                                        })}
                                        <Button fullWidth variant="contained" color="primary" className={classes.button} onClick={() => handleAdd()}>Add Medication
                                        </Button>
                                    </Grid>
                                    <Button disabled={submitted} variant="contained" color="primary" className={classes.button} type="submit">Submit Prescription
                                        </Button>
                                </form>
                                {callAccepted && !callEnded ? (
                                    <Button variant="contained" color="primary" className={classes.button} onClick={endSession}>End Session</Button>) : (null)}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes.paper} elevation={12} justify>
                                <Typography className={classes.typo} variant='h5' >Request Patient History</Typography>
                                <Button variant="contained" color="primary" className={classes.button} onClick={sendOTP}>Send OTP</Button>
                                <TextField className={classes.tf} id="outlined-basic" label="OTP" value={otp || ""} onChange={(e) => handleOTP(e)} required />
                                <Button variant="contained" color="primary" className={classes.button} onClick={verifyOTP}>Verify OTP</Button>
                                {prescriptions?.map((prescription, index) => {
                                    return (
                                        <Accordion key={index} elevation={4}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography className={classes.heading}>Prescription Id:{prescription._id}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <TableContainer component={Paper} elevation={4}>
                                                    <Table className={classes.table} aria-label="simple table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell align="left">Serial No</TableCell>
                                                                <TableCell align="left">Medicine Name</TableCell>
                                                                <TableCell align="right">For Days</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {prescription.medicine?.map((medicine, index) => {
                                                                return (
                                                                    <TableRow key={index}>
                                                                        <TableCell align="left">{index + 1}</TableCell>
                                                                        <TableCell align="left">{medicine.name}</TableCell>
                                                                        <TableCell align="right">{medicine.days}</TableCell>

                                                                    </TableRow>)
                                                            })}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </AccordionDetails>
                                        </Accordion>
                                    )
                                })}
                            </Paper>
                        </Grid>
                    </>
                ) : (
                        <>
                            <Grid item xs={12} sm={12}>
                                <Paper className={classes.paper} elevation={12} justify>
                                    <Typography className={classes.typo} variant="h5" >Please Check your email for the Video call code</Typography>
                                    <VideoPlayer />
                                    <Sidebar>
                                        <Notifications />
                                    </Sidebar>
                                    {callAccepted && !callEnded ? (
                                        <Button variant="contained" color="secondary" className={classes.margin} onClick={endPatientSession}>
                                            End Appointment
                                        </Button>
                                    ) : (null)}
                                </Paper>
                            </Grid>
                        </>
                    )}
            </Grid>
        </div >
    );
}

export default Appointment;