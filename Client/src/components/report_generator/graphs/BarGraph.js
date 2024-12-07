import React, { useEffect, useState } from 'react'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarGraph = ({ labels, probabilities }) => {

  console.log(labels)
  console.log(probabilities)

  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: 'Probability',
        data: probabilities,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  })
  const [options, setOption] = useState(
    {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Visualization',
        },
      },
    }
  )

  return <Bar data={data} options={options} />;
};

export default BarGraph;
