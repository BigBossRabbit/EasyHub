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
            // Each source is independent: one dead endpoint must never blank the others.
            const get = async <T,>(url: string, parse: (r: Response) => Promise<T>): Promise<T | null> => {
                try {
                    const r = await fetch(url, { signal: AbortSignal.timeout(10000) });
                    return r.ok ? await parse(r) : null;
                } catch { return null; }
            };
            try {
                const [heightTxt, feesData, adj, mempoolData, blocksData, hashData] = await Promise.all([
                    get('https://mempool.space/api/blocks/tip/height', (r) => r.text()),
                    get('https://mempool.space/api/v1/fees/recommended', (r) => r.json()),
                    get('https://mempool.space/api/v1/difficulty-adjustment', (r) => r.json()),
                    get('https://mempool.space/api/mempool', (r) => r.json()),
                    get('https://mempool.space/api/v1/blocks', (r) => r.json()),
                    // mempool.space carries difficulty + hashrate too (blockchain.info is unreachable)
                    get('https://mempool.space/api/v1/mining/hashrate/3d', (r) => r.json()),
                ]);

                const blockHeight = heightTxt ? parseInt(heightTxt, 10) : null;
                const difficulty = hashData?.currentDifficulty ?? null;
                const hashrate = hashData?.currentHashrate ? `${(hashData.currentHashrate / 1e18).toFixed(0)} EH/s` : null;

                let nextHalving = null;
                if (blockHeight) {
                    const HALVING_INTERVAL = 210000;
                    const nextHalvingBlock = (Math.floor(blockHeight / HALVING_INTERVAL) + 1) * HALVING_INTERVAL;
                    const blocksRemaining = nextHalvingBlock - blockHeight;
                    nextHalving = { blocksRemaining, daysRemaining: Math.floor((blocksRemaining * 10) / 60 / 24) };
                }

                let blockTime = null;
                if (Array.isArray(blocksData) && blocksData.length >= 2) {
                    blockTime = Math.floor((blocksData[0].timestamp - blocksData[blocksData.length - 1].timestamp) / (blocksData.length - 1));
                }

                setStats({
                    blockHeight,
                    fees: feesData ? { fastestFee: feesData.fastestFee, halfHourFee: feesData.halfHourFee, hourFee: feesData.hourFee } : null,
                    difficulty,
                    difficultyChange: adj?.difficultyChange ?? null,
                    hashrate,
                    nextHalving,
                    mempoolSize: mempoolData?.count ?? null,
                    blockTime,
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
