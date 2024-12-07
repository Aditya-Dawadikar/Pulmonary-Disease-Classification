import React from 'react'
import {Navbar,Container,Nav,Button} from 'react-bootstrap'

const CNavbar = () => {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="/">App Name</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/about">About us</Nav.Link>
                    </Nav>
                    <Nav>
                    <div className="text-center" style={{"width":"6em","height":"auto","borderRadius":"20px","background":"white","color":"black"}}> 
                        <Nav.Link href="/clinic" className="text-primary">
                            Signup
                        </Nav.Link>
                    </div>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default CNavbar
