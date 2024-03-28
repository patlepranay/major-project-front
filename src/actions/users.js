import { GET_ALL_DOCTORS, GET_ALL_PATIENTS } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getAllDoctors = () => async (dispatch) => {
    try {
        const { data } = await api.getAllDoctors();
        dispatch({ type: GET_ALL_DOCTORS, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const getAllPatients = () => async (dispatch) => {
    try {
        const { data } = await api.getAllPatients();
        console.log(data);
        dispatch({ type: GET_ALL_PATIENTS, payload: data })
    } catch (error) {
        console.log(error);
    }
}