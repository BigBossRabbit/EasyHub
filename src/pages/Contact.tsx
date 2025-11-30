import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Briefcase, Mail, MessageSquare, User, Send, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "consultation",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., console.log or API call)
        console.log("Form submitted:", formData);
        alert("Message sent! We'll get back to you shortly.");
        setFormData({ name: "", email: "", subject: "consultation", message: "" });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen text-foreground bg-background flex flex-col">
            <Seo title="Contact Us — EasySats" description="Get in touch for Bitcoin consultations and business inquiries." canonical="/contact" />

            {/* Header */}
            <header className="border-b border-border bg-card">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-3">
                            <img src="/easysats-logo.png" alt="EasySats" className="h-10 w-10" />
                            <div className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4 text-primary" />
                                <span className="text-xl font-bold">
                                    <span className="text-primary">easy</span>
                                    <span className="text-foreground">sats</span>
                                    <span className="text-muted-foreground animate-pulse">_</span>
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-6 text-sm">
                            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">~/home</Link>
                            <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">~/about</Link>
                            <Link to="/connect" className="text-muted-foreground hover:text-primary transition-colors">~/connect</Link>
                            <Link to="/easydevs" className="text-muted-foreground hover:text-primary transition-colors">~/easydevs</Link>
                            <Link to="/easyjobs" className="text-muted-foreground hover:text-primary transition-colors">~/easyjobs</Link>
                            <Link to="/timeforce" className="text-muted-foreground hover:text-primary transition-colors">~/timeforce</Link>
                            <Link to="/tpok" className="text-muted-foreground hover:text-primary transition-colors">~/tpok</Link>
                        </nav>

                        {/* Mobile Navigation */}
                        <div className="flex md:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <Menu className="h-6 w-6" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right">
                                    <nav className="flex flex-col gap-4 pt-8">
                                        <Link to="/" className="text-lg font-semibold hover:text-primary transition-colors">~/home</Link>
                                        <Link to="/about" className="text-lg font-semibold hover:text-primary transition-colors">~/about</Link>
                                        <Link to="/connect" className="text-lg font-semibold hover:text-primary transition-colors">~/connect</Link>
                                        <Link to="/easydevs" className="text-lg font-semibold hover:text-primary transition-colors">~/easydevs</Link>
                                        <Link to="/easyjobs" className="text-lg font-semibold hover:text-primary transition-colors">~/easyjobs</Link>
                                        <Link to="/timeforce" className="text-lg font-semibold hover:text-primary transition-colors">~/timeforce</Link>
                                        <Link to="/tpok" className="text-lg font-semibold hover:text-primary transition-colors">~/tpok</Link>
                                    </nav>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow container mx-auto px-6 py-12">
                <div className="max-w-3xl mx-auto">

                    {/* Hero Text */}
                    <div className="text-center mb-12 space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold font-serif">
                            <span className="text-primary">&gt;</span> Contact Us
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            EasySats Business & Bitcoin Consultations
                        </p>
                        <div className="h-1 w-24 bg-primary mx-auto rounded-full mt-6" />
                    </div>

                    {/* Form Card */}
                    <Card className="border-2 border-border bg-card shadow-lg relative overflow-hidden">
                        {/* Decorative "Newspaper" Elements */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                        <div className="absolute top-2 right-2 text-[10px] font-mono text-muted-foreground border border-border px-1">
                            REF: CONT-2025
                        </div>

                        <CardHeader className="border-b border-border bg-muted/30 pb-6">
                            <CardTitle className="font-serif text-2xl flex items-center gap-2">
                                <Mail className="h-5 w-5 text-primary" />
                                <span>Inquiry Form</span>
                            </CardTitle>
                            <p className="text-sm text-muted-foreground font-mono mt-1">
                // Please fill out the details below to initiate a secure channel.
                            </p>
                        </CardHeader>

                        <CardContent className="p-6 md:p-8 space-y-6">
                            <form onSubmit={handleSubmit} className="space-y-6">

                                {/* Name & Email Row */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-bold font-serif flex items-center gap-2">
                                            <User className="h-4 w-4 text-primary" />
                                            NAME
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono placeholder:text-muted-foreground/50"
                                            placeholder="Satoshi Nakamoto"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-bold font-serif flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-primary" />
                                            EMAIL
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono placeholder:text-muted-foreground/50"
                                            placeholder="satoshi@bitcoin.org"
                                        />
                                    </div>
                                </div>

                                {/* Subject */}
                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-bold font-serif flex items-center gap-2">
                                        <Briefcase className="h-4 w-4 text-primary" />
                                        SUBJECT
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono"
                                    >
                                        <option value="consultation">Bitcoin Consultation</option>
                                        <option value="business">Business Inquiry</option>
                                        <option value="partnership">Partnership Opportunity</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                {/* Message */}
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-bold font-serif flex items-center gap-2">
                                        <MessageSquare className="h-4 w-4 text-primary" />
                                        MESSAGE
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono placeholder:text-muted-foreground/50 resize-none"
                                        placeholder="Describe your inquiry..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <Button type="submit" className="w-full md:w-auto gap-2 font-bold uppercase tracking-wider">
                                    <Send className="h-4 w-4" />
                                    Transmit Inquiry
                                </Button>

                            </form>
                        </CardContent>
                    </Card>

                    {/* Footer Note */}
                    <div className="mt-8 text-center text-sm text-muted-foreground font-mono">
                        <p>SECURE CONNECTION ESTABLISHED.</p>
                        <p>Response time: ~24 hours.</p>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Contact;
