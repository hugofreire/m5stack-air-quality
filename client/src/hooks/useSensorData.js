import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = '/api';

export const useSensorData = (refreshInterval = 60000) => {
  const [readings, setReadings] = useState([]);
  const [latest, setLatest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReadings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/readings`);
      setReadings(response.data);
      if (response.data.length > 0) {
        setLatest(response.data[response.data.length - 1]);
      }
      setError(null);
    } catch (err) {
      setError('Failed to fetch sensor data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLatest = async () => {
    try {
      const response = await axios.get(`${API_URL}/readings/latest`);
      setLatest(response.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch latest reading:', err);
    }
  };

  const fetchLastHours = async (hours) => {
    try {
      const response = await axios.get(`${API_URL}/readings/last-hours/${hours}`);
      setReadings(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch readings');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReadings();
    const interval = setInterval(fetchLatest, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  return {
    readings,
    latest,
    loading,
    error,
    fetchLastHours,
    refetch: fetchReadings,
  };
};
