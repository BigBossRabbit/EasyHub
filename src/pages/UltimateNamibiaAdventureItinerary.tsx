import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    CheckCircle,
    XCircle,
    MapPin,
    CalendarDays,
    Users,
    Clock,
    Info,
    Utensils,
    Camera,
    Plane,
    Tent,
    Compass,
    Binoculars,
    Waves,
    Mountain,
    Anchor,
    Car,
    Gift
} from 'lucide-react';

const itineraryData = [
    {
        day: 1,
        title: "Arrival in Windhoek & City Exploration",
        description: "Arrival at Hosea Kutako International Airport (WDH). Meet & greet by your professional English-speaking guide/driver. Private transfer to your luxury hotel in Windhoek.",
        subDescription: "The afternoon is at leisure to relax and recover. An optional guided city tour (2-3 hours) is available for those eager to start exploring the capital.",
        accommodation: "The Weinberg Hotel or similar (luxury) OR Urban Camp (comfortable)",
        meals: "Dinner included at a local restaurant",
        icon: <Plane className="h-6 w-6" />,
        color: "from-blue-500/20 to-indigo-500/20"
    },
    {
        day: 2,
        title: "Windhoek to Namib Desert",
        description: "Enjoy a leisurely breakfast before departing from Windhoek. Embark on a scenic drive through the breathtaking Khomas Hochland mountains, heading towards the ancient Namib Desert.",
        subDescription: "Arrive at your lodge near Sossusvlei, with time to relax, enjoy the pool, and soak in the stunning desert views.",
        accommodation: "Sossusvlei Lodge or similar OR Camp Gecko",
        meals: "Breakfast, Dinner (Lunch at Camp Gecko)",
        travelTime: "3 to 4.5 hours",
        icon: <Mountain className="h-6 w-6" />,
        color: "from-orange-500/20 to-red-500/20"
    },
    {
        day: 3,
        title: "Sossusvlei & Sesriem Canyon",
        description: "A pre-dawn start to witness a spectacular sunrise over the world's highest dunes. Explore Deadvlei and the ancient petrified trees.",
        subDescription: "Discover the iconic dunes, the vast pans, and a guided excursion into the Sesriem Canyon. Lunch provided inside the national park.",
        accommodation: "Sossusvlei Lodge or similar OR Camp Gecko",
        meals: "Breakfast, Lunch, Dinner",
        travelTime: "1.5 hours to park entrance",
        icon: <Camera className="h-6 w-6" />,
        color: "from-yellow-500/20 to-orange-500/20"
    },
    {
        day: 4,
        title: "Sesriem to Swakopmund",
        description: "Journey through the vast Namib Desert and the dramatic Kuiseb Canyon, making your way to the charming coastal town of Swakopmund.",
        subDescription: "Optional Balloon Safari over the Namib Desert at dawn. Free time in Swakopmund to explore the promenade or beachfront cafés.",
        accommodation: "Beach Hotel Swakopmund or similar OR The Stiltz",
        meals: "Breakfast",
        travelTime: "3.5 to 5 hours",
        icon: <Compass className="h-6 w-6" />,
        color: "from-cyan-500/20 to-blue-500/20"
    },
    {
        day: 5,
        title: "Thrilling Coastal Adventures",
        description: "Choice of exhilarating primary excursions: Sandwich Harbour 4x4 Tour, Catamaran Dolphin Cruise, or Mola Mola Excursion and Braai.",
        subDescription: "Afternoon free for relaxation or optional add-ons like quad biking, sandboarding, or skydiving.",
        accommodation: "Beach Hotel Swakopmund or similar OR The Stiltz",
        meals: "Breakfast (and Lunch on specific excursions)",
        icon: <Waves className="h-6 w-6" />,
        color: "from-blue-600/20 to-cyan-600/20"
    },
    {
        day: 6,
        title: "Swakopmund to Damaraland",
        description: "Enjoy a quad-bike excursion through the dunes before departing on a scenic coastal drive north, then inland into the dramatic Damaraland scenery.",
        subDescription: "Optional visit to Cape Cross Seal Reserve. Late afternoon guided nature walk to track desert-adapted wildlife.",
        accommodation: "Twyfelfontein Lodge or similar OR Twyfelfontein Adventure Camp",
        meals: "Breakfast, Dinner (Lunch at Twyfelfontein Adventure Camp)",
        travelTime: "4 to 4.5 hours",
        icon: <Binoculars className="h-6 w-6" />,
        color: "from-emerald-500/20 to-teal-500/20"
    },
    {
        day: 7,
        title: "UNESCO Heritage & Etosha Gateway",
        description: "Visit the Twyfelfontein UNESCO Rock Engravings and the Damara Living Museum to learn about local culture.",
        subDescription: "Travel to your lodge on the south-western edge of Etosha National Park. Enjoy an optional sunset game drive.",
        accommodation: "Etosha Safari Camp or similar OR Twyfelfontein Adventure Camp",
        meals: "Breakfast, Dinner (Lunch at specific camps)",
        travelTime: "3.5 hours",
        icon: <MapPin className="h-6 w-6" />,
        color: "from-green-500/20 to-emerald-500/20"
    },
    {
        day: 8,
        title: "Etosha National Park Wildlife",
        description: "Enter Etosha at sunrise for a full day of game viewing. Spot lions, elephants, rhinos, and diverse antelope species.",
        subDescription: "Picnic lunch at a rest camp inside the park. Exit on the eastern side for your next lodge.",
        accommodation: "Mokuti Etosha Lodge or similar OR Etosha Camping2Go",
        meals: "Breakfast, Dinner (Lunch at Etosha Camping2Go)",
        icon: <Binoculars className="h-6 w-6" />,
        color: "from-green-600/20 to-lime-600/20"
    },
    {
        day: 9,
        title: "Etosha to Rundu",
        description: "Embark on a leisurely departure, traveling north into the lush Kavango region and the serene Okavango River.",
        subDescription: "Optional Sundowner Boat Cruise - a perfect, gentle activity to end the day on the river.",
        accommodation: "Hakusembe River Lodge or similar",
        meals: "Breakfast, Dinner",
        travelTime: "3.5 to 5.5 hours",
        icon: <Waves className="h-6 w-6" />,
        color: "from-blue-400/20 to-indigo-400/20"
    },
    {
        day: 10,
        title: "Cultural Immersion & Rundu",
        description: "Participate in a Guided Cultural Village Visit to learn about Kavango traditions, crafts, and daily life.",
        subDescription: "Afternoon of pure relaxation at the lodge, soaking in the peaceful river atmosphere.",
        accommodation: "Riverside Lodge in Rundu",
        meals: "Breakfast, Dinner",
        icon: <Users className="h-6 w-6" />,
        color: "from-indigo-500/20 to-purple-500/20"
    },
    {
        day: 11,
        title: "Rundu to Otjiwarongo",
        description: "Primarily a travel and relaxation day, enjoying the changing landscapes as you journey south.",
        subDescription: "A relaxed lunch stop will be made en route. Arrive early afternoon in Otjiwarongo.",
        accommodation: "Fly Inn Guesthouse or similar",
        meals: "Breakfast",
        travelTime: "6.5 hours",
        icon: <Car className="h-6 w-6" />,
        color: "from-slate-500/20 to-gray-500/20"
    },
    {
        day: 12,
        title: "Otjiwarongo to Windhoek",
        description: "Enjoy a leisurely drive back to Windhoek. Stop at local craft markets for final souvenir shopping.",
        subDescription: "Farewell dinner at a premier restaurant, reflecting on your incredible journey through Namibia.",
        accommodation: "The Weinberg Hotel or similar OR Urban Camp",
        meals: "Breakfast, Farewell Dinner",
        travelTime: "3 to 4 hours",
        icon: <Gift className="h-6 w-6" />,
        color: "from-amber-500/20 to-orange-500/20"
    },
    {
        day: 13,
        title: "Departure",
        description: "Enjoy a final breakfast at your hotel before your transfer to Hosea Kutako International Airport.",
        subDescription: "Safe travels and hope to see you again in Namibia!",
        meals: "Breakfast",
        icon: <Plane className="h-6 w-6" />,
        color: "from-indigo-600/20 to-blue-600/20"
    }
];

const inclusions = [
    "13 nights of hand-picked luxury & comfortable accommodation",
    "Breakfast and Dinner daily (approx. 23 meals total)",
    "Professional English-speaking guide/driver throughout",
    "Private air-conditioned 4x4 safari vehicle with full insurance",
    "All fuel, road tolls, and vehicle expenses",
    "All National Park entrance fees (Sossusvlei, Etosha, etc.)",
    "Choice of coastal excursion in Swakopmund",
    "Guided tours of UNESCO sites and cultural villages",
    "4x Namibian SIM cards with data for your group",
    "Complimentary snacks and bottled water daily"
];

const exclusions = [
    "International flights to and from Windhoek",
    "Mandatory Travel & Medical Insurance",
    "Lunches not explicitly mentioned in the itinerary",
    "Alcoholic beverages and personal drinks",
    "Optional activities (Balloon Safari, etc.)",
    "Personal expenses (Visas, tips, laundry, etc.)"
];

const UltimateNamibiaAdventureItinerary = () => {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            <Seo
                title="The Ultimate Namibia Adventure Itinerary"
                description="Detailed 13-Day Itinerary for The Ultimate Namibia Adventure, payable in Bitcoin."
                canonical="/easytours/ultimate-namibia"
            />

            {/* Navigation */}
            <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-[60]">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/easytours" className="flex items-center gap-3 group transition-all duration-300">
                            <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <ArrowLeft className="h-5 w-5 text-primary group-hover:-translate-x-1 transition-transform" />
                            </div>
                            <span className="text-lg font-bold text-primary tracking-tight">Return to Expeditions</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/namibia-hero.png"
                        alt="Namibian Landscape"
                        className="w-full h-full object-cover scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-background" />
                    <div className="absolute inset-0 backdrop-blur-[2px]" />
                </div>

                <div className="container relative z-10 px-6 text-center animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/30 border border-primary/50 backdrop-blur-md text-white font-mono text-xs uppercase tracking-widest mb-6">
                        <Compass className="h-4 w-4 text-primary" />
                        13-Day Grand Tour
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-2xl">
                        The Ultimate <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                            Namibia Adventure
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                        A seamless blend of luxury, culture, and wild discovery across Namibia's most iconic landscapes.
                    </p>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10" />
            </section>

            {/* Main Content */}
            <main className="container mx-auto px-6 pb-24 -mt-24 relative z-20">
                <div className="max-w-6xl mx-auto">

                    {/* Itinerary Grid */}
                    <div className="space-y-12">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-card/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl">
                            <div className="space-y-2 text-center md:text-left">
                                <h2 className="text-3xl font-bold tracking-tight">Expedition Schedule</h2>
                                <p className="text-muted-foreground">Day-by-day sequence of the journey</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-center min-w-[100px]">
                                    <div className="text-2xl font-bold text-primary">13</div>
                                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Days</div>
                                </div>
                                <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-center min-w-[100px]">
                                    <div className="text-2xl font-bold text-primary">23</div>
                                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Meals</div>
                                </div>
                                <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-center min-w-[100px]">
                                    <div className="text-2xl font-bold text-primary">100%</div>
                                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">BTC</div>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-8">
                            {itineraryData.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="group relative flex flex-col md:flex-row gap-8 bg-card/30 backdrop-blur-md border border-white/5 hover:border-primary/30 rounded-3xl p-6 md:p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 cursor-default"
                                >
                                    {/* Day Bubble */}
                                    <div className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${item.color} flex flex-col items-center justify-center border border-white/10 group-hover:scale-105 transition-transform duration-500`}>
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 mb-1 font-mono">Day</span>
                                        <span className="text-3xl md:text-4xl font-bold text-white">{item.day < 10 ? `0${item.day}` : item.day}</span>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 space-y-4">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <h3 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-primary transition-colors">{item.title}</h3>
                                            <div className="hidden md:flex items-center gap-2 p-2 rounded-xl bg-white/5 text-xs text-muted-foreground">
                                                {item.icon}
                                            </div>
                                        </div>

                                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                                            <p className="text-lg text-foreground/90">{item.description}</p>
                                            <p className="text-sm border-l-2 border-primary/30 pl-4">{item.subDescription}</p>
                                        </div>

                                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6 mt-6 border-t border-white/5">
                                            <div className="flex items-start gap-3">
                                                <div className="mt-1 p-1 rounded-lg bg-primary/10 text-primary">
                                                    <Tent className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Accommodation</span>
                                                    <p className="text-xs text-foreground/80 leading-snug">{item.accommodation}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <div className="mt-1 p-1 rounded-lg bg-primary/10 text-primary">
                                                    <Utensils className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Gastronomy</span>
                                                    <p className="text-xs text-foreground/80 leading-snug">{item.meals}</p>
                                                </div>
                                            </div>

                                            {item.travelTime && (
                                                <div className="flex items-start gap-3">
                                                    <div className="mt-1 p-1 rounded-lg bg-primary/10 text-primary">
                                                        <Clock className="h-4 w-4" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Travel Time</span>
                                                        <p className="text-xs text-foreground/80 leading-snug">{item.travelTime}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Inclusions & Exclusions */}
                        <div className="grid lg:grid-cols-2 gap-8 pt-12">
                            <div className="bg-primary/5 backdrop-blur-md border border-primary/20 rounded-3xl p-10 space-y-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-mono uppercase tracking-widest">
                                    <CheckCircle className="h-4 w-4" />
                                    Expedition Inclusions
                                </div>
                                <h3 className="text-3xl font-bold">What's Covered</h3>
                                <ul className="grid sm:grid-cols-1 gap-4">
                                    {inclusions.map((text, idx) => (
                                        <li key={idx} className="flex items-start gap-4 text-sm text-foreground/80">
                                            <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                            {text}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 space-y-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-muted-foreground text-xs font-mono uppercase tracking-widest">
                                    <XCircle className="h-4 w-4" />
                                    Expedition Exclusions
                                </div>
                                <h3 className="text-3xl font-bold">Financial Responsibility</h3>
                                <ul className="grid sm:grid-cols-1 gap-4">
                                    {exclusions.map((text, idx) => (
                                        <li key={idx} className="flex items-start gap-4 text-sm text-muted-foreground/80">
                                            <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/30 flex-shrink-0" />
                                            {text}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="relative mt-20 p-1 rounded-3xl bg-gradient-to-r from-primary/30 via-orange-400/30 to-primary/30">
                            <div className="bg-card/90 backdrop-blur-2xl rounded-[1.4rem] p-12 text-center space-y-8">
                                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Ready for this Grand Tour?</h2>
                                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                    Experience Namibia in its purest form, powered by the world's hardest money.
                                    Our team is ready to curate your specific requirements.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button size="lg" className="h-16 px-12 text-lg font-bold shadow-2xl shadow-primary/20" asChild>
                                        <Link to="/contact">Book Expedition</Link>
                                    </Button>
                                    <Button size="lg" variant="outline" className="h-16 px-12 text-lg font-bold backdrop-blur-sm" asChild>
                                        <Link to="/easytours">Explore More Tours</Link>
                                    </Button>
                                </div>
                                <div className="pt-8 flex items-center justify-center gap-6 text-xs font-mono text-muted-foreground uppercase tracking-[0.3em]">
                                    <span>PEER-TO-PEER</span>
                                    <div className="h-1 w-1 rounded-full bg-primary" />
                                    <span>NO FIAT REQUIRED</span>
                                    <div className="h-1 w-1 rounded-full bg-primary" />
                                    <span>SOVEREIGN TRAVEL</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UltimateNamibiaAdventureItinerary;