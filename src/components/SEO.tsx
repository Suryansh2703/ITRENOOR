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
  image = '/logo-optimized.jpg',
  type = 'website',
  schemaMarkup,
  preloadImage
}: SEOProps) {

  const fullTitle = `${title} | ITR-E-NOOR`;

  // Main website domain
  const CANONICAL_DOMAIN = 'https://itr-e-noor.vercel.app';

  // Make sure the path always starts with /
  const cleanPath =
    path === ''
      ? '/'
      : path.startsWith('/')
        ? path
        : `/${path}`;

  // Complete page URL
  const url = `${CANONICAL_DOMAIN}${cleanPath}`;

  // Complete image URL
  const imageUrl = image.startsWith('http')
    ? image
    : `${CANONICAL_DOMAIN}${image.startsWith('/') ? image : `/${image}`}`;

  return (
    <Helmet>

      {/* =========================
          BASIC SEO
      ========================== */}

      <title>{fullTitle}</title>

      <meta
        name="description"
        content={description}
      />

      <meta
        name="keywords"
        content={keywords}
      />

      <meta
        name="robots"
        content="index, follow"
      />

      {/* Canonical URL */}
      <link
        rel="canonical"
        href={url}
      />


      {/* =========================
          OPEN GRAPH / FACEBOOK
      ========================== */}

      <meta
        property="og:type"
        content={type}
      />

      <meta
        property="og:url"
        content={url}
      />

      <meta
        property="og:title"
        content={fullTitle}
      />

      <meta
        property="og:description"
        content={description}
      />

      <meta
        property="og:image"
        content={imageUrl}
      />

      <meta
        property="og:image:secure_url"
        content={imageUrl}
      />

      <meta
        property="og:image:type"
        content="image/jpeg"
      />

      <meta
        property="og:image:width"
        content="1200"
      />

      <meta
        property="og:image:height"
        content="630"
      />

      <meta
        property="og:site_name"
        content="ITR-E-NOOR"
      />


      {/* =========================
          TWITTER / X
      ========================== */}

      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:url"
        content={url}
      />

      <meta
        name="twitter:title"
        content={fullTitle}
      />

      <meta
        name="twitter:description"
        content={description}
      />

      <meta
        name="twitter:image"
        content={imageUrl}
      />


      {/* =========================
          PRELOAD LCP IMAGE
      ========================== */}

      {preloadImage && (
        <link
          rel="preload"
          as="image"
          href={preloadImage}
          fetchPriority="high"
        />
      )}


      {/* =========================
          SCHEMA MARKUP
      ========================== */}

      {schemaMarkup && (
        <script type="application/ld+json">
          {schemaMarkup}
        </script>
      )}

    </Helmet>
  );
}
