import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Typography, Paper, Grid, TextField, Button, Container, InputAdornment } from '@material-ui/core';

import { addUserData } from '../../actions/userData';
import * as actionType from '../../constants/actionTypes';

import useStyles from './styles';

const CompleteProfile = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [formData, setFormData] = useState({ weight: '', height: '', qualification: '', address: '', dob: '', experience: '', knownDiseases: '' })

    if (user.result.profileStatus) {
        history.push('/dashboard');
    }
    if (!user?.result) {
        history.push('/');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addUserData(formData, user.result.type, user.result._id));
        dispatch({ type: actionType.LOGOUT });
        history.push('/');
        setUser(null);
    }

    return (
        <div>
            <Container component="main" maxWidth="md">
                <Paper className={classes.paper} elevation={12} justify>
                    <Typography variant="h5" align="center">Complete Your Profile</Typography>
                    <form className={classes.form} align="center" onSubmit={handleSubmit}>
                        {user?.result.type === 'patient' ? (
                            <>
                                <Grid xs={12} align="center">
                                    <Grid item xs={5}  >
                                        <TextField className={classes.tf} label="Weight" InputProps={{ endAdornment: <InputAdornment position="end">kgs</InputAdornment> }} value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: e.target.value })} required fullWidth variant="outlined" />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <TextField className={classes.tf} label="Height" InputProps={{ endAdornment: <InputAdornment position="end">cms</InputAdornment> }} value={formData.height} onChange={(e) => setFormData({ ...formData, height: e.target.value })} required fullWidth variant="outlined" />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <TextField className={classes.tf} label="Known Diseases" value={formData.knownDiseases} onChange={(e) => setFormData({ ...formData, knownDiseases: e.target.value })} required fullWidth variant="outlined" />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <TextField className={classes.tf} label="Date of Birth" InputProps={{ endAdornment: <InputAdornment position="end">dd-mm-yyyy</InputAdornment> }} value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} required fullWidth variant="outlined" />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <TextField className={classes.tf} label="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} required fullWidth variant="outlined" />
                                    </Grid>
                                </Grid>
                            </>
                        ) : (
                                <> <Grid xs={12} align="center">
                                    <Grid item xs={5}  >
                                        <TextField className={classes.tf} label="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} required fullWidth variant="outlined" />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <TextField className={classes.tf} label="Qualification" value={formData.qualification} onChange={(e) => setFormData({ ...formData, qualification: e.target.value })} required fullWidth variant="outlined" />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <TextField className={classes.tf} InputProps={{ endAdornment: <InputAdornment position="end">years</InputAdornment> }} label="Experience" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} required fullWidth variant="outlined" />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <TextField className={classes.tf} InputProps={{ endAdornment: <InputAdornment position="end">dd-mm-yyyy</InputAdornment> }} label="Date of Birth" value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} required fullWidth variant="outlined" />
                                    </Grid>
                                </Grid>
                                </>
                            )}
                        <Button type="submit" variant="contained" color="primary" className={classes.submit}>Submit Data</Button>
                    </form>
                </Paper>
            </Container>
        </div >
    )
}

export default CompleteProfile
