import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Seo title="About — Coming Soon" description="About page coming soon." />
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mb-4 text-4xl font-bold">Coming Soon</h1>
        <p className="mb-6 text-lg text-muted-foreground">This page is under construction.</p>
        <Button asChild size="lg">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default About;
