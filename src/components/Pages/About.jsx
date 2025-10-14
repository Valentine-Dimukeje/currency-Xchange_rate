import React from "react";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto p-6 md:p-10 bg-white text-gray-800 rounded-lg shadow-sm">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">About Currency Xchange</h2>

      <p className="mb-4 leading-relaxed">
        Currency Xchange is a lightweight, reliable platform that delivers real-time foreign exchange rates,
        quick conversion tools, and historical trend visualizations. It is built for everyday users, travellers,
        and businesses who need fast, accurate currency information.
      </p>

      <p className="mb-4 leading-relaxed">
        We aggregate data from trusted APIs, merge with sensible fallbacks, and present information with clear UX and excellent mobile support.
      </p>

      <div className="p-4 bg-blue-50 border-l-4 border-blue-600 rounded-md">
        <strong>Our mission:</strong> Empower people with timely and trustworthy currency insights so they can make better financial decisions.
      </div>

      <p className="mt-6 text-sm text-gray-500">© {new Date().getFullYear()} Currency Xchange. All rights reserved.</p>
    </div>
  );
}
