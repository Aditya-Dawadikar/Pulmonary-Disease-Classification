import {actions} from '../constants/clinicianListConstants'

export const clinicianListReducer=(state={},action)=>{
    switch(action.type){
        case actions.GET_ALL_CLINICIANS:
            return {allClinicians:action.payload}
        case actions.GET_CLINICIANS_WITH_FILTER:
            return {}
        case actions.ADD_NEW_CLINICIAN:
            return {allClinicians:[...state.allClinicians,action.payload]}
        case actions.DELETE_CLINICIAN:
            return {
                allClinicians:state.allClinicians.filter((clinician)=>{
                    return clinician!==action.payload
                })
            }
        default:
            return state
    }
}