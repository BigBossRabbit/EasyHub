import { useState, useEffect } from 'react';

interface BitcoinRates {
    usd: number | null;
    nad: number | null;
}

interface BitpayRate {
    code: string;
    name: string;
    rate: number;
}

export const useBitcoinPrice = () => {
    const [rates, setRates] = useState<BitcoinRates>({ usd: null, nad: null });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPrices = async () => {
        try {
            const response = await fetch('https://bitpay.com/api/rates');
            if (!response.ok) {
                throw new Error('Failed to fetch Bitcoin prices');
            }
            const data: BitpayRate[] = await response.json();

            const usdRate = data.find(r => r.code === 'USD')?.rate || null;
            const zarRate = data.find(r => r.code === 'ZAR')?.rate || null; // ZAR is 1:1 with NAD

            setRates({
                usd: usdRate,
                nad: zarRate
            });
            setError(null);
        } catch (err) {
            console.error('Error fetching Bitcoin prices:', err);
            setError('Failed to load price data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrices();
        const interval = setInterval(fetchPrices, 60000); // Refresh every 60 seconds
        return () => clearInterval(interval);
    }, []);

    return { rates, loading, error };
};
