'use client';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Card } from '@radix-ui/themes'; // Assuming you're using Radix UI's Card
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  // Dynamically create the chart data from the props
  const chartData = {
    labels: ['Open', 'In Progress', 'Closed'], // Static labels
    datasets: [
      {
        data: [open, inProgress, closed], // Dynamic values from props
        backgroundColor: ['#C8A2D4', '#9B59B6', '#8A2BE2'], // Lilac-themed colors
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
      },
    },
  };

  return (
    <Card>
    <div
      style={{
        padding: '20px',
        maxHeight: '400px',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center', // Centers horizontally
        alignItems: 'center', // Centers vertically
      }}
    >
      <Pie data={chartData} options={options as any} />
    </div>
  </Card>
  );
};

export default IssueChart;
