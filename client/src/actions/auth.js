import { AUTH,ERROR } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
       
        dispatch({ type: AUTH, data });

        router.push('/');
    } catch (error) {
        console.log(error);
        console.log(error.response)
        if(error.response.status == 404){
            dispatch({
                type:ERROR,
                payload:error.response.data.message
            })
        }
        else if (error.response.status == 400) {
            dispatch({
                type: ERROR,
                payload: error.response.data.message
            })
        }

    }
    
};

export const signup = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });

        router.push('/');
    } catch (error) {
        console.log(error);
    }
};