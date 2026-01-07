import { Helmet } from "react-helmet-async";

interface SeoProps {
  title: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  schema?: string; // JSON-LD string
}

export default function Seo({ 
  title, 
  description, 
  canonical = "/", 
  image = "/easysats-logo.png", // Default image
  type = "website",
  schema
}: SeoProps) {
  const siteUrl = "https://bitcoin.okinent.org";
  const fullImageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;
  const fullUrl = canonical.startsWith("http") ? canonical : `${siteUrl}${canonical}`;

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImageUrl} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {schema}
        </script>
      )}
    </Helmet>
  );
}
