"use client"

import { useTheme } from '../context/ThemeContext';

export default function NavBar() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';
    const gold = isDark ? '#FFD700' : '#B8860B';

    return (
        <div style={{width: "100%", height: "clamp(50px, 8vw, 60px)", backgroundColor: isDark ? '#000000' : '#FFFFFF', padding: "clamp(15px, 5vw, 50px)", paddingLeft: "clamp(20px, 20vw, 300px)", paddingRight: "clamp(20px, 20vw, 300px)", color: isDark ? 'white' : 'black', display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${isDark ? '#333' : '#e0e0e0'}`}}>
            <div style={{ display: 'flex', alignItems: 'center', gap: "clamp(8px, 2vw, 12px)" }}>
                <div style={{ width: "clamp(30px, 5vw, 40px)", height: "clamp(30px, 5vw, 40px)", backgroundColor: gold, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <span style={{ color: 'black', fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 900 }}>M</span>
                </div>
                <span style={{ fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 700 }}>MIDAS</span>
            </div>
            <button onClick={toggleTheme} style={{width: "clamp(40px, 6vw, 50px)", height: "clamp(24px, 4vw, 30px)", borderRadius: 15, backgroundColor: isDark ? '#333' : '#e0e0e0', border: 'none', cursor: 'pointer', position: 'relative', transition: 'all 0.3s ease'}} onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = gold;}} onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = isDark ? '#333' : '#e0e0e0';}}>
                <div style={{width: "clamp(18px, 3vw, 24px)", height: "clamp(18px, 3vw, 24px)", borderRadius: '50%', backgroundColor: isDark ? gold : '#000', position: 'absolute', left: isDark ? 3 : 23, top: 3, transition: 'all 0.3s ease'}} />
            </button>
        </div>
    )
}
