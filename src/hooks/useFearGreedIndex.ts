import { useState, useEffect } from 'react';

interface FearGreedData {
    value: number; // 0-100
    valueClassification: string; // e.g., "Extreme Fear", "Fear", "Neutral", "Greed", "Extreme Greed"
    timestamp: number;
    previousValue?: number; // Yesterday's value for comparison
    change?: number; // Change from yesterday
    trend?: 'up' | 'down' | 'stable'; // Trend direction
}

export const useFearGreedIndex = () => {
    const [data, setData] = useState<FearGreedData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFearGreed = async () => {
            try {
                // Fetch last 2 days to calculate change
                const response = await fetch('https://api.alternative.me/fng/?limit=2');
                const result = await response.json();

                if (result.data && result.data.length > 0) {
                    const today = result.data[0];
                    const yesterday = result.data[1];

                    const currentValue = parseInt(today.value, 10);
                    const previousValue = yesterday ? parseInt(yesterday.value, 10) : currentValue;
                    const change = currentValue - previousValue;

                    let trend: 'up' | 'down' | 'stable' = 'stable';
                    if (change > 2) trend = 'up';
                    else if (change < -2) trend = 'down';

                    setData({
                        value: currentValue,
                        valueClassification: today.value_classification,
                        timestamp: parseInt(today.timestamp, 10),
                        previousValue,
                        change,
                        trend,
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
