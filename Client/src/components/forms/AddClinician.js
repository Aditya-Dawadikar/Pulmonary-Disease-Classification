import React, { useState } from 'react'

import {Modal, Button } from 'react-bootstrap'

import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addClinicianAction } from '../../redux/actions/clinicianListActions'

const AddClinician = (props) => {
    const dispatch = useDispatch();

    const formDefault = {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        qualification: ""
    }
    const [clinician, setclinician] = useState(formDefault)

    const handleClinicianFormOnChange = (e) => {
        setclinician({ ...clinician, [e.target.name]: e.target.value })
    }

    const addNewClinician = () => {
        if (validateForm()) {
            console.log(clinician)
            alert("patient saved successfully")
            setclinician(formDefault)
            let clinician_object = clinician
            clinician_object.name = clinician.firstname + " " + clinician.lastname
            dispatch(addClinicianAction(clinician))
            toast.success("added clinician successfully!")
        }
    }

    function validateForm() {
        const nameRegex = /^[A-Za-z]+$/
        const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
        const phoneRegex = /^[0-9]{10}$/

        if (!nameRegex.test(clinician.firstname) || clinician.firstname === "") {
            toast.error("firstname is invalid")
            return false
        }
        else if (!nameRegex.test(clinician.lastname) || clinician.lastname === "") {
            toast.error("lastname is invalid")
            return false
        }
        else if (!phoneRegex.test(clinician.phone) || clinician.phone === "") {
            toast.error("phone number is invalid")
            return false
        }
        else if (!emailRegex.test(clinician.email) || clinician.email === "") {
            toast.error("email is invalid")
            return false
        }
        else if (clinician.qualification === '') {
            toast.error("adding qualification is mandatory")
            return false
        } else {
            return true
        }
    }

    return <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter-clinician"
        centered
    > <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter-clinician">
                Add Cliniaian
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
                <br />
                <div className="row">
                    <div className='col'>
                        <label className="form-label">First Name</label>
                        <input type='text' placeholder='John' className="form-control col" value={clinician.firstname} name='firstname' onChange={(e) => { handleClinicianFormOnChange(e) }}></input>
                    </div>
                    <div className='col'>
                        <label className="form-label">Last Name</label>
                        <input type='text' placeholder='Doe' className="form-control col" value={clinician.lastname} name='lastname' onChange={(e) => { handleClinicianFormOnChange(e) }}></input>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className='col'>
                        <label className="form-label">Phone</label>
                        <input type='text' placeholder='9850xxxxxx' className="form-control col" value={clinician.phone} name='phone' onChange={(e) => { handleClinicianFormOnChange(e) }}></input>
                    </div>
                    <div className='col'>
                        <label className="form-label">Email</label>
                        <input type='email' placeholder='johndoe@gmail.com' className="form-control col" value={clinician.email} name='email' onChange={(e) => { handleClinicianFormOnChange(e) }}></input>
                    </div>
                </div>
                <br/>
                <label className="form-label">Qualification</label>
                <input type='text' placeholder='eg: MBBS' className='form-control' value={clinician.qualification} name='qualification' onChange={(e) => { handleClinicianFormOnChange(e) }}></input>
                <br />
            </form>
        </Modal.Body>
        <Modal.Footer>
            <div className='btn std-border m-1' onClick={() => { addNewClinician() }}>Save</div>
            <div className='btn std-border m-1' onClick={props.onHide}>Close</div>
        </Modal.Footer>
    </Modal>
}

export default AddClinician