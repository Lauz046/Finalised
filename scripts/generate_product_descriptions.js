const fs = require('fs');
const path = require('path');

// Premium description templates for different categories
const descriptionTemplates = {
  accessories: {
    backpack: [
      "Crafted with premium materials and contemporary design, this {brand} backpack combines functionality with sophisticated style. Perfect for the modern professional who demands both comfort and elegance in their daily commute.",
      "Elevate your everyday carry with this meticulously designed {brand} backpack. Featuring innovative storage solutions and premium construction, it's the perfect blend of luxury and practicality for the discerning individual.",
      "A masterclass in urban sophistication, this {brand} backpack showcases exceptional craftsmanship and thoughtful design. Ideal for those who appreciate the finer details in their accessories."
    ],
    beanie: [
      "Embrace winter elegance with this premium {brand} beanie, crafted from the finest materials for ultimate comfort and style. A sophisticated addition to any cold-weather ensemble.",
      "This {brand} beanie represents the perfect fusion of luxury and warmth, designed for those who refuse to compromise on style even in the coldest months. Timeless appeal meets contemporary comfort.",
      "Elevate your winter wardrobe with this exquisitely crafted {brand} beanie. Premium materials and thoughtful design create a piece that's both functional and fashion-forward."
    ],
    hat: [
      "A statement piece from {brand} that transcends seasons, this hat combines premium materials with timeless design. Perfect for those who understand that true style knows no boundaries.",
      "Crafted with attention to every detail, this {brand} hat represents the pinnacle of accessory design. A sophisticated choice for the modern individual who values both form and function.",
      "This {brand} hat embodies contemporary luxury, featuring exceptional craftsmanship and materials that speak to those who appreciate the finer things in life."
    ],
    sunglasses: [
      "Elevate your style with these premium {brand} sunglasses, featuring cutting-edge design and superior protection. A sophisticated choice for those who demand excellence in every detail.",
      "These {brand} sunglasses represent the perfect marriage of luxury and functionality, crafted with precision and designed for those who appreciate the art of fine eyewear.",
      "A masterclass in optical excellence, these {brand} sunglasses combine innovative technology with timeless elegance. Perfect for the discerning individual who values both protection and prestige."
    ],
    tote: [
      "Transform your daily routine with this luxurious {brand} tote, crafted from premium materials and designed with the modern lifestyle in mind. Sophistication meets practicality in perfect harmony.",
      "This {brand} tote represents the epitome of contemporary luxury, featuring exceptional craftsmanship and thoughtful design. Ideal for those who appreciate the finer details in their accessories.",
      "Elevate your everyday carry with this meticulously crafted {brand} tote. Premium materials and innovative design create a piece that's both beautiful and functional."
    ],
    belt: [
      "Complete your ensemble with this premium {brand} belt, crafted from the finest leather and designed with timeless elegance. A sophisticated choice for those who appreciate quality craftsmanship.",
      "This {brand} belt embodies contemporary luxury, featuring exceptional materials and design that speaks to those who understand the importance of refined accessories.",
      "A masterclass in leather craftsmanship, this {brand} belt combines traditional techniques with modern design. Perfect for the discerning individual who values both style and substance."
    ]
  },
  apparel: {
    hoodie: [
      "Elevate your casual style with this premium {brand} hoodie, crafted from the finest materials and designed for ultimate comfort. A sophisticated choice for those who appreciate luxury in everyday wear.",
      "This {brand} hoodie represents the perfect fusion of comfort and style, featuring exceptional craftsmanship and contemporary design. Ideal for the modern individual who demands excellence.",
      "Crafted with attention to every detail, this {brand} hoodie combines luxury materials with innovative design. Perfect for those who understand that casual doesn't mean compromising on quality."
    ],
    jacket: [
      "Make a statement with this luxurious {brand} jacket, featuring premium materials and contemporary design. A sophisticated choice for those who appreciate the art of outerwear.",
      "This {brand} jacket embodies contemporary luxury, crafted with exceptional attention to detail and designed for the modern individual who values both style and functionality.",
      "Elevate your wardrobe with this meticulously crafted {brand} jacket. Premium materials and innovative design create a piece that's both beautiful and practical."
    ],
    shirt: [
      "Refine your style with this premium {brand} shirt, crafted from the finest fabrics and designed with timeless elegance. Perfect for those who appreciate sophisticated simplicity.",
      "This {brand} shirt represents the epitome of contemporary luxury, featuring exceptional materials and craftsmanship. Ideal for the discerning individual who values quality.",
      "A masterclass in shirt design, this {brand} piece combines traditional techniques with modern aesthetics. Perfect for those who understand the importance of refined dressing."
    ],
    pants: [
      "Complete your ensemble with these premium {brand} pants, crafted from the finest materials and designed for ultimate comfort and style. A sophisticated choice for the modern individual.",
      "These {brand} pants embody contemporary luxury, featuring exceptional craftsmanship and design that speaks to those who appreciate the finer details in their wardrobe.",
      "Elevate your look with these meticulously crafted {brand} pants. Premium materials and thoughtful design create a piece that's both comfortable and stylish."
    ]
  },
  sneakers: {
    default: [
      "Step into luxury with these premium {brand} sneakers, featuring innovative design and superior comfort. A sophisticated choice for those who demand excellence in every step.",
      "These {brand} sneakers represent the perfect fusion of style and functionality, crafted with exceptional attention to detail. Ideal for the modern individual who values both comfort and aesthetics.",
      "Elevate your footwear game with these meticulously crafted {brand} sneakers. Premium materials and contemporary design create a piece that's both beautiful and practical."
    ]
  },
  perfume: {
    default: [
      "Immerse yourself in luxury with this exquisite {brand} fragrance, crafted with the finest ingredients and designed to captivate. A sophisticated choice for those who appreciate the art of perfumery.",
      "This {brand} scent represents the pinnacle of olfactory excellence, featuring exceptional notes and lasting power. Perfect for the discerning individual who values both elegance and longevity.",
      "Elevate your presence with this meticulously crafted {brand} fragrance. Premium ingredients and innovative composition create an experience that's both memorable and sophisticated."
    ]
  },
  watch: {
    default: [
      "Embrace timeless elegance with this premium {brand} timepiece, featuring exceptional craftsmanship and sophisticated design. A sophisticated choice for those who appreciate the art of horology.",
      "This {brand} watch represents the perfect fusion of tradition and innovation, crafted with precision and designed for the modern individual who values both style and functionality.",
      "Elevate your style with this meticulously crafted {brand} timepiece. Premium materials and innovative design create a piece that's both beautiful and reliable."
    ]
  }
};

// Function to get random template
function getRandomTemplate(category, subcategory) {
  const templates = descriptionTemplates[category]?.[subcategory] || 
                   descriptionTemplates[category]?.default || 
                   descriptionTemplates.sneakers.default;
  return templates[Math.floor(Math.random() * templates.length)];
}

// Function to generate description
function generateDescription(product, category) {
  const brand = product.brand || product.name?.split(' ')[0] || 'Premium';
  const productName = product.productName || product.title || product.name || '';
  
  let subcategory = 'default';
  
  if (category === 'accessories') {
    if (product.subcategory) {
      subcategory = product.subcategory.toLowerCase();
    } else if (productName.toLowerCase().includes('backpack')) {
      subcategory = 'backpack';
    } else if (productName.toLowerCase().includes('beanie')) {
      subcategory = 'beanie';
    } else if (productName.toLowerCase().includes('hat')) {
      subcategory = 'hat';
    } else if (productName.toLowerCase().includes('sunglasses')) {
      subcategory = 'sunglasses';
    } else if (productName.toLowerCase().includes('tote')) {
      subcategory = 'tote';
    } else if (productName.toLowerCase().includes('belt')) {
      subcategory = 'belt';
    }
  } else if (category === 'apparel') {
    if (productName.toLowerCase().includes('hoodie')) {
      subcategory = 'hoodie';
    } else if (productName.toLowerCase().includes('jacket')) {
      subcategory = 'jacket';
    } else if (productName.toLowerCase().includes('shirt')) {
      subcategory = 'shirt';
    } else if (productName.toLowerCase().includes('pants') || productName.toLowerCase().includes('trousers')) {
      subcategory = 'pants';
    }
  }
  
  const template = getRandomTemplate(category, subcategory);
  return template.replace(/{brand}/g, brand);
}

// Function to process each category
function processCategory(category, data) {
  const descriptions = [];
  
  data.forEach((product, index) => {
    if (!product.productName && !product.title && !product.name) return;
    
    const description = generateDescription(product, category);
    const productLink = product.product_link || product.link || product.url || '';
    
    descriptions.push({
      id: `${category}_${index}`,
      category: category,
      brand: product.brand || product.name?.split(' ')[0] || 'Premium',
      productName: product.productName || product.title || product.name || '',
      description: description,
      productLink: productLink,
      subcategory: product.subcategory || 'general'
    });
  });
  
  return descriptions;
}

// Main function
async function generateAllDescriptions() {
  try {
    const dataDir = path.join(__dirname, '../plutus-backend/seeding/data');
    const outputPath = path.join(dataDir, 'product_descriptions.json');
    
    const allDescriptions = [];
    
    // Process each category
    const categories = [
      { file: 'accessories_products.json', category: 'accessories' },
      { file: 'apparel_products.json', category: 'apparel' },
      { file: 'sneaker.json', category: 'sneakers' },
      { file: 'perfume_fixed_prices.json', category: 'perfume' },
      { file: 'watch.json', category: 'watch' }
    ];
    
    for (const { file, category } of categories) {
      const filePath = path.join(dataDir, file);
      
      if (fs.existsSync(filePath)) {
        console.log(`Processing ${category}...`);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const descriptions = processCategory(category, data);
        allDescriptions.push(...descriptions);
        console.log(`Generated ${descriptions.length} descriptions for ${category}`);
      } else {
        console.log(`File not found: ${filePath}`);
      }
    }
    
    // Write to file
    fs.writeFileSync(outputPath, JSON.stringify(allDescriptions, null, 2));
    console.log(`\n✅ Successfully generated ${allDescriptions.length} product descriptions!`);
    console.log(`📁 File saved to: ${outputPath}`);
    
  } catch (error) {
    console.error('Error generating descriptions:', error);
  }
}

// Run the script
generateAllDescriptions(); 