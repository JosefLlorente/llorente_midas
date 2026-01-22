"use client"

import { useTheme } from '../context/ThemeContext';

export default function CurrencyNav({ onChange }) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const gold = isDark ? '#FFD700' : '#B8860B';
    const bgColor = isDark ? '#1a1a1a' : '#f5f5f5';
    const textColor = isDark ? '#FFFFFF' : '#000000';
    const borderColor = isDark ? '#333' : '#e0e0e0';

    return (
        <select onChange={(e) => onChange && onChange(e.target.value)} style={{padding: "clamp(6px, 1.5vw, 8px) clamp(10px, 2vw, 12px)", borderRadius: 6, border: `1px solid ${borderColor}`, backgroundColor: bgColor, color: textColor, cursor: 'pointer', outline: 'none', transition: 'all 0.3s ease', fontSize: "clamp(12px, 2vw, 14px)", width: '100%', maxWidth: '200px'}} onMouseEnter={(e) => {e.currentTarget.style.borderColor = gold;}} onMouseLeave={(e) => {e.currentTarget.style.borderColor = borderColor;}} onFocus={(e) => {e.currentTarget.style.borderColor = gold;}} onBlur={(e) => {e.currentTarget.style.borderColor = borderColor;}}>
            <option value="AUD">Australian Dollar</option>
            <option value="CAD">Canadian Dollar</option>
            <option value="CHF">Swiss Franc</option>
            <option value="CNY">Chinese Renminbi Yuan</option>
            <option value="CZK">Czech Koruna</option>
            <option value="DKK">Danish Krone</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
            <option value="HKD">Hong Kong Dollar</option>
            <option value="HUF">Hungarian Forint</option>
            <option value="IDR">Indonesian Rupiah</option>
            <option value="ILS">Israeli New Shekel</option>
            <option value="INR">Indian Rupee</option>
            <option value="ISK">Icelandic Króna</option>
            <option value="JPY">Japanese Yen</option>
            <option value="KRW">South Korean Won</option>
            <option value="MXN">Mexican Peso</option>
            <option value="MYR">Malaysian Ringgit</option>
            <option value="NOK">Norwegian Krone</option>
            <option value="NZD">New Zealand Dollar</option>
            <option value="PHP">Philippine Peso</option>
            <option value="PLN">Polish Złoty</option>
            <option value="RON">Romanian Leu</option>
            <option value="SEK">Swedish Krona</option>
            <option value="SGD">Singapore Dollar</option>
            <option value="THB">Thai Baht</option>
            <option value="TRY">Turkish Lira</option>
            <option value="USD">United States Dollar</option>
            <option value="ZAR">South African Rand</option>
        </select>
    )
}
