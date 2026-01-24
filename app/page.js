"use client"

import React, { useState, useEffect } from 'react';
import CurrencyCards from './components/currencycards';
import SearchNav from './components/searchnav';
import CurrencyNav from './components/currencynav';
import NavBar from './components/navbar';
import Graph from './components/graph';
import HandshakeImg from './assets/handshake.jpg';
import { useTheme } from './context/ThemeContext';
import { Linkedin, Github, Instagram } from 'lucide-react';

export default function Home() {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const gold = isDark ? '#FFD700' : '#B8860B';
  const bgColor = isDark ? '#000000' : '#FFFFFF';
  const textColor = isDark ? '#FFFFFF' : '#000000';
  const cardBg = isDark ? '#1a1a1a' : '#f5f5f5';

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToCurrencyCards = () => {
    const element = document.getElementById('currency-cards-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{ backgroundColor: bgColor, minHeight: '100vh', transition: 'background-color 0.3s ease' }}>
    <div style={{width:"100%"}}>
        <NavBar/>
    </div>

    <div style={{textAlign: "center", padding: "clamp(20px, 5vw, 40px)", color: textColor, marginTop: "clamp(30px, 5vw, 50px)"}}>
      <h1 style={{fontWeight: "700", fontSize: "clamp(28px, 5vw, 50px)"}}>Smart Insights from Currency Movements</h1>
      <p style={{fontWeight: "100", fontSize: "clamp(14px, 2vw, 18px)", marginTop: 25, opacity: 0.7}}>Learn and explore the world of currency exchange through clear, data-driven insights. Delve deeper into market trends, {!isMobile ? <><br />analyze currency movements over time, and gain a better understanding of exchange rate volatility to <br />support informed and confident financial decisions.</> : ' analyze currency movements over time, and gain a better understanding of exchange rate volatility to support informed and confident financial decisions.'}</p>
      
      <div style={{display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '15px', alignItems: 'center', justifyContent: 'center', marginTop: 'clamp(30px, 5vw, 50px)'}}>
        <button onClick={scrollToCurrencyCards} style={{color: "black", fontWeight:"600", padding: "clamp(8px, 2vw, 10px) clamp(15px, 3vw, 20px)", fontSize: "clamp(16px, 3vw, 20px)", borderRadius: 10, backgroundColor: gold, cursor: "pointer", border: 'none', transition: 'all 0.3s ease', width: isMobile ? '100%' : 'fit-content', maxWidth: '200px'}} onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = '#FFC700'; e.currentTarget.style.transform = 'scale(1.05)';}} onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = gold; }}>Get Started</button>
        <button onClick={scrollToHowItWorks} style={{color: isDark ? gold : 'black', border: `2px solid ${gold}`, fontWeight:"500", padding: "clamp(8px, 2vw, 10px) clamp(15px, 3vw, 20px)", fontSize: "clamp(16px, 3vw, 20px)", borderRadius: 10, backgroundColor: "transparent", cursor: "pointer", transition: 'all 0.3s ease', width: isMobile ? '100%' : 'fit-content', maxWidth: '200px'}} onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = gold; e.currentTarget.style.color = 'black';}} onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = isDark ? gold : 'black';}}>Learn More</button>
      </div>
    </div>

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: "clamp(10px, 3vw, 20px)", marginTop: "clamp(30px, 5vw, 50px)" }}>
      <img src={HandshakeImg.src} alt="Handshake" style={{maxWidth: "100%", width: "95%", maxHeight: "500px", height: "auto", borderRadius: "16px", transition: "all 0.3s ease", objectFit: "cover"}} />
    </div>  

    <div id="how-it-works-section" style={{textAlign: "center", padding: "clamp(20px, 5vw, 40px)", marginTop: "clamp(30px, 5vw, 50px)", color: textColor}}>
      <h1 style={{fontWeight: "700", fontSize: "clamp(28px, 5vw, 50px)"}}>How it works?</h1>
      <p style={{fontSize: "clamp(14px, 2vw, 18px)", marginTop: "20px", opacity: 0.7}}>Get real-time exchange rates, historical data, and insights into global currencies all in one place.</p>
    </div>  

    <div style={{textAlign: "center", padding: "clamp(20px, 5vw, 40px)"}}>
      <h1 style={{fontWeight: "700", fontSize: "clamp(20px, 3vw, 30px)", color: textColor}}>Why MIDAS?</h1>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: "clamp(20px, 4vw, 50px)", marginTop: "clamp(30px, 5vw, 50px)", maxWidth: 1100, margin: 'clamp(30px, 5vw, 50px) auto 0', padding: '0 clamp(10px, 3vw, 20px)'}}>
        <div style={{padding: "clamp(20px, 4vw, 40px)", background: cardBg, borderRadius: 12, textAlign: 'center', color: textColor, border: `1px solid ${isDark ? '#333' : '#e0e0e0'}`, transition: 'all 0.3s ease', cursor: 'pointer'}} onMouseEnter={(e) => {e.currentTarget.style.borderColor = gold; e.currentTarget.style.transform = 'translateY(-5px)';}} onMouseLeave={(e) => {e.currentTarget.style.borderColor = isDark ? '#333' : '#e0e0e0'; e.currentTarget.style.transform = 'translateY(0)';}}>
          <div style={{ fontSize: "clamp(40px, 6vw, 60px)", marginBottom: 20 }}>📊</div>
          <h3 style={{ fontSize: "clamp(18px, 2.5vw, 22px)", fontWeight: 600, marginBottom: 12 }}>Real-Time Rates</h3>
          <p style={{ fontSize: "clamp(14px, 2vw, 16px)", opacity: 0.8 }}>Get up-to-date exchange rates from reliable sources instantly.</p>
        </div>
        <div style={{padding: "clamp(20px, 4vw, 40px)", background: cardBg, borderRadius: 12, textAlign: 'center', color: textColor, border: `1px solid ${isDark ? '#333' : '#e0e0e0'}`, transition: 'all 0.3s ease', cursor: 'pointer'}} onMouseEnter={(e) => {e.currentTarget.style.borderColor = gold; e.currentTarget.style.transform = 'translateY(-5px)';}} onMouseLeave={(e) => {e.currentTarget.style.borderColor = isDark ? '#333' : '#e0e0e0'; e.currentTarget.style.transform = 'translateY(0)';}}>
          <div style={{ fontSize: "clamp(40px, 6vw, 60px)", marginBottom: 20 }}>📈</div>
          <h3 style={{ fontSize: "clamp(18px, 2.5vw, 22px)", fontWeight: 600, marginBottom: 12 }}>Historical Data</h3>
          <p style={{ fontSize: "clamp(14px, 2vw, 16px)", opacity: 0.8 }}>Explore currency trends with data going back to 1999.</p>
        </div>
        <div style={{padding: "clamp(20px, 4vw, 40px)", background: cardBg, borderRadius: 12, textAlign: 'center', color: textColor, border: `1px solid ${isDark ? '#333' : '#e0e0e0'}`, transition: 'all 0.3s ease', cursor: 'pointer'}} onMouseEnter={(e) => {e.currentTarget.style.borderColor = gold; e.currentTarget.style.transform = 'translateY(-5px)';}} onMouseLeave={(e) => {e.currentTarget.style.borderColor = isDark ? '#333' : '#e0e0e0'; e.currentTarget.style.transform = 'translateY(0)';}}>
          <div style={{ fontSize: "clamp(40px, 6vw, 60px)", marginBottom: 20 }}>🌍</div>
          <h3 style={{ fontSize: "clamp(18px, 2.5vw, 22px)", fontWeight: 600, marginBottom: 12 }}>20+ Currencies</h3>
          <p style={{ fontSize: "clamp(14px, 2vw, 16px)", opacity: 0.8 }}>Access exchange rates for all major world currencies.</p>
        </div>
        <div style={{padding: "clamp(20px, 4vw, 40px)", background: cardBg, borderRadius: 12, textAlign: 'center', color: textColor, border: `1px solid ${isDark ? '#333' : '#e0e0e0'}`, transition: 'all 0.3s ease', cursor: 'pointer'}} onMouseEnter={(e) => {e.currentTarget.style.borderColor = gold; e.currentTarget.style.transform = 'translateY(-5px)';}} onMouseLeave={(e) => {e.currentTarget.style.borderColor = isDark ? '#333' : '#e0e0e0'; e.currentTarget.style.transform = 'translateY(0)';}}>
          <div style={{ fontSize: "clamp(40px, 6vw, 60px)", marginBottom: 20 }}>🔒</div>
          <h3 style={{ fontSize: "clamp(18px, 2.5vw, 22px)", fontWeight: 600, marginBottom: 12 }}>Secure & Reliable</h3>
          <p style={{ fontSize: "clamp(14px, 2vw, 16px)", opacity: 0.8 }}>Data sourced from trusted financial APIs with high uptime.</p>
        </div>
        <div style={{padding: "clamp(20px, 4vw, 40px)", background: cardBg, borderRadius: 12, textAlign: 'center', color: textColor, border: `1px solid ${isDark ? '#333' : '#e0e0e0'}`, transition: 'all 0.3s ease', cursor: 'pointer'}} onMouseEnter={(e) => {e.currentTarget.style.borderColor = gold; e.currentTarget.style.transform = 'translateY(-5px)';}} onMouseLeave={(e) => {e.currentTarget.style.borderColor = isDark ? '#333' : '#e0e0e0'; e.currentTarget.style.transform = 'translateY(0)';}}>
          <div style={{ fontSize: "clamp(40px, 6vw, 60px)", marginBottom: 20 }}>⚡</div>
          <h3 style={{ fontSize: "clamp(18px, 2.5vw, 22px)", fontWeight: 600, marginBottom: 12 }}>Lightning Fast</h3>
          <p style={{ fontSize: "clamp(14px, 2vw, 16px)", opacity: 0.8 }}>Instant calculations and quick search for any currency pair.</p>
        </div>
        <div style={{padding: "clamp(20px, 4vw, 40px)", background: cardBg, borderRadius: 12, textAlign: 'center', color: textColor, border: `1px solid ${isDark ? '#333' : '#e0e0e0'}`, transition: 'all 0.3s ease', cursor: 'pointer'}} onMouseEnter={(e) => {e.currentTarget.style.borderColor = gold; e.currentTarget.style.transform = 'translateY(-5px)';}} onMouseLeave={(e) => {e.currentTarget.style.borderColor = isDark ? '#333' : '#e0e0e0'; e.currentTarget.style.transform = 'translateY(0)';}}>
          <div style={{ fontSize: "clamp(40px, 6vw, 60px)", marginBottom: 20 }}>📱</div>
          <h3 style={{ fontSize: "clamp(18px, 2.5vw, 22px)", fontWeight: 600, marginBottom: 12 }}>Fully Responsive</h3>
          <p style={{ fontSize: "clamp(14px, 2vw, 16px)", opacity: 0.8 }}>Works seamlessly on desktop, tablet, and mobile devices.</p>
        </div>
      </div>
    </div>

    <div id="currency-cards-section" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', padding: "clamp(10px, 3vw, 20px)", marginTop: "clamp(30px, 5vw, 50px)", marginBottom: "clamp(30px, 5vw, 50px)" }}>
      <div className="currency-section" style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: "clamp(15px, 3vw, 25px)", width: '100%', maxWidth: '1400px' }}>
        <div className="currency-main currency-cards-container" style={{ display: 'flex', flexDirection: 'column', height: isMobile ? 'auto' : 680, gap: "clamp(10px, 2vw, 20px)", width: '100%', maxWidth: isMobile ? '100%' : 800 }}>
          <div className="currency-nav-row" style={{display: 'flex', flexDirection: isMobile ? 'column' : 'row', color: textColor, width: '100%', padding: "clamp(15px, 3vw, 20px)", background: cardBg, borderRadius: 8, gap: "clamp(8px, 2vw, 10px)", alignItems: isMobile ? 'flex-start' : 'center', border: `1px solid ${isDark ? '#333' : '#e0e0e0'}`}}>
            <div style={{ flex: 1, width: '100%', order: isMobile ? 1 : 0 }}>
              <SearchNav onSearchChange={setSearchQuery} />
            </div>
            <div style={{ order: isMobile ? 2 : 1, alignSelf: isMobile ? 'flex-start' : 'center' }}>
              <CurrencyNav onChange={setBaseCurrency} />
            </div>
          </div>
          <div style={{flex: 1, color: textColor, width: '100%', minHeight: isMobile ? '500px' : 0, background: cardBg, borderRadius: 8, padding: "clamp(15px, 3vw, 20px)", border: `1px solid ${isDark ? '#333' : '#e0e0e0'}`}}>
            <CurrencyCards baseCurrency={baseCurrency} onCurrencyClick={setTargetCurrency} searchQuery={searchQuery} />
          </div>
        </div>
        <div className="currency-graph" style={{color: textColor, width: '100%', maxWidth: isMobile ? '100%' : 500, height: isMobile ? '400px' : 680, background: cardBg, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: "clamp(15px, 3vw, 20px)", border: `1px solid ${isDark ? '#333' : '#e0e0e0'}`}}>
          <Graph baseCurrency={baseCurrency} targetCurrency={targetCurrency} />
        </div>
      </div>
    </div>

    <footer style={{ textAlign: 'center', padding: '20px', marginTop: 20, borderTop: `1px solid ${isDark ? '#333' : '#e0e0e0'}`, color: textColor }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
        <a href="https://www.linkedin.com/in/josef-llorente-b40540324/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ width: 36, height: 36, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${textColor}`, color: textColor, textDecoration: 'none', transition: 'all 180ms ease' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = gold; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = textColor; }}><Linkedin size={18} /></a>
        <a href="https://github.com/JosefLlorente" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ width: 36, height: 36, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${textColor}`, color: textColor, textDecoration: 'none', transition: 'all 180ms ease' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = gold; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = textColor; }}><Github size={18} /></a>
        <a href="https://www.instagram.com/ju_sipsip/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ width: 36, height: 36, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${textColor}`, color: textColor, textDecoration: 'none', transition: 'all 180ms ease' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = gold; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = textColor; }}><Instagram size={18} /></a>
      </div>
      <div style={{ marginTop: 10, fontSize: 13, opacity: 0.85 }}>© 2026 MIDAS. All rights reserved.</div>
    </footer>
    </div>
  );
}
