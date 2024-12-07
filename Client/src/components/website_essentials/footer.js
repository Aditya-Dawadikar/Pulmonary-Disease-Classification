import React from 'react'

const Footer = () => {
    return (
        <div className="container-fluid bg-dark position-fixed bottom-0">
            <div className='row'>
                <div className='col col-md'>
                    <p className='h1 text-white text-center' style={{"margin":"1em auto"}}>App Name</p>
                </div>
                <div className='col col-md p-3'>
                    <p className='h5 text-white'>Links</p>
                    <ul className='text-muted' style={{"listStyle":"none","padding":"0"}}>
                        <li style={{"cursor":"pointer"}}>Home</li>
                        <li style={{"cursor":"pointer"}}>Pricing</li>
                        <li style={{"cursor":"pointer"}}>About us</li>
                    </ul>
                </div>
                <div className='col col-md p-3'>
                    <p className='h5 text-white'>Guides</p>
                    <ul className='text-muted' style={{"listStyle":"none","padding":"0"}}>
                        <li style={{"cursor":"pointer"}}>Documentation</li>
                        <li style={{"cursor":"pointer"}}>Our Research</li>
                        <li style={{"cursor":"pointer"}}>References</li>
                    </ul>
                </div>
                <div className='col col-md p-3'>
                    <p className='h5 text-white'>Team</p>
                    <ul className='text-muted' style={{"listStyle":"none","padding":"0"}}>
                        <li style={{"cursor":"pointer"}}>Students</li>
                        <li style={{"cursor":"pointer"}}>Mentors</li>
                        <li style={{"cursor":"pointer"}}>Hospitals</li>
                    </ul>
                </div>
            </div>
            <div className='bg-light text-center'>
                copyrights 2021
            </div>
        </div>
    )
}

export default Footer
