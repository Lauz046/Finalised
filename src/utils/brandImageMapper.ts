// Brand image mapping utility
// Maps brand names to their corresponding image files from the ticker folders

export const getBrandImage = (brandName: string, category: string): string => {
  const normalizedBrandName = brandName.toLowerCase().trim();
  
  // Category-specific brand image mappings using new ticker images
  const brandMappings: { [category: string]: { [brand: string]: string } } = {
    sneaker: {
      'nike': '/sneakerticker/NIKE.png',
      'air jordan': '/sneakerticker/AIR JORDAN CARD.png',
      'adidas': '/sneakerticker/AF1.png', // Using AF1 as fallback since SAMBA CARDS.png is missing
      'yeezy': '/sneakerticker/AF1.png', // Using AF1 as fallback since SAMBA CARDS.png is missing
      'new balance': '/sneakerticker/NEW BALANCE.png',
      'on': '/sneakerticker/ON CLOUD CARD.png',
      'dunks': '/sneakerticker/Dunks card.png',
      'sb dunks': '/sneakerticker/SB DUNKS CARD.png',
      'nike dunk': '/sneakerticker/Dunks card.png',
      'af1': '/sneakerticker/AF1.png',
      'air force': '/sneakerticker/AF1.png',
      'air force 1': '/sneakerticker/AF1.png',
      'luxury': '/sneakerticker/LUXURY CARD.png',
      'balenciaga': '/sneakerticker/LUXURY CARD.png',
      'amiri': '/sneakerticker/LUXURY CARD.png',
      'gucci': '/sneakerticker/LUXURY CARD.png',
      'dolce and gabbana': '/sneakerticker/LUXURY CARD.png',
      'dolce & gabbana': '/sneakerticker/LUXURY CARD.png',
    },
    apparel: {
      'carhartt': '/apparelticker/Carhartt WIP.png',
      'assc': '/apparelticker/ASSC.png',
      'all saints': '/apparelticker/All saints Jacket.png',
      'fear of god': '/apparelticker/Fear of God Men.png',
      'bape': '/apparelticker/BAPE.png',
      'essentials': '/apparelticker/Essentials.png',
      'aime leon dore': '/apparelticker/AIME LEON DORE.png',
      'bottega veneta': '/apparelticker/bottegaveneta Men.png',
      '3eleven': '/apparelticker/3eleven-27.png',
      'aimé leon dore': '/apparelticker/Aimé Leon Dore\'s SS19 Is the Ultimate Sportswear & Preppy Flex.jpg',
    },
    accessories: {
      'sunglasses': '/accessoriesticker/Sunglasses.png',
      'belts': '/accessoriesticker/BELT.png',
      'belt': '/accessoriesticker/BELT.png',
      'caps': '/accessoriesticker/CAPS.png',
      'hats': '/accessoriesticker/CAPS.png',
      'phone cases': '/accessoriesticker/PHONE CASE.png',
      'phone case': '/accessoriesticker/PHONE CASE.png',
      'stanley': '/accessoriesticker/STANLEY.png',
      'scarves': '/accessoriesticker/SCARF.png',
      'scarf': '/accessoriesticker/SCARF.png',
      'socks': '/accessoriesticker/SOCKS.png',
      'sock': '/accessoriesticker/SOCKS.png',
    },
    watch: {
      'rolex': '/watchticker/Rolex.png',
      'carl f bucherer': '/watchticker/Carl F Bucherer.png',
      'graham': '/watchticker/GRAHAM.png',
      'vacheron constantin': '/watchticker/Vacheron Constantin.png',
      'glashütte': '/watchticker/GLASHUTTE.png',
      'glashütte original': '/watchticker/GLASHUTTE.png',
      'de bethune': '/watchticker/De Bethune.png',
      'arnold & son': '/watchticker/ARNOLD & SON.png',
      'bell & ross': '/watchticker/BELL & ROSS.png',
    },
    perfume: {
      'all perfume': '/perfumeticker/All Perfume.png',
      'designer perfume': '/perfumeticker/designer perfume.png',
      'niche perfume': '/perfumeticker/Niche perfume.png',
      'kilian': '/perfumeticker/designer perfume.png',
      'kilian paris': '/perfumeticker/designer perfume.png',
      'salvatore ferragamo': '/perfumeticker/designer perfume.png',
      'ferragamo': '/perfumeticker/designer perfume.png',
      'dunhill': '/perfumeticker/designer perfume.png',
      'coach': '/perfumeticker/designer perfume.png',
      'perfume': '/perfumeticker/All Perfume.png',
      'perfumes': '/perfumeticker/All Perfume.png',
      'fragrance': '/perfumeticker/All Perfume.png',
      'cologne': '/perfumeticker/All Perfume.png',
      'eau de toilette': '/perfumeticker/designer perfume.png',
      'eau de parfum': '/perfumeticker/designer perfume.png',
    }
  };

  // Get category mappings
  const categoryMappings = brandMappings[category] || {};
  
  // Try exact match first
  if (categoryMappings[normalizedBrandName]) {
    return categoryMappings[normalizedBrandName];
  }
  
  // Try partial matches
  for (const [mappedBrand, imagePath] of Object.entries(categoryMappings)) {
    if (normalizedBrandName.includes(mappedBrand) || mappedBrand.includes(normalizedBrandName)) {
      return imagePath;
    }
  }
  
  // If no match found, return a random image from the category folder
  const categoryFallbacks = getCategoryFallbacks(category);
  const randomIndex = Math.floor(Math.random() * categoryFallbacks.length);
  return categoryFallbacks[randomIndex];
};

// Helper function to get category fallback images
const getCategoryFallbacks = (category: string): string[] => {
  const fallbackImages: { [category: string]: string[] } = {
    sneaker: [
      '/sneakerticker/NIKE.png',
      '/sneakerticker/AIR JORDAN CARD.png',
      '/sneakerticker/SAMBA CARDS.png',
      '/sneakerticker/Dunks card.png',
      '/sneakerticker/AF1.png',
      '/sneakerticker/LUXURY CARD.png',
    ],
    apparel: [
      '/apparelticker/Carhartt WIP.png',
      '/apparelticker/ASSC.png',
      '/apparelticker/BAPE.png',
      '/apparelticker/Essentials.png',
      '/apparelticker/AIME LEON DORE.png',
    ],
    accessories: [
      '/accessoriesticker/Sunglasses.png',
      '/accessoriesticker/BELT.png',
      '/accessoriesticker/CAPS.png',
      '/accessoriesticker/PHONE CASE.png',
      '/accessoriesticker/STANLEY.png',
      '/accessoriesticker/SCARF.png',
      '/accessoriesticker/SOCKS.png',
    ],
    watch: [
      '/watchticker/Rolex.png',
      '/watchticker/Carl F Bucherer.png',
      '/watchticker/GRAHAM.png',
      '/watchticker/Vacheron Constantin.png',
      '/watchticker/GLASHUTTE.png',
      '/watchticker/De Bethune.png',
      '/watchticker/ARNOLD & SON.png',
      '/watchticker/BELL & ROSS.png',
    ],
    perfume: [
      '/perfumeticker/All Perfume.png',
      '/perfumeticker/designer perfume.png',
      '/perfumeticker/Niche perfume.png',
    ]
  };
  
  return fallbackImages[category] || ['/image1.jpeg'];
}; 