"use client";
import { useEffect } from 'react';

export default function MobileScrollProvider() {
  useEffect(() => {
    // Only apply on mobile devices
    if (window.innerWidth >= 768) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '-50px' });
    
    // Slight delay to ensure DOM is fully painted
    setTimeout(() => {
      const elements = document.querySelectorAll('.mobile-fade-up');
      elements.forEach(el => observer.observe(el));
    }, 100);
    
    return () => observer.disconnect();
  }, []);
  
  return null;
}
