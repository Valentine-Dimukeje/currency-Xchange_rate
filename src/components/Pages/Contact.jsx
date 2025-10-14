import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  function onChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    // TODO: integrate real API or email service
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus(null), 2500);
    }, 900);
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-sm">
      <motion.h2 initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-2xl font-bold text-blue-700 text-center mb-4">
        Contact Us
      </motion.h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          required
          placeholder="Your name"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          name="email"
          value={form.email}
          onChange={onChange}
          required
          type="email"
          placeholder="Your email"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <textarea
          name="message"
          value={form.message}
          onChange={onChange}
          required
          rows={5}
          placeholder="Message"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          {status === "sending" ? "Sending..." : status === "sent" ? "Message Sent ✅" : "Send Message"}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-500 text-center">We aim to reply within 24 hours.</p>
    </div>
  );
}
