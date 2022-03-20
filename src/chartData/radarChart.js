let radarData = {
  datasets: [{
    label: 'Текущая неделя',
    backgroundColor: 'rgba(134, 118, 254, 0.18)',
    borderColor: '#8676FE',
    borderWidth: 1,
    tension: .1
  },
  {
    label: 'Прошлая неделя',
    backgroundColor: 'rgba(255, 112, 139, 0.18)',
    borderColor: '#FF708B',
    borderWidth: 1,
    tension: .1
  },
  ]
};


const radarOptions = {
  scales: {
    r: {
      beginAtZero: true,
      grid: {
        color: 'rgba(1, 1, 1, 0)',
        borderWidth: .5,
      },
      ticks: {
        display: false
      },
      angleLines: {
        color: '#F0F3FF'
      },
      pointLabels: {
        color: '#000',
        font: {
          size: 14,
          family: 'Raleway',
          color: '#000'
        },
        padding: 28
      }
    },
  },
  plugins: {
    legend: {
      labels: false
    }
  }
}

export default {radarData, radarOptions}
