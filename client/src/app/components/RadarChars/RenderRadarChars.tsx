import RadarChart from './RadarChars';

interface ChartData {
  name: string;
  value: number;
}
interface Props {
  chartData: ChartData[];
}
const RenderRadarChars: React.FC<Props> = ({ chartData }) => {
  // const chartData = [
  //   { name: 'A', value: 12 },
  //   { name: 'E', value: 15 },
  //   { name: 'S', value: 5 },
  //   { name: 'K', value: 10 },
  // ];

  return (
      <>
        <RadarChart data={chartData} name='Test Jugador' />
      </>
    )
}

export default RenderRadarChars