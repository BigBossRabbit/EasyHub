import { useState, useEffect } from 'react';
import { ArrowUp, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Toggle visibility based on scroll position
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    // Scroll to top smoothly
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={cn(
                "fixed bottom-8 right-8 z-50 p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-card border border-primary/20 group",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
            )}
            aria-label="Back to top"
        >
            <div className="relative flex items-center justify-center w-8 h-8">
                {/* Lightning Bolt Base */}
                <Zap className="w-6 h-6 text-primary absolute bottom-0 transition-colors group-hover:text-green-400" fill="currentColor" fillOpacity={0.2} />

                {/* Arrow Overlay */}
                <ArrowUp className="w-5 h-5 text-foreground absolute -top-1 font-bold stroke-[3px] transition-transform group-hover:-translate-y-1" />
            </div>
        </button>
    );
};

export default BackToTop;
