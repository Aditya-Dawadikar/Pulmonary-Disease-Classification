import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deletePatientAction } from '../../../redux/actions/patientListActions'

import { AiOutlineLink } from 'react-icons/ai'
import {BsFillTrashFill} from 'react-icons/bs'


const PatientHorizontal = (props) => {

    const dispatch = useDispatch()

    const visitPatientProfile = () => {
        window.location.href = "/clinic/patient";
    }

    const deletePatient = () => {
        var result = window.confirm("Are you sure, you want to delete?");
        if (result) {
            dispatch(deletePatientAction(props.patient))
        }
    }

    return (
        <div className='row'>
            {/* <div className="col">
                <img src={PatientIcon} style={{width:"40px"}}/>
            </div> */}
            <div className="col text-primary">{props.patient.patient_id}</div>
            <div className="col">{props.patient.name}</div>
            <div className="col">
                <div className='btn m-1'><Link className='text-decoration-none' to={`/clinic/patient?id=${props.patient.patient_id}`}><AiOutlineLink className='m-1'/>Visit</Link></div>
                <div className='btn m-1' onClick={() => { deletePatient() }}><BsFillTrashFill className='m-1'/>Delete</div>
            </div>
        </div>
    )
}

export default PatientHorizontal
