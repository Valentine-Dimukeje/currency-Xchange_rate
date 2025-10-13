import React from "react";
import { motion } from "framer-motion";
import Converter from "../Converter";
import RateTable from "../RateTable";
import LiveTicker from "./LiveTicker";

export default function Home() {
  return (
    <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 py-10 md:py-16 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center w-full max-w-3xl space-y-4 mb-10"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white">
          💱 Currency Xchange
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">
          Track live exchange rates, compare currencies, and explore trends — all in one place.
        </p>
      </motion.div>

      {/* Converter + Rates Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="grid w-full max-w-6xl gap-6 sm:gap-8 md:grid-cols-2"
      >
        {/* Converter Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-5 sm:p-6 hover:shadow-xl transition border border-gray-100 dark:border-gray-800 flex flex-col justify-between">
          <Converter />
          <div className="mt-4">
            <LiveTicker />
          </div>
        </div>

        {/* Rate Table Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-5 sm:p-6 hover:shadow-xl transition border border-gray-100 dark:border-gray-800">
          <RateTable />
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl w-full text-center mt-16 sm:mt-20 space-y-10 px-2"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 dark:text-white">
          Why Choose Currency Xchange?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              icon: "🌐",
              title: "Real-Time Accuracy",
              desc: "Get instant updates powered by trusted global data sources and APIs.",
              color: "text-blue-600 dark:text-blue-400",
            },
            {
              icon: "📊",
              title: "Powerful Analytics",
              desc: "View historical charts, track currency trends, and make smarter conversions.",
              color: "text-green-600 dark:text-green-400",
            },
            {
              icon: "📱",
              title: "Fully Responsive",
              desc: "Seamlessly optimized for mobile, tablet, and desktop users.",
              color: "text-purple-600 dark:text-purple-400",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 border rounded-2xl hover:shadow-lg transition bg-gray-50 dark:bg-gray-900/40 border-gray-200 dark:border-gray-800"
            >
              <h3 className={`font-semibold mb-2 text-lg ${feature.color}`}>
                {feature.icon} {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-16 sm:mt-20 w-full max-w-4xl bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-700 dark:to-blue-600 text-white rounded-3xl shadow-xl p-8 sm:p-10 text-center"
      >
        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
          Stay Ahead of Currency Trends
        </h3>
        <p className="text-white/90 text-sm sm:text-base mb-6">
          Join thousands of users checking real-time rates and insights every day.
        </p>
        <a
          href="/trends"
          className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-100 transition"
        >
          Explore Live Trends →
        </a>
      </motion.div>
    </div>
  );
}
