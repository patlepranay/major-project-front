import { BOOK_APPOINTMENT, GET_APPOINTMENT_FOR_DOCTOR_ID, END_APPOINTMENT, PATIENT_PRESCRIPTIONS, APPROVE_APPOINTMENT_BY_ID, GET_APPOINTMENT_FOR_PATIENT_ID, DELETE_APPOINTMENT_BY_ID, GET_APPOINTMENT_FOR_ID } from '../constants/actionTypes';
import * as api from '../api/index.js';
import xtype from 'xtypejs'


export const bookAppointment = (formData) => async (dispatch) => {
    try {
        const { data } = await api.bookAppointment(formData);
        dispatch({ type: BOOK_APPOINTMENT, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const getAppointmentById = (id) => async (dispatch) => {
    try {
        const { data } = await api.getAppointmentById(id);
        if (xtype.type(data) === 'object') {
            const array = [];
            array.push(data);
            dispatch({ type: GET_APPOINTMENT_FOR_ID, payload: array });
        }
        else
            dispatch({ type: GET_APPOINTMENT_FOR_ID, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};


export const getAppointmentForDoctorId = (id) => async (dispatch) => {
    try {
        const { data } = await api.getAppointmentForDoctorId(id);
        if (xtype.type(data) === 'object') {
            const array = [];
            array.push(data);
            dispatch({ type: GET_APPOINTMENT_FOR_DOCTOR_ID, payload: array });
        }

        dispatch({ type: GET_APPOINTMENT_FOR_DOCTOR_ID, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const getAppointmentForPatientId = (id) => async (dispatch) => {
    try {
        const { data } = await api.getAppointmentForPatientId(id);

        dispatch({ type: GET_APPOINTMENT_FOR_PATIENT_ID, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const approveAppointmentById = (id, appointment) => async (dispatch) => {
    try {
        const { data } = await api.approveAppointmentById(id, appointment);

        dispatch({ type: APPROVE_APPOINTMENT_BY_ID, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const deleteAppointmentById = (id) => async (dispatch) => {
    try {
        await api.deleteAppointmentById(id);
        dispatch({ type: DELETE_APPOINTMENT_BY_ID, payload: id })
    } catch (error) {
        console.log(error);
    }
}

export const endAppointment = (id) => async (dispatch) => {
    try {
        await api.endAppointment(id);
        dispatch({ type: END_APPOINTMENT, payload: id })
    } catch (error) {
        console.log(error);
    }
}

export const sendEmail = (data) => async (dispatch) => {
    try {
        await api.sendEmail(data);
    } catch (error) {
        console.log(error);
    }
}
export const sendOtp = (data) => async (dispatch) => {
    try {
        await api.sendOtp(data);
    } catch (error) {
        console.log(error);
    }
}

export const verifyOtp = (otp, id) => async (dispatch) => {
    try {
        const { data } = await api.verifyOtp(otp, id);
        if (xtype.type(data) === 'object') {
            const array = [];
            array.push(data);
            dispatch({ type: PATIENT_PRESCRIPTIONS, payload: array });
        }
        else {
            dispatch({ type: PATIENT_PRESCRIPTIONS, payload: data });
        }
    } catch (error) {
        console.log(error);
    }
}




