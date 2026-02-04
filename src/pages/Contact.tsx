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

        const subject = `[EasySats Inquiry] ${formData.subject.toUpperCase()} - ${formData.name}`;
        const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;

        // Opens user's email client
        window.location.href = `mailto:okin@okinent.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Optional: Reset form or show a "Redirecting to email..." toast
        alert("Opening your email client to send the message...");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen text-foreground flex flex-col">
            <Seo title="Contact Us — EasySats" description="Get in touch for Bitcoin consultations and business inquiries." canonical="/contact" />



            {/* Main Content */}
            <main className="flex-grow container mx-auto px-6 py-12">
                <div className="max-w-3xl mx-auto">

                    {/* Hero Text */}
                    <div className="text-center mb-12 space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold">
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
                            <CardTitle className="text-2xl flex items-center gap-2">
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
                                        <label htmlFor="name" className="text-sm font-bold flex items-center gap-2">
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
                                            placeholder="OKIN | Nikolai Tjongarero"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-bold flex items-center gap-2">
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
                                            placeholder="okin@okinent.org"
                                        />
                                    </div>
                                </div>

                                {/* Subject */}
                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-bold flex items-center gap-2">
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
                                    <label htmlFor="message" className="text-sm font-bold flex items-center gap-2">
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
                                <div className="flex justify-center">
                                    <Button type="submit" className="w-full md:w-auto gap-2 font-bold uppercase tracking-wider">
                                        <Send className="h-4 w-4" />
                                        Transmit Inquiry
                                    </Button>
                                </div>

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
