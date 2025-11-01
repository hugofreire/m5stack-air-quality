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

export const TimeSeriesChart = ({ data, dataKey, dataField, title, unit, color = '#3b82f6' }) => {
  const chartData = data.map(reading => {
    let value;
    if (dataField) {
      value = reading.data[dataKey]?.[dataField];
    } else {
      value = reading.data[dataKey];
    }
    return {
      time: formatTime(reading.timestamp),
      timestamp: reading.timestamp,
      value: value,
    };
  });

  return (
    <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            style={{ fontSize: '12px' }}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            label={{ value: unit, angle: -90, position: 'insideLeft' }}
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            formatter={(value) => value?.toFixed(2) || 'N/A'}
            contentStyle={{ fontSize: '12px' }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
