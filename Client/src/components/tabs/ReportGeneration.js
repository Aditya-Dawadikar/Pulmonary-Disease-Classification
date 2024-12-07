import React, { useState, useEffect } from 'react'
import { Tabs, Tab, Form } from 'react-bootstrap'
import { Switch } from '@mui/material';

import axios from 'axios'

import AnalysisResult from './AnalysisResult'
import AutomatedDiagnosis from './AutomatedDiagnosis'
import ManualDiagnosis from './ManualDiagnosis'
import SelectClinician from '../forms/SelectClinician'
import { useDispatch, useSelector } from 'react-redux'
import { computeDiagnosisSummary } from '../../redux/actions/diagnosisAction'
import { toast } from 'react-toastify'

const ReportGeneration = () => {

    const segListFromStore = useSelector((state) => state.allSegments.allSegments)
    const currPatient = useSelector((state) => state.currPatient.currPatient)
    const currClinician = useSelector((state) => state.currClinician.currClinician)
    const currClinic = useSelector((state) => state.clinicLogin.clinicInfo)
    const currDiagnosis = useSelector((state) => state.diagnosis.summary)

    const summary = useSelector((state) => state.diagnosis.summary)
    const dispatch = useDispatch()

    const [note, setnote] = useState("")
    const [symptoms, setsymptoms] = useState("")

    const [isReport, setIsReport] = useState("")

    const [activetab, setactivetab] = useState("Analysis")

    function handleNoteChange(e) {
        setnote(e.target.value)
    }
    function handleSymptomChange(e) {
        setsymptoms(e.target.value)
    }

    function handleSubmit() {
        if (validateData() === true) {
            function getMaxIndex(arr) {
                const max = Math.max(...arr);
                return arr.indexOf(max);
            }

            let diagnosisMode = "auto"

            let requestBody = {}
            if (checked === true) {
                diagnosisMode = "manual"
                requestBody = {
                    "doctor_info": {
                        "name": currClinician.name,
                        "qualification": currClinician.degree,
                        "clinic_address": currClinic.address,
                        "id": currClinician.doctor_id
                    },
                    "patient_info": {
                        "name": currPatient.name,
                        "age": currPatient.age,
                        "blood_group": currPatient.bloodGroup,
                        "contact": currPatient.phone,
                        "sex": currPatient.gender,
                        "id": currPatient.patient_id
                    },
                    "report_summary": {
                        "abnormality": segListFromStore[0].manual.abnormality,
                        "disorder": segListFromStore[0].manual.disorder,
                        "severity": currSeverity
                    },
                    "audio_segments": [],
                    "report_note": note,
                    "symptoms": symptoms,
                    "mode": diagnosisMode
                }
            } else {
                requestBody = {
                    "doctor_info": {
                        "name": currClinician.name,
                        "qualification": currClinician.degree,
                        "clinic_address": currClinic.address,
                        "id": currClinician.doctor_id
                    },
                    "patient_info": {
                        "name": currPatient.name,
                        "age": currPatient.age,
                        "blood_group": currPatient.bloodGroup,
                        "contact": currPatient.phone,
                        "sex": currPatient.gender,
                        "id": currPatient.patient_id
                    },
                    "report_summary": {
                        "abnormality": {
                            "name": currDiagnosis.abnormality.class[getMaxIndex(currDiagnosis.abnormality.probabilities)],
                            "probability": currDiagnosis.abnormality.probabilities[getMaxIndex(currDiagnosis.abnormality.probabilities)]
                        },
                        "disorder": {
                            "name": currDiagnosis.disorder.class[getMaxIndex(currDiagnosis.disorder.probabilities)],
                            "probability": currDiagnosis.disorder.probabilities[getMaxIndex(currDiagnosis.disorder.probabilities)]
                        }
                    },
                    "audio_segments": [],
                    "report_note": note,
                    "symptoms": symptoms,
                    "mode": diagnosisMode
                }
                for (let i = 0; i < segListFromStore.length; i++) {
                    let segmentObject = {
                        "filename": segListFromStore[i].name,
                        "abnormality": {
                            "classes": Object.keys(segListFromStore[i].analysis.abnormality),
                            "probability": Object.values(segListFromStore[i].analysis.abnormality)
                        },
                        "disorder": {
                            "classes": Object.keys(segListFromStore[i].analysis.disorder),
                            "probability": Object.values(segListFromStore[i].analysis.disorder)
                        },
                        "symptoms": symptoms,
                        "severity": currSeverity
                    }
                    requestBody.audio_segments.push(segmentObject)
                }
            }

            // console.log(requestBody)
            axios.post("http://localhost:8000/api/storage/save", requestBody)
                .then(res => {
                    let download_url = res.data.report_public_url
                    setIsReport(download_url)
                    toast.success("Report is ready!")

                    let patientId = currPatient.patient_id
                    let doctorId = currClinician.doctor_id

                    let historyObject = {
                        "diagnosis": currDiagnosis.disorder.class[getMaxIndex(currDiagnosis.disorder.probabilities)],
                        "symptoms": symptoms,
                        "severity": currSeverity,
                        "reportUrl": download_url
                    }

                    axios.post(`http://localhost:5000/api/history/${patientId}/${doctorId}`, historyObject)
                        .then(res => {
                            console.log(res.data)
                        }).catch(err => {
                            console.log(err)
                        })
                }).catch(err => {
                    console.log(err)
                })
        }
    }

    function validateData() {
        function validateSymptoms() {
            if (symptoms === "") {
                toast.error("Mentioning Symptoms is mandatory")
                return false
            }
            return true
        }
        function validateReportNote() {
            if (note === "") {
                toast.error("Mentioning report note is mandatory")
                return false
            }
            return true
        }
        function validateClinician() {
            if (typeof currClinician.name === 'undefined') {
                toast.error("Please Select Operating Clinicians")
                return false
            }
            return true
        }

        function validateManualDiagnosis() {
            for (let i = 0; i < segListFromStore.length; i++) {
                if (
                    segListFromStore[i].manual.abnormality == ''
                    || segListFromStore[i].manual.disorder == ''
                    || segListFromStore[i].manual.severity == ''
                ) {
                    toast.error("Please Mention Diagnosis Manually...You have selected manual diagnosis mode")
                    return false
                }
            }
            return true
        }

        if (checked === true) {
            if (validateSymptoms() === true && validateReportNote() === true && validateClinician() === true && validateManualDiagnosis()) {
                return true
            }
        } else if (checked === false) {
            if (validateSymptoms() === true && validateReportNote() === true && validateClinician() === true) {
                return true
            }
        }
        return false
    }

    const severity = ['asymptomatic', 'moderate manifestation', 'major manifestation', 'catastrophic manifestation']
    const [currSeverity, setCurrSeverity] = useState(severity[0])

    function handleSeverityChange(e) {
        setCurrSeverity(e.target.value)
    }

    const [checked, setChecked] = useState(false)
    const handleModeChange = (event) => {
        setChecked(event.target.checked);
    };

    useEffect(() => {
        if (checked === true) {
            setactivetab("ManualDiagnosis")
            toast.success("Switched to Manual Diagnosis Mode")
        } else {
            setactivetab("AutomatedDiagnosis")
            toast.success("Switched to Automated Diagnosis Mode")
        }
    }, [checked])

    return (
        <div className='container'>

            <Tabs activeKey={activetab} onSelect={(k) => setactivetab(k)} id="report-generator" className="mb-3">
                <Tab eventKey="Analysis" title="Analysis">
                    <AnalysisResult />
                    <div className='d-flex'>
                        <div className='btn btn-primary m-1' onClick={() => { setactivetab("AutomatedDiagnosis") }}>Automated Diagnosis</div>
                        <div className='btn btn-primary m-1' onClick={() => { setactivetab("ManualDiagnosis") }}>Manual Diagnosis</div>
                    </div>
                </Tab>
                <Tab eventKey="AutomatedDiagnosis" title="Automated Diagnosis">
                    <AutomatedDiagnosis summary={summary} />
                </Tab>
                <Tab eventKey="ManualDiagnosis" title="Manual Diagnosis">
                    <ManualDiagnosis />
                </Tab>
            </Tabs>
            <br />
            <div className='row'>

                <div className='col'>
                    <div className='d-flex m-2'>
                        <p className='py-1 h4'>Auto Annotation</p>
                        <Switch
                            checked={checked}
                            onChange={handleModeChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <p className='py-1 h4'>Manual Annotation</p>
                    </div>

                    <div className='m-2'>
                        <label className="form-label">Mention Symptoms *</label>
                        <input
                            className="form-control"
                            type='text'
                            required={true}
                            value={symptoms}
                            onChange={(e) => { handleSymptomChange(e) }}
                        ></input>
                    </div>
                    <div className='m-2'>
                        <label className="form-label">Mention Severity *</label>
                        <Form.Select name="severity" value={currSeverity} onChange={(e) => { handleSeverityChange(e) }} required>
                            {
                                severity.map((state, indx) => {
                                    return <option key={indx} value={state} >{state}</option>
                                })
                            }
                        </Form.Select>
                    </div>
                </div>
                <div className='col'>
                    <SelectClinician />
                    <div className='m-2'>
                        <label>Add Note *</label>
                        <br />
                        <textarea id="text-area" className='form-control' value={note} rows="4" cols="100" onChange={(e) => { handleNoteChange(e) }}></textarea>
                    </div>
                </div>
            </div>
            {
                isReport !== "" ?
                    <div className=''>
                        <a className='btn std-border text-decoration-none' href={isReport} target="_blank">Click here for Report Link</a>
                    </div> : <div className='btn std-border' onClick={() => { handleSubmit() }}>Generate Report</div>
            }

            <div style={{ height: "500px" }}></div>

        </div>
    )
}

export default ReportGeneration
