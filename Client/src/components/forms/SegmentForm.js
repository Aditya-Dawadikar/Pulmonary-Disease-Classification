import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify'

import { useDispatch, useSelector } from 'react-redux';
import { updateSegmentAction } from '../../redux/actions/audioEditorActions'

const SegmentForm = ({ index }) => {

    const dispatch = useDispatch()
    const allSegments = useSelector((state) => state.allSegments.allSegments)

    const [isvalid, setisvalid] = useState(false)
    const [isSaved, setIsSaved] = useState(false)

    const abnormality = ["crackle", "none", "wheeze"]
    const diagnosis = ["asthma", "bronchial", "copd", "healthy", "pneumonia"]
    const severity = ['asymptomatic', 'moderate manifestation', 'major manifestation', 'catastrophic manifestation']


    const [segform, setsegform] = useState({
        abnormality: "",
        disorder: "",
        severity: ""
    })

    function handleChange(e) {
        console.log(e.target.name, e.target.value)
        setsegform({ ...segform, [e.target.name]: e.target.value })
    }

    function validateForm() {
        if (segform.abnormality === "" || segform.disorder === "" || segform.severity === "") {
            return false
        }
        return true
    }

    function handleSave() {
        if (validateForm()) {
            let requiredSegments = allSegments
            requiredSegments[index].manual.abnormality = segform.abnormality
            requiredSegments[index].manual.disorder = segform.disorder
            requiredSegments[index].manual.severity = segform.severity

            dispatch(updateSegmentAction(requiredSegments))
            setIsSaved(true)
            toast.success("added review successfully")
        } else {
            toast.error("incomplete form")
        }
    }

    useEffect(() => {
        if (validateForm()) {
            setisvalid(true)
        } else {
            setisvalid(false)
        }
    }, [segform])

    return <div className='row'>
        <div className='col-3'><p className='text-break'>{allSegments[index].name}</p></div>
        <div className='col-9'>
            <div className='row'>
                <div className='col'>
                    <label className="form-label">Abnormality Detected *</label>
                    <Form.Select name="abnormality" value={segform.abnormality} onChange={(e) => { handleChange(e) }} required>
                        {
                            abnormality.map((state, indx) => {
                                return <option key={indx} value={state} >{state}</option>
                            })
                        }
                    </Form.Select>
                </div>
                <div className='col'>
                    <label className="form-label">Disorder *</label>
                    <Form.Select name="disorder" value={segform.disorder} onChange={(e) => { handleChange(e) }} required>
                        {
                            diagnosis.map((state, indx) => {
                                return <option key={indx} value={state} >{state}</option>
                            })
                        }
                    </Form.Select>
                </div>
                <div className='col'>
                    <label className="form-label">Severity *</label>
                    <Form.Select name="severity" value={segform.severity} onChange={(e) => { handleChange(e) }} required>
                        {
                            severity.map((state, indx) => {
                                return <option key={indx} value={state} >{state}</option>
                            })
                        }
                    </Form.Select>
                </div>
                <div className='col-1'>
                    {
                        isvalid === true ? <div className='btn btn-primary' onClick={() => { handleSave() }}>
                            {isSaved === true ? <p className='m-0'>Saved</p> : <p className='m-0'>Save</p>}
                        </div> : <div className='btn btn-secondary'>Save</div>
                    }
                </div>
            </div>
        </div>
    </div>
}

export default SegmentForm