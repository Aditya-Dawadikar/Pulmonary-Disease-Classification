import actions from '../constants/consultancyConstants'

export const setCurrentClinician=(clinician)=>(dispatch)=>{
    dispatch({
        type:actions.SELECT_CURR_CLINICIAN,
        payload: clinician
    })
}

export const setCurrentPatient=(patient)=>(dispatch)=>{
    dispatch({
        type:actions.SELECT_CURR_PATIENT,
        payload: patient
    })
}

export const setConsultancyHighlights=(note,summary,symptoms)=>(dispatch)=>{
    dispatch({
        type:actions.ADD_CONSULTANCY_HIGHLIGHTS,
        payload: {
            note:note,
            symptoms:symptoms,
            summary:summary
        }
    })
}