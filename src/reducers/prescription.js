import * as actionType from '../constants/actionTypes';

const prescriptionReducer = (prescriptions = [], action) => {
    switch (action.type) {
        case actionType.ADD_PRESCRIPTION:
            return null;
        case actionType.GET_PRESCRIPTION_FOR_APPOINTMENT:
            return action.payload;
        case actionType.PATIENT_PRESCRIPTIONS:
            return action.payload;
        default:
            return prescriptions;
    }
};

export default prescriptionReducer;