import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from 'react-bootstrap'
import LineGraph from './graphs/LineGraph';

import { useSelector } from 'react-redux';

const DataVisualizer = ({ index }) => {

    const allSegments = useSelector((state) => state.allSegments.allSegments)
    const [isFetched, setisFetched] = useState(false)

    useEffect(() => {
        if (typeof allSegments[index].analysis !== undefined && typeof allSegments[index].data !== undefined) {
            setisFetched(true)
        } else {
            setisFetched(false)
        }
    }, [index])

    return <>{
        isFetched === true ? <Tabs defaultActiveKey="Diagnosis" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="Diagnosis" title="Diagnosis" style={{ minHeight: "250px" }}>
                <ul className='list-group'>
                    {
                        Object.keys(allSegments[index].analysis.disorder).map((key, it) => {
                            return <li className='list-group-item'>
                                <div className='row'>
                                    <div className='col text-end'>
                                        {Object.keys(allSegments[index].analysis.disorder)[it]}
                                    </div>
                                    <div className='col'>
                                        {(Object.values(allSegments[index].analysis.disorder)[it] * 100).toPrecision(2)}%
                                    </div>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </Tab>
            <Tab eventKey="Abnormality" title="Abnormality" style={{ minHeight: "250px" }}>
                <ul className='list-group'>
                    {
                        Object.keys(allSegments[index].analysis.abnormality).map((key, it) => {
                            return <li className='list-group-item'>
                                <div className='row'>
                                    <div className='col text-end'>
                                        {Object.keys(allSegments[index].analysis.abnormality)[it]}
                                    </div>
                                    <div className='col'>
                                        {(Object.values(allSegments[index].analysis.abnormality)[it] * 100).toPrecision(2)}%
                                    </div>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </Tab>
            <Tab eventKey="Waveform" title="Waveform" style={{ minHeight: "250px" }}>
                <LineGraph data={allSegments[index].data} />
            </Tab>
        </Tabs> : <></>
    }</>
};

export default DataVisualizer;
