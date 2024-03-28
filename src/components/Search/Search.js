import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Typography, Paper, Grid, TextField, Button, MenuItem, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { bookAppointment, getAppointmentForPatientId } from '../../actions/appointment';
import { getAllDoctors } from '../../actions/users';

import useStyles from './styles';



const Search = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [user] = useState(JSON.parse(localStorage.getItem('profile')));
    const [formData, setFormData] = useState({ doctorId: '', date: '', time: '', patientId: user.result._id, status: false });

    const doctors = useSelector((state) => state.doctor);
    const appointments = useSelector((state) => state.appointment);


    useEffect(() => {
        dispatch(getAllDoctors());
        dispatch(getAppointmentForPatientId(user?.result._id));
    },  // eslint-disable-next-line
        [dispatch]);

    if (!user?.result.profileStatus) {
        history.push('/completeProfile');
    }

    if (!user?.result) {
        history.push('/');
    }

    const clear = () => {
        setFormData({ doctorId: '', date: '', time: '', patientId: user.result._id });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(bookAppointment({ ...formData }));
        clear();
    }



    return (
        <div className={classes.content}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper} elevation={12} justify>
                        <Typography variant="h5" align="center">Welcome to the Search</Typography>
                    </Paper>
                </Grid>


                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper} elevation={12} justify>
                        <Typography className={classes.typo} variant="h5" align="center" >Search Doctors</Typography>
                        <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                            <TextField className={classes.tf} id="select" label="Doctor Name" value={formData.doctorId} required fullWidth variant="outlined" onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })} select>
                                {doctors.map((doctor) => (
                                    <MenuItem key={doctor._id} value={doctor._id}>{doctor.name} ({doctor.specialization})</MenuItem>
                                ))}
                            </TextField>
                            <TextField className={classes.tf}
                                id="time"
                                label="Appointment Date"
                                variant="outlined"
                                type="date"
                                required
                                inputProps={{ min: new Date().toISOString().slice(0, 10) }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                            <TextField className={classes.tf}
                                id="time"
                                variant="outlined"
                                label="Appointment Time"
                                type="time"
                                defaultValue={formData.time}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 600, // 5 min
                                }}
                                fullWidth
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            />
                            <Button className={classes.tf} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper} elevation={12} justify>
                        <Typography className={classes.typo} variant="h5" align="center">Pending Appointments</Typography>
                    </Paper>
                    {appointments.filter((appointment, index) => {
                        return (
                            appointment.approvalStatus === false
                        )
                    }).map((appointment) => (
                        <>
                            <Accordion className={!appointment.status ? classes.falseAccordion : null}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={classes.heading}>Appointment Id:{appointment._id}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Date: {appointment.date}
                                    </Typography>

                                </AccordionDetails>
                                <AccordionDetails>

                                    <Typography>
                                        Time: {appointment.time}
                                    </Typography>

                                </AccordionDetails>
                                <AccordionDetails>
                                    <Typography>
                                        Doctor Name: {doctors.map((doctor) => (doctor._id === appointment.doctorId ? doctor.name : null))}
                                    </Typography>
                                </AccordionDetails>
                                <AccordionDetails>
                                    <Typography>
                                        Approval Status: {appointment.approvalStatus ? ("Approved") : ("Not Approved")}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </>
                    ))}
                </Grid>
            </Grid>
        </div >
    );
}

export default Search