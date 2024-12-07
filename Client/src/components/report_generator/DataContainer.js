import React, { useState, useEffect } from 'react';

import DataTable from './DataTable';
import DataVisualizer from './DataVisualizer';

import { useDispatch, useSelector } from 'react-redux';
import { updateSegmentAction } from '../../redux/actions/audioEditorActions'
import { computeDiagnosisSummary } from '../../redux/actions/diagnosisAction'

import { toast } from 'react-toastify'

import { predict } from '../../services/AudioAnalysisAPI'

const DataContainer = ({ segid }) => {

    const dispatch = useDispatch()

    // {
    //     name:"",
    //     abnormality:0,
    //     diagnosis:0,
    //     severity:0,
    //     signaldata:[],
    //     samplingrate:0,
    //     analysis:{}
    //     isAnalysed:false
    // }
    const segment = useSelector((state) => state.allSegments.allSegments[segid])
    const [isFetched, setisFetched] = useState(false)
    useEffect(() => {
        if (typeof segListFromStore[segid].analysis !== undefined && typeof segListFromStore[segid].data !== undefined) {
            setisFetched(true)
        } else {
            setisFetched(false)
        }
    }, [segid])

    const abnormality = ['crackles', 'wheezes', 'normal']
    const disorder = ['asthma', 'bronchiectasis', 'bronchiolitis', 'fibrosis', 'healthy', 'pneumonia']
    const segListFromStore = useSelector((state) => state.allSegments.allSegments)

    useEffect(() => {
        function getDisorder(datamap) {
            if (typeof datamap !== 'undefined') {
                let values = Object.values(datamap)
                let index = values.indexOf(Math.max(...values))
                if (values[index] !== 0)
                    return disorder[index]
            }
            return null
        }

        function getAbnormality(datamap) {
            if (typeof datamap !== 'undefined') {
                let values = Object.values(datamap)
                let index = values.indexOf(Math.max(...values))
                if (values[index] !== 0)
                    return abnormality[index]
            }
            return null
        }

        function getAnalysis() {
            if (segment.isAnalysed === false) {
                predict(segment.data, segment.samplingrate)
                    .then(res => {
                        console.log(res.data)
                        let updatedSegments = segListFromStore

                        updatedSegments[segid].analysis.summary.abnormality = getAbnormality(res.data.abnormality)
                        updatedSegments[segid].analysis.summary.disorder = getDisorder(res.data.disorder)
                        updatedSegments[segid].analysis.abnormality = res.data.abnormality
                        updatedSegments[segid].analysis.disorder = res.data.disorder
                        updatedSegments[segid].analysis.severity = res.data.severity
                        updatedSegments[segid].isAnalysed = true
                        updatedSegments[segid].name = res.data.segment_id

                        dispatch(updateSegmentAction(updatedSegments))
                        dispatch(computeDiagnosisSummary(segListFromStore))
                        toast.success("Data analysed successfully, scroll down for more...")
                    }).catch(err => {
                        console.log(err)
                    })
            }
        }
        getAnalysis()
    }, [])

    return <div className='row'>
        <div className='col'>
            <b className='h4'>Summary</b>
            {
                isFetched === true ? <ul className='list-group'>
                    <li className='list-group-item'>
                        <div className='row'>
                            <div className='col text-end'>
                                <b>Segment Name :</b>
                            </div>
                            <div className='col text-break text-primary'>
                                {segListFromStore[segid].name || ""}
                            </div>
                        </div>
                    </li>
                    {/* <li className='list-group-item'>
                        <div className='row'>
                            <div className='col text-end'>
                                <b>Abnormality :</b>
                            </div>
                            <div className='col'>
                                {segListFromStore[segid].analysis.summary.abnormality || ""}
                            </div>
                        </div>
                    </li> */}
                    <li className='list-group-item'>
                        <div className='row'>
                            <div className='col text-end'>
                                <b>Disorder :</b>
                            </div>
                            <div className='col'>
                                {segListFromStore[segid].analysis.summary.disorder || ""}
                            </div>
                        </div>
                    </li>
                </ul> : <></>
            }
        </div>
        {/* <div className='col'>
            <DataVisualizer index={segid} />
        </div> */}
        <div className='col'>
            <b className='h4'>Disorder Analysis</b>
            {
                isFetched === true ? <ul className='list-group'>
                    {
                        Object.keys(segListFromStore[segid].analysis.disorder).map((key, it) => {
                            return <li className='list-group-item'>
                                <div className='row'>
                                    <div className='col text-end'>
                                        <b>{Object.keys(segListFromStore[segid].analysis.disorder)[it]} :</b>
                                    </div>
                                    <div className='col'>
                                        {(Object.values(segListFromStore[segid].analysis.disorder)[it] * 100)}%
                                    </div>
                                </div>
                            </li>
                        })
                    }
                </ul> : <></>
            }
        </div>
        <div className='col'>
            
        </div>
    </div>

};

export default DataContainer;

// 
{/* <b className='h4'>Abnormality Analysis</b>
            {
                isFetched === true ? <ul className='list-group'>
                    {
                        Object.keys(segListFromStore[segid].analysis.abnormality).map((key, it) => {
                            return <li className='list-group-item'>
                                <div className='row'>
                                    <div className='col text-end'>
                                        <b>{Object.keys(segListFromStore[segid].analysis.abnormality)[it]} :</b>
                                    </div>
                                    <div className='col'>
                                        {(Object.values(segListFromStore[segid].analysis.abnormality)[it] * 100)}%
                                    </div>
                                </div>
                            </li>
                        })
                    }
                </ul> : <></>
            } */}