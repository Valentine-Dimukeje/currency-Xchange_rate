import React, { useEffect, useState } from "react";
import axios from "axios";
import { RefreshCcw } from "lucide-react";
import API_BASE from "../config";

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
      const res = await axios.get(`${API_BASE}/api/rates/?base=${base}`);
      setRates(res.data.rates || {});
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Fetch rates failed:", err);
      setError("Failed to fetch exchange rates. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 60000);
    return () => clearInterval(interval);
  }, [base]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-slate-800">🌍 Exchange Rates</h2>
        <button
          onClick={fetchRates}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <RefreshCcw size={16} /> Refresh
        </button>
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium text-slate-600">Base Currency</label>
        <select
          value={base}
          onChange={(e) => setBase(e.target.value)}
          className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        >
          {["USD", "EUR", "GBP", "NGN", "GHS", "ZAR", "JPY", "INR"].map((code) => (
            <option key={code} value={code}>{code}</option>
          ))}
        </select>
      </div>

      {error && (
        <div className="text-red-500 bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-gray-500 text-center py-6 animate-pulse">
          Loading latest rates...
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="w-full min-w-[350px] text-sm text-gray-700 border-collapse">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200">
                <th className="py-2 px-3 text-left">Currency</th>
                <th className="py-2 px-3 text-right">Rate</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(rates)
                .filter(([key]) => key !== base)
                .slice(0, 15)
                .map(([code, rate]) => (
                  <tr
                    key={code}
                    className="border-b border-slate-100 hover:bg-blue-50 transition"
                  >
                    <td className="py-2 px-3 font-medium text-slate-800 flex items-center gap-1 whitespace-nowrap">
                      {rate > 1 ? (
                        <span className="text-green-500">▲</span>
                      ) : (
                        <span className="text-red-500">▼</span>
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
        </div>
      )}

      {!loading && (
        <div className="text-xs text-slate-500 text-right mt-4">
          Last updated: {lastUpdated}
        </div>
      )}
    </div>
  );
}
