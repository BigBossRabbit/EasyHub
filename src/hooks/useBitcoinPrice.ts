import { useState, useEffect } from 'react';

interface BitcoinRates {
    usd: number | null;
    nad: number | null;
}

export const useBitcoinPrice = () => {
    const [rates, setRates] = useState<BitcoinRates>({ usd: null, nad: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                // Fetch USD rate
                const usdResponse = await fetch(
                    'https://api.bitnob.com/api/v1/rates/USD'
                );
                const usdData = await usdResponse.json();

                // Fetch NAD rate
                const nadResponse = await fetch(
                    'https://api.bitnob.com/api/v1/rates/NAD'
                );
                const nadData = await nadResponse.json();

                setRates({
                    usd: usdData?.data?.buy_rate || null,
                    nad: nadData?.data?.buy_rate || null,
                });
                setError(null);
            } catch (err) {
                setError('Failed to fetch Bitcoin rates');
                console.error('Error fetching Bitcoin rates:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchRates();
        // Update rates every 30 seconds for real-time data
        const interval = setInterval(fetchRates, 30000);

        return () => clearInterval(interval);
    }, []);

    return { rates, loading, error };
};
