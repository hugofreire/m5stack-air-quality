import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { formatTime } from '../utils/airQuality';

export const PMChart = ({ data }) => {
  const chartData = data.map(reading => ({
    time: formatTime(reading.timestamp),
    'PM1.0': reading.data.sen55['pm1.0'],
    'PM2.5': reading.data.sen55['pm2.5'],
    'PM4.0': reading.data.sen55['pm4.0'],
    'PM10.0': reading.data.sen55['pm10.0'],
  }));

  return (
    <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Particulate Matter Levels</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            style={{ fontSize: '12px' }}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            label={{ value: 'µg/m³', angle: -90, position: 'insideLeft' }}
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            formatter={(value) => value?.toFixed(2) || 'N/A'}
            contentStyle={{ fontSize: '12px' }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Line
            type="monotone"
            dataKey="PM1.0"
            stroke="#ef4444"
            dot={false}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="PM2.5"
            stroke="#f97316"
            dot={false}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="PM4.0"
            stroke="#eab308"
            dot={false}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="PM10.0"
            stroke="#22c55e"
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
