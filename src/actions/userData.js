import { ADD_USER_DATA, LOGOUT, GET_USER_DATA } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const addUserData = (formData, type, id) => async (dispatch) => {
    try {

        const { data } = await api.addUserData(formData, type, id);
        dispatch({ type: ADD_USER_DATA, payload: data });
        dispatch({ type: LOGOUT, payload: null });

    } catch (error) {
        console.log(error);
    }
};

export const getUserData = (id) => async (dispatch) => {
    try {
        const { data } = await api.getUserData(id);

        dispatch({ type: GET_USER_DATA, payload: data })
    } catch (error) {

    }
}

