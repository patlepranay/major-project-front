import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Typography, Paper, Grid, Divider, Table, TableRow, TableCell, TableBody, TableContainer } from '@material-ui/core';

import { getUserData } from '../../actions/userData'

import useStyles from './styles';


const Dashboard = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const userData = useSelector((state) => state.userData);
    const [user] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        if (user?.result.profileStatus) {
            dispatch(getUserData(user.result.userDataId))
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
                        <Typography variant="h5" align="center">Welcome to the dashboard</Typography>
                    </Paper>
                </Grid>
                {user.result.type === 'patient' ? (
                    <>
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes.paper} elevation={12} justify>
                                <Typography className={classes.tf} variant="h4" align="center">Patient Details</Typography>
                                <Divider></Divider>
                                <Grid item xs={12} sm={12}>
                                    <TableContainer component={Paper} elevation={4}>
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell align="left">Name:</TableCell>
                                                    <TableCell align="left">{user.result.name}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Unique Id:</TableCell>
                                                    <TableCell align="left">{user.result._id}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Date of Birth:</TableCell>
                                                    <TableCell align="left">{userData.dob}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Weight:</TableCell>
                                                    <TableCell align="left">{userData.weight} kgs</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Height:</TableCell>
                                                    <TableCell align="left">{userData.height} cms</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Known Diseases:</TableCell>
                                                    <TableCell align="left">{userData.knownDiseases}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Address:</TableCell>
                                                    <TableCell align="left">{userData.address}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Paper>
                        </Grid>
                    </>
                ) : (
                        <>
                            <Grid item xs={12} sm={6}>
                                <Paper className={classes.paper} elevation={12} justify>
                                    <Typography className={classes.tf} variant="h4" align="center">Doctor Details</Typography>

                                    <Divider></Divider>
                                    <Grid item xs={12} sm={12}>
                                        <TableContainer component={Paper} elevation={4}>
                                            <Table className={classes.table} aria-label="simple table">
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell align="left">Name:</TableCell>
                                                        <TableCell align="left">{user.result.name}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="left">Unique Id:</TableCell>
                                                        <TableCell align="left">{user.result._id}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="left">Experience:</TableCell>
                                                        <TableCell align="left">{userData.experience} years</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="left">Qualification</TableCell>
                                                        <TableCell align="left">{userData.qualification}</TableCell>
                                                    </TableRow>

                                                    <TableRow>
                                                        <TableCell align="left">Address:</TableCell>
                                                        <TableCell align="left">{userData.address}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </>
                    )}
                < Grid item xs={12} sm={6}>
                    <Paper className={classes.paper} elevation={12} justify>
                        <Typography className={classes.tf} variant="h4" align="center">{user.result.type === 'doctor' ? ("Doctor Details 2") : ("Patient Details 2")}</Typography>
                        <Divider></Divider>
                        <Grid item xs={12} sm={12}>
                            <TableContainer component={Paper} elevation={4}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="left">Dummy Data:</TableCell>
                                            <TableCell align="left">{userData._id}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left">Dummy Data</TableCell>
                                            <TableCell align="left">{userData._id}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left">Dummy Data</TableCell>
                                            <TableCell align="left">{userData._id}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left">Dummy Data</TableCell>
                                            <TableCell align="left">{userData._id}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left">Dummy Data</TableCell>
                                            <TableCell align="left">{userData._id}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left">Dummy Data</TableCell>
                                            <TableCell align="left">{userData._id}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Paper>
                </Grid>

            </Grid >
        </div >
    );
}

export default Dashboard