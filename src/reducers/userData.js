import * as actionType from '../constants/actionTypes';

const userDataReducer = (userData = [], action) => {
    switch (action.type) {
        case actionType.ADD_USER_DATA:
            return action.payload;
        case actionType.GET_USER_DATA:
            return action.payload;
        default:
            return userData;
    }
};

export default userDataReducer;