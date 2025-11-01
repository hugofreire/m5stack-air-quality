const fs = require('fs');
const https = require('https');

const API_URL = 'https://ezdata2.m5stack.com/api/v2/30EDA0CA04C0/dataMacByKey/raw';
const DATA_FILE = 'sensor-data.json';
const INTERVAL = 10 * 60 * 1000; // 10 minutes in milliseconds

// Initialize data file if it doesn't exist
function initializeDataFile() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ readings: [] }, null, 2));
    console.log(`Created ${DATA_FILE}`);
  }
}

// Fetch data from the API
function fetchData() {
  return new Promise((resolve, reject) => {
    https.get(API_URL, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.code === 200 && response.data && response.data.value) {
            // Parse the nested JSON string in the value field
            let sensorData;
            try {
              // The API returns a double-escaped JSON string, so we need to unescape it
              const unescapedValue = response.data.value.replace(/\\\"/g, '"');
              sensorData = JSON.parse(unescapedValue);
            } catch (parseErr) {
              console.error('Failed to parse sensor data string');
              console.error('Sensor data value:', response.data.value.substring(0, 100));
              throw parseErr;
            }
            resolve({
              timestamp: new Date().toISOString(),
              data: sensorData,
              updateTime: response.data.updateTime
            });
          } else {
            reject(new Error('API response missing expected data'));
          }
        } catch (err) {
          console.error('Raw API response (first 200 chars):', data.substring(0, 200));
          reject(err);
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Save data to file
function saveData(reading) {
  try {
    const fileContent = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    fileContent.readings.push(reading);
    fs.writeFileSync(DATA_FILE, JSON.stringify(fileContent, null, 2));
    console.log(`[${reading.timestamp}] Data saved successfully`);
  } catch (err) {
    console.error('Error saving data:', err.message);
  }
}

// Main collection function
async function collectData() {
  try {
    console.log(`[${new Date().toISOString()}] Fetching data...`);
    const reading = await fetchData();
    saveData(reading);
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Error fetching data:`, err.message);
  }
}

// Initialize and start collection
initializeDataFile();

const timestamp = new Date().toISOString();
console.log(`\n========================================`);
console.log(`[${timestamp}] 📊 Air Quality Data Collector`);
console.log(`========================================`);
console.log(`✓ Data collector started`);
console.log(`✓ Fetch interval: 10 minutes`);
console.log(`✓ Saving to: ${DATA_FILE}`);
console.log(`✓ API URL: ${API_URL}`);
console.log(`========================================\n`);

// Fetch immediately on start
collectData();

// Then fetch at regular intervals
const intervalId = setInterval(collectData, INTERVAL);

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log(`\n[${new Date().toISOString()}] ⛔ SIGTERM received, shutting down gracefully...`);
  clearInterval(intervalId);
  console.log(`[${new Date().toISOString()}] ✓ Data collector stopped`);
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log(`\n[${new Date().toISOString()}] ⛔ SIGINT received, shutting down gracefully...`);
  clearInterval(intervalId);
  console.log(`[${new Date().toISOString()}] ✓ Data collector stopped`);
  process.exit(0);
});
