"use client"

import { useState } from "react";
import { useTheme } from '../context/ThemeContext';

const currencyNames = {
  AUD: "Australian Dollar", CAD: "Canadian Dollar", CHF: "Swiss Franc", CNY: "Chinese Renminbi Yuan", CZK: "Czech Koruna", DKK: "Danish Krone", EUR: "Euro", GBP: "British Pound", HKD: "Hong Kong Dollar", HUF: "Hungarian Forint", IDR: "Indonesian Rupiah", ILS: "Israeli New Shekel", INR: "Indian Rupee", ISK: "Icelandic Króna", JPY: "Japanese Yen", KRW: "South Korean Won", MXN: "Mexican Peso", MYR: "Malaysian Ringgit", NOK: "Norwegian Krone", NZD: "New Zealand Dollar", PHP: "Philippine Peso", PLN: "Polish Złoty", RON: "Romanian Leu", SEK: "Swedish Krona", SGD: "Singapore Dollar", THB: "Thai Baht", TRY: "Turkish Lira", USD: "United States Dollar", ZAR: "South African Rand"
};

export default function SearchNav({ onSearchChange }) {
  const [search, setSearch] = useState("");
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const textColor = isDark ? '#FFFFFF' : '#000000';
  const gold = '#FFD700';

  const suggestion = search ? Object.entries(currencyNames).find(([code, name]) => code.toLowerCase().startsWith(search.toLowerCase()) || name.toLowerCase().startsWith(search.toLowerCase())) : null;
  const suggestionText = suggestion ? suggestion[1] : "";
  const ghostText = search && suggestionText ? suggestionText.slice(search.length) : "";

  const handleKeyDown = (e) => {
    if (e.key === "Tab" || e.key === "Enter") {
      if (ghostText) {
        e.preventDefault();
        setSearch(suggestionText);
        if (onSearchChange) {onSearchChange(suggestionText);}
      }
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (onSearchChange) {onSearchChange(value);}
  };

  return (
    <div style={{ flex: 1, position: 'relative' }}>
      <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
        <input type="text" value={search} onChange={handleChange} onKeyDown={handleKeyDown} style={{ width: '100%', paddingLeft: 10, marginLeft: 5, position: 'relative', zIndex: 2, background: 'transparent', color: textColor, border: 'none', outline: 'none', fontFamily: 'inherit', transition: 'all 0.3s ease', fontSize: "clamp(12px, 2vw, 14px)" }} placeholder="Search Currency" onFocus={(e) => {e.currentTarget.style.borderBottom = `2px solid ${gold}`;}} onBlur={(e) => {e.currentTarget.style.borderBottom = 'none';}} />
        {ghostText && (
          <div style={{position: 'absolute', top: 0, left: 5, paddingLeft: 10, color: textColor, opacity: 0.5, pointerEvents: 'none', zIndex: 1, fontFamily: 'inherit', fontSize: 'inherit'}}>
            <span style={{ color: 'transparent' }}>{search}</span>{ghostText}
          </div>
        )}
      </div>
    </div>
  );
}
