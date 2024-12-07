import React,{useState,createContext} from 'react'

import Navbar from '../../components/website_essentials/Navbar'
import Footer from '../../components/website_essentials/Footer'

const Landing = () => {

    const [count,setcount] = useState(0)

    return (
        <div>
            <Navbar></Navbar>
            landing page
            <Footer></Footer>
        </div>
    )
}

export default Landing
