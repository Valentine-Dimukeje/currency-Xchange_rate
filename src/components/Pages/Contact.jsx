import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-900 shadow-lg p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-6 text-center"
      >
        Contact Us
      </motion.h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          required
          className="w-full border rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100"
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={status === "sending"}
          className={`w-full py-3 rounded-lg text-white font-medium transition-all ${
            status === "sending"
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {status === "sending"
            ? "Sending..."
            : status === "sent"
            ? "Message Sent ✅"
            : "Send Message"}
        </motion.button>
      </form>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
        We’ll get back to you within 24 hours.
      </p>
    </div>
  );
}
