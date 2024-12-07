import React, { useState, useEffect, useRef } from 'react';

const LineGraph = ({ data }) => {
    const canvasRef = useRef(null)
    const canvasWidth = 500
    const canvasHeight = 200

    const [signaldata, setsignaldata] = useState([])
    const [scalingfactor, setscalingfactor] = useState(200)

    useEffect(()=>{
        if(typeof signaldata !== 'undefined'){
            setsignaldata(data)
        }
    },[data])

    useEffect(() => {

        function resetContext() {
            const canvas = canvasRef.current
            const context = canvas.getContext('2d')
            context.clearRect(0, 0, context.canvas.width, context.canvas.height)
            context.beginPath()
            context.fillRect(0, 0, context.canvas.width, context.canvas.height)
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
        function getBins(nbins) {
            var n = nbins
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
            // console.log(bins)
            return bins
        }

        resetContext()

        if (signaldata.length > 0) {
            
            const canvas = canvasRef.current
            const context = canvas.getContext('2d')
            
            let bins = getBins(context.canvas.width)

            context.fillStyle = 'green'
            context.beginPath()
            for (var i = 0; i < bins.length; i++) {
                context.fillRect(i, (context.canvas.height / 2) - (bins[i] / 2), 1, bins[i])
            }
            context.stroke()
        }

    }, [signaldata,scalingfactor])


    return <div>
        <canvas
            style={{ border: "solid 1px black"}}
            ref={canvasRef}
            width={canvasWidth+"px"}
            height={canvasHeight + "px"}>
        </canvas>
    </div>
};

export default LineGraph;
