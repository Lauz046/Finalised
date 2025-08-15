'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './HypeZone.module.css';

interface Post {
  id: string;
  images: string[];
  likes: number;
  isLiked: boolean;
  caption: string;
  profileName: string;
  profileIcon: string;
}

const HypeZone: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      images: [
        '/hypezonepost-optimized/Post1/1.webp',
        '/hypezonepost-optimized/Post1/2.webp',
        '/hypezonepost-optimized/Post1/3.webp',
        '/hypezonepost-optimized/Post1/4.webp',
        '/hypezonepost-optimized/Post1/5.webp'
      ],
      likes: 0,
      isLiked: false,
      caption: 'Air Jordan 5 is expected to release this October. Here\'s a little sneak peak for you all! 🔥👟 #AirJordan5 #SneakerDrop #OctoberRelease',
      profileName: 'HOUSE OF PLUTUS',
      profileIcon: '/blue_nav_icons/Blue PLUTUS LOGO.svg'
    },
    {
      id: '2',
      images: [
        '/hypezonepost-optimized/Post2/1.webp',
        '/hypezonepost-optimized/Post2/2.webp',
        '/hypezonepost-optimized/Post2/3.webp',
        '/hypezonepost-optimized/Post2/4.webp'
      ],
      likes: 0,
      isLiked: false,
      caption: 'Billie Eilish debuted two exclusive Air Jordan on her tour! 🎤👟✨ #BillieEilish #AirJordan #ExclusiveDrop #TourLife',
      profileName: 'HOUSE OF PLUTUS',
      profileIcon: '/blue_nav_icons/Blue PLUTUS LOGO.svg'
    },
    {
      id: '3',
      images: [
        '/hypezonepost-optimized/Post3/1.webp',
        '/hypezonepost-optimized/Post3/2.webp'
      ],
      likes: 0,
      isLiked: false,
      caption: 'Kevin Hart comes to India with his Standup "Acting My Age" in Mumbai on 21st September! 🎭🇮🇳😂 #KevinHart #Standup #Mumbai #Comedy',
      profileName: 'HOUSE OF PLUTUS',
      profileIcon: '/blue_nav_icons/Blue PLUTUS LOGO.svg'
    },
    {
      id: '4',
      images: [
        '/hypezonepost-optimized/Post4/1.webp',
        '/hypezonepost-optimized/Post4/2.webp'
      ],
      likes: 0,
      isLiked: false,
      caption: 'Leo Messi spotted wearing rare Rolex Barbie Daytona! ⚽💎⌚ #Messi #Rolex #RareWatch',
      profileName: 'HOUSE OF PLUTUS',
      profileIcon: '/blue_nav_icons/Blue PLUTUS LOGO.svg'
    },
    {
      id: '5',
      images: [
        '/hypezonepost-optimized/Post5/1.webp',
        '/hypezonepost-optimized/Post5/2.webp',
        '/hypezonepost-optimized/Post5/3.webp',
        '/hypezonepost-optimized/Post5/4.webp',
        '/hypezonepost-optimized/Post5/5.webp'
      ],
      likes: 0,
      isLiked: false,
      caption: 'Expected to release in Fall 2025, Nike Dunk Low is covered in crocodile skin! 🐊👟🍂 #NikeDunk #CrocodileSkin #Fall2025 #LuxurySneakers',
      profileName: 'HOUSE OF PLUTUS',
      profileIcon: '/blue_nav_icons/Blue PLUTUS LOGO.svg'
    },
    {
      id: '6',
      images: [
        '/hypezonepost-optimized/Post6/1.webp',
        '/hypezonepost-optimized/Post6/2.webp',
        '/hypezonepost-optimized/Post6/3.webp',
        '/hypezonepost-optimized/Post6/4.webp',
        '/hypezonepost-optimized/Post6/5.webp',
        '/hypezonepost-optimized/Post6/6.webp',
        '/hypezonepost-optimized/Post6/7.webp'
      ],
      likes: 0,
      isLiked: false,
      caption: 'Coolest watches at Wimbledon 2025! Everyone brought their A-game! 🎾⌚ #Wimbledon2025 #LuxuryWatches',
      profileName: 'HOUSE OF PLUTUS',
      profileIcon: '/blue_nav_icons/Blue PLUTUS LOGO.svg'
    },
    {
      id: '7',
      images: [
        '/hypezonepost-optimized/Post7/1.webp',
        '/hypezonepost-optimized/Post7/2.webp',
        '/hypezonepost-optimized/Post7/3.webp',
        '/hypezonepost-optimized/Post7/4.webp',
        '/hypezonepost-optimized/Post7/5.webp',
        '/hypezonepost-optimized/Post7/6.webp'
      ],
      likes: 0,
      isLiked: false,
      caption: 'Behind the scenes at PLUTUS 📸 #Perfume #BehindTheScenes #Chanel',
      profileName: 'HOUSE OF PLUTUS',
      profileIcon: '/blue_nav_icons/Blue PLUTUS LOGO.svg'
    }
  ]);

  const [currentImageIndexes, setCurrentImageIndexes] = useState<{ [key: string]: number }>({});
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Load likes from localStorage on component mount
  useEffect(() => {
    const loadLikes = () => {
      try {
        const savedLikes = localStorage.getItem('hypezone-likes');
        const savedLikedPosts = localStorage.getItem('hypezone-liked-posts');
        
        if (savedLikes) {
          const likesData = JSON.parse(savedLikes);
          setPosts(prevPosts => 
            prevPosts.map(post => ({
              ...post,
              likes: likesData[post.id] || 0,
              isLiked: savedLikedPosts ? JSON.parse(savedLikedPosts).includes(post.id) : false
            }))
          );
        }
      } catch (error) {
        console.error('Error loading likes from localStorage:', error);
      }
    };

    loadLikes();
  }, []);

  // Initialize current image indexes and check mobile
  useEffect(() => {
    const initialIndexes: { [key: string]: number } = {};
    posts.forEach(post => {
      initialIndexes[post.id] = 0;
    });
    setCurrentImageIndexes(initialIndexes);
    
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Infinite scroll effect
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let isScrolling = false;

    const handleScroll = () => {
      if (isScrolling) return;
      
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      
      // If scrolled to the end, reset to beginning
      if (scrollLeft >= scrollWidth - clientWidth - 50) {
        isScrolling = true;
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        
        setTimeout(() => {
          isScrolling = false;
        }, 1000);
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  // Save likes to localStorage
  const saveLikesToStorage = (updatedPosts: Post[]) => {
    try {
      const likesData: { [key: string]: number } = {};
      const likedPosts: string[] = [];
      
      updatedPosts.forEach(post => {
        likesData[post.id] = post.likes;
        if (post.isLiked) {
          likedPosts.push(post.id);
        }
      });
      
      localStorage.setItem('hypezone-likes', JSON.stringify(likesData));
      localStorage.setItem('hypezone-liked-posts', JSON.stringify(likedPosts));
    } catch (error) {
      console.error('Error saving likes to localStorage:', error);
    }
  };

  const handleLike = (postId: string) => {
    setPosts(prevPosts => {
      const updatedPosts = prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked 
            }
          : post
      );
      
      // Save to localStorage
      saveLikesToStorage(updatedPosts);
      
      return updatedPosts;
    });
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setModalImageIndex(0);
  };

  const handleModalImageChange = (direction: 'next' | 'prev') => {
    if (!selectedPost) return;

    if (direction === 'next') {
      setModalImageIndex(prev => 
        prev + 1 >= selectedPost.images.length ? 0 : prev + 1
      );
    } else {
      setModalImageIndex(prev => 
        prev - 1 < 0 ? selectedPost.images.length - 1 : prev - 1
      );
    }
  };

  const closeModal = () => {
    setSelectedPost(null);
    setModalImageIndex(0);
  };

  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowLeft') {
      handleModalImageChange('prev');
    } else if (e.key === 'ArrowRight') {
      handleModalImageChange('next');
    }
  };

  // Get hover image index (third frame, or second if third doesn't exist)
  const getHoverImageIndex = (post: Post) => {
    if (post.images.length >= 3) {
      return 2; // Third frame (index 2)
    } else if (post.images.length >= 2) {
      return 1; // Second frame (index 1)
    }
    return 0; // First frame if only one image
  };

  return (
    <section className={styles.hypeZone}>
      <div className={styles.header}>
        <h2 className={styles.title}>THE HYPE ZONE</h2>
        <p className={styles.subtitle}>
          A reel zone for fashion drops, sneak peeks, and styling stories.{' '}
          <a 
            href="https://www.instagram.com/house_of_plutus?igsh=M2xzd2x0OXFzdWti" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.joinLink}
          >
            Join The Hype
          </a>
        </p>
      </div>

      <div className={styles.feedContainer} ref={scrollContainerRef}>
        <div className={styles.postsRow}>
          {posts.map((post, index) => (
            <div 
              key={post.id} 
              className={styles.post}
              onClick={() => handlePostClick(post)}
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              {/* Post Header */}
              <div className={styles.postHeader}>
                <div className={styles.profileInfo}>
                  <div className={styles.profileIconContainer}>
                    <Image
                      src="/DON/horn svg.png"
                      alt="PLUTUS"
                      width={24}
                      height={24}
                      className={styles.profileIcon}
                    />
                  </div>
                  <div className={styles.profileNameContainer}>
                    <Image
                      src="/blue_nav_icons/Blue PLUTUS LOGO.svg"
                      alt="HOUSE OF PLUTUS"
                      width={100}
                      height={20}
                      className={styles.profileNameLogo}
                    />
                  </div>
                </div>
              </div>

              {/* Post Image */}
              <div className={styles.imageContainer}>
                <Image
                  src={hoveredPost === post.id 
                    ? post.images[getHoverImageIndex(post)]
                    : post.images[currentImageIndexes[post.id] || 0]
                  }
                  alt="Post"
                  width={600}
                  height={600}
                  className={styles.postImage}
                  priority={index < 3} // Prioritize first 3 images
                />
              </div>

              {/* Post Actions */}
              <div className={styles.postActions}>
                <div className={styles.leftActions}>
                  <button 
                    className={`${styles.actionButton} ${post.isLiked ? styles.liked : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(post.id);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill={post.isLiked ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                  </button>
                  <button 
                    className={styles.actionButton}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                    </svg>
                  </button>
                  <button 
                    className={styles.actionButton}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Likes Count */}
              <div className={styles.likesCount}>
                {post.likes} likes
              </div>

              {/* Caption */}
              <div className={styles.caption}>
                <span className={styles.captionText}>{post.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for viewing posts */}
      {selectedPost && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeModal}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Modal Header - Same as card header */}
            <div className={styles.modalHeader}>
              <div className={styles.modalProfileInfo}>
                <div className={styles.modalProfileIconContainer}>
                  <Image
                    src="/DON/horn svg.png"
                    alt="PLUTUS"
                    width={24}
                    height={24}
                    className={styles.modalProfileIcon}
                  />
                </div>
                <div className={styles.modalProfileNameContainer}>
                  <Image
                    src="/blue_nav_icons/Blue PLUTUS LOGO.svg"
                    alt="HOUSE OF PLUTUS"
                    width={100}
                    height={20}
                    className={styles.modalProfileNameLogo}
                  />
                </div>
              </div>
            </div>
            
            {/* Modal Image Container */}
            <div className={styles.modalImageContainer}>
              <Image
                src={selectedPost.images[modalImageIndex]}
                alt="Post"
                width={800}
                height={800}
                className={styles.modalImage}
              />
              
              {selectedPost.images.length > 1 && (
                <>
                  <button 
                    className={`${styles.modalNavArrow} ${styles.modalPrevArrow}`}
                    onClick={() => handleModalImageChange('prev')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                  </button>
                  <button 
                    className={`${styles.modalNavArrow} ${styles.modalNextArrow}`}
                    onClick={() => handleModalImageChange('next')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                  
                  <div className={styles.modalImageIndicators}>
                    {selectedPost.images.map((_, imgIndex) => (
                      <div 
                        key={imgIndex}
                        className={`${styles.modalIndicator} ${
                          modalImageIndex === imgIndex ? styles.modalActive : ''
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            
            {/* Modal Actions and Info - Same as card */}
            <div className={styles.modalActions}>
              <div className={styles.modalLeftActions}>
                <button 
                  className={`${styles.modalActionButton} ${selectedPost.isLiked ? styles.modalLiked : ''}`}
                  onClick={() => handleLike(selectedPost.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill={selectedPost.isLiked ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                </button>
                <button className={styles.modalActionButton}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                  </svg>
                </button>
                <button className={styles.modalActionButton}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className={styles.modalLikesCount}>
              {selectedPost.likes} likes
            </div>
            
            <div className={styles.modalCaption}>
              <span className={styles.modalCaptionText}>{selectedPost.caption}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HypeZone; 