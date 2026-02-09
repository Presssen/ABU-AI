
import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  lang?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, lang = 'en' }) => {
  useEffect(() => {
    // Update Title
    document.title = title;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update HTML Lang Attribute (Crucial for SEO & Accessibility)
    document.documentElement.lang = lang;

  }, [title, description, lang]);

  return null;
};

export default SEO;
