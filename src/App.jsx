import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Pages/Home";
import About from "./components/Pages/About";
import Trends from "./components/Pages/Trends";
import Contact from "./components/Pages/Contact";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-slate-800 dark:text-gray-100">

      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast Notifications */}
      <Toaster position="top-right" />
    </div>
  );
}
