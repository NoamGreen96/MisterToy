import React, { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { loadToys } from '../store/toy.action';
import { chartService } from '../services/chart.service';
import { LabelDashboard } from '../cmps/label-dashboard';
import LineDashboard from '../cmps/line-chart-dashboard';

ChartJS.register(ArcElement, Tooltip, Legend);


export function Dashboard() {
  const toys = useSelector(state => state.toyModule.toys)

  useEffect(() => {
    loadToys()
  }, [])

  const avgPricePerLabel = chartService.getAveragePricePerLabel(toys)
  const data = {
    labels: avgPricePerLabel.labels,
    datasets: [
      {
        label: 'Average Price Per Label',
        data: avgPricePerLabel.values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'price per label ',
      },
    },
  };


  return (
    <section className='dashboard-container' style={{ maxWidth: '35%', margin: 'auto' }}>
      <h1>Analysis :</h1>
      <div style={{ maxHeight: '100% ', maxWidth: '100%', background: 'white' }}>
        <Doughnut data={data} options={options} />
        <LabelDashboard toys={toys} />
        <LineDashboard />
      </div>
    </section>
  );
}
