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

// Comprehensive brand URL mappings - this is the source of truth
// Maps URL-friendly names to exact database brand names
const BRAND_URL_MAPPINGS: Record<string, string> = {
  // Watch brands with special characters
  'a-lange-sohne': 'A. LANGE & SOHNE',
  'a-lange-söhne': 'A. LANGE & SOHNE',
  'a-lange-and-sohne': 'A. LANGE & SOHNE',
  'a-lange--sohne': 'A. LANGE & SOHNE', // Handle double dash case
  'audemars-piguet': 'AUDEMARS PIGUET',
  'baume-mercier': 'BAUME & MERCIER',
  'baume--mercier': 'BAUME & MERCIER', // Handle double dash case
  'bell-ross': 'BELL & ROSS',
  'bell--ross': 'BELL & ROSS', // Handle double dash case
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
  'f-p--journe': 'F.P. JOURNE', // Handle double dash case
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
  'h-moser--cie': 'H. MOSER & CIE', // Handle double dash case
  'harry-winston': 'HARRY WINSTON',
  'hublot': 'HUBLOT',
  'hysek': 'HYSEK',
  'hyt': 'HYT',
  'iwc': 'IWC',
  'jacob-co': 'JACOB & CO',
  'jacob--co': 'JACOB & CO', // Handle double dash case
  'jaeger-lecoultre': 'JAEGER LECOULTRE',
  'jaquet-droz': 'JAQUET DROZ',
  'longines': 'LONGINES',
  'mb-f': 'MB & F',
  'mb--f': 'MB & F', // Handle double dash case
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
  'van-cleef--arpels': 'VAN CLEEF & ARPELS', // Handle double dash case
  'west-end-watch-co': 'WEST END WATCH CO',
  'zenith': 'ZENITH',
  
  // Perfume brands with special characters
  'abercrombie-fitch': 'Abercrombie & Fitch',
  'abercrombie-and-fitch': 'Abercrombie & Fitch',
  'abercrombie--fitch': 'Abercrombie & Fitch', // Handle double dash case
  'antonio-banderas': 'Antonio Banderas',
  'armaf': 'Armaf',
  'azzaro': 'Azzaro',
  'bentley': 'Bentley',
  'burberry': 'Burberry',
  'calvin-klein': 'Calvin Klein',
  'carolina-herrera': 'Carolina Herrera',
  'christian-dior': 'Christian Dior',
  'david-beckham': 'David Beckham',
  'davidoff': 'Davidoff',
  'dolce-gabbana': 'Dolce & Gabbana',
  'dolce-and-gabbana': 'Dolce & Gabbana',
  'dolce--gabbana': 'Dolce & Gabbana', // Handle double dash case
  'dumont': 'Dumont',
  'giorgio-armani': 'Giorgio Armani',
  'goldfield-banks': 'Goldfield & Banks',
  'goldfield--banks': 'Goldfield & Banks', // Handle double dash case
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
  'unique-e-luxury': "Unique'e Luxury",
  'unique--e-luxury': "Unique'e Luxury", // Handle double dash case
  'versace': 'Versace',
  'victorias-secret': "Victoria's Secret",
  'viktor-rolf': 'Viktor & Rolf',
  'viktor--rolf': 'Viktor & Rolf', // Handle double dash case
  'yves-saint-laurent': 'Yves Saint Laurent',
  'zadig-voltaire': 'Zadig & Voltaire',
  'zadig--voltaire': 'Zadig & Voltaire', // Handle double dash case
  
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
  
  // Apparel brands
  'levis': "Levi's",
  'cactus-jack-by-travis-scott': 'Cactus Jack by Travis Scott',
  'cactus-jack': 'Cactus Jack',
  'cactus-jack-travis-scott': 'Cactus Jack by Travis Scott',
  'carhartt-wip': 'Carhartt WIP',
  'aime-leon-dore': 'Aimé Leon Dore',
  'all-saints': 'ALL SAINTS',
  'bape': 'BAPE',
  'lanvin-women': 'Lanvin Women',
  '3eleven': '3eleven',
  
  // Accessories brands
  'aim-leon-dore': 'Aimé Leon Dore', // Handle missing 'e' case
  'paris-saint-germain': 'Paris Saint-Germain',
  'off-white': 'OFF-WHITE',
  'ray-ban': 'Ray-Ban',
  'y-3': 'Y-3',
  'mlb-all-star-game': 'MLB All-Star Game',
  'gentle-monster': 'Gentle Monster',
  'givenchy': 'Givenchy',
  'jacquemus': 'Jacquemus',
};

// Reverse mapping for URL generation
const BRAND_TO_URL_MAPPINGS: Record<string, string> = Object.entries(BRAND_URL_MAPPINGS).reduce((acc, [url, brand]) => {
  acc[brand] = url;
  return acc;
}, {} as Record<string, string>);

export function getBrandFromUrl(brandUrl: string): string {
  const normalized = brandUrl.toLowerCase();
  return BRAND_URL_MAPPINGS[normalized] || denormalizeBrandFromUrl(brandUrl);
}

// Enhanced brand matching for better compatibility
export function normalizeBrandForDatabase(brand: string): string {
  // First, try to get the exact brand name from mappings
  const normalizedUrl = normalizeBrandForUrl(brand);
  if (BRAND_URL_MAPPINGS[normalizedUrl]) {
    return BRAND_URL_MAPPINGS[normalizedUrl];
  }
  
  // If no mapping found, return the original brand name as-is
  // This preserves accents and special characters for database matching
  return brand.trim();
}

export function getBrandUrl(brand: string): string {
  // First check if we have a direct mapping for this brand
  if (BRAND_TO_URL_MAPPINGS[brand]) {
    return BRAND_TO_URL_MAPPINGS[brand];
  }
  
  // Fallback to normalization
  const normalized = normalizeBrandForUrl(brand);
  return normalized;
}

// Validation function to ensure brand mappings are consistent
export function validateBrandMappings(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Test that all URL mappings can be reversed correctly
  for (const [url, brand] of Object.entries(BRAND_URL_MAPPINGS)) {
    const generatedUrl = getBrandUrl(brand);
    if (generatedUrl !== url) {
      errors.push(`Brand "${brand}" generates URL "${generatedUrl}" but should be "${url}"`);
    }
    
    const retrievedBrand = getBrandFromUrl(url);
    if (retrievedBrand !== brand) {
      errors.push(`URL "${url}" retrieves brand "${retrievedBrand}" but should be "${brand}"`);
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

// Helper function to get all available brand URLs
export function getAllBrandUrls(): string[] {
  return Object.keys(BRAND_URL_MAPPINGS);
}

// Helper function to get all available brand names
export function getAllBrandNames(): string[] {
  return Object.values(BRAND_URL_MAPPINGS);
}

export const formatGenderText = (gender: string): string => {
  if (!gender) return gender;
  
  // Convert common gender formats to proper case
  const genderMap: { [key: string]: string } = {
    'MALE': 'Male',
    'FEMALE': 'Female',
    'male': 'Male',
    'female': 'Female',
    'MEN': 'Men',
    'WOMEN': 'Women',
    'men': 'Men',
    'women': 'Women'
  };
  
  return genderMap[gender] || gender;
}; 