import { useState, useEffect, useCallback } from 'react';

export interface NewsItem {
    title: string;
    description: string;
    link: string;
    pubDate: string;
    source: string;
    category?: string;
}

// Expanded curated list with diverse sources
const CURATED_STORIES: NewsItem[] = [
    // EasySats & Local
    {
        title: "Namibia's First Bitcoin Revolution: Easy, Accessible & Unstoppable",
        description: "At EasySats, it is our mission to find ways that allow users to easily purchase Bitcoin, while using our accumulated expertise & technical knowledge to ensure that not only can people purchase it, but they are made aware of how they can earn & accept it for their goods & services.",
        link: "/about",
        pubDate: new Date().toISOString(),
        source: "EasySats",
        category: "Local"
    },
    // Adopting Bitcoin Conference
    {
        title: "Adopting Bitcoin Cape Town 2026: Africa's Premier Bitcoin Conference Wraps Up",
        description: "The Adopting Bitcoin conference in Cape Town brought together developers, entrepreneurs, and Bitcoin enthusiasts from across Africa and beyond. Key discussions focused on circular economies, merchant adoption, and regulatory developments across the continent.",
        link: "https://adoptingbitcoin.org/capetown",
        pubDate: new Date().toISOString(),
        source: "Adopting Bitcoin",
        category: "Conference"
    },
    // Bitcoin Circular Economies
    {
        title: "Bitcoin Circular Economies: How African Communities Are Building Local Bitcoin Networks",
        description: "From small villages to major cities, African communities are creating self-sustaining Bitcoin economies where goods and services flow without ever converting back to fiat currency. These circular economies demonstrate Bitcoin's true potential as everyday money.",
        link: "https://bitcoinmagazine.com",
        pubDate: new Date().toISOString(),
        source: "Bitcoin Magazine",
        category: "Circular Economy"
    },
    // African Bitcoiners Twitter/X
    {
        title: "Anita Posch on Financial Inclusion: 'Bitcoin is the Great Equalizer for Africa'",
        description: "Renowned Bitcoin educator Anita Posch continues her advocacy work across Africa, teaching communities about self-custody and the importance of financial sovereignty in regions where banking access remains limited.",
        link: "https://x.com/AnitaPosch",
        pubDate: new Date().toISOString(),
        source: "@AnitaPosch",
        category: "African Bitcoiners"
    },
    // Bitcoin Africa Story
    {
        title: "Lightning Network Adoption Surges Across Africa",
        description: "African nations are leading the way in Lightning Network adoption, with merchants across Namibia, Kenya, and Nigeria accepting instant Bitcoin payments with near-zero fees. The Lightning revolution is enabling microtransactions that were previously impossible.",
        link: "https://bitcoinke.io",
        pubDate: new Date().toISOString(),
        source: "Bitcoin Africa Story",
        category: "Lightning"
    },
    // Bitcoin Breakdown Newsletter
    {
        title: "The Bitcoin Breakdown: Africa Edition - What's Really Happening on the Ground",
        description: "This week's Bitcoin Breakdown dives deep into the grassroots adoption happening across African nations. From Trezor workshops in Namibia to BTCPay Server deployments in Kenya, the continent is building Bitcoin infrastructure from the ground up.",
        link: "https://bitcoinbreakdown.com",
        pubDate: new Date().toISOString(),
        source: "Bitcoin Breakdown",
        category: "Newsletter"
    },
    // Machankura / USSD
    {
        title: "Machankura Hits 10,000 Users: Bitcoin Without Internet Reaches Rural Africa",
        description: "The USSD-based Bitcoin service Machankura has crossed 10,000 active users, proving that Bitcoin can reach the unbanked even without smartphone access. Users can send and receive Bitcoin using simple feature phones.",
        link: "https://8333.mobi",
        pubDate: new Date().toISOString(),
        source: "@paboromongatane",
        category: "African Bitcoiners"
    },
    // Self-Custody
    {
        title: "Self-Custody Solutions Empower Namibian Merchants",
        description: "The first self-custodial Bitcoin payment server in Namibia allows merchants to accept Bitcoin without relying on third parties, ensuring true financial sovereignty. TimeForce members are leading this revolution.",
        link: "/timeforce",
        pubDate: new Date().toISOString(),
        source: "EasySats",
        category: "Local"
    },
    // Fedi / Fedimint
    {
        title: "Fedimint Communities Launch Across Africa: Collaborative Bitcoin Custody",
        description: "The Fedimint protocol is enabling community-based Bitcoin custody solutions across Africa. These 'Bitcoin banks' allow groups to pool resources while maintaining individual privacy through innovative cryptographic techniques.",
        link: "https://fedi.xyz",
        pubDate: new Date().toISOString(),
        source: "Fedi",
        category: "Bitcoin Tech"
    },
    // P2P Trading
    {
        title: "Peer-to-Peer Trading Thrives in African Markets",
        description: "With limited access to traditional exchanges, Africans are turning to P2P platforms like Vexlaks to buy and sell Bitcoin, often at premium prices due to high demand. This decentralized approach gives users more control.",
        link: "https://vexlaks.com",
        pubDate: new Date().toISOString(),
        source: "Vexlaks",
        category: "P2P"
    },
    // Bitcoin Education
    {
        title: "Bitcoin Education Initiative Launches in Southern Africa",
        description: "New educational resources are helping Africans understand and adopt Bitcoin, from basic wallet setup to running their own Lightning nodes. TPOK is at the forefront of this movement.",
        link: "/tpok",
        pubDate: new Date().toISOString(),
        source: "TPOK",
        category: "Education"
    },
    // Nostr + Bitcoin
    {
        title: "Nostr + Bitcoin: African Developers Building Censorship-Resistant Social Media",
        description: "African developers are combining Nostr with Lightning to create censorship-resistant social platforms. These apps allow users to send Bitcoin tips via zaps while maintaining their privacy and freedom of speech.",
        link: "https://nostr.com",
        pubDate: new Date().toISOString(),
        source: "Nostr Protocol",
        category: "Bitcoin Tech"
    }
];

const QUICK_FACTS = [
    "First Bitcoin voucher system in Namibia",
    "First Self-Custodial Bitcoin Payment Server in Namibia",
    "Instant payment confirmation via Lightning Network",
    "No bank account or permission required",
    "Over 1,000 merchants onboarded across Africa",
    "Lightning payments process in under 3 seconds",
    "Bitcoin adoption in Africa growing 1,200% year-over-year",
    "P2P trading volume in Africa exceeds $50M monthly",
    "Kenya leads Africa in Lightning Network adoption",
    "Namibia pioneering merchant self-custody solutions",
    "Machankura enables Bitcoin without smartphones",
    "Adopting Bitcoin conferences expanding across Africa",
    "Fedimint enabling community Bitcoin custody",
    "African developers leading Bitcoin innovation"
];

export const useBitcoinAfricaNews = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [quickFacts, setQuickFacts] = useState<string[]>(QUICK_FACTS.slice(0, 4));
    const [isLoading, setIsLoading] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

    const featuredStory = CURATED_STORIES[currentIndex];
    const allStories = CURATED_STORIES;
    const topStories = CURATED_STORIES.slice(0, 5); // First 5 for headlines

    const nextArticle = useCallback(() => {
        setCurrentIndex(prev => (prev + 1) % CURATED_STORIES.length);

        // Rotate quick facts
        setQuickFacts(prev => {
            const currentStartIndex = QUICK_FACTS.findIndex(f => f === prev[0]);
            const nextStartIndex = (currentStartIndex + 1) % (QUICK_FACTS.length - 3);
            return QUICK_FACTS.slice(nextStartIndex, nextStartIndex + 4);
        });

        setLastUpdated(new Date());
    }, []);

    const goToFirst = useCallback(() => {
        setCurrentIndex(0);
        setQuickFacts(QUICK_FACTS.slice(0, 4));
        setLastUpdated(new Date());
    }, []);

    const goToArticle = useCallback((index: number) => {
        setCurrentIndex(index);
        setLastUpdated(new Date());
    }, []);

    useEffect(() => {
        // Auto-rotate every 45 seconds
        const interval = setInterval(nextArticle, 45000);
        return () => clearInterval(interval);
    }, [nextArticle]);

    return {
        featuredStory,
        allStories,
        topStories,
        currentIndex,
        totalStories: CURATED_STORIES.length,
        quickFacts,
        isLoading,
        lastUpdated,
        nextArticle,
        goToFirst,
        goToArticle
    };
};

export default useBitcoinAfricaNews;
