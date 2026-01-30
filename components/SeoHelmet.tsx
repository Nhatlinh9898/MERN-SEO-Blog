import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoHelmetProps {
  title?: string;
  description?: string;
  keywords?: string[];
  imageUrl?: string;
  slug?: string;
}

const SeoHelmet: React.FC<SeoHelmetProps> = ({ 
  title, 
  description, 
  keywords, 
  imageUrl, 
  slug 
}) => {
    const defaultTitle = "MERN Blog SEO - Professional Blog System";
    const defaultDescription = "A high-performance blog application built with the MERN stack featuring advanced SEO optimization.";
    const defaultKeywords = "mern stack, react, nodejs, express, mongodb, seo, blog";
    const defaultImage = "https://via.placeholder.com/1200x630.png?text=MERN+Blog"; 
    // In a real app, use the actual domain.
    const siteUrl = window.location.origin;
    const currentUrl = `${siteUrl}${slug ? `/posts/${slug}` : ''}`;

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{title || defaultTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords ? keywords.join(', ') : defaultKeywords} />
            <link rel="canonical" href={currentUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="article" />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={title || defaultTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={imageUrl || defaultImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={currentUrl} />
            <meta property="twitter:title" content={title || defaultTitle} />
            <meta property="twitter:description" content={description || defaultDescription} />
            <meta property="twitter:image" content={imageUrl || defaultImage} />
        </Helmet>
    );
};

export default SeoHelmet;