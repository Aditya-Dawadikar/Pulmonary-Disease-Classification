import actions from '../constants/reportGenerationConstants'

export const reportGenerationReducer=(state,action)=>{
    switch(action.type){
        case actions.REPORT_DATA_SENT:
            return {}

        default:
            return state
    }
}