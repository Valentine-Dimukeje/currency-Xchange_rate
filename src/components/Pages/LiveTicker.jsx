import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API_BASE from "../../config"; // adjust path as needed


export default function LiveTicker() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTicker() {
    try {
      setLoading(true);
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
    <div className="bg-blue-600 text-white overflow-hidden whitespace-nowrap py-2">
      <motion.div
        className="flex gap-8 text-sm font-medium"
        animate={{ x: ["100%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      >
        {rates.map((r) => (
          <span key={r.code} className="flex-shrink-0">
            {`USD → ${r.code}: `}
            <span className="font-semibold">{r.rate.toFixed(2)}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
