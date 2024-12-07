import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Landing from './screens/website_essentials/Landing'
import About from './screens/website_essentials/About'

import Clinic from './screens/registration/Clinic'
import ClinicAdmin from './screens/diagnosis_workspace/AdminPanel'
import Patient from './screens/diagnosis_workspace/Patient'
import Clinician from './screens/diagnosis_workspace/Clinician'
import Help from './screens/website_essentials/FAQ'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/clinic' element={<Clinic />}></Route>
          <Route path='/clinic/landing' element={<ClinicAdmin />}></Route>
          <Route path='/clinic/patient' element={<Patient />}></Route>
          <Route path='/clinic/clinician' element={<Clinician />}></Route>
          <Route path='/clinic/help' element={<Help />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
