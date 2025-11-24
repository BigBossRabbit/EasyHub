import { Button } from "@/components/ui/button";
import { Terminal, ExternalLink, Shield, Lock, Cpu, Usb } from "lucide-react";

export const SovereignKey = () => {
    return (
        <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors relative overflow-hidden h-full flex flex-col">
            {/* Techy Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-16 h-16 border border-primary/20 rounded-full"></div>
                <div className="absolute top-4 left-4 w-8 h-8 border border-primary/20 rounded-full"></div>
                <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-primary/10 rounded-full"></div>
            </div>

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Usb className="h-8 w-8 text-primary" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                        <div>
                            <span className="text-xs text-muted-foreground font-mono">SOVEREIGN KEY</span>
                            <div className="flex items-center gap-1 text-xs text-green-500 font-mono">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span>ACTIVE DEV</span>
                            </div>
                        </div>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">HARDWARE</span>
                </div>

                <h3 className="text-lg font-semibold mb-2 font-mono">SovereignKey (#SK)</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">
                    The SovereignKey (SK) combines powerful, open-source technologies to create a "Swiss Army Knife" for digital sovereignty. Boot a hardened OS directly from USB.
                </p>

                {/* Additional Details */}
                <div className="mb-4 p-3 bg-primary/5 border border-primary/20 rounded space-y-3">
                    <div>
                        <div className="text-xs text-primary font-mono mb-1">CORE FEATURES:</div>
                        <ul className="text-xs text-muted-foreground space-y-1">
                            <li className="flex items-center gap-2"><Shield className="h-3 w-3" /> Privacy-first, USB-bootable platform</li>
                            <li className="flex items-center gap-2"><Lock className="h-3 w-3" /> Secure, self-managed environment</li>
                            <li className="flex items-center gap-2"><Cpu className="h-3 w-3" /> No internal hard drive required</li>
                        </ul>
                    </div>
                </div>

                {/* Installation Steps */}
                <div className="mb-4 p-3 bg-primary/5 border border-primary/20 rounded space-y-3">
                    <div>
                        <div className="text-xs text-primary font-mono mb-1">INSTALLATION STEPS:</div>
                        <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                            <li>Power off your computer</li>
                            <li>Insert SovereignKey USB drive</li>
                            <li>Power on & access Boot using designated key for your hardware</li>
                            <li>Select Boot from USB</li>
                            <li>Wait for Tails OS to load</li>
                            <li>Enter Persistent Storage passphrase (found in SK packaging)</li>
                            <li>Click Start Tails</li>
                            <li>Connect to internet</li>
                            <li>Choose Connect to Tor when prompted</li>
                            <li>Enjoy your journey as a Sovereign Individual</li>
                        </ol>
                    </div>
                </div>

                {/* Boot Sequence Simulation */}
                <div className="mb-4 p-2 bg-black/80 rounded font-mono text-[10px] leading-tight text-gray-400 border border-gray-800">
                    <div className="text-green-500 mb-1 border-b border-gray-800 pb-1">{">>"} BOOT_SEQUENCE_INIT</div>
                    <div>[ OK ] Loading kernel modules...</div>
                    <div>[ OK ] Running everything off of RAM...</div>
                    <div>[ OK ] Starting your SK...</div>
                    <div>[ OK ] Verifying SK authenticity...</div>
                    <div className="text-primary animate-pulse">_ Awaiting user login...</div>
                </div>

                {/* Tech Stack Visualization */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-muted-foreground font-mono">STACK:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {['Tails OS', 'Bitcoin', 'Sparrow', 'Liana', 'Tor', 'FreedomTech'].map((tech) => (
                            <span key={tech} className="px-2 py-1 text-xs bg-primary/10 text-primary rounded font-mono">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex gap-2 mt-auto">
                <Button variant="outline" size="sm" className="gap-2 w-full" asChild>
                    <a href="https://github.com/BigBossRabbit/SovereignKey" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3" />
                        View on GitHub
                    </a>
                </Button>
            </div>
        </div>
    );
};
