import React,{useEffect} from 'react'

import { Tabs, Tab } from 'react-bootstrap'

import ClinicNavigation from '../../components/website_essentials/ClinicNavigation'
import ClinicHorizontal from '../../components/cards/Clinic Cards/ClinicHorizontal'
import PatientList from '../../components/tabs/PatientList'
import ClinicianList from '../../components/tabs/ClinicianList'

import { useDispatch } from 'react-redux'
import {clinicianListAction} from '../../redux/actions/clinicianListActions'
import { patientListAction } from '../../redux/actions/patientListActions'

import {isAuthenticated} from '../../services/Auth'

const AdminPanel = () => {
    isAuthenticated()

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(clinicianListAction())
        dispatch(patientListAction())
    },[])

    return (
        <div>
            <ClinicNavigation />
            <div className='container'>
                <br />
                <ClinicHorizontal />
                <br />
                <Tabs defaultActiveKey="Patients" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="Patients" title="Patients">
                        <div className='container'>
                            <PatientList />
                        </div>
                    </Tab>
                    <Tab eventKey="Clinicians" title="Clinicians">
                        <div className='container'>
                            <ClinicianList />
                        </div>
                    </Tab>
                </Tabs>
                <div style={{ width: "100%", height: "200px" }}></div>
            </div>
        </div>
    )
}

export default AdminPanel
