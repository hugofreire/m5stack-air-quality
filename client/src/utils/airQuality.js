// Get air quality status based on PM2.5 levels
// Using EPA AQI standard: https://www.airnow.gov/aqi/aqi-basics/
export const getAirQualityStatus = (pm25) => {
  if (pm25 <= 12) {
    return { status: 'Good', color: 'green', bgColor: 'bg-green-100', textColor: 'text-green-800', value: 'Good' };
  } else if (pm25 <= 35.4) {
    return { status: 'Moderate', color: 'yellow', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800', value: 'Moderate' };
  } else if (pm25 <= 55.4) {
    return { status: 'Unhealthy for Sensitive Groups', color: 'orange', bgColor: 'bg-orange-100', textColor: 'text-orange-800', value: 'USG' };
  } else if (pm25 <= 150.4) {
    return { status: 'Unhealthy', color: 'red', bgColor: 'bg-red-100', textColor: 'text-red-800', value: 'Unhealthy' };
  } else {
    return { status: 'Very Unhealthy', color: 'purple', bgColor: 'bg-purple-100', textColor: 'text-purple-800', value: 'Very Unhealthy' };
  }
};

export const getCO2Status = (co2) => {
  if (co2 < 400) {
    return { status: 'Excellent', color: 'green' };
  } else if (co2 < 600) {
    return { status: 'Good', color: 'green' };
  } else if (co2 < 1000) {
    return { status: 'Acceptable', color: 'yellow' };
  } else if (co2 < 1500) {
    return { status: 'Poor', color: 'orange' };
  } else {
    return { status: 'Very Poor', color: 'red' };
  }
};

export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
