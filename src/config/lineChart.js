const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        usePointStyle: false,
        boxWidth: 10,
        boxHeight: 10,
        padding: 50,
      },
    },
  },
  scales: {
    y: {
      min: 0,
      max: 100,
      grid: {
        display: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

const minInMilliseconds = 60000;
const timeRange = 5; // Unit: Minutes
const upperDataThreshold = 100; // Less than or equals the value is valid data

const legendOptions = {
  dataSet1: {
    label: '1',
    borderColor: 'rgb(231, 76, 60)',
    backgroundColor: 'rgb(231, 76, 60, 0.5)',
  },
  dataSet2: {
    label: '2',
    borderColor: 'rgb(0, 35, 215)',
    backgroundColor: 'rgba(0 , 35, 215, 0.5)',
  },
};

const lineChartConfig = {
  options,
  timeRange,
  minInMilliseconds,
  upperDataThreshold,
  legendOptions,
};

export default lineChartConfig;
