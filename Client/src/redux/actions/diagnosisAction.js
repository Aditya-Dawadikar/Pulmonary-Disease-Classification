import actions from "../constants/diagnosisConstants";

export const computeDiagnosisSummary = (allSegments) => async (dispatch) => {
    try {
        let analysisObjectList = []
        for (let i = 0; i < allSegments.length; i++) {
            analysisObjectList.push(allSegments[i].analysis)
        }
        let disorderClassLabels = Object.keys(analysisObjectList[0].disorder)
        let abnormalityClassLabels = Object.keys(analysisObjectList[0].abnormality)

        let disorderClassValues = new Array(disorderClassLabels.length).fill(0)
        let abnormalityClassValues = new Array(abnormalityClassLabels.length).fill(0)

        for (let i = 0; i < analysisObjectList.length; i++) {
            let disorderRow = Object.values(analysisObjectList[i].disorder)
            let abnormalityRow = Object.values(analysisObjectList[i].abnormality)

            for (let j = 0; j < disorderRow.length; j++) {
                disorderClassValues[j] += disorderRow[j]
            }
            for (let j = 0; j < abnormalityRow.length; j++) {
                abnormalityClassValues[j] += abnormalityRow[j]
            }
        }

        for (let i = 0; i < disorderClassValues.length; i++) {
            disorderClassValues[i] = parseFloat((disorderClassValues[i] / allSegments.length).toPrecision(4))
        }

        for (let i = 0; i < abnormalityClassValues.length; i++) {
            abnormalityClassValues[i] = parseFloat((abnormalityClassValues[i] / allSegments.length).toPrecision(4))
        }

        let summaryObject = {
            abnormality: {
                class: abnormalityClassLabels,
                probabilities: abnormalityClassValues
            }, disorder: {
                class: disorderClassLabels,
                probabilities: disorderClassValues
            }
        }

        dispatch({
            type: actions.COMPUTE_SUMMARY,
            payload:{
                summary:summaryObject
            }
        })

    } catch(err){
        console.log(err)
    }
}