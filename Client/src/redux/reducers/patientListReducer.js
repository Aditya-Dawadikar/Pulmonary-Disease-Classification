import {actions} from '../constants/patientListConstants'

export const patientListReducer=(state={},action)=>{
    switch(action.type){
        case actions.GET_ALL_PATIENTS:
            return {allPatients:action.payload}
        case actions.GET_PATIENTS_WITH_FILTER:
            return {}
        case actions.ADD_NEW_PATIENT:
            return {
                //appending new patient to the allPatients list in store
                allPatients:[...state.allPatients,action.payload]
            }
        case actions.DELETE_PATIENT:
            return {
                allPatients:state.allPatients.filter((patient)=>{
                    return patient!==action.payload
                })
            }
        default:
            return state
    }
}