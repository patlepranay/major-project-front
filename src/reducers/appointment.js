import * as actionType from '../constants/actionTypes';

const appointmentReducer = (appointments = [], action) => {
    switch (action.type) {
        case actionType.GET_APPOINTMENT_FOR_ID:
            return action.payload;
        case actionType.BOOK_APPOINTMENT:
            return [...appointments, action.payload];
        case actionType.ADD_PRESCRIPTION_TO_APPOINTMENT:
            return action.payload;
        case actionType.GET_APPOINTMENT_FOR_DOCTOR_ID:
            return action.payload;
        case actionType.GET_APPOINTMENT_FOR_PATIENT_ID:
            return action.payload;
        case actionType.APPROVE_APPOINTMENT_BY_ID:
            return appointments.map((appointment) => (appointment._id === action.payload._id ? action.payload : appointment));
        case actionType.DELETE_APPOINTMENT_BY_ID:
            return appointments.filter((appointment) => appointment._id !== action.payload);
        case actionType.END_APPOINTMENT:
            return appointments;
        default:
            return appointments;
    }
};

export default appointmentReducer;