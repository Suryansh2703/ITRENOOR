import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  path?: string;
  image?: string;
  type?: string;
  schemaMarkup?: string;
  preloadImage?: string;
}

export function SEO({ 
  title, 
  description, 
  keywords = 'luxury attar perfumes, best attar brands in india, long lasting attar, arabian oud perfumes', 
  path = '', 
  image = '/src/assets/images/logo_optimized_1782312003937.jpg', 
  type = 'website',
  schemaMarkup,
  preloadImage
}: SEOProps) {
  const fullTitle = `${title} | ITR-E-NOOR`;
  const CANONICAL_DOMAIN = 'https://www.itrenoor.app';
  const cleanPath = path === '' ? '/' : (path.startsWith('/') ? path : '/' + path);
  const url = `${CANONICAL_DOMAIN}${cleanPath}`;
  const imageUrl = image.startsWith('http') ? image : `${CANONICAL_DOMAIN}${image.startsWith('/') ? image : '/' + image}`;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />
      {/* Canonical Link */}
      <link rel="canonical" href={url} />
      
      {/* Preload LCP Image */}
      {preloadImage && (
        <link rel="preload" as="image" href={preloadImage} fetchpriority="high" />
      )}
      
      {/* Schema Markup */}
      {schemaMarkup && (
        <script type="application/ld+json">
          {schemaMarkup}
        </script>
      )}
    </Helmet>
  );
}
