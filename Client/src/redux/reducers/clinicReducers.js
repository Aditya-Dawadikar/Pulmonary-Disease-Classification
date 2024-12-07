import { CLINIC_LOGIN_FAIL, CLINIC_LOGIN_REQUEST, CLINIC_LOGIN_SUCCESS, CLINIC_LOGOUT, CLINIC_REGISTER_FAIL, CLINIC_REGISTER_REQUEST, CLINIC_REGISTER_SUCCESS } from "../constants/clinicConstants"

export const clinicLoginReducer = (state={ } , action) => {
    switch(action.type){
        case CLINIC_LOGIN_REQUEST :
            return { loading:true }
        case CLINIC_LOGIN_SUCCESS:
            return { loading:false, clinicInfo: action.payload }
        case CLINIC_LOGIN_FAIL :
            return { loading:false, error: action.payload }
        case CLINIC_LOGOUT :
            return {}
        default :
            return state;
    }
}

export const clinicRegisterReducer = (state={ } , action) => {
    switch(action.type){
        case CLINIC_REGISTER_REQUEST :
            return { loading:true }
        case CLINIC_REGISTER_SUCCESS:
            return { loading:false, clinicInfo: action.payload }
        case CLINIC_REGISTER_FAIL :
            return { loading:false, error: action.payload }
        default :
            return state;
    }
}