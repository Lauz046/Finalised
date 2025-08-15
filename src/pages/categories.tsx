import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '../components/ProductPage/Breadcrumbs';
import { useProductContext } from '../context/ProductContext';

const CategoriesPage = () => {
  const { categoryData } = useProductContext();

  const categories = [
    {
      name: 'Sneakers',
      href: '/sneaker',
      image: '/Sneaker AJ.png',
      description: 'Premium sneakers from top brands',
      productCount: categoryData.sneakers?.length || 0,
      featuredProducts: categoryData.sneakers?.slice(0, 3) || []
    },
    {
      name: 'Apparel',
      href: '/apparel',
      image: '/apparel.png',
      description: 'High-end clothing and fashion',
      productCount: categoryData.apparel?.length || 0,
      featuredProducts: categoryData.apparel?.slice(0, 3) || []
    },
    {
      name: 'Watches',
      href: '/watch',
      image: '/watch casio.png',
      description: 'Luxury timepieces and accessories',
      productCount: categoryData.watches?.length || 0,
      featuredProducts: categoryData.watches?.slice(0, 3) || []
    },
    {
      name: 'Accessories',
      href: '/accessories',
      image: '/labubu.png',
      description: 'Premium accessories and bags',
      productCount: categoryData.accessories?.length || 0,
      featuredProducts: categoryData.accessories?.slice(0, 3) || []
    },
    {
      name: 'Perfumes',
      href: '/perfume',
              image: '/perfumeticker/bentoperfume.png',
      description: 'Exclusive fragrances and scents',
      productCount: categoryData.perfumes?.length || 0,
      featuredProducts: categoryData.perfumes?.slice(0, 3) || []
    }
  ];

  return (
    <>
      <Head>
        <title>Categories | House of Plutus</title>
        <meta name="description" content="Browse all luxury product categories - sneakers, watches, perfumes, apparel & accessories at House of Plutus" />
      </Head>

      <div style={{ 
        minHeight: '100vh', 
        background: '#f1f1f1', 
        paddingTop: '67px',
        overflowX: 'hidden'
      }}>
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Categories' }]} />
        
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '40px 20px'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 600,
            color: '#22304a',
            textAlign: 'center',
            marginBottom: '60px',
            fontFamily: 'Montserrat'
          }}>
            All Categories
          </h1>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '30px',
            marginBottom: '60px'
          }}>
            {categories.map((category) => (
              <Link key={category.name} href={category.href} style={{
                display: 'block',
                background: '#fff',
                borderRadius: '12px',
                padding: '30px',
                textDecoration: 'none',
                color: 'inherit',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
                border: '1px solid #e8e8e8'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
              }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      marginRight: '20px',
                      background: '#f8f9fa',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Image 
                        src={category.image} 
                        alt={category.name}
                        width={60}
                        height={60}
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <div>
                      <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        color: '#22304a',
                        margin: '0 0 5px 0',
                        fontFamily: 'Montserrat'
                      }}>
                        {category.name}
                      </h2>
                      <p style={{
                        fontSize: '0.9rem',
                        color: '#666',
                        margin: '0',
                        fontFamily: 'Montserrat'
                      }}>
                        {category.description}
                      </p>
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '15px'
                  }}>
                    <span style={{
                      fontSize: '0.9rem',
                      color: '#888',
                      fontFamily: 'Montserrat'
                    }}>
                      {category.productCount} products available
                    </span>
                    <span style={{
                      fontSize: '0.9rem',
                      color: '#1e88e5',
                      fontWeight: 500,
                      fontFamily: 'Montserrat'
                    }}>
                      View All →
                    </span>
                  </div>
                  
                  {category.featuredProducts.length > 0 && (
                    <div style={{
                      display: 'flex',
                      gap: '10px',
                      marginTop: '15px'
                    }}>
                      {category.featuredProducts.map((product: unknown, index: number) => (
                        <div key={index} style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '6px',
                          overflow: 'hidden',
                          background: '#f8f9fa',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Image 
                            src={product.images?.[0] || '/image1.jpeg'} 
                            alt={product.productName || product.title || product.name || 'Product'}
                            width={50}
                            height={50}
                            style={{ objectFit: 'contain' }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
              </Link>
            ))}
          </div>
          
          <div style={{
            textAlign: 'center',
            padding: '40px 0',
            borderTop: '1px solid #e8e8e8',
            marginTop: '40px'
          }}>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: 500,
              color: '#22304a',
              marginBottom: '15px',
              fontFamily: 'Montserrat'
            }}>
              Can&apos;t find what you&apos;re looking for?
            </h3>
            <p style={{
              fontSize: '1rem',
              color: '#666',
              marginBottom: '25px',
              fontFamily: 'Montserrat'
            }}>
              Use our search feature to find specific products or brands
            </p>
            <Link href="/search" style={{
              display: 'inline-block',
              background: '#22304a',
              color: '#fff',
              padding: '12px 30px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 500,
              fontFamily: 'Montserrat',
              transition: 'background 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#1a2533'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#22304a'}>
              Search Products
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesPage; 