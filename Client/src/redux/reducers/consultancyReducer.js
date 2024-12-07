import actions from '../constants/consultancyConstants'

export const clinicianReducer = (state={},action)=>{
    switch(action.type){
        case actions.SELECT_CURR_CLINICIAN:
            return {currClinician:action.payload}
        default:
            return state
    }
}

export const patientReducer = (state={},action)=>{
    switch(action.type){
        case actions.SELECT_CURR_PATIENT:
            return {currPatient:action.payload}
        default:
            return state
    }
}

export const consulatancyHighlightsReducer = (state={},action)=>{
    switch(action.type){
        case actions.ADD_CONSULTANCY_HIGHLIGHTS:
            return {consultancyHighlights:action.payload}
        default:
            return state
    }
}