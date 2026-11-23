import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Seo from "@/components/Seo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route like a silly rabbit, but trix are for kids:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground px-6">
      <Seo title="404 — Page Not Found — EasySats" description="That page does not exist." canonical={location.pathname} />
      <div className="text-center max-w-md">
        <p className="font-mono text-xs tracking-[0.3em] text-primary uppercase mb-6">404</p>
        <h1 className="mb-3 text-4xl font-semibold">Oops! Page not found</h1>
        <p className="mb-8 text-muted-foreground">
          The page <span className="font-mono text-foreground">{location.pathname}</span> does not exist or has moved.
        </p>
        <Button asChild>
          <Link to="/">Return home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
