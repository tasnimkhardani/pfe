import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Frontend', 'Backend', 'Full Stack', 'Database'],
  datasets: [
    {
      label: '# of Proposed Topics',
      data: [5, 10, 7, 3], // Example data: numbers of proposed PFE topics in each category
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',  // red
        'rgba(54, 162, 235, 0.7)',  // blue
        'rgba(255, 206, 86, 0.7)',  // yellow
        'rgba(75, 192, 192, 0.7)',  // green
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
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
          label += `${tooltipItem.parsed} topics`;
          return label;
        }
      }
    },
    title: {
      display: true,
      text: 'Nombre des sujets PFE proposes par categories',
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

export function PfeCategoriesPieChart() {
  return <Pie data={data} options={options} />;
}

export default PfeCategoriesPieChart;
