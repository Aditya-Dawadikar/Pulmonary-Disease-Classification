import { CLINIC_LOGIN_FAIL, CLINIC_LOGIN_REQUEST, CLINIC_LOGIN_SUCCESS, CLINIC_REGISTER_FAIL, CLINIC_REGISTER_REQUEST, CLINIC_REGISTER_SUCCESS } from "../constants/clinicConstants"
import axios from 'axios';

export const login = (email, password) => async(dispatch) => {
    // const base_url="http://locahost:5000/"
    try{
        dispatch({
            type: CLINIC_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`http://localhost:5000/api/clinics/login`,{email,password},config);
        console.log(data);
        dispatch({
            type: CLINIC_LOGIN_SUCCESS,
            payload: data
        })
        

        localStorage.setItem('clinicInfo',JSON.stringify(data));
    }catch(error){
        dispatch({
            type: CLINIC_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message :error.response
        })
    }
}

export const register = (name,phone,email,password,address) => async(dispatch) => {
    try{
        dispatch({
            type: CLINIC_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`${process.env.REACT_APP_LOCAL_APPLICATION_SERVER}/api/clinics`,{
            name,phone,email,password,address
        }, config );

        console.log(data);
        dispatch({
            type: CLINIC_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: CLINIC_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('clinicInfo',JSON.stringify(data));
    }catch(error){
        dispatch({
            type: CLINIC_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message :error.response
        })
    }
}