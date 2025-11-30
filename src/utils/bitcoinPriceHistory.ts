import { useState, useEffect } from 'react';

// Fallback historical BTC prices (monthly close approx) to ensure charts work without API
// Format: [timestamp, price]
const HISTORICAL_BTC_PRICES: Record<string, number> = {
    // 2010
    '2010-07-17': 0.05,
    '2010-08-01': 0.06,
    '2010-09-01': 0.06,
    '2010-10-01': 0.06,
    '2010-11-01': 0.29,
    '2010-12-01': 0.23,
    // 2011
    '2011-01-01': 0.30,
    '2011-06-01': 18.00, // Peak
    '2011-12-01': 4.70,
    // 2012
    '2012-01-01': 5.27,
    '2012-06-01': 6.70,
    '2012-12-01': 13.50,
    // 2013
    '2013-01-01': 13.30,
    '2013-04-01': 230.00, // Rally
    '2013-12-01': 950.00, // Peak
    // 2014
    '2014-01-01': 770.00,
    '2014-06-01': 640.00,
    '2014-12-01': 320.00,
    // 2015
    '2015-01-01': 314.00,
    '2015-06-01': 260.00,
    '2015-12-01': 430.00,
    // 2016
    '2016-01-01': 434.00,
    '2016-06-01': 670.00,
    '2016-12-01': 960.00,
    // 2017
    '2017-01-01': 998.00,
    '2017-06-01': 2400.00,
    '2017-12-01': 13800.00, // Peak
    // 2018
    '2018-01-01': 10200.00,
    '2018-06-01': 6400.00,
    '2018-12-01': 3700.00,
    // 2019
    '2019-01-01': 3800.00,
    '2019-06-01': 10800.00,
    '2019-12-01': 7200.00,
    // 2020
    '2020-01-01': 9300.00,
    '2020-03-16': 5000.00, // Covid crash
    '2020-06-01': 9100.00,
    '2020-12-01': 28800.00,
    // 2021
    '2021-01-01': 33000.00,
    '2021-04-01': 58000.00,
    '2021-07-01': 41000.00,
    '2021-11-01': 61000.00,
    // 2022
    '2022-01-01': 38000.00,
    '2022-06-01': 20000.00,
    '2022-11-01': 16000.00, // FTX crash
    // 2023
    '2023-01-01': 23000.00,
    '2023-06-01': 30000.00,
    '2023-12-01': 42000.00,
    // 2024
    '2024-01-01': 44000.00,
    '2024-03-01': 61000.00,
    '2024-06-01': 67000.00,
    '2024-10-01': 63000.00,
    '2024-11-01': 95000.00, // Recent rally
    // 2025
    '2025-01-01': 98000.00,
    '2025-06-01': 105000.00, // Projected/Current
};

export const getHistoricalBtcPrice = (date: Date): number => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // Format as YYYY-MM-DD for lookup
    const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    // Try exact match
    if (HISTORICAL_BTC_PRICES[dateStr]) {
        return HISTORICAL_BTC_PRICES[dateStr];
    }

    // Find closest date
    const dates = Object.keys(HISTORICAL_BTC_PRICES).sort();
    let closestDate = dates[0];
    let minDiff = Math.abs(new Date(closestDate).getTime() - date.getTime());

    for (const d of dates) {
        const diff = Math.abs(new Date(d).getTime() - date.getTime());
        if (diff < minDiff) {
            minDiff = diff;
            closestDate = d;
        }
    }

    return HISTORICAL_BTC_PRICES[closestDate];
};

// Helper to get exchange rate for NAD (approximate historical)
export const getHistoricalUsdNadRate = (year: number): number => {
    const rates: Record<number, number> = {
        2010: 7.3,
        2011: 7.2,
        2012: 8.2,
        2013: 9.6,
        2014: 10.8,
        2015: 12.7,
        2016: 14.7,
        2017: 13.3,
        2018: 13.2,
        2019: 14.4,
        2020: 16.5,
        2021: 14.7,
        2022: 16.3,
        2023: 18.4,
        2024: 18.8,
        2025: 18.5
    };
    return rates[year] || 18.5;
};
