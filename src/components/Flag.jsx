import React from "react";

/**
 * Reusable Flag component.
 * - Accepts ISO alpha-2 codes (TW, US, NG, etc.)
 * - Handles special/regional mappings and onError fallback
 */
const SPECIAL = {
  EU: "eu",
  XOF: "sn",
  XAF: "cm",
  XPF: "pf",
  AN: "cw",
};

export default function Flag({ country, size = 20, className = "", alt = "" }) {
  if (!country) return null;
  const code = (SPECIAL[country] || country).toLowerCase();

  // flagcdn (24x18, w40) is reliable. use w40 for slightly bigger flags.
  const src = `https://flagcdn.com/w40/${code}.png`;

  return (
    <img
      src={src}
      alt={alt || country}
      width={size}
      height={Math.round((size * 3) / 4)}
      onError={(e) => {
        // fallback to a subtle placeholder (tiny svg data URI)
        e.currentTarget.onerror = null;
        e.currentTarget.src =
          "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='30'><rect width='100%' height='100%' fill='%23e2e8f0'/></svg>";
      }}
      className={`inline-block align-middle ${className}`}
      style={{ borderRadius: 4 }}
    />
  );
}
