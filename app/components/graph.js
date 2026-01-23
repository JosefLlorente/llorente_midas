"use client"

import { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import { useTheme } from '../context/ThemeContext';
import { fetchHistoricalRates } from '../services/fetch';

export default function Graph({ baseCurrency = "AUD", targetCurrency = "EUR" }) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const gold = isDark ? '#FFD700' : '#B8860B';
    const textColor = isDark ? '#FFFFFF' : '#000000';

    useEffect(() => {
        const loadHistoricalData = async () => {
            setLoading(true);
            try {
                const data = await fetchHistoricalRates(baseCurrency, targetCurrency);
                
                if (!data || !data.rates || typeof data.rates !== 'object') {
                    setLoading(false);
                    return;
                }
                
                const dates = Object.keys(data.rates).sort();
                const actualStartDate = dates[0] || '1999-01-01';
                const rates = dates.map(date => {
                    const rateData = data.rates[date];
                    if (typeof rateData === 'object' && rateData !== null) {
                        return rateData[targetCurrency];
                    }
                    return rateData;
                }).filter(rate => rate !== undefined && rate !== null);
                
                if (dates.length === 0 || rates.length === 0) {
                    setLoading(false);
                    return;
                }
                
                setDateRange({ start: actualStartDate, end: dates[dates.length - 1] });

                if (!chartRef.current) {
                    setLoading(false);
                    return;
                }

                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }

                const ctx = chartRef.current.getContext('2d');
                chartInstance.current = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: dates,
                        datasets: [{
                            label: `${baseCurrency} to ${targetCurrency}`,
                            data: rates,
                            borderColor: gold,
                            backgroundColor: isDark ? 'rgba(255, 215, 0, 0.1)' : 'rgba(255, 215, 0, 0.2)',
                            borderWidth: 2,
                            fill: true,
                            tension: 0.1,
                            pointRadius: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        layout: {padding: {left: 10, right: 10, top: 10, bottom: 10}},
                        scales: {
                            x: {
                                ticks: {maxTicksLimit: 8, color: isDark ? '#FFFFFF' : '#000000', maxRotation: 45, minRotation: 45, font: {size: 10}},
                                grid: {color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
                            },
                            y: {
                                beginAtZero: false,
                                ticks: {color: isDark ? '#FFFFFF' : '#000000', font: {size: 10}},
                                grid: {color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
                            }
                        },
                        plugins: {legend: {display: false, position: 'top'}}
                    }
                });
                
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        loadHistoricalData();

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [baseCurrency, targetCurrency, theme]);

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ marginBottom: 10, alignContent: 'center', textAlign: 'center', color: textColor, fontSize: "clamp(10px, 1.5vw, 12px)" }}>
                {dateRange.start && dateRange.end && (
                    <span>Farthest data retrieved from <br></br>{dateRange.start} to {dateRange.end}</span>
                )}
            </div>
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: 0 }}>
                {loading && <div style={{ color: textColor, textAlign: 'center' }}>Loading...</div>}
                <canvas ref={chartRef} style={{ maxWidth: '100%', maxHeight: '100%' }}></canvas>
            </div>
        </div>
    )
}
