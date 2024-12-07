import React from 'react';
import { useSelector } from 'react-redux';

import SegmentForm from '../forms/SegmentForm';

const ManualDiagnosis = () => {

    const allSegments = useSelector((state)=>state.allSegments.allSegments)

    return <div id="manual-annotation">
        <p className='bg-warning text-center p-1'>
            The custom diagnosis data will be recorded and used to further improve the model. Wrong diagnosis will have catastrophic effects on future automated diagnosis
        </p>
        <ul className='list-group'>
            <li className='list-group-item active'>
                <div className='row'>
                    <div className='col'>Segment Name</div>
                    <div className='col'>Custom diagnosis</div>
                </div>
            </li>
            {
                allSegments.map((segment, index) => {
                    return <li key={index} className='list-group-item'>
                        <SegmentForm index={index} />
                    </li>
                })
            }
        </ul>
    </div>
};

export default ManualDiagnosis;
