import React from "react";
import { motion } from "framer-motion";
import Converter from "../Converter";
import RateTable from "../RateTable";
import LiveTicker from "./LiveTicker";

export default function Home() {
  return (
    <div className="flex flex-col items-center px-4 sm:px-6 md:px-8 py-10 bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mb-10 md:mb-16"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
          💱 Currency Xchange
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600">
          Track live exchange rates, convert currencies, and explore insights — all in one place.
        </p>
      </motion.div>

      {/* Converter + Rates */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="grid w-full max-w-6xl gap-6 sm:gap-8 md:grid-cols-2"
      >
        {/* Converter Card */}
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg p-5 sm:p-6 transition-all border border-slate-200">
          <Converter />
          <div className="mt-6 border-t border-slate-100 pt-4">
            {/* <LiveTicker /> */}
          </div>
        </div>

        {/* Rates Card */}
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg p-5 sm:p-6 transition-all border border-slate-200 overflow-hidden">
          <RateTable />
        </div>
      </motion.div>

      {/* Features */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl w-full text-center mt-16 md:mt-20 px-2"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-8">
          Why Choose Currency Xchange?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: "🌐",
              title: "Real-Time Accuracy",
              desc: "Get instant updates from trusted global financial sources.",
              color: "text-blue-600",
            },
            {
              icon: "📊",
              title: "Data Insights",
              desc: "View live rates, analyze trends, and make smarter conversions.",
              color: "text-cyan-600",
            },
            {
              icon: "📱",
              title: "Mobile-Ready",
              desc: "Beautiful and fully responsive design for all devices.",
              color: "text-indigo-600",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all text-left sm:text-center"
            >
              <h3 className={`font-semibold text-lg mb-2 ${f.color}`}>
                {f.icon} {f.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-16 md:mt-20 w-full max-w-4xl text-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-3xl shadow-lg p-8 sm:p-10"
      >
        <h3 className="text-2xl sm:text-3xl font-semibold mb-3">
          Stay Ahead of Global Trends
        </h3>
        <p className="text-white/90 text-sm sm:text-base mb-6">
          Join thousands using real-time exchange insights every day.
        </p>
        <a
          href="/trends"
          className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition"
        >
          Explore Live Trends →
        </a>
      </motion.div>
    </div>
  );
}
