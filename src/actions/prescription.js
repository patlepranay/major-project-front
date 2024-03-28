import { ADD_PRESCRIPTION, ADD_PRESCRIPTION_TO_APPOINTMENT, GET_PRESCRIPTION_FOR_APPOINTMENT } from '../constants/actionTypes';
import * as api from '../api/index.js';
import xtype from 'xtypejs';

export const addPrescription = (formData) => async (dispatch) => {
    try {
        const appointmentId = formData.appointmentId;
        const dataPrescription = await api.addPrescription(formData);
        console.log(dataPrescription);

        const { data } = await api.addPrescriptionToAppointment({ appointmentId: appointmentId, prescriptionId: dataPrescription.data._id })

        dispatch({ type: ADD_PRESCRIPTION, payload: dataPrescription.data });
        if (xtype.type(data) === 'object') {
            const array = [];
            array.push(data);
            dispatch({ type: ADD_PRESCRIPTION_TO_APPOINTMENT, payload: array });
        }
        else {
            dispatch({ type: ADD_PRESCRIPTION_TO_APPOINTMENT, payload: data });
        }
    } catch (error) {
        console.log(error);
    }
};

export const getAppointmentPrescriptionById = (id) => async (dispatch) => {
    try {
        const { data } = await api.getAppointmentPrescriptionById(id);

        dispatch({ type: GET_PRESCRIPTION_FOR_APPOINTMENT, payload: data });
    } catch (error) {
        console.log(error);
    }

}
