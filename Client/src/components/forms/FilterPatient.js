import React,{useEffect,useState} from 'react'
import {Form} from 'react-bootstrap'

const FilterPatient = () => {
    
    const defaultPatientFilter={
        min_age:0,
        max_age:100,
        gender:0, // Male, Female, none
        diagnosis:0, // Asthma, Pneumonia, COPD, healthy,....
    }
    const [patientFilterData, setPatientFilterData] = useState({
        min_age:0,
        max_age:100,
        gender:0, // Male, Female, none
        diagnosis:0, // Asthma, Pneumonia, COPD, healthy,....
    });

    const gender=["none","male","female"]
    const diagnosis=["all","healthy","asthma", "pneumonia", "copd","bronchial"]

    const [patientGender,setPatientGender] = useState(patientFilterData.gender)
    const [patientDiagnosis,setPatientDiagnosis] = useState(patientFilterData.diagnosis)

    useEffect(()=>{
        setPatientGender(patientFilterData.gender)
        setPatientDiagnosis(patientFilterData.diagnosis)
    },[patientFilterData])
    
    const clearPatientFilter=()=>{
        console.log(patientFilterData)
        setPatientFilterData(defaultPatientFilter)
    }

    function handlePatientFilterChange(e){
        setPatientFilterData({...patientFilterData,[e.target.name]:e.target.value})
    }

    return <div className='m-2'>
            <div className='row'>
                <div className='col'>
                    <label className="form-label">Minimum Age</label>
                    <div className='d-flex'>
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            className='m-1'
                            name="min_age"
                            value={patientFilterData.min_age}
                            onChange={(e)=>{handlePatientFilterChange(e)}}
                            ></input>
                        <div className='btn bg-light'>{patientFilterData.min_age}</div>
                    </div>
                    <label className="form-label">Maximum Age</label>
                    <div className='d-flex'>
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            className='m-1'
                            name="max_age"
                            value={patientFilterData.max_age}
                            onChange={(e)=>{handlePatientFilterChange(e)}}
                            ></input>
                        <div className='btn bg-light'>{patientFilterData.max_age}</div>
                    </div>
                </div>
                <div className='col'>
                    <label className="form-label">Gender</label>
                    <Form.Select aria-label="Default select example" 
                        name="gender"
                        value={patientFilterData.gender}
                        onChange={(e)=>{
                            handlePatientFilterChange(e)
                        }}>
                        {
                            gender.map((sex,index)=>{
                                return <option key={index} value={index} >{sex}</option>
                            })
                        }
                    </Form.Select>
                </div>
                <div className='col'>
                    <label className="form-label">Diagnosis</label>
                    <Form.Select aria-label="Default select example"
                        name="diagnosis"
                        value={patientFilterData.diagnosis}
                        onChange={(e)=>{handlePatientFilterChange(e)}}>
                    {
                        diagnosis.map((disease,index)=>{
                            return <option key={index} value={index} >{disease}</option>
                        })
                    }
                    </Form.Select>
                </div>
            </div>
            <button className='btn btn-secondary m-2' onClick={()=>{clearPatientFilter()}}>clear</button>
        </div>
}

export default FilterPatient