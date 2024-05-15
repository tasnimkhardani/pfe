import React from 'react';
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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Nombre de candidature recues par sujet',
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
        text: 'sujet',
        color: '#666',
        font: {
          size: 14,
          weight: 'bold',
        },
      },
    },
  },
};

const labels = ['Devops', 'React' ];

// Generate random data
const generateRandomData = () => {
  return labels.map(() => Math.floor(Math.random() * 20));
};

export const data = {
  labels,
  datasets: [
    {
      label: 'Mois',
      data: generateRandomData(),
      backgroundColor: 'rgba(53, 162, 20, 0.5)',
    },
  ],
};

export function BarChartCandidatSujet() {
  return <Bar options={options} data={data} />;
}
