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
                // Use CoinGecko to fetch both USD and ZAR (which is 1:1 with NAD)
                const response = await fetch(
                    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,zar'
                );

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                // ZAR is pegged 1:1 to NAD
                const usdRate = data.bitcoin.usd;
                const nadRate = data.bitcoin.zar;

                setRates({
                    usd: usdRate || null,
                    nad: nadRate || null,
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
        // Update rates every 60 seconds to avoid rate limits while keeping data fresh
        const interval = setInterval(fetchRates, 60000);

        return () => clearInterval(interval);
    }, []);

    return { rates, loading, error };
};
