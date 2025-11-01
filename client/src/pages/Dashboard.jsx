import { useState } from 'react';
import { useSensorData } from '../hooks/useSensorData';
import { AirQualityStatus } from '../components/AirQualityStatus';
import { ReadingCard } from '../components/ReadingCard';
import { TimeSeriesChart } from '../components/TimeSeriesChart';
import { PMChart } from '../components/PMChart';
import { formatDateTime } from '../utils/airQuality';

export const Dashboard = () => {
  const { readings, latest, loading, error, fetchLastHours } = useSensorData();
  const [timeRange, setTimeRange] = useState('all');

  const handleTimeRangeChange = (hours) => {
    setTimeRange(hours);
    if (hours !== 'all') {
      fetchLastHours(hours);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading sensor data...</p>
        </div>
      </div>
    );
  }

  if (error || !latest) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center bg-red-50 p-6 rounded-lg">
          <p className="text-red-800 font-semibold">{error || 'No data available'}</p>
          <p className="text-red-600 text-sm mt-2">Please check if the server is running</p>
        </div>
      </div>
    );
  }

  const sen55 = latest.data.sen55;
  const scd40 = latest.data.scd40;
  const updateTime = formatDateTime(latest.timestamp);

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Air Quality Monitor</h1>
              <p className="text-gray-600 text-xs md:text-sm mt-1">Last updated: {updateTime}</p>
            </div>
            <div className="text-right">
              <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                {readings.length} readings
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Air Quality Status */}
        <div className="mb-8">
          <AirQualityStatus pm25={sen55['pm2.5']} />
        </div>

        {/* Current Readings Grid */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Current Readings</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            <ReadingCard label="PM1.0" value={sen55['pm1.0']} unit="µg/m³" bgColor="bg-red-50" />
            <ReadingCard label="PM2.5" value={sen55['pm2.5']} unit="µg/m³" bgColor="bg-orange-50" />
            <ReadingCard label="PM4.0" value={sen55['pm4.0']} unit="µg/m³" bgColor="bg-yellow-50" />
            <ReadingCard label="PM10.0" value={sen55['pm10.0']} unit="µg/m³" bgColor="bg-green-50" />
            <ReadingCard label="CO2" value={scd40.co2} unit="ppm" bgColor="bg-purple-50" />
            <ReadingCard label="Temp" value={sen55.temperature} unit="°C" bgColor="bg-cyan-50" />
            <ReadingCard label="Humidity" value={sen55.humidity} unit="%" bgColor="bg-blue-50" />
            <ReadingCard label="CO2 Temp" value={scd40.temperature} unit="°C" bgColor="bg-teal-50" />
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => handleTimeRangeChange('all')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              timeRange === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            All Data
          </button>
          <button
            onClick={() => handleTimeRangeChange(6)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              timeRange === 6
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Last 6 Hours
          </button>
          <button
            onClick={() => handleTimeRangeChange(12)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              timeRange === 12
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Last 12 Hours
          </button>
          <button
            onClick={() => handleTimeRangeChange(24)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              timeRange === 24
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Last 24 Hours
          </button>
        </div>

        {/* Charts */}
        <div className="space-y-6">
          {readings.length > 0 && (
            <>
              <PMChart data={readings} />
              <TimeSeriesChart
                data={readings}
                dataKey="sen55"
                dataField="temperature"
                title="Temperature Trend"
                unit="°C"
                color="#06b6d4"
              />
              <TimeSeriesChart
                data={readings}
                dataKey="sen55"
                dataField="humidity"
                title="Humidity Trend"
                unit="%"
                color="#8b5cf6"
              />
              <TimeSeriesChart
                data={readings}
                dataKey="scd40"
                dataField="co2"
                title="CO2 Levels"
                unit="ppm"
                color="#ec4899"
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
};
