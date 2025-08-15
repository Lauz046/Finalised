import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet" />
        
        {/* Title Tag */}
        <title>House of Plutus | India's Trusted Luxury Platform</title>

        {/* ✅ SEO Meta Tags - Updated for better visibility */}
        <meta name="description" content="House of Plutus - India's premier luxury marketplace. Buy 100% authentic luxury sneakers, watches & designer apparel with expert verification. Shop with confidence." />
        <meta name="keywords" content="authentic luxury sneakers, genuine watches India, designer apparel, verified luxury goods, House of Plutus, no fake products, premium fashion India" />
        <meta name="author" content="House of Plutus" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:title" content="House of Plutus | Verified Luxury Goods in India" />
        <meta property="og:description" content="India's trusted platform for 100% authentic luxury sneakers, watches & apparel. Expert verification. No fakes. No compromises." />
        <meta property="og:url" content="https://www.houseofplutus.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="House of Plutus" />
        <meta property="og:image" content="https://www.houseofplutus.com/DON/horn%20svg.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="House of Plutus | Verified Luxury Goods in India" />
        <meta name="twitter:description" content="India's trusted platform for 100% authentic luxury sneakers, watches & apparel. Expert verification. No fakes. No compromises." />
        <meta name="twitter:image" content="https://www.houseofplutus.com/DON/horn%20svg.png" />

        {/* Canonical & hreflang for multi-domain consistency */}
        <link rel="canonical" href="https://www.houseofplutus.com" />
        <link rel="alternate" hrefLang="en-in" href="https://www.houseofplutus.in" />
        <link rel="alternate" hrefLang="en" href="https://www.houseofplutus.com" />
        <link rel="alternate" hrefLang="x-default" href="https://www.houseofplutus.com" />

        {/* Favicon Links */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-48x48.png" sizes="48x48" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Browser Theme */}
        <meta name="theme-color" content="#051f2d" />
        <meta name="msapplication-TileColor" content="#051f2d" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Structured Data for Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "House of Plutus",
              "url": "https://www.houseofplutus.com",
              "logo": "https://www.houseofplutus.com/DON/horn%20svg.png",
              "description": "India's premier luxury marketplace for authentic sneakers, watches & designer apparel",
              "sameAs": [
                "https://www.instagram.com/house_of_plutus"
              ]
            })
          }}
        />
      </Head>
      <body className="bg-dark text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 