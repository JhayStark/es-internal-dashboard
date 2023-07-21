import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data01 = [
  { name: 'Surveys', value: 2250, fill: '#FE634E' },
  { name: 'SMS', value: 1500, fill: '#214BB8' },
  { name: 'Voice', value: 1250, fill: '#45ADDA' },
];

const PieComponent = () => {
  return (
    <ResponsiveContainer width='100%' height='70%' className='py-2 '>
      <PieChart width={400} height={400}>
        <Pie
          dataKey='value'
          isAnimationActive={false}
          data={data01}
          cx='50%'
          cy='50%'
          outerRadius={80}
          innerRadius={40}
          fill='#8884d8'
          {...data01.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
          paddingAngle={5}
          label={({ name }) => name}
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieComponent;
