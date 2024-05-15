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
      text: 'Total de taches effectue par sujet ',
    },
  },
  scales: {
    y: { 
      beginAtZero: true, 
      title: {
        display: true, 
        text: 'Nombre de tache ', 
      },
    },
    x: {
      title: {
        display: true,
        text: 'Nom de tache',
        color: '#666',
        font: {
          size: 14,
          weight: 'bold',
        },
      },
    },
  },
};

const labels = ['Tache 1', 'Tache 2', 'Tache 3', 'Tache 4'];

// Generate random data
const generateRandomData = () => {
  return labels.map(() => Math.floor(Math.random() * 10));
};

export const data = {
  labels,
  datasets: [
    {
      label: 'Mois',
      data: generateRandomData(),
      backgroundColor: 'rgba(53, 100, 235, 0.5)',
    },
  ],
};

export function TacheRapportSujet() {
  return <Bar options={options} data={data} />;
}
