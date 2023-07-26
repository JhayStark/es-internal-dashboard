import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const AreaGraph = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart
        width={500}
        height={400}
        data={
          data
            ? [{ qtr: '', value: 0 }, ...data]
            : [
                { qtr: 0, value: 0 },
                { qtr: 0, value: 0 },
                { qtr: 0, value: 0 },
                { qtr: 0, value: 0 },
              ]
        }
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis dataKey='qtr' />
        <YAxis />
        <Tooltip />
        <Area type='monotone' dataKey='value' stroke='#8884d8' fill='#8884d8' />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaGraph;
