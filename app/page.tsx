'use client';

import { useState } from 'react';
import VehicleData from './components/VehicleData';
import JsonViewer from './components/JsonViewer';

export default function Home() {
  const [vehicleData, setVehicleData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVehicleData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/tesla/vehicle-data');
      if (!response.ok) {
        throw new Error('Failed to fetch vehicle data');
      }
      const data = await response.json();
      setVehicleData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-zinc-950 dark:to-zinc-900 font-sans">
      <main className="container mx-auto px-4 py-8 sm:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Tesla Vehicle Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Håll koll på din Tesla i realtid
          </p>
        </div>

        {/* Button */}
        {!vehicleData && (
          <div className="flex justify-center mb-8">
            <button
              onClick={fetchVehicleData}
              disabled={loading}
              className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none w-full max-w-md"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Hämtar data...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  🚗 Visa min Tesla
                </span>
              )}
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
            <p className="text-red-600 dark:text-red-400 text-center">
              ⚠️ {error}
            </p>
          </div>
        )}

        {/* Vehicle Data Display */}
        {vehicleData?.response && (
          <div className="animate-fadeIn">
            <VehicleData response={vehicleData.response} />

            {/* Raw JSON Data */}
            <div className="w-full max-w-2xl mx-auto mt-8 p-4">
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-zinc-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  📋 Fullständig JSON Data
                </h3>
                <JsonViewer data={vehicleData} />
              </div>
            </div>

            {/* Refresh Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={fetchVehicleData}
                disabled={loading}
                className="px-6 py-3 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-zinc-700 disabled:opacity-50"
              >
                {loading ? 'Uppdaterar...' : '🔄 Uppdatera data'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
