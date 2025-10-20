import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import Flag from "./Flag";
import currencyData from "../currencies.json";
import API_BASE from "../config";

const selectCustomStyles = {
  control: (base) => ({
    ...base,
    minHeight: 46,
    borderRadius: 12,
    borderColor: "#cbd5e1",
    backgroundColor: "white",
    boxShadow: "none",
    "&:hover": { borderColor: "#3b82f6" },
  }),
  singleValue: (base) => ({ ...base, color: "#0f172a", fontWeight: 500 }),
  menu: (base) => ({ ...base, background: "white", borderRadius: 8 }),
  option: (base, state) => ({
    ...base,
    background: state.isFocused ? "#eff6ff" : "transparent",
    color: "#0f172a",
    padding: 12,
  }),
};

export default function Converter() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/rates/?base=USD`);
        const data = await res.json();
        if (data?.rates) setCurrencies(Object.keys(data.rates));
      } catch {
        setError("Failed to load currency list.");
      }
    }
    load();
  }, []);

  const options = useMemo(
    () =>
      currencies.map((c) => ({
        value: c,
        label: (
          <div className="flex items-center gap-2">
            <Flag country={currencyData[c]?.country} size={18} />
            <span>{currencyData[c]?.name || c}</span>
          </div>
        ),
      })),
    [currencies]
  );

  async function convert() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(
        `${API_BASE}/convert/?from=${from}&to=${to}&amount=${amount}`
      );
      const data = await res.json();
      if (data.error) setError(data.error);
      else setResult(data.result);
    } catch {
      setError("Network error during conversion.");
    } finally {
      setLoading(false);
    }
  }

  function swap() {
    setFrom((prev) => {
      setTo(prev);
      return to;
    });
    setResult(null);
  }

  return (
    <div className="space-y-6 w-full overflow-hidden">

      <div>
        <h2 className="text-2xl font-semibold text-slate-800">
          Currency Converter
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Quick, accurate and up-to-date conversions.
        </p>
      </div>

      <div className="space-y-5">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 w-full transition"
          min="0"
          aria-label="amount"
        />

        <div className="space-y-4 text-slate-800">
  <div className="w-full">
    <Select
      styles={selectCustomStyles}
      options={options}
      value={options.find((o) => o.value === from)}
      onChange={(s) => setFrom(s.value)}
      placeholder="From"
    />
  </div>

  <div className="w-full">
    <Select
      styles={selectCustomStyles}
      options={options}
      value={options.find((o) => o.value === to)}
      onChange={(s) => setTo(s.value)}
      placeholder="To"
    />
  </div>
</div>

      </div>

      <div className="flex flex-wrap gap-3 items-center justify-between">
        <button
          onClick={swap}
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
        >
          ⇄ Swap
        </button>
        <button
          onClick={convert}
          disabled={loading}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium shadow-md hover:scale-[1.02] transition disabled:opacity-60"
        >
          {loading ? "Converting…" : "Convert"}
        </button>
      </div>

      {error && <div className="text-rose-500 text-sm">{error}</div>}

      {result !== null && !error && (
        <div className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-100 text-slate-800 text-lg text-center">
          <strong>{amount}</strong> {from} ={" "}
          <strong className="text-blue-600">
            {Number(result).toFixed(4)}
          </strong>{" "}
          {to}
        </div>
      )}
    </div>
  );
}
