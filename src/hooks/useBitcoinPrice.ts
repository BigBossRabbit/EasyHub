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
                // Use CoinGecko as fallback since Bitnob has CORS restrictions
                const response = await fetch(
                    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
                );
                const data = await response.json();

                // Get NAD rate by converting USD (approximate: 1 USD ≈ 18 NAD)
                const usdRate = data.bitcoin.usd;
                const nadRate = usdRate * 18; // Approximate conversion

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
        // Update rates every 30 seconds for real-time data
        const interval = setInterval(fetchRates, 30000);

        return () => clearInterval(interval);
    }, []);

    return { rates, loading, error };
};
