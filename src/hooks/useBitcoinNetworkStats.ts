import { useState, useEffect } from 'react';

interface BitcoinNetworkStats {
    blockHeight: number | null;
    fees: {
        fastestFee: number;
        halfHourFee: number;
        hourFee: number;
    } | null;
    difficulty: number | null;
    difficultyChange: number | null; // Percentage change from previous epoch
    hashrate: string | null; // Formatted hashrate (e.g., "650 EH/s")
    nextHalving: {
        blocksRemaining: number;
        daysRemaining: number;
    } | null;
    mempoolSize: number | null; // Number of unconfirmed transactions
    blockTime: number | null; // Average block time in seconds
}

export const useBitcoinNetworkStats = () => {
    const [stats, setStats] = useState<BitcoinNetworkStats>({
        blockHeight: null,
        fees: null,
        difficulty: null,
        difficultyChange: null,
        hashrate: null,
        nextHalving: null,
        mempoolSize: null,
        blockTime: null,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch Block Height
                const heightResponse = await fetch('https://mempool.space/api/blocks/tip/height');
                const blockHeight = parseInt(await heightResponse.text(), 10);

                // Fetch Fees
                const feesResponse = await fetch('https://mempool.space/api/v1/fees/recommended');
                const feesData = await feesResponse.json();

                // Fetch Difficulty and Hashrate from blockchain.info
                const difficultyResponse = await fetch('https://blockchain.info/q/getdifficulty');
                const difficulty = parseFloat(await difficultyResponse.text());

                // Fetch previous difficulty to calculate change
                // Use mempool.space API for accurate difficulty adjustment estimate
                const difficultyAdjResponse = await fetch('https://mempool.space/api/v1/difficulty-adjustment');
                const difficultyAdjData = await difficultyAdjResponse.json();
                const difficultyChange = difficultyAdjData.difficultyChange;

                // Calculate hashrate from difficulty (approximate)
                // Hashrate (H/s) = difficulty * 2^32 / 600
                const hashrateRaw = (difficulty * Math.pow(2, 32)) / 600;
                const hashrateEH = hashrateRaw / 1e18; // Convert to EH/s
                const hashrate = `${hashrateEH.toFixed(0)} EH/s`;

                // Calculate next halving
                const HALVING_INTERVAL = 210000;
                const currentHalvingEpoch = Math.floor(blockHeight / HALVING_INTERVAL);
                const nextHalvingBlock = (currentHalvingEpoch + 1) * HALVING_INTERVAL;
                const blocksRemaining = nextHalvingBlock - blockHeight;
                const daysRemaining = Math.floor((blocksRemaining * 10) / 60 / 24); // ~10 min per block

                // Fetch mempool size
                const mempoolResponse = await fetch('https://mempool.space/api/mempool');
                const mempoolData = await mempoolResponse.json();
                const mempoolSize = mempoolData.count;

                // Fetch recent blocks to calculate average block time
                const blocksResponse = await fetch('https://mempool.space/api/v1/blocks');
                const blocksData = await blocksResponse.json();
                if (blocksData.length >= 2) {
                    const timeDiff = blocksData[0].timestamp - blocksData[blocksData.length - 1].timestamp;
                    const blockTime = Math.floor(timeDiff / (blocksData.length - 1));

                    setStats({
                        blockHeight,
                        fees: {
                            fastestFee: feesData.fastestFee,
                            halfHourFee: feesData.halfHourFee,
                            hourFee: feesData.hourFee,
                        },
                        difficulty,
                        difficultyChange,
                        hashrate,
                        nextHalving: {
                            blocksRemaining,
                            daysRemaining,
                        },
                        mempoolSize,
                        blockTime,
                    });
                }

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
