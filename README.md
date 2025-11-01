# Air Quality Monitor Dashboard

A responsive React + Express web application for visualizing M5Stack air quality sensor data with real-time charts and mobile-friendly UI.

## Features

- **Real-time Air Quality Dashboard** - Display current air quality status with color-coded indicators
- **Multiple Sensor Support** - SEN55 (particulate matter, humidity, temperature) and SCD40 (CO2)
- **Interactive Charts** - Visualize PM2.5, PM1.0, PM4.0, PM10.0, temperature, humidity, and CO2 levels
- **Time Range Filtering** - View data for last 6, 12, 24 hours or all data
- **Mobile Responsive** - Optimized for phone, tablet, and desktop screens
- **Auto-refresh** - Latest readings update every minute automatically
- **Air Quality Status** - EPA AQI standard air quality classification

## Project Structure

```
m5stack-sensor/
├── data-collector.js         # M5Stack data collection script
├── sensor-data.json          # Stored sensor readings
├── package.json              # Root package with monorepo setup
├── server/                   # Express backend
│   ├── package.json
│   └── index.js              # API server on port 3001
└── client/                   # Vite + React frontend
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── index.html
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── index.css
        ├── components/       # Reusable UI components
        │   ├── ReadingCard.jsx
        │   ├── AirQualityStatus.jsx
        │   ├── TimeSeriesChart.jsx
        │   └── PMChart.jsx
        ├── pages/           # Page components
        │   └── Dashboard.jsx
        ├── hooks/           # Custom React hooks
        │   └── useSensorData.js
        └── utils/           # Utility functions
            └── airQuality.js
```

## Installation

### Prerequisites

- Node.js 16+ and npm 7+

### Setup Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install workspace dependencies:**
   ```bash
   cd client && npm install && cd ..
   cd server && npm install && cd ..
   ```

## Running the Application

### Development Mode (Recommended)

Open two terminals:

**Terminal 1 - Start Express Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Start Vite Frontend:**
```bash
cd client
npm run dev
```

Or run both simultaneously:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`
The API will be available at `http://localhost:3001/api`

### Data Collection

To continuously collect sensor data:

```bash
node data-collector.js
```

This script fetches data from your M5Stack every 10 minutes and stores it in `sensor-data.json`.

## API Endpoints

- `GET /api/readings` - Get all sensor readings
- `GET /api/readings/latest` - Get the most recent reading
- `GET /api/readings/range?start=ISO_DATE&end=ISO_DATE` - Get readings in a time range
- `GET /api/readings/last-hours/:hours` - Get readings from the last N hours
- `GET /api/health` - Health check endpoint

## Available Sensor Data

### SEN55 Sensor (Air Quality)
- PM1.0, PM2.5, PM4.0, PM10.0 (µg/m³)
- Humidity (%)
- Temperature (°C)
- VOC (Volatile Organic Compounds)
- NOx

### SCD40 Sensor (CO2)
- CO2 (ppm)
- Humidity (%)
- Temperature (°C)

## Air Quality Status

Based on EPA AQI standard (PM2.5):
- **Good** (0-12): Green
- **Moderate** (12.1-35.4): Yellow
- **Unhealthy for Sensitive Groups** (35.5-55.4): Orange
- **Unhealthy** (55.5-150.4): Red
- **Very Unhealthy** (150.5+): Purple

## UI Components

### Dashboard
- Air quality status card with current PM2.5 level
- Current readings grid with 8 key metrics
- Time range selector buttons
- Interactive charts for trend visualization

### Charts
- **PM Chart**: Displays all particulate matter sizes
- **Temperature Trend**: SEN55 temperature over time
- **Humidity Trend**: SEN55 humidity over time
- **CO2 Levels**: SCD40 CO2 concentration over time

## Technologies Used

### Backend
- **Express.js** - REST API server
- **CORS** - Cross-origin resource sharing
- **Node.js** - JavaScript runtime

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - React charting library
- **Axios** - HTTP client

## Mobile Responsiveness

The dashboard is fully responsive and optimized for:
- Phones (320px+)
- Tablets (768px+)
- Desktops (1024px+)

Features:
- Touch-friendly buttons and spacing
- Responsive grid layouts
- Scaled typography for readability
- Optimized chart sizes for smaller screens

## Performance Notes

- Charts limit to visible data points for better performance
- API calls are cached and auto-refresh every minute
- Lazy loading of time-range specific data
- Optimized CSS with Tailwind's purge feature

## Troubleshooting

**API Connection Error:**
- Ensure Express server is running on port 3001
- Check CORS configuration in `server/index.js`

**No Data Displayed:**
- Verify `sensor-data.json` has readings
- Check browser console for API errors
- Ensure data collector has run at least once

**Build Issues:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear browser cache

## Future Enhancements

- [ ] Dark mode toggle
- [ ] Data export (CSV, JSON)
- [ ] Historical data analysis
- [ ] Alert thresholds
- [ ] Multi-device comparison
- [ ] Cloud sync support
- [ ] PWA offline mode

## License

MIT

## Support

For issues or questions, check the application logs and browser developer tools (F12).
