import Link from 'next/link';

const brandsByCategory: Record<string, string[]> = {
  sneaker: ['nike', 'adidas', 'puma', 'reebok', 'jordan'],
  apparel: ['gucci', 'prada', 'versace', 'balenciaga', 'off-white'],
  perfume: ['dior', 'chanel', 'creed', 'armani', 'versace'],
  accessories: ['hermes', 'pandora', 'cartier', 'tiffany', 'coach'],
  watch: ['rolex', 'casio', 'omega', 'seiko', 'tag-heuer'],
};

export default function BrandSelector({ category, currentBrand, brands: propBrands }: { category: string; currentBrand: string; brands?: string[] }) {
  const brands = propBrands || brandsByCategory[category] || [];
  return (
    <div style={{ display: 'flex', overflowX: 'auto', gap: 8 }}>
      {brands.map((brand) => (
        <Link key={brand} href={`/${category}/brand/${encodeURIComponent(brand)}`}>
          <button
            style={{
              padding: '8px 16px',
              background: brand === currentBrand ? '#222' : '#fff',
              color: brand === currentBrand ? '#fff' : '#222',
              border: '1px solid #ccc',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            {brand.toUpperCase()}
          </button>
        </Link>
      ))}
    </div>
  );
} 