import React from 'react';
import ClinicianIcon from '../../../assets/icons/doctor.png'

const ClinicianVertical = (props) => {

    return <div className='p-2'>
        <p className='h5'>Dr. {props.clinician.name}</p>
        <div>{props.clinician.degree}</div>
    </div>;
};

export default ClinicianVertical;
