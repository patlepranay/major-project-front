import * as actionType from '../constants/actionTypes';

const doctorReducer = (doctor = [], action) => {
    switch (action.type) {
        case actionType.GET_ALL_DOCTORS:
            return action.payload;
        default:
            return doctor;
    }
};

export default doctorReducer;