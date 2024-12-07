import React, { useState } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'

import { addPatientAction } from '../../redux/actions/patientListActions'

import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const AddPatient = (props) => {
    const dispatch = useDispatch();

    const formDefault = {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        age: "",
        weight: "",
        gender: "",
        bloodgroup: ""
    }
    const [patient, setpatient] = useState(formDefault)
    const gender = ["none", "male", "female"]
    const bloodgroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

    const handlePatientFormOnChange = (e) => {
        setpatient({ ...patient, [e.target.name]: e.target.value })
    }

    const addNewPatient = () => {
        if (validateForm()) {
            alert("patient saved successfully")
            console.log(patient)
            let patient_object = patient
            patient_object.name= patient.firstname+" "+patient.lastname
            dispatch(addPatientAction(patient_object))
            setpatient(formDefault)
            toast.success("added patient successfully!")
        }
    }

    function validateForm() {
        const nameRegex = /^[A-Za-z]+$/
        const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
        const phoneRegex = /^[0-9]{10}$/

        if (!nameRegex.test(patient.firstname) || patient.firstname ==="") {
            toast.error("firstname is invalid")
            return false
        }
        else if (!nameRegex.test(patient.lastname) || patient.lastname ==="") {
            toast.error("lastname is invalid")
            return false
        }
        else if (!phoneRegex.test(patient.phone) || patient.phone === "") {
            toast.error("phone number is invalid")
            return false
        }
        else if (!emailRegex.test(patient.email) || patient.email === "") {
            toast.error("email is invalid")
            return false
        }
        else if (patient.age === '') {
            toast.error("age is mandatory")
            return false
        }
        else if (patient.weight === '') {
            toast.error("weight is mandatory")
            return false
        }
        else if (patient.gender === '') {
            toast.error("gender is mandatory")
            return false
        }
        else if (patient.bloodgroup === '') {
            toast.error("bloodgroup is mandatory")
            return false
        } else {
            return true
        }
    }

    return <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    ><Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Add Patient
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
                <div className="row">
                    <div className='col'>
                        <label className="form-label">First Name</label>
                        <input type='text' placeholder='John' pattern='^[A-Za-z]+$' className="form-control col" value={patient.firstname} name="firstname" onChange={(e) => { handlePatientFormOnChange(e) }}></input>
                    </div>
                    <div className='col'>
                        <label className="form-label">Last Name</label>
                        <input type='text' placeholder='Doe' className="form-control col" value={patient.lastname} name="lastname" onChange={(e) => { handlePatientFormOnChange(e) }}></input>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className='col-lg-6 col-sm-12'>
                        <label className="form-label">Phone</label>
                        <input type='text' placeholder='9850xxxxxx' className="form-control col" value={patient.phone} name="phone" onChange={(e) => { handlePatientFormOnChange(e) }}></input>
                    </div>
                    <div className='col-lg-6 col-sm-12'>
                        <label className="form-label">Email</label>
                        <input type='email' placeholder='johndoe@gmail.com' className="form-control col" value={patient.email} name="email" onChange={(e) => { handlePatientFormOnChange(e) }}></input>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className='col-lg-3 col-md-3 col-sm-6'>
                        <label className="form-label">Age</label>
                        <input type='number' placeholder='Age' className="form-control col" value={patient.age} name="age" onChange={(e) => { handlePatientFormOnChange(e) }}></input>
                    </div>

                    <div className='col-lg-3 col-md-3 col-sm-6'>
                        <label className="form-label">Gender</label>
                        <Form.Select className='form-control'  aria-label="Default select example"
                            value={patient.gender} name="gender"
                            onChange={(e) => { handlePatientFormOnChange(e) }}>
                            {
                                gender.map((sex, index) => {
                                    return <option key={index} value={index} >{sex}</option>
                                })
                            }
                        </Form.Select>
                    </div>

                    <div className='col-lg-3 col-md-3 col-sm-6'>
                        <label className="form-label">Blood Group</label>
                        <Form.Select className='form-control' aria-label="Default select example"
                            value={patient.bloodgroup} name="bloodgroup"
                            onChange={(e) => { handlePatientFormOnChange(e) }}>
                            {
                                bloodgroup.map((group, index) => {
                                    return <option key={index} value={index} >{group}</option>
                                })
                            }
                        </Form.Select>
                    </div>

                    <div className='col-lg-3 col-md-3 col-sm-6'>
                        <label className="form-label">Weight</label>
                        <input type='number' placeholder='Weight' className="form-control col" value={patient.weight} name="weight" onChange={(e) => { handlePatientFormOnChange(e) }}></input>
                    </div>
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
            <div className='btn std-border m-1' onClick={() => { addNewPatient() }}>Save</div>
            <div className='btn std-border m-1' onClick={props.onHide}>Close</div>
        </Modal.Footer>
    </Modal>
}

export default AddPatient