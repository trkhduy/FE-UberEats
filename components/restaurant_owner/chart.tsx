import React, { FC } from 'react';


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';


export const ChartLine: FC<any> = ({ title, week = true }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const labels = week ? ['Monday', 'Tuesday', 'Wenesday', 'Thurday', 'Friday', 'Saturday', 'Sunday'] : ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {


    labels,
    datasets: [
      {
        label: week ? 'This Week' : 'This Year',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: week ? 'LastWeek' : 'LastYear',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  console.log('faker', labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })));

  return <Line options={options} data={data} />;
}
