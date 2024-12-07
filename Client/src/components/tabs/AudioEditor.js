import React, { useState, useEffect, useRef } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

import { v4 as uuid } from 'uuid'

import PlayIcon from '../../assets/icons/play.png'
import PauseIcon from '../../assets/icons/pause.png'
import CropIcon from '../../assets/icons/crop.png'
import TrashIcon from '../../assets/icons/delete.png'

import { BsPauseFill, BsPlayFill, BsScissors,BsFillTrashFill } from 'react-icons/bs'

import { useDispatch, useSelector } from 'react-redux'
import { addSegmentAction, deleteSegmentAction } from '../../redux/actions/audioEditorActions'

const AudioEditor = () => {
    const dispatch = useDispatch()
    const segListFromStore = useSelector((state) => state.allSegments.allSegments)

    useEffect(() => {
        setSeglist(segListFromStore)
    }, [segListFromStore])

    const canvasRef = useRef(null)
    const [canvasWidth, setcanvaswidth] = useState(1000)

    const [signaldata, setSignaldata] = useState([])
    const [samplingrate, setSamplingrate] = useState(0)
    const [audiofile, setAudiofile] = useState(null)
    const [scalingfactor, setscalingfactor] = useState(200)
    const [endpoints, setendpoints] = useState({ start: 0, end: 0 })
    const [actualendpoints, setactualendpoints] = useState({ start: 0, end: 0 })

    const [audio, setAudio] = useState(new Audio(audiofile))
    const [instance, setinstance] = useState(0)
    const [timestamps, settimestamps] = useState({ start: 0, end: 0 })
    const [seglist, setSeglist] = useState([])



    // handler for visualization
    var openFile = function (event) {
        var input = event.target;
        setAudiofile(URL.createObjectURL(input.files[0]))

        // extracting signal data and sampling rate
        var audioContext = new AudioContext();
        var reader = new FileReader();
        reader.onload = function () {
            var arrayBuffer = reader.result;
            audioContext.decodeAudioData(arrayBuffer, decodedDone);
        };
        reader.readAsArrayBuffer(input.files[0]);
    };

    function decodedDone(decoded) {
        var typedArray = new Float32Array(decoded.length);
        typedArray = decoded.getChannelData(0);
        setSignaldata(typedArray)
        setSamplingrate(decoded.sampleRate)
    }

    function resetContext() {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        context.beginPath()
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)
        context.stroke()
    }

    //set the actual endpoints
    useEffect(() => {
        setactualendpoints({ start: endpoints.start, end: canvasWidth - endpoints.end })
    }, [endpoints])

    //updating canvas
    useEffect(() => {
        function blur() {
            const canvas = canvasRef.current
            const context = canvas.getContext('2d')
            context.clearRect(0, 0, context.canvas.width, context.canvas.height)
            context.fillStyle = 'rgba(0, 0, 0, 0.2)'
            context.beginPath()
            context.fillRect(0, 0, endpoints.start, context.canvas.height)
            context.fillRect(context.canvas.width - endpoints.end, 0, endpoints.end, context.canvas.height)
            context.stroke()
        }
        function getHeight(datapoint) {
            let oldMax = 1
            let oldMin = -1
            let newMax = scalingfactor
            let newMin = scalingfactor * (-1)
            let oldRange = oldMax - oldMin
            let newRange = newMax - newMin
            return ((datapoint - oldMin) * newRange / oldRange) + newMin
        }
        function getBins() {
            var n = canvasWidth
            var hop = signaldata.length / n
            var bins = []
            var i = 0
            while (i < signaldata.length) {
                let j = i
                let sum = 0
                while (j < i + hop) {
                    sum += signaldata[j]
                    j++
                }
                let mean = (sum) / (j - i)
                bins.push(getHeight(mean))
                i = j
            }
            return bins
        }

        resetContext()
        blur()
        if (signaldata.length > 0) {
            let bins = getBins()
            const canvas = canvasRef.current
            const context = canvas.getContext('2d')
            context.fillStyle = 'green'
            context.beginPath()
            for (var i = 0; i < bins.length; i++) {
                context.fillRect(i, (context.canvas.height / 2) - (bins[i] / 2), 1, bins[i])
            }
            context.stroke()
        }
    }, [signaldata, scalingfactor, endpoints])


    //handler for player
    useEffect(() => {
        setAudio(new Audio(audiofile))
    }, [audiofile])

    //set instance for the slider on progress
    useEffect(() => {
        //[0,duration] to [0,1000]
        function getInstance(datapoint, duration) {
            let oldMax = duration
            let oldMin = 0
            let newMax = canvasWidth
            let newMin = 0
            let oldRange = oldMax - oldMin
            let newRange = newMax - newMin
            return ((datapoint - oldMin) * newRange / oldRange) + newMin
        }

        audio.addEventListener('timeupdate', () => {
            setinstance(getInstance(audio.currentTime, audio.duration))
        })
    }, [audio])

    //set timestamps from the active segment
    useEffect(() => {
        //[0,1000] to [0,duration]
        function getTimestamp(datapoint, duration) {
            let oldMax = canvasWidth
            let oldMin = 0
            let newMax = duration
            let newMin = 0
            let oldRange = oldMax - oldMin
            let newRange = newMax - newMin
            return ((datapoint - oldMin) * newRange / oldRange) + newMin
        }

        settimestamps({ start: getTimestamp(actualendpoints.start, audio.duration), end: getTimestamp(actualendpoints.end, audio.duration) })
    }, [actualendpoints])

    const playAudio = () => {
        //always play between the cursors
        let delay = 0
        if (isNaN(timestamps.start) && isNaN(timestamps.end)) {
            audio.currentTime = 0
            delay = audio.duration * 1000
        } else {
            audio.currentTime = timestamps.start
            delay = (timestamps.end - timestamps.start) * 1000
        }

        audio.play()
        setTimeout(() => {
            audio.pause()
        }, [delay])
    }

    const pauseAudio = () => {
        audio.pause()
    }

    const trimAudio = () => {
        if (endpoints.start !== 0 && endpoints.end !== 0 && signaldata.length !== 0) {
            let newSegment = {
                endpoints: { start: parseInt(endpoints.start), end: parseInt(endpoints.end) },
                actualendpoints: { start: parseInt(actualendpoints.start), end: parseInt(actualendpoints.end) },
                timestamps: { start: parseInt(timestamps.start), end: parseInt(timestamps.end) },
                data: signaldata.slice(Math.floor(timestamps.start * samplingrate), Math.floor(timestamps.end * samplingrate) + 1),
                name: uuid(),
                samplingrate: samplingrate,
                analysis: {
                    summary: {
                        abnormality: "",
                        disorder: ""
                    },
                    abnormality: {
                        crackles: 0,
                        normal: 0,
                        wheezes: 0,
                    },
                    disorder: {
                        asthma: 0,
                        bronchiectasis: 0,
                        bronchiolitis: 0,
                        fibrosis: 0,
                        healthy: 0,
                        pneumonia: 0,
                    },
                    severity: 0
                },
                manual: {
                    abnormality: "",
                    disorder: "",
                    severity: ""
                },
                isAnalysed: false
            }
            setSeglist((seglist) => [...seglist, newSegment])

            // sending new segment to store
            dispatch(addSegmentAction(newSegment))
        }
    }

    const deleteSegment = (index) => {
        setSeglist(seglist.filter((seg, id) => {
            return id != index
        }))

        // deleting segment from store
        dispatch(deleteSegmentAction(seglist[index]))
    }

    const playFromList = (index) => {
        let requiredSegment = seglist[index]
        setactualendpoints(requiredSegment.actualendpoints)
        settimestamps(requiredSegment.timestamps)
        setendpoints({ start: requiredSegment.endpoints.start, end: requiredSegment.endpoints.end })
        playAudio()
    }

    function getDuration(){
        let min = String(parseInt(audio.duration/60))
        let sec = String(parseInt(audio.duration))
        if(min.length<2){
            min = "0"+min
        }
        if(sec.length<2){
            sec = "0"+sec
        }
        return min+":"+sec
    }

    return (
        <div>
            <div className='d-flex'>
                <div className='m-2' style={{ width: canvasWidth + "px" }}>
                    <div className='d-flex'>
                        <input className='btn' type='file' onChange={(e) => openFile(e)}></input>
                    </div>
                    <br />
                    <div>
                        {/* visualizer */}
                        <input
                            type='range'
                            id="range-1"
                            min={0}
                            max={canvasWidth}
                            style={{ width: canvasWidth + "px" }}
                            className="cutter-slider"
                            value={endpoints.start}
                            onChange={(e) => {
                                if (e.target.value < (canvasWidth - endpoints.end)) {
                                    setendpoints({ start: e.target.value, end: endpoints.end })
                                } else {
                                    setendpoints({ start: canvasWidth - endpoints.end, end: endpoints.end })
                                }
                            }}
                        ></input>
                        <input
                            type='range'
                            id="range-2"
                            min={0}
                            max={canvasWidth}
                            style={{ width: canvasWidth + "px" }}
                            className="cutter-slider"
                            value={endpoints.end}
                            onChange={(e) => {
                                if (e.target.value < (canvasWidth - endpoints.start)) {
                                    setendpoints({ start: endpoints.start, end: e.target.value })
                                } else {
                                    setendpoints({ start: endpoints.start, end: canvasWidth - endpoints.start })
                                }
                            }}
                        ></input>
                    </div>
                    <canvas
                        style={{ border: "solid 1px black" }}
                        ref={canvasRef}
                        width={canvasWidth + "px"}
                        height={"200px"}
                    >
                    </canvas>
                    <div>
                        {/* player */}
                        <input
                            className="audio-progress"
                            style={{ width: canvasWidth + "px" }}
                            type='range'
                            min={0}
                            max={canvasWidth}
                            value={instance}
                        />
                        <div className='d-flex justify-content-center align-items-center'>
                            00:00/{getDuration()}
                        </div>
                        <div className='d-flex justify-content-center align-items-center'>
                            <button className='btn std-border mx-2' onClick={pauseAudio}><BsPauseFill />Pause</button>
                            <button className='btn std-border mx-2' onClick={playAudio}><BsPlayFill />Play</button>
                            <button className={signaldata.length === 0 ? 'btn btn-secondary std-border mx-2' : 'btn std-border mx-2'} onClick={() => { trimAudio() }}><BsScissors />Trim</button>
                        </div>
                    </div>
                </div>
                <div className='m-2'>
                    {/* we will add all the controls here */}
                    Scale signal for Better visualization
                    <div className="d-flex">
                        <div className="m-2">100</div>
                        <OverlayTrigger
                            placement={'top'}
                            overlay={
                                <Tooltip>
                                    <strong>Scaled to {scalingfactor}</strong>
                                </Tooltip>
                            }>
                            <input
                                type='range'
                                min={100}
                                max={100000}
                                onChange={(e) => {
                                    setscalingfactor(e.target.value)
                                }}
                            ></input>

                        </OverlayTrigger>
                        <div className="m-2">100000</div>
                    </div>
                    <div>
                        <li className="list-group-item bg-dark text-white" aria-current="true">Audio Segments</li>
                        <ul className='list-group' id='seglist'>
                            {
                                seglist.length < 1 ? <div>No segments to show yet</div> : seglist.map((segment, index) => {
                                    return <li key={index} className="list-group-item"> {segment.name}
                                        <br />
                                        <button
                                            className='btn std-border mx-1'
                                            onClick={() => { playFromList(index) }}>
                                            <BsPlayFill /> Play
                                        </button>
                                        <button
                                            className='btn std-border mx-1'
                                            onClick={() => { deleteSegment(index) }}>
                                            <BsFillTrashFill />delete
                                        </button>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AudioEditor
