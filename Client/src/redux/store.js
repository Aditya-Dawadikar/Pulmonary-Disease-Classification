import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from "redux-logger";

import { clinicLoginReducer, clinicRegisterReducer } from './reducers/clinicReducers';
import { patientListReducer } from './reducers/patientListReducer'
import { clinicianListReducer } from './reducers/clinicianListReducer'
import { audioEditorReducer } from './reducers/audioEditorReducer';
import { clinicianReducer, patientReducer, consulatancyHighlightsReducer } from './reducers/consultancyReducer';
import { diagnosisReducer } from './reducers/diagnosisReducer';

const reducer = combineReducers({
    clinicLogin: clinicLoginReducer,
    clinicRegister: clinicRegisterReducer,
    allPatients: patientListReducer,
    allClinicians: clinicianListReducer,
    allSegments: audioEditorReducer,
    currPatient: patientReducer,
    currClinician: clinicianReducer,
    consultancyHighlights: consulatancyHighlightsReducer,
    diagnosis: diagnosisReducer
})

const clinicInfoFromStorage = localStorage.getItem('clinicInfo') ? JSON.parse(localStorage.getItem('clinicInfo')) : null

const initialState = {
    clinicLogin: { clinicInfo: clinicInfoFromStorage },
    allPatients: { allPatients: [] },
    allClinicians: { allClinicians: [] },
    allSegments: { allSegments: [] },
    currClinician: { currClinician: {} },
    currPatient: { currPatient: {} },
    consultancyHighlights: {
        consultancyHighlights: {
            note: "",
            summary: {},
            symptoms: ""
        }
    },
    diagnosis: {
        summary: {
            abnormality: {
                class: [],
                probabilities: []
            }, disorder: {
                class: [],
                probabilities: []
            }
        }
    }
}
const middleware = [thunk, logger]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store