import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "",
    revenue: 0,
    pv: 0,
    amt: 0,
  },
  {
    name: "QTR 1",
    revenue: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "QTR 2",
    revenue: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "QTR 3",
    revenue: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "QTR 4",
    revenue: 2780,
    pv: 3908,
    amt: 2000,
  },
];

const AreaGraph = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
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
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaGraph;
