import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowUpRight, ArrowDownRight, RefreshCcw } from "lucide-react";

export default function RateTable() {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);
  const [base, setBase] = useState("USD");

  const fetchRates = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/rates/?base=${base}`);
      setRates(res.data.rates);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      setError("Failed to fetch exchange rates. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 60000); // Refresh every 60s
    return () => clearInterval(interval);
  }, [base]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full h-full flex flex-col transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold text-slate-800">🌍 Exchange Rates</h2>
        <button
          onClick={fetchRates}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <RefreshCcw size={16} /> Refresh
        </button>
      </div>

      {/* Base Selector */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-600">Base Currency:</label>
        <select
          value={base}
          onChange={(e) => setBase(e.target.value)}
          className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="USD">USD — US Dollar</option>
          <option value="EUR">EUR — Euro</option>
          <option value="GBP">GBP — British Pound</option>
          <option value="NGN">NGN — Nigerian Naira</option>
          <option value="GHS">GHS — Ghanaian Cedi</option>
          <option value="ZAR">ZAR — South African Rand</option>
          <option value="JPY">JPY — Japanese Yen</option>
          <option value="INR">INR — Indian Rupee</option>
        </select>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-500 bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-sm">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-300">
        {loading ? (
          <p className="text-gray-500 text-center py-6 animate-pulse">Loading latest rates...</p>
        ) : (
          <table className="w-full text-sm text-gray-700 border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-gray-800 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors">
                <th className="py-2 px-3">Currency</th>
                <th className="py-2 px-3 text-right">Rate</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(rates)
                .filter(([key]) => key !== base)
                .slice(0, 15) // show top 15 currencies
                .map(([code, rate]) => (
                  <tr
                    key={code}
                    className="border-b border-slate-100 hover:bg-blue-50 transition-colors"
                  >
                    <td className="py-2 px-3 font-medium text-gray-800 flex items-center gap-1">
                      {rate > 1 ? (
                        <ArrowUpRight size={14} className="text-green-500" />
                      ) : (
                        <ArrowDownRight size={14} className="text-red-500" />
                      )}
                      {code}
                    </td>
                    <td className="py-2 px-3 text-right font-semibold">
                      {rate.toFixed(2)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer */}
      {!loading && (
        <div className="text-xs text-gray-500 text-right mt-4">
          Last updated: {lastUpdated}
        </div>
      )}
    </div>
  );
}
