"use client"

import { useState, useEffect } from "react";
import { useTheme } from '../context/ThemeContext';

const currencyNames = {
  AUD: "Australian Dollar", CAD: "Canadian Dollar", CHF: "Swiss Franc", CNY: "Chinese Renminbi Yuan", CZK: "Czech Koruna", DKK: "Danish Krone", EUR: "Euro", GBP: "British Pound", HKD: "Hong Kong Dollar", HUF: "Hungarian Forint", IDR: "Indonesian Rupiah", ILS: "Israeli New Shekel", INR: "Indian Rupee", ISK: "Icelandic Króna", JPY: "Japanese Yen", KRW: "South Korean Won", MXN: "Mexican Peso", MYR: "Malaysian Ringgit", NOK: "Norwegian Krone", NZD: "New Zealand Dollar", PHP: "Philippine Peso", PLN: "Polish Złoty", RON: "Romanian Leu", SEK: "Swedish Krona", SGD: "Singapore Dollar", THB: "Thai Baht", TRY: "Turkish Lira", USD: "United States Dollar", ZAR: "South African Rand"
};

export default function CurrencyCards({ baseCurrency = "AUD", onCurrencyClick, searchQuery = "" }) {
  const [rates, setRates] = useState({});
  const [page, setPage] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const gold = isDark ? '#FFD700' : '#B8860B';
  const textColor = isDark ? '#FFFFFF' : '#000000';
  const borderColor = isDark ? '#333' : '#e0e0e0';

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch(`https://api.frankfurter.dev/v1/latest?base=${baseCurrency}`);
        const data = await res.json();
        const filteredRates = Object.fromEntries(Object.entries(data.rates || {}).filter(([code]) => code !== 'BRL'));
        setRates(filteredRates);
        setLastUpdated(new Date(data.date).toLocaleString());
      } catch (error) {
        console.error('Error fetching rates:', error);
      }
    };
    fetchRates();
  }, [baseCurrency]);

  const allItems = Object.entries(rates);
  const filteredItems = searchQuery ? allItems.filter(([code, rate]) => {const codeMatch = code.toLowerCase().includes(searchQuery.toLowerCase()); const nameMatch = currencyNames[code]?.toLowerCase().includes(searchQuery.toLowerCase()); return codeMatch || nameMatch;}) : allItems;

  const perPage = 9;
  const totalPages = Math.ceil(filteredItems.length / perPage);
  const currentItems = filteredItems.slice(page * perPage, (page + 1) * perPage);

  useEffect(() => {
    setPage(0);
  }, [searchQuery]);

  return (
    <div style={{ width: '100%', height: '500px', minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 1fr)', gap: "clamp(8px, 2vw, 10px)", minHeight: 0, overflow: 'hidden', marginBottom: 10 }}>
        {currentItems.map(([code, rate]) => (
          <div key={code} onClick={() => onCurrencyClick && onCurrencyClick(code)} style={{ padding: "clamp(10px, 2vw, 15px)", color: textColor, border: `1px solid ${borderColor}`, borderRadius: 8, transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => {e.currentTarget.style.borderColor = gold; e.currentTarget.style.backgroundColor = isDark ? '#2a2a2a' : '#fafafa';}} onMouseLeave={(e) => {e.currentTarget.style.borderColor = borderColor; e.currentTarget.style.backgroundColor = 'transparent';}}>
            <div style={{ fontWeight: 700, fontSize: "clamp(14px, 2.5vw, 18px)", marginBottom: 5 }}>{code}</div>
            <div style={{ fontSize: "clamp(10px, 1.5vw, 12px)", opacity: 0.7, marginBottom: 8 }}>{currencyNames[code]}</div>
            <div style={{ fontWeight: 600, fontSize: "clamp(16px, 3vw, 20px)", color: gold, marginBottom: 5 }}>{rate.toFixed(2)}</div>
            <div style={{ fontSize: "clamp(8px, 1.2vw, 10px)", opacity: 0.5 }}>{lastUpdated}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, padding: '8px 4px 0 4px', width: '100%', boxSizing: 'border-box', overflow: 'hidden', flexShrink: 0, gap: 8, borderTop: `1px solid ${borderColor}` }}>
        <button onClick={() => setPage(page - 1)} disabled={page === 0} style={{background: 'transparent', border: `1px solid ${borderColor}`, color: textColor, padding: '4px 8px', borderRadius: 6, cursor: page === 0 ? 'not-allowed' : 'pointer', opacity: page === 0 ? 0.5 : 1, transition: 'all 0.3s ease', fontSize: "clamp(14px, 2vw, 16px)", width: "clamp(28px, 4vw, 32px)", height: "clamp(28px, 4vw, 32px)", display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}} onMouseEnter={(e) => {if (page !== 0) {e.currentTarget.style.borderColor = gold; e.currentTarget.style.color = gold;}}} onMouseLeave={(e) => {if (page !== 0) {e.currentTarget.style.borderColor = borderColor; e.currentTarget.style.color = textColor;}}}>←</button>

        <div style={{ display: 'flex', gap: 4, flexWrap: 'nowrap', justifyContent: 'center', alignItems: 'center', flex: 1, overflow: 'hidden', padding: '0 4px', minWidth: 0 }}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i} onClick={() => setPage(i)} style={{ background: page === i ? gold : borderColor, border: 'none', width: "clamp(5px, 1vw, 6px)", height: "clamp(5px, 1vw, 6px)", borderRadius: '50%', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0, flexShrink: 0 }} onMouseEnter={(e) => {if (page !== i) {e.currentTarget.style.background = '#FFC700';}}} onMouseLeave={(e) => {if (page !== i) {e.currentTarget.style.background = borderColor;}}} />
          ))}
        </div>

        <button onClick={() => setPage(page + 1)} disabled={page === totalPages - 1} style={{background: 'transparent', border: `1px solid ${borderColor}`, color: textColor, padding: '4px 8px', borderRadius: 6, cursor: page === totalPages - 1 ? 'not-allowed' : 'pointer', opacity: page === totalPages - 1 ? 0.5 : 1, transition: 'all 0.3s ease', fontSize: "clamp(14px, 2vw, 16px)", width: "clamp(28px, 4vw, 32px)", height: "clamp(28px, 4vw, 32px)", display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}} onMouseEnter={(e) => {if (page !== totalPages - 1) {e.currentTarget.style.borderColor = gold; e.currentTarget.style.color = gold;}}} onMouseLeave={(e) => {if (page !== totalPages - 1) {e.currentTarget.style.borderColor = borderColor; e.currentTarget.style.color = textColor;}}}>→</button>
      </div>
    </div>
  );
}
