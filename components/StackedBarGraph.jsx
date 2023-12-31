import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
  return (
    <text x={x + width / 2} y={y} fill='#000' textAnchor='middle' dy={-6}>
      {value}
    </text>
  );
};

const StackedBarGraph = ({ data, dataKey, multipleBars }) => {
  const [width, setWidth] = useState(0);
  const updateSize = () => setWidth(window.innerWidth);
  useEffect(() => (window.onresize = updateSize), []);
  return (
    <ResponsiveContainer width='100%' height='90%'>
      <BarChart
        height='100%'
        width='100%'
        data={data}
        margin={{
          top: 10,
          bottom: 10,
        }}
      >
        {width > 1100 && <XAxis dataKey={dataKey} fontSize='0.8rem' />}
        <Tooltip />
        <Legend />
        {!multipleBars && <Bar dataKey='male' stackId='a' fill='#ADD8E6' />}
        {!multipleBars && (
          <Bar
            dataKey='female'
            stackId='a'
            fill='#FFB6C1'
            label={renderCustomBarLabel}
          />
        )}
        {multipleBars?.map((bar, index) => {
          if (multipleBars.length - 1 === index) {
            return (
              <Bar
                dataKey={bar.key}
                stackId='a'
                fill={bar.color}
                label={renderCustomBarLabel}
              />
            );
          } else {
            return <Bar dataKey={bar.key} stackId='a' fill={bar.color} />;
          }
        })}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StackedBarGraph;
