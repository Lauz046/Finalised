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
  'air-jordan': 'Air Jordan',
  'air-jordan-1': 'Air Jordan 1',
  'air-jordan-4': 'Air Jordan 4',
  'air-jordan-11': 'Air Jordan 11',
  'new-balance': 'New Balance',
  'louis-vuitton': 'Louis Vuitton',
  'patek-philippe': 'Patek Philippe',
  'audemars-piguet': 'Audemars Piguet',
  'richard-mille': 'Richard Mille',
  'tag-heuer': 'Tag Heuer',
  'tom-ford': 'Tom Ford',
  'jo-malone': 'Jo Malone',
  'le-labo': 'Le Labo',
  'roja-parfums': 'Roja Parfums',
  'stone-island': 'Stone Island',
  'canada-goose': 'Canada Goose',
  'the-north-face': 'The North Face',
  'bottega-veneta': 'Bottega Veneta',
  'saint-laurent': 'Saint Laurent',
};

export function getBrandFromUrl(brandUrl: string): string {
  const normalized = brandUrl.toLowerCase();
  return BRAND_MAPPINGS[normalized] || denormalizeBrandFromUrl(brandUrl);
}

export function getBrandUrl(brand: string): string {
  const normalized = normalizeBrandForUrl(brand);
  return normalized;
} 