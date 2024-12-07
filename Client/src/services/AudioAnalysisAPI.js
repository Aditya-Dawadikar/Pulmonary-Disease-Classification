import axios from "axios";

export function predict(signaldata, samplingrate) {
    // let obj={signaldata:signaldata,samplingrate:samplingrate}
    // const size = new TextEncoder().encode(JSON.stringify(obj)).length
    // const kiloBytes = size / 1024;
    // const megaBytes = kiloBytes / 1024;

    // console.log(megaBytes)

    let url = 'http://localhost:8000/api/analysis/predict'
    let body = {
        signaldata: signaldata,
        samplingrate: samplingrate
    }
    let config = {}
    return axios.post(url, body, config)
}

// required data:
// doctor_info = {}
// patient_info = {}
// report_summary = {}
// report_note = ""
// symptoms = ""
// audio_segments:[
// {
//     filename: String,                              // local filename given by the server
//     abnormality: { classes: [], probabilities: [] },    // final abnormality suggested / approved by clinician
//     disorder: { classes: [], probabilities: [] },       // final disorder diagnosed / approved by clinician
//     severity: Number,                              // final severity diagnosed / approved by clinician
//     symptoms:String                               // clinician reasoning for diagnosis
//             },...
//          ]
// }
export function approve(doctor_info,patient_info,report_summary,report_note,symptoms,audio_segments) {
    let url = 'http://localhost:8000/api/storage/save'
    let body={
        doctor_info:doctor_info,
        patient_info:patient_info,
        report_summary:report_summary,
        report_note:report_note,
        symptoms:symptoms,
        audio_segments:audio_segments
    }
    let config = {}
    return axios.post(url,body,config)
}