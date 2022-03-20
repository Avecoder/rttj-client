let lineData = {
  datasets: [
    {
      backgroundColor: 'rgba(134, 118, 254, 0.18)',
      borderColor: '#8676FE',
      borderWidth: 1,
      tension: .3,
      cursor: 'pointer'
    },
  ]
}

const lineOptions = {
  scales: {
    x: {
      grid: {
        color: '#F0F3FF',
        borderColor: '#F0F3FF',
        tickColor: 'transparent',
      },
      ticks: {
        color: '#8676FE',
        padding: 12,
      }
    },
    y: {
      grid: {
        color: 'transparent',
        borderColor: '#F0F3FF',
        tickColor: 'transparent'
      },
      ticks: {
        color: '#8676FE',
        stepSize: 1,
        padding: 24
      }
    }
  },
  plugins: {
    legend: {
        labels: false
    }
  }
}


export default {lineData, lineOptions}
