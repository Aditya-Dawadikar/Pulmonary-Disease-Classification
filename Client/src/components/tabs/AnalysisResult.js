import React from 'react';
import DataContainer from '../report_generator/DataContainer'

import { useSelector } from 'react-redux';

const AnalysisResult = () => {

    const segListFromStore = useSelector((state) => state.allSegments.allSegments)

    return <ul className='list-group'>
        {
            segListFromStore.map((segment, index) => {
                return <li key={index} className='list-group-item'>
                    <DataContainer segid={index} />
                </li>
            })
        }
    </ul>
};

export default AnalysisResult;
