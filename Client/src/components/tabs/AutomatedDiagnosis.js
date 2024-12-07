import React, { useEffect } from 'react';

const AutomatedDiagnosis = ({ summary }) => {

    return <div>
        <div className='row'>
            <div className='col'>
                <p className='h4'>Disorder Analysis</p>
                <ul className='list-group'>
                    {
                        summary.disorder.class.map((ele, index) => {
                            return <li className='list-group-item'>
                                <div className='row'>
                                    <div className='col text-end'><b>{ele} :</b></div>
                                    <div className='col'>{(summary.disorder.probabilities[index] * 100).toFixed(4)}%</div>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
            <div className='col'>

            </div>
        </div>
    </div>;
};

export default AutomatedDiagnosis;

{/* <p className='h4'>Abnormality Analysis</p>
                <ul className='list-group'>
                    {
                        summary.abnormality.class.map((ele, index) => {
                            return <li className='list-group-item row'>
                                <div className='row'>
                                    <div className='col text-end'><b>{ele} :</b></div>
                                    <div className='col'>{(summary.abnormality.probabilities[index] * 100).toFixed(4)}%</div>
                                </div>
                            </li>
                        })
                    }
                </ul> */}