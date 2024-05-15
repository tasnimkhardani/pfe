import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Total de taches déposées par rapport validé',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      stacked: true, // Enable stacking for the y-axis
      title: {
        display: true,
        text: 'Nombre de taches',
        color: '#666',
        font: {
          size: 14,
          weight: 'bold',
        },
      },
    },
    x: {
      stacked: true, // Enable stacking for the x-axis
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

// Generate random data for multiple datasets
const generateRandomData = () => {
  return labels.map(() => Math.floor(Math.random() * 100));
};

export const data = {
  labels,
  datasets: [
    {
      type: 'bar',
      label: 'Déposées',
      data: generateRandomData(),
      backgroundColor: 'rgba(53, 100, 235, 0.5)',
    },
    {
      type: 'line',
      label: 'Validées',
      data: generateRandomData(),
      borderColor: 'rgba(255, 159, 64, 0.9)',
      backgroundColor: 'rgba(255, 159, 64, 0.5)',
      fill: true,
    },
  ],
};

export function TacheRapport() {
  return <Bar options={options} data={data} />;
}
