import * as actionType from '../constants/actionTypes';

const patientReducer = (patient = [], action) => {
    switch (action.type) {
        case actionType.GET_ALL_PATIENTS:
            return action.payload;
        default:
            return patient;
    }
};

export default patientReducer;