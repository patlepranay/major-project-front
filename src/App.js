import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import AuthPatient from './components/Auth/Patient/Auth';
import AuthDoctor from './components/Auth/Doctor/Auth';
import History from './components/History/History';
import Search from './components/Search/Search';
import CompleteProfile from './components/CompleteProfile/CompleteProfile';
import Appointment from './components/Appointment/Appointment';
import StartAppointment from './components/StartAppointment/StartAppointment';

import useStyles from './styles';




const App = () => {
  const classes = useStyles();

  return (
    < div className={classes.root} >
      <BrowserRouter>
        <Navbar />
        <main className={classes.content} >

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/auth/patient" exact component={AuthPatient} />
            <Route path="/auth/doctor" exact component={AuthDoctor} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/history" exact component={History} />
            <Route path="/search" exact component={Search} />
            <Route path="/appointment" exact component={Appointment} />
            <Route path="/completeProfile" exact component={CompleteProfile} />
            <Route path="/appointment/start/:id" exact component={StartAppointment} />
          </Switch>

        </main>
      </BrowserRouter>
    </div >

  );
}

export default App;