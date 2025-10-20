import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa6"; // using fa6 for new X icon

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-10 md:grid-cols-3">
        {/* Brand */}
        <div>
          <motion.h3
            whileHover={{ scale: 1.05 }}
            className="text-white text-xl font-semibold mb-3"
          >
            💱 Currency Xchange
          </motion.h3>
          <p className="text-sm">
            Reliable, real-time exchange rate tracking for traders,
            travelers, and businesses worldwide.
          </p>
        </div>

        {/* Links */}
        <div className="space-y-2 text-sm">
          <h4 className="text-white font-medium mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/trends" className="hover:text-white">Trends</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div className="text-sm">
          <h4 className="text-white font-medium mb-2">Connect</h4>
          <div className="flex gap-4 text-lg">
            <a
              href="https://www.facebook.com/DimukejeValentine"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition"
            >
              <FaFacebook />
            </a>

            <a
              href="https://www.instagram.com/val_ukeje"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.tiktok.com/@dimukeje.jnr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200 transition"
            >
              <FaTiktok />
            </a>

            <a
              href="https://x.com/Dimukeje-jnr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              <FaXTwitter />
            </a>

            <a
              href="https://www.linkedin.com/in/dimukeje-valentine"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://github.com/Valentine-Dimukeje"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition"
            >
              <FaGithub />
            </a>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            © {new Date().getFullYear()} Currency Xchange. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
