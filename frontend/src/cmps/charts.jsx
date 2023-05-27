import React, { useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { toyService } from '../services/toys.service'
import { useSelector } from 'react-redux'
import { loadToys } from '../store/toy.action'

ChartJS.register(ArcElement, Tooltip, Legend)

export function Charts() {
  const { toys } = useSelector((storeState) => storeState.toyModule)

  useEffect(() => {
    loadToys()
  }, [])


  const avgPricePerLabel = chartService.getAvregePricePerLabel(toys)

  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'Average Price Per Label',
        data: [12, 19, 3, 5, 2, 3],
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
  }
  return (

    <section style={{ maxWidth: '25%', margin: 'auto' }}>
      <Doughnut data={data} />
    </section>
  )
}