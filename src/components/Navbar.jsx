import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaMoon, FaSun } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Trends", to: "/trends" },
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-700 dark:text-blue-400 flex items-center gap-1"
        >
          💱 Xchange
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-medium hover:text-blue-600 dark:hover:text-blue-400 ${
                  isActive
                    ? "text-blue-700 dark:text-blue-300"
                    : "text-gray-600 dark:text-gray-300"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-100 hover:scale-110 transition-transform"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </div>

        <button
          className="md:hidden text-gray-700 dark:text-gray-100"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 border-b border-gray-100 dark:border-gray-800 text-sm font-medium ${
                    isActive
                      ? "text-blue-700 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300"
                  } hover:bg-blue-50 dark:hover:bg-gray-800`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="flex justify-center py-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-100 hover:scale-110 transition-transform"
              >
                {theme === "light" ? <FaMoon /> : <FaSun />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
