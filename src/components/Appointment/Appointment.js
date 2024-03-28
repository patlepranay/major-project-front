import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Typography, Paper, Grid, Accordion, AccordionSummary, TableHead, AccordionDetails, Button, TableContainer, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { getAppointmentForDoctorId, approveAppointmentById, getAppointmentForPatientId, deleteAppointmentById } from '../../actions/appointment';
import { getAllDoctors, getAllPatients } from '../../actions/users';
import { getAppointmentPrescriptionById } from '../../actions/prescription';

import useStyles from './styles';

const Appointment = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [expanded, setExpanded] = useState(false);
    const [user] = useState(JSON.parse(localStorage.getItem('profile')));

    const appointments = useSelector((state) => state.appointment);
    const doctors = useSelector((state) => state.doctor);
    const patients = useSelector((state) => state.patient);
    const prescription = useSelector((state) => state.prescription);

    useEffect(() => {
        if (user?.result.type === 'doctor') {
            dispatch(getAllPatients());
            dispatch(getAppointmentForDoctorId(user.result._id));
        }
        if (user?.result.type === 'patient') {
            dispatch(getAllDoctors());
            dispatch(getAppointmentForPatientId(user.result._id));
        }
    },
        // eslint-disable-next-line
        [dispatch]);

    if (!user?.result.profileStatus) {
        history.push('/completeProfile');
    }
    if (!user?.result) {
        history.push('/');
    }

    const handleChangeAccordion = (panel, id) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        dispatch(getAppointmentPrescriptionById(id));

    };

    const approveAppointment = (appointmentId, appointment) => {
        if (user.result.type === 'doctor')
            dispatch(approveAppointmentById(appointmentId, appointment));

    };

    const deleteAppointment = (appointmentId) => {
        if (user.result.type === 'doctor')
            dispatch(deleteAppointmentById(appointmentId));

    };

    return (
        <div className={classes.content}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper} elevation={12} justify>
                        <Typography variant="h5" align="center">Welcome to the Appointments</Typography>
                    </Paper>
                </Grid>
                {user.result.type === 'doctor' ? (
                    <>
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes.paper} elevation={12} justify>
                                <Typography className={classes.typo} variant="h5" align="center" >Pending Appointments</Typography>
                                {appointments.filter((appointment, index) => {
                                    return (
                                        appointment.approvalStatus === false
                                    )
                                }).map((appointment, index) => {
                                    return (
                                        <Accordion key={index} elevation={4}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography className={classes.heading}>Appointment Id:{appointment._id}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>Patient Name:{patients.map((patient) => (patient._id === appointment.patientId ? patient.name : null))}</Typography>
                                            </AccordionDetails>
                                            <AccordionDetails>
                                                <Typography>Date: {appointment.date}</Typography>
                                            </AccordionDetails>
                                            <AccordionDetails>
                                                <Typography>Time: {appointment.time}</Typography>
                                            </AccordionDetails>
                                            <AccordionDetails>
                                                <Button className={classes.button} variant="contained" color="primary" onClick={() => approveAppointment(appointment._id, appointment)}>Approve</Button>
                                                <Button className={classes.button} variant="contained" color="secondary" onClick={() => deleteAppointment(appointment._id)}>Delete</Button>
                                            </AccordionDetails>
                                        </Accordion>
                                    )
                                })}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes.paper} elevation={12} justify>
                                <Typography className={classes.typo} variant="h5" align="center" >Upcoming Appointments</Typography>
                                {appointments.filter((appointment, index) => {
                                    return (
                                        appointment.approvalStatus === true && appointment.attendedStatus === false
                                    )
                                }).map((appointment, index) => {
                                    return (
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography className={classes.heading}>Appointment Id: {appointment._id}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>Patient Id:{patients.map((patient) => (patient._id === appointment.patientId ? patient.name : null))}</Typography>
                                            </AccordionDetails>
                                            <AccordionDetails>
                                                <Typography>Date: {appointment.date}</Typography>
                                            </AccordionDetails>
                                            <AccordionDetails>
                                                <Typography>Time: {appointment.time}</Typography>
                                            </AccordionDetails>
                                            <AccordionDetails>
                                                <Link to={`/appointment/start/${appointment._id}`}>
                                                    <Button className={classes.button} variant="contained" color="primary" >Start Session</Button>
                                                </Link>
                                                <Button className={classes.button} variant="contained" color="secondary" onClick={() => deleteAppointment(appointment._id)} >Cancel</Button>
                                            </AccordionDetails>
                                        </Accordion>
                                    )
                                })}
                            </Paper>
                        </Grid>
                    </>
                ) : (
                        <>
                            <Grid item xs={12} sm={6}>
                                <Paper className={classes.paper} elevation={12} justify>
                                    <Typography className={classes.typo} variant="h5" align="center" >Previous Appointments</Typography>
                                    {appointments.filter((appointment, index) => {
                                        return (
                                            appointment.approvalStatus === true && appointment.attendedStatus === true
                                        )
                                    }).map((appointment, index) => {
                                        return (
                                            <Accordion key={index} elevation={4} expanded={expanded === index} onChange={handleChangeAccordion(index, appointment._id)}>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <Typography className={classes.heading}>Appointment Id:{appointment._id}</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography>Doctor Name:{doctors.map((doctor) => (doctor._id === appointment.doctorId ? doctor.name : null))}</Typography>
                                                </AccordionDetails>
                                                <AccordionDetails>
                                                    <Typography>Time: {appointment.time}</Typography>
                                                </AccordionDetails>
                                                <AccordionDetails>
                                                    <Typography>Date: {appointment.date}</Typography>
                                                </AccordionDetails>
                                                <AccordionDetails>
                                                    <TableContainer component={Paper} elevation={4}>
                                                        <Table className={classes.table} aria-label="simple table">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell align="left">Serial No</TableCell>
                                                                    <TableCell align="left">Medicine Name</TableCell>
                                                                    <TableCell align="left">For Days</TableCell>
                                                                    <TableCell align="left">Description</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {prescription.medicine?.map((medicine, index) => {
                                                                    return (
                                                                        <TableRow key={index}>
                                                                            <TableCell align="left">{index + 1}</TableCell>
                                                                            <TableCell align="left">{medicine.name}</TableCell>
                                                                            <TableCell align="left">{medicine.days}</TableCell>
                                                                            <TableCell align="left">{medicine.description}</TableCell>
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
                            <Grid item xs={12} sm={6}>
                                <Paper className={classes.paper} elevation={12} justify>
                                    <Typography className={classes.typo} variant="h5" align="center" >Upcoming Appointments</Typography>
                                    {appointments.filter((appointment, index) => {
                                        return (
                                            appointment.approvalStatus === true && appointment.attendedStatus === false
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
                                                    <Typography>Doctor Name: {doctors.map((doctor) => (doctor._id === appointment.doctorId ? doctor.name : null))}</Typography>
                                                </AccordionDetails>
                                                <AccordionDetails>
                                                    <Typography>Appointment Time: {appointment.time}</Typography>
                                                </AccordionDetails>
                                                <AccordionDetails>
                                                    <Typography>Appointment Date: {appointment.date}</Typography>
                                                </AccordionDetails>
                                                <AccordionDetails>
                                                    <Link to={`/appointment/start/${appointment._id}`}>
                                                        <Button className={classes.button} variant="contained" color="primary" >Start Session</Button>
                                                    </Link>
                                                    <Button className={classes.button} variant="contained" color="secondary" onClick={() => deleteAppointment(appointment._id)} >Cancel</Button>
                                                </AccordionDetails>
                                            </Accordion>
                                        )
                                    })}
                                </Paper>
                            </Grid>
                        </>
                    )}
            </Grid>
        </div >
    );
}

export default Appointment;