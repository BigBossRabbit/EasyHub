import { useState, useEffect } from 'react';

interface FearGreedData {
    value: number; // 0-100
    valueClassification: string; // e.g., "Extreme Fear", "Fear", "Neutral", "Greed", "Extreme Greed"
    timestamp: number;
}

export const useFearGreedIndex = () => {
    const [data, setData] = useState<FearGreedData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFearGreed = async () => {
            try {
                // Alternative Fear & Greed Index API
                const response = await fetch('https://api.alternative.me/fng/?limit=1');
                const result = await response.json();

                if (result.data && result.data.length > 0) {
                    const latest = result.data[0];
                    setData({
                        value: parseInt(latest.value, 10),
                        valueClassification: latest.value_classification,
                        timestamp: parseInt(latest.timestamp, 10),
                    });
                }

                setError(null);
            } catch (err) {
                setError('Failed to fetch Fear & Greed Index');
                console.error('Error fetching Fear & Greed Index:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFearGreed();
        // Update every 60 seconds (same as network stats)
        const interval = setInterval(fetchFearGreed, 60000);

        return () => clearInterval(interval);
    }, []);

    return { data, loading, error };
};
