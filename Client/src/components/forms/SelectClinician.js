import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getClinicians } from '../../services/ClinicDataAPI'
import { Form } from 'react-bootstrap'
import { setCurrentClinician } from '../../redux/actions/consultancyActions'
import ClinicianVertical from '../../components/cards/Clinician Cards/ClinicianVertical'

const SelectClinician = () => {

    const dispatch = useDispatch()

    const [allclinicians, setallclinicians] = useState([])
    useEffect(() => {
        async function handleLoad() {
            let token = JSON.parse(localStorage.getItem('clinicInfo')).token
            let temp = await getClinicians(token)
            setallclinicians(temp)
        }

        handleLoad()
    }, [])

    const [clinician, setclinician] = useState(null)

    return <div className='row'>
        <div className='col'>
            Select Operating Clinician *
            <Form.Select required
                onChange={(e) => {
                    if (e.target.value >= 0) {
                        setclinician(allclinicians[e.target.value])
                        dispatch(setCurrentClinician(allclinicians[e.target.value]))
                    } else {
                        setclinician(null)
                        dispatch(setCurrentClinician({}))
                    }
                }}>
                <option value={-1}>Please select</option>
                {
                    allclinicians.map((doctor, index) => {
                        return <option key={index} value={index} >Dr. {doctor.name}</option>
                    })
                }
            </Form.Select>
        </div>
        <div className='col'>
            {
                clinician !== null ? <div>
                    Operating Clinician:
                    <ClinicianVertical clinician={clinician} />
                </div> : <div className='bg-danger p-1 text-white text-center'>
                    Selecting active clinician is mandatory
                </div>
            }
        </div>
        <br />
    </div>
}

export default SelectClinician