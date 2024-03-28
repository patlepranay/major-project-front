import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Typography, Paper, Grid, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { getAppointmentForDoctorId } from '../../actions/appointment';
import { getAllPatients } from '../../actions/users';

import useStyles from './styles';


const History = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const patients = useSelector((state) => state.patient);

    const appointments = useSelector((state) => state.appointment);

    const [user] = useState(JSON.parse(localStorage.getItem('profile')));


    useEffect(() => {
        if (user?.result.type === 'doctor') {
            dispatch(getAllPatients());
            dispatch(getAppointmentForDoctorId(user.result._id));
        }

    },  // eslint-disable-next-line
        [dispatch]);

    if (!user?.result.profileStatus) {
        history.push('/completeProfile');
    }

    if (!user?.result) {
        history.push('/');
    }


    return (
        <div className={classes.content}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper} elevation={12} justify>
                        <Typography variant="h5" align="center">Welcome to the History</Typography>
                    </Paper>
                </Grid>


                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper} elevation={12} justify>
                        <Typography className={classes.typo} variant="h5" align="center" >Past Patients</Typography>
                        {appointments.filter((appointment, index) => {
                            return (
                                appointment.attendedStatus && appointment.approvalStatus
                            )
                        }).map((appointment, index) => {
                            return (
                                <Accordion key={index} elevation={4}>
                                    <AccordionSummary
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className={classes.heading}>{patients.map((patient) => (patient._id === appointment.patientId ? patient.name : null))}</Typography>
                                    </AccordionSummary>
                                </Accordion>
                            )
                        })}
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper} elevation={12} justify>
                        <Typography className={classes.typo} variant="h5" align="center" >Past Appointments</Typography>
                        {appointments.filter((appointment, index) => {
                            return (
                                appointment.attendedStatus && appointment.approvalStatus
                            )
                        }).map((appointment, index) => {
                            return (

                                <Accordion key={index} elevation={4}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className={classes.heading}>Appointment Id: {appointment._id}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>Patient Name:
                                            {patients.map((patient) => (patient._id === appointment.patientId ? patient.name : null))}
                                        </Typography>
                                    </AccordionDetails>
                                    <AccordionDetails>
                                        <Typography>Date: {appointment.date}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            )
                        })}
                    </Paper>
                </Grid>





            </Grid>
        </div >
    );
}

export default History