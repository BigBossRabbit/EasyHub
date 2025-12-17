import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import { ArrowLeft, Bitcoin } from 'lucide-react'; // Assuming Bitcoin icon might be useful

const UltimateNamibiaAdventureItinerary = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Seo
                title="The Ultimate Namibia Adventure Itinerary"
                description="Detailed 13-Day Itinerary for The Ultimate Namibia Adventure, payable in Bitcoin."
                canonical="/easytours/ultimate-namibia"
            />

            <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/easytours" className="flex items-center gap-3 group">
                            <ArrowLeft className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                            <span className="text-xl font-bold text-primary">Back to EasyTours</span>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-12 prose prose-invert max-w-none">
                <h1 className="text-5xl font-bold mb-6 text-primary">The Ultimate Namibia Adventure - 13-Day Grand Tour</h1>
                <p className="lead mb-8 text-muted-foreground">
                    Embark on an unforgettable 13-day journey through Namibia, combining the best experiences from both "Easy Tours" and "Wasafiri Tours & Transfers" for a truly comprehensive and luxurious adventure. This tour offers a blend of breathtaking landscapes, diverse wildlife, and rich cultural encounters, guided by experienced professionals and designed for an immersive experience.
                </p>

                <h2 className="text-3xl font-bold mt-10 mb-4 text-primary">Itinerary Overview</h2>

                <h3 className="text-2xl font-bold mt-8 mb-3 text-secondary">Day 1: Arrival in Windhoek & City Exploration</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li>Arrival at Hosea Kutako International Airport (WDH). Meet & greet by your professional English-speaking guide/driver. Private transfer to your luxury hotel in Windhoek.</li>
                    <li>The afternoon is at leisure to relax and recover. An optional guided city tour (2-3 hours) is available for those eager to start exploring the capital.</li>
                    <li><strong>Accommodation:</strong> The Weinberg Hotel or similar (luxury option) OR Urban Camp (comfortable, budget-friendly option).</li>
                    <li><strong>Meals:</strong> Dinner (included) at a renowned local restaurant, accompanied by a welcome briefing from your guide.</li>
                </ul>

                <h3 className="text-2xl font-bold mt-8 mb-3 text-secondary">Day 2: Windhoek to Namib Desert - Gateway to Sossusvlei</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li>Enjoy a leisurely breakfast before departing from Windhoek. Embark on a scenic drive through the breathtaking Khomas Hochland mountains, heading towards the ancient Namib Desert.</li>
                    <li>Arrive at your lodge near Sossusvlei, with time to relax, enjoy the pool, and soak in the stunning desert views.</li>
                    <li><strong>Optional Activity:</strong> A late afternoon nature drive with your lodge guide to learn about desert ecology OR an optional sundowner drive.</li>
                    <li><strong>Route:</strong> Windhoek – Sossusvlei Area (Lodge near Sesriem)</li>
                    <li><strong>Accommodation:</strong> Sossusvlei Lodge or similar (near Sesriem) OR Camp Gecko (glamping/adventure camp option).</li>
                    <li><strong>Travel Time:</strong> Approximately 3 to 4.5 hours.</li>
                    <li><strong>Meals:</strong> Breakfast, Dinner (Lunch included if staying at Camp Gecko).</li>
                </ul>

                <h3 className="text-2xl font-bold mt-8 mb-3 text-secondary">Day 3: Sossusvlei & Sesriem Canyon - Iconic Dunes & Ancient Landscapes</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li>A pre-dawn start with an early light breakfast. Depart for the highlight visit to Sossusvlei and Deadvlei, where you will witness a spectacular sunrise over some of the world's highest dunes (with an optional climb of Dune 45).</li>
                    <li>Enjoy a full-day guided tour discovering the iconic dunes, the vast pans, the ancient petrified trees, and a guided excursion into the Sesriem Canyon. Lunch will be provided inside the national park.</li>
                    <li>Return to the lodge in time for leisurely late brunch/lunch and relaxation (siesta, swim).</li>
                    <li><strong>Included Activity:</strong> Full-day guided tour to Sossusvlei and Deadvlei, with lunch inside the park.</li>
                    <li><strong>Accommodation:</strong> Sossusvlei Lodge or similar (near Sesriem) OR Camp Gecko.</li>
                    <li><strong>Travel Time:</strong> Approximately 1.5 hours to park entrance.</li>
                    <li><strong>Meals:</strong> Breakfast, Lunch, Dinner.</li>
                </ul>

                <h3 className="text-2xl font-bold mt-8 mb-3 text-secondary">Day 4: Sesriem to Swakopmund - Coastal Charm & Desert Views</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li>Enjoy a leisurely departure after breakfast. Journey through the vast Namib Desert and the dramatic Kuiseb Canyon, making your way to the charming coastal town of Swakopmund.</li>
                    <li><strong>Optional Activity (prior to departure):</strong> Experience a breathtaking Balloon Safari over the Namib Desert at dawn (note: very early rise; estimated cost approx. 500€).</li>
                    <li>The remainder of the day in Swakopmund is free to explore. Optional activities include: strolling along the promenade, visiting the crystal gallery, or relaxing at a beachfront café.</li>
                    <li><strong>Accommodation:</strong> Beach Hotel Swakopmund or similar OR The Stiltz (boutique, unique accommodation option).</li>
                    <li><strong>Travel Time:</strong> Approximately 3.5 to 5 hours.</li>
                    <li><strong>Meals:</strong> Breakfast.</li>
                </ul>

                <h3 className="text-2xl font-bold mt-8 mb-3 text-secondary">Day 5: Swakopmund & Thrilling Coastal Adventures</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li>Early rise and breakfast. Today offers a choice of exhilarating primary excursions:
                        <ul className="list-circle list-inside ml-4">
                            <li><strong>Option A: Full-Day Sandwich Harbour 4x4 Tour,</strong> where the towering dunes meet the Atlantic Ocean, including a delicious picnic lunch on the beach.</li>
                            <li><strong>Option B: Catamaran Dolphin Cruise from Walvis Bay,</strong> offering sightings of marine life, including oysters & sparkling wine.</li>
                            <li><strong>Option C: Half-day Mola Mola Sandwich Harbour Excursion and Braai,</strong> featuring a Namibian-style barbecue lunch on the beach.</li>
                        </ul>
                    </li>
                    <li>Afternoon: Free time for relaxation or optional add-ons (at additional cost): Quad biking through the dunes, sandboarding, skydiving, or a cultural township tour.</li>
                    <li><strong>Included Activity:</strong> Choice of one primary excursion: Sandwich Harbour 4x4 Full-Day Tour (with picnic lunch) OR Catamaran Dolphin Cruise (with oysters & sparkling wine) OR Mola Mola Sandwich Harbour Excursion and Braai.</li>
                    <li><strong>Accommodation:</strong> Swakopmund (Beach Hotel Swakopmund or similar OR The Stiltz).</li>
                    <li><strong>Meals:</strong> Breakfast (and Lunch if on Sandwich Harbour tour or Mola Mola excursion).</li>
                </ul>

                <h3 className="text-2xl font-bold mt-8 mb-3 text-secondary">Day 6: Swakopmund to Damaraland - Ancient Rock Art & Desert-Adapted Wildlife</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li>After breakfast, enjoy a thrilling 1.5-hour quad-bike excursion through the dunes before departing on a scenic coastal drive north. Then, turn inland into the dramatic Damaraland scenery.</li>
                    <li><strong>Optional Activity:</strong> Visit Cape Cross Seal Reserve en route.</li>
                    <li>Arrive at your eco-lodge with time to unwind. In the late afternoon, embark on an optional guided nature walk with a lodge guide to track unique desert-adapted wildlife.</li>
                    <li><strong>Accommodation:</strong> Twyfelfontein Lodge or similar OR Twyfelfontein Adventure Camp.</li>
                    <li><strong>Travel Time:</strong> Approximately 4 to 4.5 hours.</li>
                    <li><strong>Meals:</strong> Breakfast, Dinner (Lunch included if staying at Twyfelfontein Adventure Camp).</li>
                </ul>

                <h3 className="text-2xl font-bold mt-8 mb-3 text-secondary">Day 7: Damaraland - UNESCO Heritage & Etosha Gateway</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li>Morning: Visit the Twyfelfontein UNESCO Rock Engravings, a significant archaeological site, followed by a visit to the Damara Living Museum to learn about local culture and traditions.</li>
                    <li><strong>Included Activities:</strong> Rock painting tour and Damara Living Museum tour.</li>
                    <li>Travel to your lodge on the south-western edge of Etosha National Park.</li>
                    <li><strong>Optional Activity:</strong> Huab Nature Drive in search of elephants (enquire at reception).</li>
                    <li>Enjoy relaxation time before an optional sunset game drive on the lodge's private reserve (outside the national park) or a short drive into Etosha National Park with your guide.</li>
                    <li><strong>Route:</strong> Damaraland - Etosha National Park (Western Side)</li>
                    <li><strong>Accommodation:</strong> Lodge near Etosha's Andersson Gate (e.g., Etosha Safari Camp) OR Twyfelfontein Adventure Camp (if extending stay) OR Etosha Camping2Go.</li>
                    <li><strong>Travel Time:</strong> Approximately 3.5 hours (with stops).</li>
                    <li><strong>Meals:</strong> Breakfast, Dinner (Lunch included if staying at Twyfelfontein Adventure Camp or Etosha Camping2Go).</li>
                </ul>

                <h3 className="text-2xl font-bold mt-8 mb-3 text-secondary">Day 8: Etosha National Park - Full Day Wildlife Spectacle</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li>Enter Etosha National Park at sunrise for a full day of exhilarating game viewing. Your guide will expertly navigate between waterholes, maximizing your chances of spotting diverse wildlife, including lions, elephants, rhinos, and various antelope species.</li>
                    <li>Stop for a picnic lunch at a rest camp inside the park. Exit the park on the eastern side.</li>
                    <li><strong>Included Activity:</strong> Full-day guided game drive through Etosha National Park.</li>
                    <li><strong>Optional Activity:</strong> An evening Night Game Drive offered by your lodge (highly recommended for spotting nocturnal species like leopards and hyenas).</li>
                    <li><strong>Accommodation:</strong> Lodge near Namutoni Gate (e.g., Mokuti Etosha Lodge) OR Etosha Camping2Go.</li>
                    <li><strong>Meals:</strong> Breakfast, Dinner (Lunch included if staying at Etosha Camping2Go from previous day).</li>
                </ul>

                <h3 className="text-2xl font-bold mt-8 mb-3 text-secondary">Day 9: Etosha to Rundu - Kavango River Serenity</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li>After breakfast, embark on a leisurely departure, traveling north into the lush Kavango region.</li>
                    <li><strong>Optional Activities:</strong> Visit a Himba village en route OR enjoy a sundowner drive on arrival (enquire).</li>
                    <li>Arrive at your riverfront lodge in Rundu, with time to relax on your private deck overlooking the serene Okavango River.</li>
                    <li><strong>Optional Activity:</strong> Enjoy a Sundowner Boat Cruise (2 hours) - a perfect, gentle activity to end the day on the river.</li>
                    <li><strong>Accommodation:</strong> Riverside Lodge in Rundu (e.g., Hakusembe River Lodge).</li>
                    <li><strong>Travel Time:</strong> Approximately 3.5 to 5.5 hours.</li>
                    <li><strong>Meals:</strong> Breakfast, Dinner (Lunch included if staying at Etosha Camping2Go from previous day).</li>
                </ul>

                <h3 className="text-2xl font-bold mt-8 mb-3 text-secondary">Day 10: Rundu - Cultural Immersion & River Relaxation</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li>After breakfast, participate in a Guided Cultural Village Visit to learn about Kavango traditions, crafts, and daily life.</li>
                    <li>The afternoon offers pure relaxation at the lodge, allowing you to soak in the peaceful river atmosphere.</li>
                    <li><strong>Optional Activities:</strong> Book a traditional fishing trip, visit the local market, or simply relax with a book by the river.</li>
                    <li><strong>Accommodation:</strong> Riverside Lodge in Rundu.</li>
                    <li><strong>Meals:</strong> Breakfast, Dinner.</li>
                </ul>

                <h3 className="text-2xl font-bold mt-8 mb-3 text-secondary">Day 11: Rundu to Otjiwarongo - Scenic Journey South</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li>This is primarily a travel and relaxation day, allowing you to enjoy the changing landscapes as you journey south.</li>
                    <li>A relaxed lunch stop will be made en route. Arrive early afternoon in Otjiwarongo.</li>
                    <li>The evening is free to relax.</li>
                    <li><strong>Optional Activity:</strong> Visit the Crocodile Farm near town.</li>
                    <li><strong>Accommodation:</strong> Otjiwarongo Guesthouse/Lodge (e.g., Fly Inn Guesthouse).</li>
                    <li><strong>Travel Time:</strong> Approximately 6.5 hours.</li>
                    <li><strong>Meals:</strong> Breakfast.</li>
                </ul>

                <h3 className="text-2xl font-bold mt-8 mb-3 text-secondary">Day 12: Otjiwarongo to Windhoek - Farewell Namibia</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li>Enjoy a leisurely drive back to the capital, Windhoek.</li>
                    <li>Stop at the Okahandja Craft Market or a similar venue for final souvenir shopping.</li>
                    <li><strong>Optional Activity:</strong> Visit Okahandja Woodcarvers Market en route.</li>
                    <li>Check into your hotel. Free time for last-minute explorations or packing.</li>
                    <li>In the evening, enjoy a Farewell dinner at a premier restaurant, reflecting on your incredible journey through Namibia.</li>
                    <li><strong>Accommodation:</strong> Windhoek (The Weinberg Hotel or similar OR Urban Camp).</li>
                    <li><strong>Travel Time:</strong> Approximately 3 to 4 hours.</li>
                    <li><strong>Meals:</strong> Breakfast, Farewell Dinner.</li>
                </ul>

                <h3 className="text-2xl font-bold mt-8 mb-3 text-secondary">Day 13: Departure</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li>Enjoy a final breakfast at your hotel.</li>
                    <li>Transfer to Hosea Kutako International Airport (WDH) for your international departure flight.</li>
                    <li><strong>Meals:</strong> Breakfast.</li>
                </ul>

                <h2 className="text-3xl font-bold mt-10 mb-4 text-primary">Inclusions</h2>
                <p>The "Ultimate Namibia Adventure" package is designed to be comprehensive, ensuring a seamless and enriching travel experience.</p>
                <h4 className="text-xl font-bold mt-6 mb-2 text-secondary">Accommodation:</h4>
                <p>13 nights of accommodation as per the itinerary, including a mix of luxury hotels, comfortable lodges, and unique glamping/adventure camps, selected for their quality and location.</p>
                <h4 className="text-xl font-bold mt-6 mb-2 text-secondary">Meals:</h4>
                <p>Breakfast and Dinner daily as specified in the itinerary. Selected lunches are also included, particularly during full-day excursions (e.g., Sossusvlei, Sandwich Harbour) and at certain glamping/adventure camp accommodations. (Approximately 23 meals in total).</p>
                <h4 className="text-xl font-bold mt-6 mb-2 text-secondary">Transportation:</h4>
                <ul className="list-disc list-inside space-y-1">
                    <li>All airport transfers on arrival and departure days (to/from Hosea Kutako International Airport - WDH).</li>
                    <li>A dedicated professional English-speaking guide/driver throughout the tour, who also acts as a chef during glamping/camping stays.</li>
                    <li>Travel in a private, air-conditioned 4x4 safari vehicle (5-seater), ensuring comfort and optimal viewing.</li>
                    <li>Full cover rental insurance for the vehicle.</li>
                    <li>All fuel, road tolls, and vehicle expenses for the duration of the tour.</li>
                </ul>
                <h4 className="text-xl font-bold mt-6 mb-2 text-secondary">Activities & Entrance Fees:</h4>
                <ul className="list-disc list-inside space-y-1">
                    <li>All National Park entrance fees (including Sossusvlei and Etosha National Park).</li>
                    <li>Full-day guided tour of Sossusvlei and Deadvlei, including lunch inside the park.</li>
                    <li>One primary coastal excursion in Swakopmund: Choice of Full-Day Sandwich Harbour 4x4 Tour (with picnic lunch) OR Catamaran Dolphin Cruise (with oysters & sparkling wine) OR Half-day Mola Mola Sandwich Harbour Excursion and Braai (Namibian BBQ).</li>
                    <li>1.5-hour Quad-bike excursion through the dunes in Swakopmund/Damaraland.</li>
                    <li>Guided Rock painting tour at Twyfelfontein (UNESCO World Heritage Site).</li>
                    <li>Guided Damara Village / Living Museum tour.</li>
                    <li>Extensive game drives in Etosha National Park (combining full-day and half-day options), guided by your professional guide.</li>
                    <li>Guided excursion to Sesriem Canyon.</li>
                    <li>Visit to Twyfelfontein UNESCO Rock Engravings.</li>
                    <li>Guided Cultural Village Visit in Rundu (Kavango traditions).</li>
                    <li>Local guides where required for specific activities or cultural insights.</li>
                </ul>
                <h4 className="text-xl font-bold mt-6 mb-2 text-secondary">Amenities & Services:</h4>
                <ul className="list-disc list-inside space-y-1">
                    <li>Complimentary snacks and soft drinks provided daily in the safari vehicle.</li>
                    <li>Bottled water supplied in the vehicle throughout the tour.</li>
                    <li>4x Namibian SIM cards with data for the duration of your stay, ensuring connectivity.</li>
                </ul>

                <h2 className="text-3xl font-bold mt-10 mb-4 text-primary">Exclusions</h2>
                <p>To ensure transparency and allow for personalized choices, the following are not included in the "Ultimate Namibia Adventure" package:</p>
                <ul className="list-disc list-inside space-y-1">
                    <li><strong>Flights:</strong> International flights to and from Namibia (e.g., Luxembourg - Windhoek, Windhoek - Nairobi, or similar departure/arrival points) and associated airport taxes.</li>
                    <li><strong>Insurance:</strong> Comprehensive Travel & Medical Insurance is mandatory and must be arranged independently by the traveler.</li>
                    <li><strong>Meals & Beverages:</strong> Lunches not explicitly mentioned as included in the itinerary, all alcoholic beverages, and any personal snacks or drinks purchased outside of those provided in the vehicle.</li>
                    <li><strong>Optional Activities:</strong> Any activities not explicitly listed under "Included Activities." This includes, but is not limited to: Balloon Safari over the Namib Desert, visit to Cape Cross Seal Reserve, Huab Nature Drive, Himba village visit, additional sundowner drives, guided nature walks, traditional fishing trips, visits to local markets (unless part of an included cultural tour), Crocodile Farm visit, and Okahandja Woodcarvers Market. Costs for these optional activities are extra and can be pre-booked or arranged locally.</li>
                    <li><strong>Personal Expenses:</strong> Visas for Namibia (travelers must check and arrange their own visa requirements), malaria prophylaxis (consult a travel clinic as northern regions like Etosha and Rundu are malaria areas), tips/gratuities for your guide/driver, lodge staff, restaurant servers, personal shopping (curios, souvenirs), telephone calls, laundry services, and any other expenditures of a personal nature.</li>
                </ul>
                <p className="mt-8">This "Ultimate Namibia Adventure" is meticulously crafted to provide a rich, comfortable, and unforgettable exploration of Namibia's diverse wonders.</p>
            </main>
        </div>
    );
};

export default UltimateNamibiaAdventureItinerary;