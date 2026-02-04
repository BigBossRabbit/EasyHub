import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Twitter, Instagram, Linkedin, Github, User, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const ABOUT_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Nikolai 'OKIN' Tjongarero",
  "jobTitle": "Digital Disrupter | FreedomTech Enabler",
  "description": "Founder of OKIN.EnT and advocate for Bitcoin revolution in Namibia.",
  "image": "https://bitcoin.okinent.org/assets/okin-profile.jpg",
  "sameAs": [
    "https://x.com/okin_17",
    "https://instagram.com/easysats",
    "https://www.linkedin.com/in/okin/",
    "https://www.github.com/bigbossrabbit"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "OKIN.EnT"
  }
});

const About = () => {
  return (
    <div className="min-h-screen text-foreground">
      <Seo
        title="About OKIN.EnT"
        description="Learn about Nikolai 'OKIN' Tjongarero and the mission of OKIN.EnT."
        image="/assets/okin-profile.jpg"
        type="profile"
        schema={ABOUT_SCHEMA}
      />


      <div className="container mx-auto px-6 py-12">

        <div className="grid md:grid-cols-3 gap-12">
          {/* Profile Section */}
          <div className="md:col-span-1 space-y-6">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted border-2 border-primary/20 relative group">
              <img
                src="/assets/okin-profile.jpg"
                alt="Nikolai 'OKIN' Tjongarero"
                className="w-full h-full object-cover"
                loading="lazy"
                width="400"
                height="400"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">Nikolai 'OKIN' Tjongarero</h1>
              <p className="text-primary font-medium mb-4">Digital Disrupter | FreedomTech Enabler</p>

              <div className="flex justify-center md:justify-start gap-3 flex-wrap">
                <a href="https://x.com/okin_17" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted hover:bg-primary/20 hover:text-primary transition-colors" title="Twitter/X">
                  <Twitter className="h-5 w-5" />
                </a>

                <a href="https://www.linkedin.com/in/okin/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted hover:bg-primary/20 hover:text-primary transition-colors" title="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://www.github.com/bigbossrabbit" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted hover:bg-primary/20 hover:text-primary transition-colors" title="GitHub">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="md:col-span-2 space-y-8 leading-relaxed">
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-primary"></span>
                The Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                OKIN.EnT (OKIN Trading Enterprises) is at the forefront of the Bitcoin and FreedomTech revolution in Namibia via vehicles like EasySats and the entire EasyHub suite of offerings.
                Founded by Nikolai 'OKIN' Tjongarero, a passionate advocate and educator, our mission is to bridge the gap
                between complex technology and everyday accessibility.
              </p>
              <p className="text-lg text-muted-foreground">
                We believe that financial sovereignty should not be a privilege, but a right accessible to all Namibians.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <Link to="/tpok" className="block h-full">
                <Card className="bg-card/50 border-primary/20 h-full hover:border-primary/40 transition-colors">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-xl mb-2 text-primary">TPOK</h3>
                    <p className="text-sm text-muted-foreground">
                      The Persuit Of Knowledge - Educational initiative and certification program.
                    </p>
                  </CardContent>
                </Card>
              </Link>

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
                It was the first podcast across the entire Arican continent to accept payments and gifts in Bitcoin, setting a standard for value-for-value content creation.
              </p>
              <p className="text-muted-foreground">
                Through engaging discussions with the public and open dialogues with key Regulatory and Development Stakeholders in Namibia,
                we are actively shaping the narrative and regulatory landscape of virtual assets in our country.
              </p>
              <p className="text-muted-foreground">
                Explore our initiatives including <a href="/connect" className="text-primary hover:underline font-semibold">EasySats Merchant Platform</a>, <a href="/connect" className="text-primary hover:underline font-semibold">SovereignKey</a>, and more on our <Link to="/connect" className="text-primary hover:underline font-semibold">Connect & Explore</Link> page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
