import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: '',
    revenue: 0,
  },
  {
    name: 'QTR 1',
    revenue: 4000,
  },
  {
    name: 'QTR 2',
    revenue: 3000,
  },
  {
    name: 'QTR 3',
    revenue: 2000,
  },
  {
    name: 'QTR 4',
    revenue: 2780,
  },
];

const AreaGraph = () => {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Area
          type='monotone'
          dataKey='revenue'
          stroke='#8884d8'
          fill='#8884d8'
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaGraph;
