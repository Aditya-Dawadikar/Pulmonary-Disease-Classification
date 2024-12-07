import React from 'react'
import ClinicianIcon from '../../../assets/icons/doctor.png'
import DeleteIcon from '../../../assets/icons/delete.png'

import { AiOutlineLink } from 'react-icons/ai'
import {BsFillTrashFill} from 'react-icons/bs'

import { useDispatch } from 'react-redux'
import { deleteClinicianAction } from '../../../redux/actions/clinicianListActions'
import { Link } from 'react-router-dom'

const ClinicianHorizontal = (props) => {

    const dispatch = useDispatch()

    const deleteClinician = () => {
        var result = window.confirm("Are you sure, you want to delete?");
        if (result) {
            dispatch(deleteClinicianAction(props.clinician))
        }
    }

    return (
        <div className='row'>
            <div className="col text-primary">{props.clinician.doctor_id}</div>
            <div className="col">Dr. {props.clinician.name}</div>
            <div className="col">{props.clinician.degree}</div>
            <div className="col">
                <div className='btn m-1'>  <Link className='text-decoration-none' to={`/clinic/clinician?id=${props.clinician.doctor_id}`}><AiOutlineLink className='m-1'/>Visit</Link></div>
                <div className='btn m-1' onClick={() => { deleteClinician() }}><BsFillTrashFill className='m-1'/>Delete</div>
            </div>
        </div>
    )
}

export default ClinicianHorizontal
