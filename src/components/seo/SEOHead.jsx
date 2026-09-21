import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCMS } from '../../context/CMSContext';

/**
 * SEOHead: Injects custom meta titles, meta descriptions, and keywords dynamically
 * based on current route from the CMSContext SEO registry.
 */
export default function SEOHead() {
  const { pathname } = useLocation();
  const { getSEO } = useCMS();

  useEffect(() => {
    try {
      const seo = getSEO(pathname);
      if (!seo) return;

      // 1. Update Document Title
      if (seo.title) {
        document.title = seo.title;
      }

      // 2. Update Meta Description
      let descTag = document.querySelector('meta[name="description"]');
      if (!descTag) {
        descTag = document.createElement('meta');
        descTag.setAttribute('name', 'description');
        document.head.appendChild(descTag);
      }
      if (seo.description) {
        descTag.setAttribute('content', seo.description);
      }

      // 3. Update Meta Keywords
      if (seo.keywords) {
        let keywordsTag = document.querySelector('meta[name="keywords"]');
        if (!keywordsTag) {
          keywordsTag = document.createElement('meta');
          keywordsTag.setAttribute('name', 'keywords');
          document.head.appendChild(keywordsTag);
        }
        keywordsTag.setAttribute('content', seo.keywords);
      }

      // 4. Update OpenGraph Tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', seo.title || document.title);

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', seo.description || '');

      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute('content', window.location.href);

      // 5. Update Canonical Link
      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.setAttribute('href', seo.canonical || window.location.href);

    } catch (err) {
      console.warn('Error updating SEO tags', err);
    }
  }, [pathname, getSEO]);

  return null;
}
