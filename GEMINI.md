# Project Context & History

## Session: Custom Domain, Network Stats & Whitepaper (Nov 20-21, 2025)

### Key Accomplishments
1.  **Custom Domain Setup**:
    -   Added `CNAME` file with subdomain: `bitcoin.okinent.org`
    -   Site now accessible via custom subdomain instead of GitHub Pages default URL
    -   Updated `.gitignore` to exclude `.gemini/` and `dev-dist/`

2.  **Bitcoin Network Statistics Integration**:
    -   Created `src/hooks/useBitcoinNetworkStats.ts` hook
    -   Fetches real-time data from Mempool.space API:
        - Block height
        - Fee rates (fastest, half-hour, hour)
    -   Auto-updates every 60 seconds
    -   Integrated into footer ticker

3.  **Enhanced Footer Ticker**:
    -   Added new real-time metrics to scrolling ticker:
        - **Block Height**: Current Bitcoin blockchain height
        - **Fees**: Fastest fee rate in sat/vB
        - **BTC/USD**: Bitcoin price in US Dollars
        - **BTC/NAD**: Bitcoin price in Namibian Dollars
        - **Moscow Time (NAD)**: Sats per NAD (100M / NAD rate)
    -   Seamless marquee animation with duplicated content for smooth looping
    -   Terminal-style aesthetic with icons (Activity, Zap, TrendingUp, Clock)

4.  **Bitcoin Whitepaper Conversion**:
    -   Removed PDF version (`bitcoin-whitepaper.pdf`)
    -   Created HTML version (`public/bitcoin-whitepaper.html`) with terminal aesthetic
    -   Updated footer link to point to new HTML version
    -   694 lines of styled HTML content

5.  **Background Image**:
    -   Added `public/background.jpg` (874 KB) for site-wide background

### Technical Details
-   **APIs Used**: 
    - CoinGecko API for BTC/USD and BTC/ZAR (NAD proxy) prices
    - Mempool.space API for block height and fee data
-   **Hooks**: Both `useBitcoinPrice` and `useBitcoinNetworkStats` update every 60 seconds
-   **Styling**: Terminal-style footer with scanlines, grid patterns, animated brackets, and blinking cursors

---

## Session: About Page, Connect & Explore, and Deployment (Nov 19, 2025)

### Key Accomplishments
1.  **About Page Overhaul**:
    -   Integrated professional profile picture (`okin-profile.jpg`).
    -   Updated tagline to "Digital Disrupter | FreedomTech Enabler".
    -   Refined social media links (added GitHub, updated LinkedIn/Twitter).
    -   Renamed "EasySats" block to "TPOK" and linked to `/tpok`.
    -   Refactored "Connect & Explore" section to be a concise link.

2.  **New "Connect & Explore" Page**:
    -   Created `src/pages/ConnectExplore.tsx`.
    -   Added project cards: EasySats Merchant Platform, EasySats Crowdfunding, SovereignKey, Trezor Academy.
    -   Implemented responsive grid layout with hover effects.

3.  **Navigation & Routing**:
    -   Added `/connect` route in `App.tsx`.
    -   Updated navigation menus (Desktop & Mobile) across all pages (`EasySatsHub`, `About`, `ConnectExplore`, `EasyJobs`, `TimeForce`) to include "Connect" and ensure consistency.

4.  **Content Refinements**:
    -   **TimeForce**: Corrected book author to "Keysa Luna", updated problem/solution copy.
    -   **EasyJobs**: Refined header and descriptions.
    -   **NotFound**: Added easter egg console log.

5.  **Deployment**:
    -   Committed all changes to `main` branch.
    -   Ran `npm run deploy` to build and push to `gh-pages`.
    -   Live site: `https://bigbossrabbit.github.io/EasyHub/`

### Technical Details
-   **Images**: Added `okin-profile.jpg` to `public/assets/`.
-   **Routing**: Used `react-router-dom` for new `/connect` and `/tpok` links.
-   **Styling**: Tailwind CSS used for all new components and updates.
