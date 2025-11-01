import { getAirQualityStatus } from '../utils/airQuality';

export const AirQualityStatus = ({ pm25 }) => {
  const status = getAirQualityStatus(pm25);

  return (
    <div className={`${status.bgColor} ${status.textColor} rounded-lg p-6 md:p-8 text-center`}>
      <h2 className="text-lg md:text-xl font-semibold mb-2">Air Quality Index</h2>
      <div className="text-4xl md:text-5xl font-bold mb-2">{pm25.toFixed(1)}</div>
      <div className="text-base md:text-lg">{status.status}</div>
      <p className="text-xs md:text-sm mt-2 opacity-75">PM2.5: {pm25.toFixed(1)} µg/m³</p>
    </div>
  );
};
