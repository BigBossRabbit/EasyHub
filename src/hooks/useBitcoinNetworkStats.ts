import { useState, useEffect } from 'react';

interface BitcoinNetworkStats {
    blockHeight: number | null;
    fees: {
        fastestFee: number;
        halfHourFee: number;
        hourFee: number;
    } | null;
}

export const useBitcoinNetworkStats = () => {
    const [stats, setStats] = useState<BitcoinNetworkStats>({ blockHeight: null, fees: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch Block Height
                const heightResponse = await fetch('https://mempool.space/api/blocks/tip/height');
                const blockHeight = await heightResponse.text();

                // Fetch Fees
                const feesResponse = await fetch('https://mempool.space/api/v1/fees/recommended');
                const feesData = await feesResponse.json();

                setStats({
                    blockHeight: parseInt(blockHeight, 10) || null,
                    fees: {
                        fastestFee: feesData.fastestFee,
                        halfHourFee: feesData.halfHourFee,
                        hourFee: feesData.hourFee,
                    },
                });
                setError(null);
            } catch (err) {
                setError('Failed to fetch Bitcoin network stats');
                console.error('Error fetching Bitcoin network stats:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
        // Update stats every 60 seconds
        const interval = setInterval(fetchStats, 60000);

        return () => clearInterval(interval);
    }, []);

    return { stats, loading, error };
};
