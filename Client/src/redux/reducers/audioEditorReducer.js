import { actions } from "../constants/audioEditorConstants";

export const audioEditorReducer=(state={},action)=>{
    switch(action.type){
        case actions.ADD_SEGMENT:
            return {
                allSegments:[...state.allSegments,action.payload]
            }
        case actions.DELETE_SEGMENT:
            return {
                allSegments:state.allSegments.filter((seg)=>{
                    return seg!==action.payload
                })
            }
        case actions.UPDATE_SEGMENT:
            return {
                allSegments:action.payload
            }
        default:
            return state
    }
}