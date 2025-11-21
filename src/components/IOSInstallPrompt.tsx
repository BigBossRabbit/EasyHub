import { useState, useEffect } from 'react';
import { Share, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const IOSInstallPrompt = () => {
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        // Check for debug mode
        const urlParams = new URLSearchParams(window.location.search);
        const debugMode = urlParams.get('force_ios') === 'true';

        // Detect if device is iOS
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

        // Detect iPadOS 13+ (which requests desktop site by default)
        const isIPad = navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 2 &&
            /MacIntel/.test(navigator.platform);

        // Detect if already in standalone mode (installed)
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;

        // Show prompt only on iOS (or iPad) and if not already installed
        // OR if debug mode is enabled
        if (((isIOS || isIPad) && !isStandalone) || debugMode) {
            // Check if prompt was already dismissed in this session (ignore in debug mode)
            const isDismissed = sessionStorage.getItem('iosInstallPromptDismissed');
            if (!isDismissed || debugMode) {
                // Show after a short delay
                const timer = setTimeout(() => setShowPrompt(true), 3000);
                return () => clearTimeout(timer);
            }
        }
    }, []);

    const handleDismiss = () => {
        setShowPrompt(false);
        sessionStorage.setItem('iosInstallPromptDismissed', 'true');
    };

    if (!showPrompt) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-8 animate-in slide-in-from-bottom duration-500">
            <div className="bg-zinc-900/95 backdrop-blur-md border border-primary/20 rounded-xl p-4 shadow-2xl max-w-md mx-auto relative">
                <button
                    onClick={handleDismiss}
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="flex gap-4">
                    <div className="bg-zinc-800 rounded-xl w-16 h-16 flex-shrink-0 overflow-hidden border border-white/10">
                        <img src="/easysats-logo.png" alt="App Icon" className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1">
                        <h3 className="font-bold text-white text-lg mb-1">Install EasyHub</h3>
                        <p className="text-gray-300 text-sm mb-3">
                            Install this app on your iPhone for the best experience.
                        </p>

                        <div className="space-y-2 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                                <span>1. Tap the</span>
                                <Share className="h-4 w-4 text-blue-400" />
                                <span>Share button</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>2. Scroll down and tap</span>
                                <span className="font-bold text-white bg-zinc-700 px-2 py-0.5 rounded text-xs">Add to Home Screen</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full">
                    <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-zinc-900/95"></div>
                </div>
            </div>
        </div>
    );
};

export default IOSInstallPrompt;
