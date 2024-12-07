import React from 'react'
import {Navbar,Container,Nav,Button} from 'react-bootstrap'

import {AiFillHome} from 'react-icons/ai'
import {MdHelp} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const ClinicNavigation = () => {

    const navigate = useNavigate()

    function logoutHandler(){
        localStorage.clear()
        // window.location.href='http://localhost:3000/clinic'
        navigate('/clinic')
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="/">App Name</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link href="/clinic/landing"><AiFillHome className='text-white m-1' />Home</Nav.Link>
                    <Nav.Link href="/clinic/help"><MdHelp className='text-white m-1' />Help</Nav.Link>
                    </Nav>
                    <Nav>
                    <div className="text-center" style={{"width":"6em","height":"auto","borderRadius":"20px","background":"white","color":"black"}}> 
                        <Nav.Link href="/clinic" className="text-primary" onClick={()=>{logoutHandler()}}>
                            Logout
                        </Nav.Link>
                    </div>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default ClinicNavigation
