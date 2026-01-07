# Project Context & History

## Session: EasyDevs Expiry Logic (Jan 6, 2026)

### Key Accomplishments
1.  **Automated Project Expiry**:
    -   Implemented logic in `src/pages/EasyDevs.tsx` to automatically hide projects 48 hours after their deadline.
    -   Refactored hardcoded "BOSS Challenge" card into a dynamic `TIMED_PROJECTS` array with `deadline` field.
    -   Updated `BossCountdown.tsx` to accept dynamic `targetDate` and `label` props.
    -   The "2026 BOSS Challenge" (deadline Dec 31, 2025) is now automatically hidden.

### Technical Details
-   **Logic**: Items are filtered out if `currentDate > deadline + 48 hours`.
-   **Refactoring**: Converted static JSX to mapped data structure for better scalability.

---


## Session: EasyPass PWA Sync & Deployment (Dec 28, 2025)

### Key Accomplishments
1.  **Sync EasyPass PWA**:
    -   Moved the latest EasyPass PWA files from the root `easypass/` directory to `public/easypass/` to ensure they are correctly served and included in the production build.
    -   Updated `public/easypass` with fresh assets including `manifest.json`, `service-worker.js`, and `bitcoin-pattern-bg.jpg`.
2.  **Deployment**:
    -   Committed changes to `main` branch.
    -   Ran `npm run deploy` to push the latest version (including the updated PWA) to GitHub Pages.

### Technical Details
-   **Structure**: Root `easypass/` was removed after syncing to `public/easypass/`.
-   **PWA**: The subpage is now accessible at `bitcoin.okinent.org/easypass`.

---


## Session: EasyTours Page & Navigation Updates (Dec 11, 2025)

### Key Accomplishments
1.  **New "EasyTours" Page**:
    -   Created `src/pages/EasyTours.tsx` to showcase Bitcoin-friendly tours in Namibia.
    -   Features include:
        -   **Hero Section**: Stunning visual with "Discover Namibia Paid in Bitcoin" headline.
        -   **Tour Packages**: "Dunes & Sats Expedition", "Skeleton Coast Crypto Retreat", "Windhoek City Bitcoin Walk".
        -   **Premium Design**: Glassmorphism, hover effects, and responsive layout.
    -   Added route `/easytours` to `App.tsx`.

2.  **Global Navigation Update**:
    -   Initially added "EasyTours" link to the navigation menu.
    -   **Update**: Removed "EasyTours" from global navigation (Desktop & Mobile) at user request to keep it "hidden" for testing.
    -   Page remains accessible at `/easytours`.

3.  **Link Verification**:
    -   Checked `TimeForce.tsx` for "Register for EasySats Server access" links. Both the main button and "Open in new tab" link point to `https://easysats.okinent.org/register`.

4.  **Deployment**:
    -   Built and deployed the latest version to GitHub Pages.
    -   Live site: `https://bitcoin.okinent.org/easytours` (and other pages).

### Technical Details
-   **New Asset**: Generated and added `public/assets/namibia-hero.png` for the EasyTours hero section.
-   **Routing**: Updated `App.tsx` to include the new route.

---

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
## Session: Comprehensive SEO & Performance Overhaul (Jan 6, 2026)

### Key Accomplishments
1. **Full Schema Implementation**: Added Person, Organization, Product, ItemList, and CollectionPage schemas across all main pages.
2. **Sitemap & Robots**: Automated sitemap generation and updated robots.txt.
3. **Image Optimization**: Added lazy loading and explicit dimensions to all major assets to improve Core Web Vitals (CLS/LCP).
4. **Accessibility**: Improved alt text for all interactive and informative images.

### Technical Details
- **Tools**: Created `generate-sitemap.js` for build-time XML generation.
- **Performance**: Reduced layout shift by defining image aspect ratios in code.

## Session: Vexlaks Integration (Jan 6, 2026)

### Key Accomplishments
1. **Connect & Explore Page**: Added a featured card for **Vexlaks** (vexlaks.com).
    - Designed with a "cool" aesthetic: gradient background, background icon watermark, and "Partner" badge.
    - Spans full width (col-span-2) on medium screens to stand out.
    - Updated `CONNECT_SCHEMA` to include Vexlaks in the structured data.

## Session: TimeForce Refactor & Vexlaks Integration (Jan 6, 2026)

### Key Accomplishments
1. **Connect & Explore Page**: Added a featured card for **Vexlaks** (vexlaks.com).
    - Designed with a "cool" aesthetic: gradient background, background icon watermark, and "Partner" badge.
    - Spans full width (col-span-2) on medium screens to stand out.
    - Updated `CONNECT_SCHEMA` to include Vexlaks in the structured data.

2. **TimeForce Page Updates**:
    - **Handbook Removal**: Removed all references to "Handbook" to reflect the service-based nature of TimeForce.
    - **Profit Share Update**: Simplified the model to two tiers: 0-20 Merchants (40%) and 20+ Merchants (50%).
    - **Dynamic Trial Period**: Implemented logic to show "14-day FREE trial for the month of January" until Jan 31, 2026, then switching to "7-day FREE trial".
    - **Countdown Timer**: Added a `BossCountdown` instance counting down to the promo end date, switching to "ACTIVE" upon expiry.

## Session: Privacy Updates & Personal Dashboard (Jan 7, 2026)

### Key Accomplishments
1.  **Hidden Page Visits**:
    -   Commented out the "Page Visits" display in the footer ticker to make it invisible to visitors.
    -   Preserved the underlying code (`usePageVisits` hook integration) for future use.

### Dashboard Plan (TODO)
-   **Goal**: Build a personal, admin-only dashboard to view site statistics.
-   **Data Source**: Reuse the `usePageVisits` hook and other metric hooks (`useBitcoinNetworkStats`, `useBitcoinPrice`).
-   **Implementation**: Create a protected route or a local-only page that displays these metrics in a comprehensive interface.