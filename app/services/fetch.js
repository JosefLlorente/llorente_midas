export default async function fetchData() {
    try {
        const res = await fetch('https://api.frankfurter.dev/v1/currencies');
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}