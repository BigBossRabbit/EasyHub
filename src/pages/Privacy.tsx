import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, Eye, Database, ShieldCheck, Users, ExternalLink } from "lucide-react";

const Privacy = () => {
    return (
        <div className="min-h-screen text-foreground bg-background">
            <Seo
                title="Privacy Policy"
                description="Privacy Policy for EasyHub and related services."
                canonical="/privacy"
            />

            <header className="border-b border-border bg-card">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                            <ArrowLeft className="h-4 w-4" />
                            <span>Back to Home</span>
                        </Link>
                        <div className="flex items-center gap-2">
                            <Lock className="h-5 w-5 text-primary" />
                            <span className="font-bold">Privacy</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-12 max-w-4xl">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
                    <p className="text-muted-foreground">Last Updated: November 2025</p>
                </div>

                <div className="space-y-12">
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-primary">
                            <Eye className="h-6 w-6" />
                            <h2 className="text-2xl font-semibold">1. Information Collection</h2>
                        </div>
                        <div className="prose prose-invert max-w-none text-muted-foreground">
                            <p>
                                We prioritize your privacy and data sovereignty. Unlike traditional web services, we minimize the data we collect.
                            </p>
                            <p className="mt-4">
                                <strong>Personal Data:</strong> We do not require you to create an account to use most of our public informational pages. If you choose to contact us or sign up for specific services (like the EasySats Merchant Platform), we may collect information you voluntarily provide, such as your name and email address.
                            </p>
                            <p className="mt-4">
                                <strong>Usage Data:</strong> We may collect non-identifiable information about how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-primary">
                            <Database className="h-6 w-6" />
                            <h2 className="text-2xl font-semibold">2. Use of Data</h2>
                        </div>
                        <div className="prose prose-invert max-w-none text-muted-foreground">
                            <p>
                                OKIN Trading Enterprises CC (hereinafter referred to as "OKIN.EnT") uses the collected data for various purposes:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li>To provide and maintain the Service</li>
                                <li>To notify you about changes to our Service</li>
                                <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                                <li>To provide customer care and support</li>
                                <li>To provide analysis or valuable information so that we can improve the Service</li>
                                <li>To monitor the usage of the Service</li>
                                <li>To detect, prevent and address technical issues</li>
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-primary">
                            <ShieldCheck className="h-6 w-6" />
                            <h2 className="text-2xl font-semibold">3. Data Security</h2>
                        </div>
                        <div className="prose prose-invert max-w-none text-muted-foreground">
                            <p>
                                The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                            </p>
                            <p className="mt-4">
                                We strongly encourage the use of self-custodial tools and privacy-preserving technologies when interacting with the Bitcoin network.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-primary">
                            <Users className="h-6 w-6" />
                            <h2 className="text-2xl font-semibold">4. Third-Party Services</h2>
                        </div>
                        <div className="prose prose-invert max-w-none text-muted-foreground">
                            <p>
                                We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.
                            </p>
                            <p className="mt-4">
                                These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-primary">
                            <ExternalLink className="h-6 w-6" />
                            <h2 className="text-2xl font-semibold">5. Links to Other Sites</h2>
                        </div>
                        <div className="prose prose-invert max-w-none text-muted-foreground">
                            <p>
                                Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
                            </p>
                            <p className="mt-4">
                                We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
                            </p>
                        </div>
                    </section>

                    <div className="pt-8 border-t border-border">
                        <p className="text-muted-foreground">
                            If you have any questions about this Privacy Policy, please contact us via our social media channels.
                        </p>
                    </div>
                </div>
            </main>


        </div>
    );
};

export default Privacy;
