// src/components/Trends.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import Select from "react-select";
import currencyData from "../../currencies.json";

const COLORS = [
  "#06b6d4", // cyan
  "#7c3aed", // purple
  "#f59e0b", // amber
  "#ef4444", // red
  "#10b981", // green
  "#3b82f6", // blue
  "#ec4899", // pink
  "#8b5cf6",
];

function fmtDate(date) {
  return date.toISOString().slice(0, 10);
}

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

export default function Trends() {
  const [base, setBase] = useState("USD");
  const [targets, setTargets] = useState(["EUR", "GBP", "JPY", "NGN", "GHS"]);
  const [days, setDays] = useState(30);
  const [data, setData] = useState([]);
  const [rawRates, setRawRates] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const currencyCodes = useMemo(() => {
    if (currencyData && typeof currencyData === "object") {
      return Object.keys(currencyData);
    }
    return ["USD", "EUR", "GBP", "JPY", "NGN", "GHS", "AUD", "CAD", "INR", "ZAR"];
  }, []);

  const selectOptions = useMemo(
    () =>
      currencyCodes.map((c) => ({
        value: c,
        label: `${c} — ${currencyData[c]?.name || ""}`,
      })),
    [currencyCodes]
  );

  const symbolsParam = useMemo(() => targets.join(","), [targets]);

  async function fetchTimeseries() {
    setLoading(true);
    setError(null);

    const end = new Date();
    const start = daysAgo(days - 1);
    const start_date = fmtDate(start);
    const end_date = fmtDate(end);

    const url = `https://api.frankfurter.app/${start_date}..${end_date}?from=${base}&to=${symbolsParam}`;

    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const json = await res.json();
      if (!json || !json.rates) throw new Error("Invalid API response");

      setRawRates(json.rates);

      const dates = Object.keys(json.rates).sort();
      const chartData = dates.map((d) => ({
        date: d,
        ...json.rates[d],
      }));

      setData(chartData);
      setLastUpdated(new Date().toISOString());
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!targets || targets.length === 0) {
      setData([]);
      setRawRates({});
      return;
    }
    fetchTimeseries();

    if (!autoRefresh) return;
    const id = setInterval(fetchTimeseries, 1000 * 60 * 2);
    return () => clearInterval(id);
  }, [base, targets.join(","), days, autoRefresh]);

  const summaries = useMemo(() => {
    if (!rawRates) return [];
    const dates = Object.keys(rawRates).sort();
    if (dates.length < 1) return [];
    const last = dates[dates.length - 1];
    const prev = dates[dates.length - 2] || last;

    return targets.map((t) => {
      const lastVal = rawRates[last]?.[t] ?? null;
      const prevVal = rawRates[prev]?.[t] ?? null;
      const changePct =
        lastVal != null && prevVal != null && prevVal !== 0
          ? ((lastVal - prevVal) / prevVal) * 100
          : null;
      return { code: t, lastVal, changePct };
    });
  }, [rawRates, targets]);

  const getColor = (idx) => COLORS[idx % COLORS.length];

  return (
    <div className="w-full bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 p-4 rounded-2xl">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row gap-3 md:items-end md:justify-between mb-6">
        <div className="flex gap-3 items-center flex-wrap">
          {/* Base selector */}
          <div>
            <label className="block text-sm font-medium mb-1">Base</label>
            <select
              className="p-2 rounded border bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
              value={base}
              onChange={(e) => setBase(e.target.value)}
            >
              {currencyCodes.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Targets */}
          <div style={{ minWidth: 240 }}>
            <label className="block text-sm font-medium mb-1">Targets</label>
            <Select
              classNamePrefix="react-select"
              options={selectOptions}
              value={selectOptions.filter((o) => targets.includes(o.value))}
              onChange={(selected) => {
                const arr = Array.isArray(selected)
                  ? selected.map((s) => s.value)
                  : [selected?.value];
                setTargets(arr);
              }}
              isMulti
              placeholder="Select currencies..."
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "var(--rs-bg)",
                  color: "var(--rs-text)",
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "var(--rs-bg)",
                  color: "var(--rs-text)",
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused
                    ? "rgba(59,130,246,0.2)"
                    : "transparent",
                  color: "var(--rs-text)",
                }),
              }}
            />
          </div>

          {/* Range */}
          <div>
            <label className="block text-sm font-medium mb-1">Range</label>
            <select
              className="p-2 rounded border bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
            >
              <option value={7}>7 days</option>
              <option value={14}>14 days</option>
              <option value={30}>30 days</option>
              <option value={90}>90 days</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 items-center">
          <button
            onClick={fetchTimeseries}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
            disabled={loading}
          >
            {loading ? "Loading…" : "Refresh"}
          </button>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
            />
            Auto-refresh
          </label>

          <div className="text-xs text-gray-600 dark:text-gray-400">
            {lastUpdated
              ? `Updated: ${new Date(lastUpdated).toLocaleString()}`
              : "Not updated"}
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {summaries.map((s, i) => (
          <div
            key={s.code}
            className="p-3 rounded-lg border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 flex items-center justify-between transition"
          >
            <div>
              <div className="text-sm font-medium text-gray-800 dark:text-gray-100">
                {s.code}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {currencyData[s.code]?.name || ""}
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {s.lastVal == null ? "—" : Number(s.lastVal).toFixed(4)}
              </div>
              <div
                className={`text-sm ${
                  s.changePct == null
                    ? "text-gray-400"
                    : s.changePct >= 0
                    ? "text-green-500"
                    : "text-rose-500"
                }`}
              >
                {s.changePct == null
                  ? "—"
                  : `${s.changePct >= 0 ? "+" : ""}${s.changePct.toFixed(2)}%`}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 shadow-sm transition">
        {error && <div className="text-red-500 mb-3">{error}</div>}
        {data.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            {loading ? "Loading chart…" : "No data"}
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={360}>
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(200,200,200,0.2)"
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: "var(--rs-text)" }}
              />
              <YAxis
                tick={{ fill: "var(--rs-text)" }}
                tickFormatter={(v) => Number(v).toFixed(2)}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--rs-bg)",
                  color: "var(--rs-text)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />
              <Legend />
              {targets.map((t, idx) => (
                <Line
                  key={t}
                  type="monotone"
                  dataKey={t}
                  stroke={getColor(idx)}
                  dot={false}
                  strokeWidth={2}
                  activeDot={{ r: 4 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
