import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pie } from 'react-chartjs-2';
import { colorScheme } from '../constants';

const plugin = {
  id: 'custom_canvas_background_color',
  beforeDraw: (chart, args, options) => {
    const { ctx } = chart;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = options.color;
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
  defaults: {
    color: 'white'
  }
};

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels, plugin);
ChartJS.defaults.set('plugins.datalabels', {
  color: '#FFF',
  backgroundColor: '#00000090',
  borderRadius: 6,
  display: false
});
// ChartJS.plugins.register({
//   beforeDraw: function (chartInstance) {
//     var ctx = chartInstance.chart.ctx;
//     ctx.fillStyle = 'white';
//     ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
//   }
// });

const PieChart = (props) => {
  const options = {
    responsive: true,
    plugins: {
      ChartDataLabels,
      beforeDraw: function (chartInstance) {
        var ctx = chartInstance.chart.ctx;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
      },
      datalabels: {
        color: '#FFF',
        backgroundColor: '#00000090',
        borderRadius: 6,
        display: true
      },
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
        data: props.data.map((item) => item[props.value]),
        backgroundColor: colorScheme.corpo,
        borderColor: '#00000030'
      }
    ]
  };
  return (
    <div>
      <Pie data={data} options={options} style={{ backgroundColor: 'white' }} />
    </div>
  );
};

export default PieChart;
