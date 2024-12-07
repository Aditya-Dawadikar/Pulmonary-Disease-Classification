import React, { useEffect, useState } from 'react'
import { Tabs, Tab, Form } from 'react-bootstrap'

import ClinicNavigation from '../../components/website_essentials/ClinicNavigation'
import AudioEditor from '../../components/tabs/AudioEditor'
import PatientInfo from '../../components/tabs/PatientInfo'
import ReportGeneration from '../../components/tabs/ReportGeneration'
import ClinicianVertical from '../../components/cards/Clinician Cards/ClinicianVertical'

import WaveIcon from '../../assets/icons/wave.png'

import { useDispatch, useSelector } from 'react-redux'

import { getClinicians } from '../../services/ClinicDataAPI'
import { isAuthenticated } from '../../services/Auth'
import { BsFillArrowUpCircleFill, BsSoundwave } from 'react-icons/bs'

import { setCurrentClinician } from '../../redux/actions/consultancyActions'
import { toast } from 'react-toastify'

const Patient = () => {
    const dispatch = useDispatch()

    isAuthenticated()

    const segListFromStore = useSelector((state) => state.allSegments.allSegments)

    const [reportinput, setreportinput] = useState({
        doctor_info: {
            name: "",
            qualification: "",
            clinic_address: "",
            id: ""
        }, patient_info: {
            name: "",
            age: "",
            blood_group: "",
            contact: "",
            sex: "",
            id: ""
        }, report_summary: {
            abnormality: {
                name: "",
                probability: 0
            },
            disorder: {
                name: "",
                probability: 0
            },
            severity: {
                name: "",
                probability: 0
            }
        }, report_note: "",
        symptoms: "",
        audio_segments: []
    })
    // Schema for audio_segment
    // {
    //     "id":"",
    //     "abnormality":{
    //         "classes":["crackle","wheeze"],
    //         "probability":[91,32]
    //     },
    //     "disorder":{
    //         "classes":["pneumoia","asthma","bronchiolitis","healthy","fibrosis"],
    //         "probability":[67.3,91.87,32.2,0.34,21.3]
    //     }
    // }

    const [showreport, setshowreport] = useState(false);

    const ReportViewControl = () => {
        return <div>
            {
                segListFromStore.length > 0 ? <button
                    className='btn std-border'
                    onClick={() => {
                        setshowreport(!showreport)
                    }}>
                    <BsSoundwave className='m-1' />
                    Analyse
                </button> : <button
                    className='btn btn-secondary std-border'
                    onClick={() => {
                        toast.error("Please Add segments to analyse")
                    }}>
                    <BsSoundwave className='m-1' />
                    Analyse
                </button>
            }
            <br /><br />
            <p className='bg-warning p-1 text-center'>All the segments available in the segment list will be analysed</p>
            <br />
            {
                showreport === true ? <ReportGeneration /> : <></>
            }
        </div>

    }

    const BackToTop = () => {
        function scrollToTop() {
            window.scrollTo(0, 0)
        }
        return <div className='btn std-border back-to-top standard-shadow' onClick={() => { scrollToTop() }}>
            <BsFillArrowUpCircleFill />
        </div>
    }

    return (<div>
        <div>
            <ClinicNavigation />
            <br />
            <div className='container'>
                <Tabs defaultActiveKey="Information" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="Information" title="Information">
                        <PatientInfo></PatientInfo>
                    </Tab>
                    <Tab eventKey="Workspace" title="Workspace" className='container'>
                        <AudioEditor />
                        <ReportViewControl />
                    </Tab>
                </Tabs>
            </div>

        </div>
        <BackToTop />
    </div>
    )
}

export default Patient
