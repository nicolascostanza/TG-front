import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart(props) {
  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Bar Chart - Stacked'
      }
    },
    responsive: true,
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    }
  };

  const labels = props.data.map((item) => item[props.label]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Juan',
        data: props.data
          .filter((item) => item.employeeId.firstName === 'Juan')
          .map((item) => item.hours),
        borderColor: '#33bb00',
        backgroundColor: '#33bb00'
      },
      {
        label: 'Larita',
        data: props.data
          .filter((item) => item.employeeId.firstName === 'larita')
          .map((item) => item.hours),
        borderColor: '#ee7723',
        backgroundColor: '#ee7723'
      },
      {
        label: 'Muffin',
        data: props.data
          .filter((item) => item.employeeId.firstName === 'muffin')
          .map((item) => item.hours),
        borderColor: '#330077',
        backgroundColor: '#330077'
      }
    ]
  };
  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
}

export default BarChart;
