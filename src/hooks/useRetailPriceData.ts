import { useState, useEffect } from 'react';
import { getHistoricalBtcPrice, getHistoricalUsdNadRate } from '@/utils/bitcoinPriceHistory';

export interface RetailPriceDataPoint {
    date: string;
    timestamp: number;
    fiatPrice: number;
    btcPrice: number;
    currency: 'NAD' | 'USD';
    commodity: 'bread' | 'milk' | 'eggs';
    unit: string;
}

// Historical Retail Prices (Annual Averages/Snapshots)
const NAMIBIA_RETAIL_PRICES = {
    bread: { // Loaf (700g approx)
        '2010-06-01': 7.30, '2011-06-01': 7.50, '2012-06-01': 7.80, '2013-06-01': 8.00,
        '2014-06-01': 8.20, '2015-06-01': 8.50, '2016-06-01': 9.00, '2017-06-01': 9.20,
        '2018-06-01': 9.50, '2019-06-01': 10.00, '2020-06-01': 10.20, '2021-04-12': 10.50,
        '2022-06-01': 12.50, '2023-12-01': 14.77, '2024-06-01': 14.59, '2025-11-01': 13.80
    },
    milk: { // Liter
        '2010-06-01': 10.40, '2011-06-01': 11.00, '2012-06-01': 11.50, '2013-06-01': 12.50,
        '2014-06-01': 13.50, '2015-06-01': 15.00, '2016-06-01': 16.00, '2017-06-01': 16.50,
        '2018-06-01': 17.50, '2019-06-01': 18.20, '2020-06-01': 18.80, '2021-06-01': 20.00,
        '2022-06-01': 21.50, '2023-06-01': 23.00, '2024-06-01': 24.10, '2025-11-01': 25.06
    },
    eggs: { // Dozen
        '2010-06-01': 15.00, '2011-06-01': 16.50, '2012-06-01': 18.00, '2013-06-01': 19.50,
        '2014-06-01': 20.50, '2015-06-01': 22.00, '2016-06-01': 24.00, '2017-06-01': 25.50,
        '2018-06-01': 27.50, '2019-06-01': 29.00, '2020-07-01': 30.50, '2021-06-01': 33.00,
        '2022-06-01': 38.50, '2023-08-01': 50.00, '2024-06-01': 49.50, '2025-11-01': 48.20
    }
};

const USA_RETAIL_PRICES = {
    bread: { // per lb
        '2010-06-01': 1.37, '2011-06-01': 1.44, '2012-06-01': 1.42, '2013-06-01': 1.41,
        '2014-06-01': 1.40, '2015-06-01': 1.44, '2016-06-01': 1.37, '2017-06-01': 1.33,
        '2018-06-01': 1.29, '2019-06-01': 1.30, '2020-06-01': 1.45, '2021-06-01': 1.52,
        '2022-06-01': 1.70, '2023-06-01': 1.96, '2024-06-01': 1.97, '2025-06-01': 1.99
    },
    milk: { // per gallon
        '2010-06-01': 3.26, '2011-06-01': 3.57, '2012-06-01': 3.49, '2013-06-01': 3.46,
        '2014-06-01': 3.69, '2015-06-01': 3.42, '2016-06-01': 3.20, '2017-06-01': 3.23,
        '2018-06-01': 2.90, '2019-06-01': 3.04, '2020-06-01': 3.32, '2021-06-01': 3.55,
        '2022-06-01': 4.09, '2023-06-01': 4.03, '2024-06-01': 3.98, '2025-06-01': 3.85
    },
    eggs: { // per dozen
        '2010-06-01': 1.47, '2011-06-01': 1.15, '2012-06-01': 1.06, '2013-06-01': 2.03,
        '2014-06-01': 2.02, '2015-06-01': 2.47, '2016-06-01': 1.38, '2017-06-01': 1.82,
        '2018-06-01': 1.60, '2019-06-01': 1.54, '2020-06-01': 1.51, '2021-06-01': 1.67,
        '2022-06-01': 2.86, '2023-06-01': 2.80, '2024-06-01': 3.17, '2025-06-01': 2.95
    }
};

export const useRetailPriceData = (currency: 'NAD' | 'USD', commodity: 'bread' | 'milk' | 'eggs') => {
    const [data, setData] = useState<RetailPriceDataPoint[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = () => {
            setLoading(true);
            const sourceData = currency === 'NAD' ? NAMIBIA_RETAIL_PRICES[commodity] : USA_RETAIL_PRICES[commodity];

            let unit = '';
            if (currency === 'NAD') {
                unit = commodity === 'bread' ? 'Loaf' : commodity === 'milk' ? 'Liter' : 'Dozen';
            } else {
                unit = commodity === 'bread' ? 'lb' : commodity === 'milk' ? 'Gallon' : 'Dozen';
            }

            const formattedData: RetailPriceDataPoint[] = Object.entries(sourceData)
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
                        commodity,
                        unit
                    };
                }).sort((a, b) => a.timestamp - b.timestamp);

            setData(formattedData);
            setLoading(false);
        };

        loadData();
    }, [currency, commodity]);

    return { data, loading };
};
