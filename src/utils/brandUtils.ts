// Brand name normalization utilities
export function normalizeBrandForUrl(brand: string): string {
  return brand
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

export function denormalizeBrandFromUrl(brandUrl: string): string {
  return brandUrl
    .replace(/-/g, ' ') // Replace hyphens with spaces
    .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize first letter of each word
}

// Common brand mappings for edge cases
const BRAND_MAPPINGS: Record<string, string> = {
  // Sneaker brands
  'air-jordan': 'Air Jordan',
  'air-jordan-1': 'Air Jordan 1',
  'air-jordan-4': 'Air Jordan 4',
  'air-jordan-11': 'Air Jordan 11',
  'new-balance': 'New Balance',
  'louis-vuitton': 'Louis Vuitton',
  'bottega-veneta': 'Bottega Veneta',
  'saint-laurent': 'Saint Laurent',
  'stone-island': 'Stone Island',
  'canada-goose': 'Canada Goose',
  'the-north-face': 'The North Face',
  
  // Accessories brands
  'aime-leon-dore': 'Aimé Leon Dore',
  'aim-leon-dore': 'Aimé Leon Dore', // Handle missing 'e' case
  'paris-saint-germain': 'Paris Saint-Germain',
  'off-white': 'OFF-WHITE',
  'ray-ban': 'Ray-Ban',
  'y-3': 'Y-3',
  'mlb-all-star-game': 'MLB All-Star Game',
  'gentle-monster': 'Gentle Monster',
  'givenchy': 'Givenchy',
  'jacquemus': 'Jacquemus',
  
  // Watch brands
  'a-lange-sohne': 'A. LANGE & SOHNE',
  'a-lange-söhne': 'A. LANGE & SOHNE',
  'audemars-piguet': 'AUDEMARS PIGUET',
  'baume-mercier': 'BAUME & MERCIER',
  'bell-ross': 'BELL & ROSS',
  'blancpain': 'BLANCPAIN',
  'boucheron': 'BOUCHERON',
  'bovet': 'BOVET',
  'breguet': 'BREGUET',
  'breitling': 'BREITLING',
  'bvlgari': 'BVLGARI',
  'carl-f-bucherer': 'CARL F BUCHERER',
  'cartier': 'CARTIER',
  'chanel': 'CHANEL',
  'chaumet': 'CHAUMET',
  'chopard-geneve': 'CHOPARD GENEVE',
  'concord': 'CONCORD',
  'corum': 'CORUM',
  'de-grisogono': 'DE GRISOGONO',
  'dewitt': 'DEWITT',
  'dior': 'DIOR',
  'ebel': 'EBEL',
  'f-p-journe': 'F.P. JOURNE',
  'favre-leuba': 'FAVRE-LEUBA',
  'franck-muller': 'FRANCK MULLER',
  'frederique-constant': 'FREDERIQUE CONSTANT',
  'furlan-marri': 'FURLAN MARRI',
  'gerald-charles': 'GERALD CHARLES',
  'gerald-genta': 'GERALD GENTA',
  'girard-perregaux': 'GIRARD PERREGAUX',
  'glashutte-original': 'GLASHUTTE ORIGINAL',
  'graff': 'GRAFF',
  'greubel-forsey': 'GREUBEL FORSEY',
  'h-moser-cie': 'H. MOSER & CIE',
  'harry-winston': 'HARRY WINSTON',
  'hublot': 'HUBLOT',
  'hysek': 'HYSEK',
  'hyt': 'HYT',
  'iwc': 'IWC',
  'jacob-co': 'JACOB & CO',
  'jaeger-lecoultre': 'JAEGER LECOULTRE',
  'jaquet-droz': 'JAQUET DROZ',
  'longines': 'LONGINES',
  'mb-f': 'MB & F',
  'omega': 'OMEGA',
  'oris': 'ORIS',
  'panerai': 'PANERAI',
  'parmigiani-fleuriere': 'PARMIGIANI FLEURIER',
  'patek-philippe': 'PATEK PHILIPPE',
  'piaget': 'PIAGET',
  'richard-mille': 'RICHARD MILLE',
  'rolex': 'ROLEX',
  'romain-jerome': 'ROMAIN JEROME',
  'studio-underd0g': 'Studio Underd0g',
  'tag-heuer': 'TAG HEUER',
  'timex': 'TIMEX',
  'tudor': 'TUDOR',
  'ulysse-nardin': 'ULYSSE NARDIN',
  'vacheron-constantin': 'VACHERON CONSTANTIN',
  'van-cleef-arpels': 'VAN CLEEF & ARPELS',
  'west-end-watch-co': 'WEST END WATCH CO',
  'zenith': 'ZENITH',
  
  // Perfume brands
  'abercrombie-fitch': 'Abercrombie & Fitch',
  'abercrombie-and-fitch': 'Abercrombie & Fitch',
  'antonio-banderas': 'Antonio Banderas',
  'armaf': 'Armaf',
  'azzaro': 'Azzaro',
  'bentley': 'Bentley',
  'burberry': 'Burberry',
  'calvin-klein': 'Calvin Klein',
  'carolina-herrera': 'Carolina Herrera',
  'cartier': 'Cartier',
  'chanel': 'Chanel',
  'christian-dior': 'Christian Dior',
  'david-beckham': 'David Beckham',
  'davidoff': 'Davidoff',
  'dolce-gabbana': 'Dolce & Gabbana',
  'dolce-and-gabbana': 'Dolce & Gabbana',
  'dumont': 'Dumont',
  'givenchy': 'Givenchy',
  'giorgio-armani': 'Giorgio Armani',
  'gucci': 'Gucci',
  'guerlain': 'Guerlain',
  'guy-laroche': 'Guy Laroche',
  'hermes': 'Hermes',
  'hugo-boss': 'Hugo Boss',
  'jaguar': 'Jaguar',
  'jean-paul-gaultier': 'Jean Paul Gaultier',
  'jimmy-choo': 'Jimmy Choo',
  'john-varvatos': 'John Varvatos',
  'jo-malone': 'Jo Malone',
  'kayali': 'Kayali',
  'lanvin': 'Lanvin',
  'le-labo': 'Le Labo',
  'paco-rabanne': 'Paco Rabanne',
  'prada': 'Prada',
  'ralph-lauren': 'Ralph Lauren',
  'roja-parfums': 'Roja Parfums',
  'salvatore-ferragamo': 'Salvatore Ferragamo',
  'tom-ford': 'Tom Ford',
  'unknown': 'Unknown',
  'versace': 'Versace',
  'victorias-secret': "Victoria's Secret",
  'viktor-rolf': 'Viktor & Rolf',
  'yves-saint-laurent': 'Yves Saint Laurent',
};

export function getBrandFromUrl(brandUrl: string): string {
  const normalized = brandUrl.toLowerCase();
  return BRAND_MAPPINGS[normalized] || denormalizeBrandFromUrl(brandUrl);
}

// Enhanced brand matching for better compatibility
export function normalizeBrandForDatabase(brand: string): string {
  // First, try to get the exact brand name from mappings
  const normalizedUrl = normalizeBrandForUrl(brand);
  if (BRAND_MAPPINGS[normalizedUrl]) {
    return BRAND_MAPPINGS[normalizedUrl];
  }
  
  // If no mapping found, return the original brand name as-is
  // This preserves accents and special characters for database matching
  return brand.trim();
}

export function getBrandUrl(brand: string): string {
  const normalized = normalizeBrandForUrl(brand);
  return normalized;
} 