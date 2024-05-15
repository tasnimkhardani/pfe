import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Succès', 'Échec'],
  datasets: [
    {
      label: 'Pourcentage de réussite',
      data: [75, 25], // Example data: 75% success, 25% failure
      backgroundColor: [
        'rgba(75, 192, 192, 0.7)',  // success - green
        'rgba(255, 99, 132, 0.7)',  // failure - red
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 20,
        font: {
          size: 14
        },
        color: '#333'
      }
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: function(tooltipItem) {
          let label = tooltipItem.label || '';
          if (label) {
            label += ': ';
          }
          label += `${tooltipItem.parsed}%`;
          return label;
        }
      }
    },
    title: {
      display: true,
      text: 'Pourcentage des sujets complets avec succès par les candidats',
      font: {
        size: 16,
        weight: 'bold'
      },
      color: '#333',
      padding: {
        top: 10,
        bottom: 30
      }
    }
  },
};

export function CompletionSuccessPieChart() {
  return <Pie data={data} options={options} />;
}

export default CompletionSuccessPieChart;
