import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Scale, FileText, AlertCircle, Coins, AlertTriangle, RefreshCw } from "lucide-react";

const Terms = () => {
    return (
        <div className="min-h-screen text-foreground bg-background">
            <Seo
                title="Terms & Conditions"
                description="Terms and Conditions for using EasyHub and related services."
                canonical="/terms"
            />

            <header className="border-b border-border bg-card">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                            <ArrowLeft className="h-4 w-4" />
                            <span>Back to Home</span>
                        </Link>
                        <div className="flex items-center gap-2">
                            <Scale className="h-5 w-5 text-primary" />
                            <span className="font-bold">Legal</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-12 max-w-4xl">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
                    <p className="text-muted-foreground">Last Updated: November 2025</p>
                </div>

                <div className="space-y-12">
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-primary">
                            <FileText className="h-6 w-6" />
                            <h2 className="text-2xl font-semibold">1. Introduction</h2>
                        </div>
                        <div className="prose prose-invert max-w-none text-muted-foreground">
                            <p>
                                Welcome to EasyHub ("we," "our," or "us"). By accessing or using our website, services, and applications (collectively, the "Services"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use our Services.
                            </p>
                            <p>
                                These Terms constitute a legally binding agreement between you and OKIN Trading Enterprises CC (hereinafter referred to as "OKIN.EnT") regarding your use of the Services.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-primary">
                            <Shield className="h-6 w-6" />
                            <h2 className="text-2xl font-semibold">2. Use of Services</h2>
                        </div>
                        <div className="prose prose-invert max-w-none text-muted-foreground">
                            <p>
                                You agree to use the Services only for lawful purposes and in accordance with these Terms. You are responsible for ensuring that your use of the Services complies with all applicable laws and regulations.
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li>You must not use the Services for any illegal or unauthorized purpose.</li>
                                <li>You must not attempt to interfere with or disrupt the integrity or performance of the Services.</li>
                                <li>You must not attempt to gain unauthorized access to the Services or related systems or networks.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-primary">
                            <AlertCircle className="h-6 w-6" />
                            <h2 className="text-2xl font-semibold">3. Intellectual Property</h2>
                        </div>
                        <div className="prose prose-invert max-w-none text-muted-foreground">
                            <p>
                                The Services and their original content, features, and functionality are and will remain the exclusive property of OKIN.EnT and its licensors. The Services are protected by copyright, trademark, and other laws of both Namibia and foreign countries.
                            </p>
                            <p className="mt-4">
                                Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of OKIN.EnT.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-primary">
                            <Coins className="h-6 w-6" />
                            <h2 className="text-2xl font-semibold">4. Bitcoin and Financial Disclaimers</h2>
                        </div>
                        <div className="prose prose-invert max-w-none text-muted-foreground">
                            <p>
                                The Services may involve the use of Bitcoin and other digital assets. You acknowledge and agree that:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li>We are not a financial institution, bank, or licensed financial advisor.</li>
                                <li>The value of Bitcoin can be volatile and may result in the loss of your funds.</li>
                                <li>You are solely responsible for the security of your private keys and digital wallets.</li>
                                <li>We do not have control over the Bitcoin network and cannot guarantee transaction confirmation or speed.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-primary">
                            <AlertTriangle className="h-6 w-6" />
                            <h2 className="text-2xl font-semibold">5. Limitation of Liability</h2>
                        </div>
                        <div className="prose prose-invert max-w-none text-muted-foreground">
                            <p>
                                In no event shall OKIN.EnT, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Services.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-primary">
                            <RefreshCw className="h-6 w-6" />
                            <h2 className="text-2xl font-semibold">6. Changes to Terms</h2>
                        </div>
                        <div className="prose prose-invert max-w-none text-muted-foreground">
                            <p>
                                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                            </p>
                        </div>
                    </section>

                    <div className="pt-8 border-t border-border">
                        <p className="text-muted-foreground">
                            If you have any questions about these Terms, please contact us via our social media channels.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Terms;
