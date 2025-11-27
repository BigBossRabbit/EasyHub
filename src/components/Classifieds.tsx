import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Clock, Code, BookOpen, ShoppingBag, Heart, Key, Shield, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceItem {
    title: string;
    description: string;
    icon: React.ReactNode;
    link: string;
    isExternal: boolean;
    tag: string;
}

export const Classifieds = () => {
    const services: ServiceItem[] = [
        {
            title: "EasyJobs",
            description: "Find or post Bitcoin-only jobs. Connect with the best talent in the ecosystem.",
            icon: <Briefcase className="h-5 w-5" />,
            link: "/easyjobs",
            isExternal: false,
            tag: "CAREERS"
        },
        {
            title: "TimeForce",
            description: "Exchange your time and skills for sats. Peer-to-peer task marketplace.",
            icon: <Clock className="h-5 w-5" />,
            link: "/timeforce",
            isExternal: false,
            tag: "GIGS"
        },
        {
            title: "EasyDevs",
            description: "Hire top-tier Bitcoin developers for your next project.",
            icon: <Code className="h-5 w-5" />,
            link: "/easydevs",
            isExternal: false,
            tag: "DEV"
        },
        {
            title: "TPOK",
            description: "The Persuit Of Knowledge. Educational resources to master Bitcoin.",
            icon: <BookOpen className="h-5 w-5" />,
            link: "/tpok",
            isExternal: false,
            tag: "EDUCATION"
        },
        {
            title: "Merchant Platform",
            description: "Accept Bitcoin payments seamlessly. No bank account required.",
            icon: <ShoppingBag className="h-5 w-5" />,
            link: "https://easysats.okinent.org/register?returnurl=%2F",
            isExternal: true,
            tag: "BUSINESS"
        },
        {
            title: "Crowdfunding",
            description: "Support the mission. Help us bring Bitcoin to everyone.",
            icon: <Heart className="h-5 w-5" />,
            link: "https://geyser.fund/project/easysats",
            isExternal: true,
            tag: "DONATE"
        },
        {
            title: "SovereignKey",
            description: "Take control of your financial future with self-custody solutions.",
            icon: <Key className="h-5 w-5" />,
            link: "https://sovereignkey.carrd.co/",
            isExternal: true,
            tag: "SECURITY"
        },
        {
            title: "Trezor Academy",
            description: "Master hardware wallet security with our expert-led sessions.",
            icon: <Shield className="h-5 w-5" />,
            link: "https://www.youtube.com/watch?v=w3hnFCfCo84",
            isExternal: true,
            tag: "TRAINING"
        }
    ];

    return (
        <Card className="w-full bg-card border-2 border-border p-6 mb-8">
            <CardHeader className="px-0 pt-0 pb-4 border-b-2 border-border mb-4">
                <CardTitle className="text-2xl font-serif font-bold uppercase tracking-wider flex items-center justify-between">
                    <span>Classifieds</span>
                    <span className="text-sm font-sans font-normal text-muted-foreground normal-case tracking-normal">
                        Services & Opportunities
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {services.map((service, index) => (
                        <div key={index} className="group border border-border p-3 hover:bg-muted/50 transition-colors relative">
                            {/* Tag */}
                            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 uppercase">
                                {service.tag}
                            </div>

                            {service.isExternal ? (
                                <a
                                    href={service.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block h-full"
                                >
                                    <div className="flex items-start gap-3 mb-2 pt-2">
                                        <div className="text-primary group-hover:scale-110 transition-transform">
                                            {service.icon}
                                        </div>
                                        <h3 className="font-serif font-bold text-sm group-hover:underline decoration-primary underline-offset-2">
                                            {service.title}
                                        </h3>
                                        <ExternalLink className="h-3 w-3 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                                        {service.description}
                                    </p>
                                </a>
                            ) : (
                                <Link to={service.link} className="block h-full">
                                    <div className="flex items-start gap-3 mb-2 pt-2">
                                        <div className="text-primary group-hover:scale-110 transition-transform">
                                            {service.icon}
                                        </div>
                                        <h3 className="font-serif font-bold text-sm group-hover:underline decoration-primary underline-offset-2">
                                            {service.title}
                                        </h3>
                                    </div>
                                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                                        {service.description}
                                    </p>
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
