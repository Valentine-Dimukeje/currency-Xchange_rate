import React from "react";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto p-6 md:p-10 text-gray-700 dark:text-gray-200 space-y-6">

      <h2 className="text-3xl font-bold text-blue-700 mb-4 text-center md:text-left">
        About <span className="text-gray-900">Currency Xchange</span>
      </h2>

      <p className="leading-relaxed">
        <strong>Currency Xchange</strong> is a modern and responsive web platform
        designed to provide real-time and historical foreign exchange rates. It helps
        individuals, travelers, and businesses make smarter financial decisions when
        dealing with international currencies.
      </p>

      <p className="leading-relaxed">
        Our system aggregates data from multiple trusted sources and APIs to ensure
        accuracy, reliability, and global coverage. Users can visualize trends,
        compare rates, and track currency movements easily through interactive charts
        and tools.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-md">
        <p className="text-sm md:text-base text-gray-800">
          💡 <strong>Our mission:</strong> Empower users with transparent and up-to-date
          currency insights to support travel, trade, and investment decisions globally.
        </p>
      </div>

      <p className="text-sm text-gray-500 text-center md:text-left">
        © {new Date().getFullYear()} Currency Xchange. All rights reserved.
      </p>
    </div>
  );
}
