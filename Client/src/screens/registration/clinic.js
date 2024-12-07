import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Tab, Form, Button } from 'react-bootstrap'
import { login, register } from '../../redux/actions/clinicActions';
import Navbar from '../../components/website_essentials/Navbar';
import Message from '../../components/website_essentials/Message'
import Loader from '../../components/website_essentials/Loader';

const Clinic = () => {

    const [loginform, setloginform] = useState({
        email: "",
        password: ""
    })
    const [signupform, setsignupform] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        cpassword: "",
        address: ""
    })
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const clinicLogin = useSelector(state => state.clinicLogin);
    const { loading, error, clinicInfo } = clinicLogin;

    const clinicRegister = useSelector(state => state.clinicRegister);
    const { loading: rloading, error: rerror, clinicInfo: rclinicInfo } = clinicRegister;

    useEffect(() => {
        if (clinicInfo) {
            window.location.href = '/clinic/landing';
        }
    })

    function handleLoginChange(e) {
        setloginform({ ...loginform, [e.target.name]: e.target.value })
    }

    function handleSignupChange(e) {
        setsignupform({ ...signupform, [e.target.name]: e.target.value })
    }

    const loginSubmitHandler = (e) => {
        e.preventDefault();
        const { email, password } = loginform;
        dispatch(login(email, password));
    }
    const registerSubmitHandler = (e) => {
        e.preventDefault();
        const { name, phone, email, password, cpassword, address } = signupform;
        if (password !== cpassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, phone, email, password, address));
        }
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className='container'>
                <div className='m-2 standard-shadow card p-3' style={{ width: "400px" }}>
                    <Tabs defaultActiveKey="Login" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="Signup" title="Signup">
                            {rerror && <Message variant='danger'>{error}</Message>}
                            {message && <Message variant='danger'>{message}</Message>}
                            {rloading && <Loader />}
                            <Form onSubmit={registerSubmitHandler}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Clinic Name</Form.Label>
                                    <Form.Control type="name" placeholder="Enter name" value={signupform.name} name='name' onChange={(e) => { handleSignupChange(e) }} />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="text" placeholder="Enter phone" value={signupform.phone} name='phone' onChange={(e) => { handleSignupChange(e) }} />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" value={signupform.email} name='email' onChange={(e) => { handleSignupChange(e) }} />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" value={signupform.password} name='password' onChange={(e) => { handleSignupChange(e) }} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" placeholder="Confirm Password" value={signupform.cpassword} name='cpassword' onChange={(e) => { handleSignupChange(e) }} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Clinic Address</Form.Label>
                                    <Form.Control type="text" placeholder="Enter address" value={signupform.address} name='address' onChange={(e) => { handleSignupChange(e) }} />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Tab>
                        <Tab eventKey="Login" title="Login">
                            {error && <Message variant='danger'>{error}</Message>}
                            {loading && <Loader />}
                            <Form onSubmit={loginSubmitHandler}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" value={loginform.email} name='email' onChange={(e) => { handleLoginChange(e) }} />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" value={loginform.password} name='password' onChange={(e) => { handleLoginChange(e) }} />
                                </Form.Group>
                                <Button variant="primary" type='submit'>
                                    Submit
                                </Button>
                            </Form>
                        </Tab>
                    </Tabs>
                </div>
            </div>

            {/* <Footer></Footer> */}
        </div>
    )
}

export default Clinic
