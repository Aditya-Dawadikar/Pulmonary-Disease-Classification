import actions from "../constants/diagnosisConstants";

export const diagnosisReducer = (state={},action)=>{
    switch(action.type){
        case actions.COMPUTE_SUMMARY:
            return {...state,summary:action.payload.summary}
        default:
            return {...state}
    }
}