import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Helper to read sensor data
function readSensorData() {
  try {
    const dataPath = path.join(__dirname, '..', 'sensor-data.json');
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading sensor data:', err.message);
    return { readings: [] };
  }
}

// API Routes

// Get all readings
app.get('/api/readings', (req, res) => {
  try {
    const data = readSensorData();
    res.json(data.readings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch readings' });
  }
});

// Get latest reading
app.get('/api/readings/latest', (req, res) => {
  try {
    const data = readSensorData();
    const latest = data.readings[data.readings.length - 1] || null;
    res.json(latest);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch latest reading' });
  }
});

// Get readings by time range (query params: start and end as ISO strings)
app.get('/api/readings/range', (req, res) => {
  try {
    const { start, end } = req.query;
    const data = readSensorData();

    let filtered = data.readings;

    if (start) {
      const startTime = new Date(start).getTime();
      filtered = filtered.filter(r => new Date(r.timestamp).getTime() >= startTime);
    }

    if (end) {
      const endTime = new Date(end).getTime();
      filtered = filtered.filter(r => new Date(r.timestamp).getTime() <= endTime);
    }

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch readings' });
  }
});

// Get readings for last N hours
app.get('/api/readings/last-hours/:hours', (req, res) => {
  try {
    const hours = parseInt(req.params.hours);
    const data = readSensorData();

    const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000).getTime();
    const filtered = data.readings.filter(r =>
      new Date(r.timestamp).getTime() >= cutoffTime
    );

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch readings' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
