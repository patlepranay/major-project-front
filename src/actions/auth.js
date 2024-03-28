import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index';

export const signinPatient = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signInPatient(formData);

        dispatch({ type: AUTH, data });

        router.push('/completeProfile');
    } catch (error) {
        alert("Invalid Credentials");
    }
};

export const signupPatient = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signUpPatient(formData);

        dispatch({ type: AUTH, data });

        router.push('/completeProfile');
    } catch (error) {
        console.log(error);
    }
};


export const signinDoctor = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signInDoctor(formData);
        console.log("From sign in actions");

        dispatch({ type: AUTH, data });

        router.push('/completeProfile');
    } catch (error) {
        alert("Invalid Credentials");

    }
};

export const signupDoctor = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signUpDoctor(formData);

        dispatch({ type: AUTH, data });

        router.push('/completeProfile');
    } catch (error) {
        console.log(error);
    }
};