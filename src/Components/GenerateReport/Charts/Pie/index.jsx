// import { projectTimesheets, project } from './mock';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = (props) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: props.title
      }
    }
  };

  const labels = props.data.map((item) => item[props.label]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Coso 1',
        data: props.data.map((item) => item[props.value]),
        backgroundColor: ['#33bb00', '#f1f266', '#004266'],
        borderColor: '#00000030'
      }
    ]
  };
  return (
    <div>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
