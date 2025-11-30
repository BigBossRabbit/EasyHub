import { useState, useEffect } from 'react';
import { getHistoricalBtcPrice, getHistoricalUsdNadRate } from '@/utils/bitcoinPriceHistory';

export interface FuelPriceDataPoint {
    date: string;
    timestamp: number;
    fiatPrice: number;      // Price in NAD (per liter) or USD (per gallon)
    btcPrice: number;       // Price in BTC
    currency: 'NAD' | 'USD';
    unit: string;           // 'Liter' or 'Gallon'
}

// Historical Fuel Prices (Annual Averages/Snapshots)
const NAMIBIA_FUEL_PRICES: Record<string, number> = {
    '2012-06-01': 10.16,
    '2014-06-01': 11.66,
    '2015-06-01': 15.22,
    '2016-03-07': 10.04,
    '2019-06-01': 12.17,
    '2021-06-01': 11.77,
    '2022-06-01': 22.70,
    '2023-09-06': 20.98,
    '2024-05-06': 23.00,
    '2024-10-01': 20.25,
    '2025-01-01': 20.25,
    '2025-10-01': 20.37
};

const USA_FUEL_PRICES: Record<string, number> = {
    '2010-06-01': 2.83,
    '2011-06-01': 3.52,
    '2012-06-01': 3.63,
    '2013-06-01': 3.50,
    '2014-06-01': 3.38,
    '2015-06-01': 2.43,
    '2016-06-01': 2.14,
    '2017-06-01': 2.41,
    '2018-06-01': 2.76,
    '2019-06-01': 2.60,
    '2020-06-01': 2.17,
    '2021-06-01': 3.01,
    '2022-06-01': 3.99,
    '2023-06-01': 3.52,
    '2024-06-01': 3.29,
    '2025-06-01': 3.12
};

export const useFuelPriceData = (currency: 'NAD' | 'USD') => {
    const [data, setData] = useState<FuelPriceDataPoint[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = () => {
            setLoading(true);
            const sourceData = currency === 'NAD' ? NAMIBIA_FUEL_PRICES : USA_FUEL_PRICES;
            const unit = currency === 'NAD' ? 'Liter' : 'Gallon';

            const formattedData: FuelPriceDataPoint[] = Object.entries(sourceData).map(([dateStr, price]) => {
                const date = new Date(dateStr);
                const btcPriceUSD = getHistoricalBtcPrice(date);

                let btcPrice = 0;
                if (currency === 'USD') {
                    btcPrice = price / btcPriceUSD;
                } else {
                    // Convert NAD price to USD first, then to BTC
                    // Or convert BTC price to NAD
                    const year = date.getFullYear();
                    const exchangeRate = getHistoricalUsdNadRate(year);
                    const btcPriceNAD = btcPriceUSD * exchangeRate;
                    btcPrice = price / btcPriceNAD;
                }

                return {
                    date: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                    timestamp: date.getTime(),
                    fiatPrice: price,
                    btcPrice: btcPrice,
                    currency,
                    unit
                };
            }).sort((a, b) => a.timestamp - b.timestamp);

            setData(formattedData);
            setLoading(false);
        };

        loadData();
    }, [currency]);

    return { data, loading };
};
