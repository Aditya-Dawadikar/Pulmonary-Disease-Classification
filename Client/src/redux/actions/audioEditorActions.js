import {actions} from '../constants/audioEditorConstants'

export const addSegmentAction=(segment)=>async(dispatch)=>{
    try{
        dispatch({
            type:actions.ADD_SEGMENT,
            payload:segment
        })
    }catch(err){
        console.log(err)
    }
}

export const deleteSegmentAction=(segment)=>async(dispatch)=>{
    try{
        dispatch({
            type:actions.DELETE_SEGMENT,
            payload:segment
        })
    }catch(err){
        console.log(err)
    }
}

export const updateSegmentAction=(allsegments)=>async(dispatch)=>{
    try{
        dispatch({
            type:actions.UPDATE_SEGMENT,
            payload:allsegments
        })
    }catch(err){
        console.log(err)
    }
}