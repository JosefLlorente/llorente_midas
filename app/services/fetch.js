const API_BASE_URL = 'https://api.frankfurter.dev/v1';

export async function fetchLatestRates(baseCurrency = 'USD') {
    try {
        const res = await fetch(`${API_BASE_URL}/latest?base=${baseCurrency}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching latest rates:', error);
        return null;
    }
}

export async function fetchHistoricalRates(baseCurrency, targetCurrency, startDate = '1999-01-01', endDate = null) {
    try {
        const end = endDate || new Date().toISOString().split('T')[0];
        const res = await fetch(`${API_BASE_URL}/${startDate}..${end}?base=${baseCurrency}&symbols=${targetCurrency}`);
        
        if (!res.ok) {
            throw new Error(`API error: ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching historical rates:', error);
        return null;
    }
}