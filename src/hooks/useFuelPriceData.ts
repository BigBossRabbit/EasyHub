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
    '2012-01-01': 9.80, '2012-06-01': 10.16, '2012-12-01': 10.85,
    '2013-01-01': 11.00, '2013-06-01': 11.20, '2013-12-01': 11.45,
    '2014-01-01': 11.55, '2014-06-01': 11.66, '2014-12-01': 10.90,
    '2015-01-01': 9.90, '2015-06-01': 15.22, '2015-12-01': 10.50,
    '2016-01-01': 10.40, '2016-03-07': 10.04, '2016-06-01': 10.90, '2016-12-01': 11.00,
    '2017-01-01': 11.20, '2017-06-01': 11.30, '2017-12-01': 11.70,
    '2018-01-01': 11.80, '2018-06-01': 12.00, '2018-12-01': 12.50,
    '2019-01-01': 12.10, '2019-06-01': 12.17, '2019-12-01': 13.05,
    '2020-01-01': 13.15, '2020-06-01': 11.50, '2020-12-01': 11.35,
    '2021-01-01': 11.40, '2021-06-01': 11.77, '2021-12-01': 15.65,
    '2022-01-01': 15.95, '2022-06-01': 22.70, '2022-12-01': 21.30,
    '2023-01-01': 20.68, '2023-06-01': 19.78, '2023-09-06': 20.98, '2023-12-01': 22.48,
    '2024-01-01': 22.18, '2024-05-06': 23.00, '2024-08-01': 21.80, '2024-10-01': 20.25,
    '2025-01-01': 20.25, '2025-06-01': 20.37, '2025-10-01': 20.37
};

const USA_FUEL_PRICES: Record<string, number> = {
    '2010-01-01': 2.73, '2010-06-01': 2.83, '2010-12-01': 2.98,
    '2011-01-01': 3.10, '2011-06-01': 3.52, '2011-12-01': 3.28,
    '2012-01-01': 3.37, '2012-06-01': 3.63, '2012-12-01': 3.30,
    '2013-01-01': 3.30, '2013-06-01': 3.50, '2013-12-01': 3.27,
    '2014-01-01': 3.31, '2014-06-01': 3.38, '2014-12-01': 2.54,
    '2015-01-01': 2.12, '2015-06-01': 2.43, '2015-12-01': 2.03,
    '2016-01-01': 1.96, '2016-06-01': 2.14, '2016-12-01': 2.25,
    '2017-01-01': 2.34, '2017-06-01': 2.41, '2017-12-01': 2.48,
    '2018-01-01': 2.54, '2018-06-01': 2.76, '2018-12-01': 2.37,
    '2019-01-01': 2.25, '2019-06-01': 2.60, '2019-12-01': 2.56,
    '2020-01-01': 2.50, '2020-06-01': 2.17, '2020-12-01': 2.20,
    '2021-01-01': 2.42, '2021-06-01': 3.01, '2021-12-01': 3.41,
    '2022-01-01': 3.41, '2022-06-01': 3.99, '2022-12-01': 3.21,
    '2023-01-01': 3.39, '2023-06-01': 3.52, '2023-12-01': 3.12,
    '2024-01-01': 3.08, '2024-06-01': 3.29, '2024-12-01': 3.01,
    '2025-01-01': 3.05, '2025-06-01': 3.12, '2025-12-01': 3.18
};

export const useFuelPriceData = (currency: 'NAD' | 'USD') => {
    const [data, setData] = useState<FuelPriceDataPoint[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = () => {
            setLoading(true);
            const sourceData = currency === 'NAD' ? NAMIBIA_FUEL_PRICES : USA_FUEL_PRICES;
            const unit = currency === 'NAD' ? 'Liter' : 'Gallon';

            const formattedData: FuelPriceDataPoint[] = Object.entries(sourceData)
                .filter(([dateStr]) => {
                    const date = new Date(dateStr);
                    const fiveYearsAgo = new Date();
                    fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
                    return date >= fiveYearsAgo; // Rolling 5-year window
                })
                .map(([dateStr, price]) => {
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
