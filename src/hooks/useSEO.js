import { useEffect } from 'react';

export function useSEO({ title, description }) {
  useEffect(() => {
    const fullTitle = `${title} | Ayojon Event Management Service`;
    document.title = fullTitle;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;

    // Optional: Add OG tags if needed
    let metaOgTitle = document.querySelector('meta[property="og:title"]');
    if (!metaOgTitle) {
      metaOgTitle = document.createElement('meta');
      metaOgTitle.setAttribute('property', 'og:title');
      document.head.appendChild(metaOgTitle);
    }
    metaOgTitle.content = fullTitle;

    let metaOgDesc = document.querySelector('meta[property="og:description"]');
    if (!metaOgDesc) {
      metaOgDesc = document.createElement('meta');
      metaOgDesc.setAttribute('property', 'og:description');
      document.head.appendChild(metaOgDesc);
    }
    metaOgDesc.content = description;

  }, [title, description]);
}
