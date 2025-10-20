import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API_BASE from "../../config";

export default function LiveTicker() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTicker() {
    try {
      const res = await fetch(`${API_BASE}/api/rates/?base=USD`);
      const json = await res.json();
      if (json?.rates) {
        const list = Object.entries(json.rates)
          .slice(0, 10)
          .map(([code, rate]) => ({ code, rate }));
        setRates(list);
      }
    } catch (err) {
      console.error("Ticker fetch failed:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTicker();
    const interval = setInterval(fetchTicker, 1000 * 60 * 5);
    return () => clearInterval(interval);
  }, []);

  if (loading || rates.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-blue-100 bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-sm">
      <div className="absolute inset-0 bg-blue-600/90"></div>
      <div className="relative overflow-hidden whitespace-nowrap py-2">
        <motion.div
          className="flex gap-10 text-sm font-medium min-w-full"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
          {rates.concat(rates).map((r, i) => (
            <span key={`${r.code}-${i}`} className="flex-shrink-0">
              USD → <span className="font-semibold">{r.code}</span>:{" "}
              <span className="font-bold text-white">{r.rate.toFixed(2)}</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
