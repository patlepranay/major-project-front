import { combineReducers } from 'redux';


import auth from './auth';
import doctor from './doctor';
import patient from './patient';
import appointment from './appointment';
import prescription from './prescription';
import userData from './userData';
export const reducers = combineReducers({ auth, doctor, patient, appointment, prescription, userData });