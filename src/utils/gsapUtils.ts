// GSAP utility for dynamic imports
import type { gsap as GSAPType } from 'gsap';

let gsap: typeof GSAPType | null = null;
let ScrollTrigger: unknown = null;
let isInitialized = false;

export const initGSAP = async () => {
  if (isInitialized) return { gsap, ScrollTrigger }; // Already initialized
  
  try {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      console.log('GSAP: Server-side rendering, skipping initialization');
      return { gsap: null, ScrollTrigger: null };
    }

    const gsapModule = await import('gsap');
    const ScrollTriggerModule = await import('gsap/ScrollTrigger');
    
    gsap = gsapModule.gsap;
    ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
    
    if (gsap && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      isInitialized = true;
      console.log('GSAP: Successfully initialized');
    }
    
    return { gsap, ScrollTrigger };
  } catch (error) {
    console.warn('GSAP: Failed to initialize, animations will be disabled:', error);
    return { gsap: null, ScrollTrigger: null };
  }
};

export const getGSAP = () => ({ gsap, ScrollTrigger });

// Fallback animation function for when GSAP is not available
export const createFallbackAnimation = (element: HTMLElement, duration: number = 1000) => {
  if (!element) return;
  
  element.style.transition = `all ${duration}ms ease-in-out`;
  element.style.opacity = '1';
  element.style.transform = 'translateY(0)';
};

// Safe animation wrapper
export const safeAnimate = (callback: (gsap: typeof GSAPType) => void) => {
  if (gsap) {
    callback(gsap);
  } else {
    console.warn('GSAP: Animation skipped - GSAP not available');
  }
}; 