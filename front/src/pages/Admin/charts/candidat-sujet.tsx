import React, { useEffect, useState } from 'react';
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
import axiosInstance from '../../../../axios-instance';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Nombre de candidatures reçues par sujet',
    },
  },
  scales: {
    y: { 
      beginAtZero: true, 
      title: {
        display: true, 
        text: 'Nombre de candidatures', 
        color: '#666', 
        font: {
          size: 14, 
          weight: 'bold', 
        },
      },
    },
    x: {
      title: {
        display: true,
        text: 'Sujet',
        color: '#666',
        font: {
          size: 14,
          weight: 'bold',
        },
      },
    },
  },
};

export function BarChartCandidatSujet() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    axiosInstance.get('/candidatureBySujet')
      .then(response => {
        const data = response.data;
        const labels = Object.keys(data);
        const dataset = {
          label: 'Nombre de candidatures',
          data: Object.values(data),
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        };
        
        setChartData({
          labels: labels,
          datasets: [dataset],
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return <Bar options={options} data={chartData} />;
}
