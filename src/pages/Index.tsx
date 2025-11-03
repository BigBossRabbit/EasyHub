import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Seo from "@/components/Seo";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Seo title="Easysats — Home" description="Install the Easysats PWA for a fast, offline-first experience." canonical="/" />
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mb-4 text-4xl font-bold">Easysats App</h1>
        <p className="mb-6 text-lg text-muted-foreground">Install the Easysats PWA to get an app-like experience on iOS and Android.</p>
        <Button asChild size="lg">
          <Link to="/install">Install Easysats</Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;
