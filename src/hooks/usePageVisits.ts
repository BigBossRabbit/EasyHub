import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to track unique page visits using localStorage
 * Combines session-based tracking with time-based cooldown (24 hours)
 * to prevent duplicate counts from the same user
 */
export const usePageVisits = () => {
    const location = useLocation();
    const [visits, setVisits] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const currentPath = location.pathname;
        const storageKey = `page_visits_${currentPath}`;
        const sessionKey = `page_visit_session_${currentPath}`;
        const lastVisitKey = `page_visit_last_${currentPath}`;

        // Cooldown period: 24 hours in milliseconds
        const COOLDOWN_PERIOD = 24 * 60 * 60 * 1000;

        try {
            // Check if this is a new session (sessionStorage is cleared when browser closes)
            const hasVisitedThisSession = sessionStorage.getItem(sessionKey);

            // Get the last visit timestamp
            const lastVisitTime = localStorage.getItem(lastVisitKey);
            const now = Date.now();

            // Determine if we should count this visit
            let shouldCount = false;

            if (!hasVisitedThisSession) {
                // New session - check time-based cooldown
                if (!lastVisitTime || (now - parseInt(lastVisitTime, 10)) > COOLDOWN_PERIOD) {
                    shouldCount = true;
                }
            }

            // Get current visit count
            const storedVisits = localStorage.getItem(storageKey);
            let currentVisits = storedVisits ? parseInt(storedVisits, 10) : 0;

            if (shouldCount) {
                // Increment visit count
                currentVisits += 1;

                // Update localStorage with new count and timestamp
                localStorage.setItem(storageKey, currentVisits.toString());
                localStorage.setItem(lastVisitKey, now.toString());
            }

            // Mark this session as visited (prevents multiple counts in same session)
            sessionStorage.setItem(sessionKey, 'true');

            // Update state
            setVisits(currentVisits);
            setLoading(false);
        } catch (error) {
            // Handle localStorage/sessionStorage errors (e.g., in private browsing mode)
            console.error('Error accessing storage:', error);
            setVisits(0);
            setLoading(false);
        }
    }, [location.pathname]);

    return { visits, loading };
};
