import React,{useEffect,useState} from 'react'
import {Form} from 'react-bootstrap'

const FilterClinician = () => {
    const defaultClinicianFilter = {
        min_age: 0,
        max_age: 100,
        gender: 0, // Male, Female, none
        role: 0,
    }
    const [clinicianFilterData, setClinicianFilterData] = useState({
        min_age: 0,
        max_age: 100,
        gender: 0, // Male, Female, none
        role: 0,
    });
    
    const gender=["none","male","female"]
    const role=['r1','r2','r3','r4']

    const [clinicianGender, setClinicianGender] = useState(clinicianFilterData.gender)
    const [clinicianRole, setClinicianRole] = useState(clinicianFilterData.role)

    useEffect(() => {
        setClinicianGender(clinicianFilterData.gender)
        setClinicianRole(clinicianFilterData.role)
    }, [clinicianFilterData])

    const clearClinicianFilter = () => {
        console.log(clinicianFilterData)
        setClinicianFilterData(defaultClinicianFilter)
    }
    function handleClinicianFilterChange(e) {
        setClinicianFilterData({ ...clinicianFilterData, [e.target.name]: e.target.value })
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
                        name='min_age'
                        value={clinicianFilterData.min_age}
                        onChange={(e) => { handleClinicianFilterChange(e) }}
                    ></input>
                    <div className='btn bg-light'>{clinicianFilterData.min_age}</div>
                </div>
                <label className="form-label">Maximum Age</label>
                <div className='d-flex'>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        className='m-1'
                        name="max_age"
                        value={clinicianFilterData.max_age}
                        onChange={(e) => { handleClinicianFilterChange(e) }}
                    ></input>
                    <div className='btn bg-light'>{clinicianFilterData.max_age}</div>
                </div>
            </div>
            <div className='col'>
                <label className="form-label">Gender</label>
                <Form.Select aria-label="Default select example"
                    name='gender'
                    value={clinicianFilterData.gender}
                    onChange={(e) => { handleClinicianFilterChange(e) }}>
                    {
                        gender.map((sex, index) => {
                            return <option key={index} value={index} >{sex}</option>
                        })
                    }
                </Form.Select>
            </div>
            <div className='col'>
                <label className="form-label">Role</label>
                <Form.Select aria-label="Default select example"
                    name='role'
                    value={clinicianFilterData.role}
                    onChange={(e) => { handleClinicianFilterChange(e) }}>
                    {
                        role.map((r, index) => {
                            return <option key={index} value={index} >{r}</option>
                        })
                    }
                </Form.Select>
            </div>
        </div>
        <button className='btn btn-secondary m-2' onClick={() => { clearClinicianFilter() }}>clear</button>
    </div>
}

export default FilterClinician