import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Twitter, Instagram, Linkedin, ArrowLeft } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo title="About OKIN.EnT" description="Learn about Nikolai 'OKIN' Tjongarero and the mission of OKIN.EnT." />

      <div className="container mx-auto px-6 py-12">
        <Button variant="ghost" asChild className="mb-8 hover:bg-primary/10">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Profile Section */}
          <div className="md:col-span-1 space-y-6">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted border-2 border-primary/20 relative group">
              {/* Placeholder for profile image if available, otherwise a stylized initial */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-background">
                <span className="text-9xl font-serif font-bold text-primary/40">O</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-3xl font-serif font-bold mb-2">Nikolai 'OKIN' Tjongarero</h1>
              <p className="text-primary font-medium mb-4">Founder, OKIN.EnT</p>

              <div className="flex justify-center md:justify-start gap-4">
                <a href="https://twitter.com/OKIN_17" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted hover:bg-primary/20 hover:text-primary transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="https://instagram.com/OKIN_17" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted hover:bg-primary/20 hover:text-primary transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://linkedin.com/in/nikolai-tjongarero" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted hover:bg-primary/20 hover:text-primary transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="md:col-span-2 space-y-8 font-serif leading-relaxed">
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-primary"></span>
                The Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                OKIN.EnT (OKIN Trading Enterprises) is at the forefront of the Bitcoin revolution in Namibia.
                Founded by Nikolai 'OKIN' Tjongarero, a passionate advocate and educator, our mission is to bridge the gap
                between complex technology and everyday accessibility.
              </p>
              <p className="text-lg text-muted-foreground">
                We believe that financial sovereignty should not be a privilege, but a right accessible to all Namibians.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="bg-card/50 border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-xl mb-2 text-primary">EasySats</h3>
                  <p className="text-sm text-muted-foreground">
                    Marketing and education arm focused on helping individuals acquire Bitcoin and understand its real-world applications.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-xl mb-2 text-primary">BTC Mining Namibia</h3>
                  <p className="text-sm text-muted-foreground">
                    Research and development division exploring sustainable mining opportunities and infrastructure in the region.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-primary"></span>
                #FromTheJump
              </h2>
              <p className="text-muted-foreground mb-4">
                As the host of the <strong>#FromTheJump</strong> podcast, OKIN has pioneered the integration of Bitcoin into the creative industry.
                It was the first podcast in Namibia to accept payments and gifts in Bitcoin, setting a standard for value-for-value content creation.
              </p>
              <p className="text-muted-foreground">
                Through engaging discussions with the public and dialogues with institutions like the Central Bank of Namibia,
                we are actively shaping the narrative and regulatory landscape of digital assets in our country.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
