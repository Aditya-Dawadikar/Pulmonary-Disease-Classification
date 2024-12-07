import React, { useState, useRef, useEffect } from 'react';
import { Tooltip, Overlay, Table } from 'react-bootstrap'

import PatientIcon from '../../assets/icons/patient.png'
import HelpIcon from '../../assets/icons/help.png'
import { useSearchParams, Link } from 'react-router-dom';

import { getPatientById, getPatientHistory } from '../../services/ClinicDataAPI';

import { useDispatch } from 'react-redux';
import { setCurrentPatient } from '../../redux/actions/consultancyActions'
import { IoReloadCircle } from 'react-icons/io5'
import { AiOutlineLink } from 'react-icons/ai'

import { IoCaretBackSharp, IoCaretForwardSharp } from 'react-icons/io5'

const PatientInfo = () => {
    const dispatch = useDispatch()

    let [searchParams, setSearchParams] = useSearchParams()

    const [patient, setPatient] = useState({
    })

    const [history, sethistory] = useState([])

    const report = "https://storage.googleapis.com/be-project-4b4bf.appspot.com/reports/1644304931_93d573059e3c4fbd829585eadf78b541.pdf"


    async function handleLoad() {
        let id = searchParams.get('id')
        let token = JSON.parse(localStorage.getItem('clinicInfo')).token
        let patient = await getPatientById(id, token)
        let history = await getPatientHistory(id, token)
        setPatient(patient)
        sethistory(history.reverse())
        dispatch(setCurrentPatient(patient))
    }

    useEffect(() => {
        handleLoad()
    }, [])

    const severity = ['asymptomatic', 'moderate manifestation', 'major manifestation', 'catastrophic manifestation']
    const severitycode = ['#84ff00', '#fff222', '#ff5e00', '#ff0000']

    const [limit, setlimit] = useState(5)
    const [patientcurrentindex, setpatientcurrentindex] = useState(0)
    const [patientpage, setpatientpage] = useState(patientcurrentindex)
    const [temppatientlist, settemppatientlist] = useState([])

    function incrementPatient() {
        if ((patientcurrentindex + 1) * limit < history.length) {
            setpatientcurrentindex(patientcurrentindex + 1)
        }
    }
    function decrementPatient() {
        if (patientcurrentindex >= 1) {
            setpatientcurrentindex(patientcurrentindex - 1)
        }
    }

    useEffect(() => {
        function pagination() {
            let pageinfo = (patientcurrentindex * limit + 1) + "-" + (Math.min(patientcurrentindex * limit + limit, history.length)) + "/" + history.length
            setpatientpage(pageinfo)
            settemppatientlist(history.slice(patientcurrentindex * limit, patientcurrentindex * limit + limit))
        }

        if (history.length > 0) {
            pagination()
        }

    }, [patientcurrentindex, history])

    return <div className='container'>
        <div className='h4'><img className="m-1" src={PatientIcon} style={{ width: "40px" }} />Patient: {patient.name}</div>
        <div className="row">
            <div className='col-lg-4 col-sm-6'>
                <div className='d-flex'><b>Patient ID:</b> <p className='text-primary'>{patient.patient_id}</p></div>
            </div>
            <div className='col-lg-4 col-sm-6'>
                <div><b>Email:</b> <a href={"mailto:" + patient.email}>{patient.email}</a></div>
            </div>
            <div className='col-lg-4 col-sm-6'>
                <div><b>Phone:</b> <a href={"tel:" + patient.phone}>{patient.phone}</a></div>
            </div>
        </div>
        <div style={{ width: "100%", height: "2px", "--bs-bg-opacity": ".2" }} className="bg-secondary m-1"></div>
        <div className="row">
            <div className='col-lg-3 col-sm-6 col-6'>
                <div><b>Age:</b> {patient.age}</div>
            </div>
            <div className='col-lg-3 col-sm-6 col-6'>
                <div><b>Sex:</b> {patient.gender}</div>
            </div>
            <div className='col-lg-3 col-sm-6 col-6'>
                <div><b>Weight:</b> {patient.weight}</div>
            </div>
            <div className='col-lg-3 col-sm-6 col-6'>
                <div><b>Bloodgroup:</b> {patient.bloodGroup}</div>
            </div>
        </div>
        <br />
        <div className="h4 d-flex">Patient History <IoReloadCircle className='m-1 reload-icon' onClick={() => { handleLoad() }} /></div>
        <Table responsive>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Operating Clinician</th>
                    <th>Symptoms</th>
                    <th>Diagnosis</th>
                    <th>Severity</th>
                    <th>Report</th>
                </tr>
            </thead>
            <tbody>
                {
                    temppatientlist.map((entry, index) => {
                        return <tr key={index}>
                            <td>{entry.date}</td>
                            <td>{entry.clinician}</td>
                            <td style={{ wordWrap: "break-word" }}>{entry.symptoms}</td>
                            <td>{entry.diagnosis}</td>
                            <td>
                                <div className='btn m-1' style={{ 'background': severitycode[severity.indexOf(entry.severity)] }}></div>
                                {entry.severity}</td>
                            <td>{
                                entry.report ? <a href={entry.report} target='_blank' className='text-decoration-none'><AiOutlineLink className='m-1' />Report</a> : "Nothing to show"
                            }</td>
                        </tr>
                    })
                }
            </tbody>
        </Table>
        <br />
        <div className='d-flex justify-content-center'>
            <div className='d-flex'>
                <div className='btn' onClick={() => { decrementPatient() }}><IoCaretBackSharp /></div>
                <b className='my-2'>Showing Patients {patientpage}</b>
                <div className='btn' onClick={() => { incrementPatient() }}><IoCaretForwardSharp /></div>
            </div>
        </div>
    </div>;
};

export default PatientInfo;
