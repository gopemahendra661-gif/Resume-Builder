import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Analyzer } from './pages/Analyzer';
import { Builder } from './pages/Builder';
import { LandingPage } from './pages/LandingPage';
import { BlogPost } from './pages/BlogPost';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'analyzer' | 'builder' | 'blog'>('landing');
  const [currentBlogSlug, setCurrentBlogSlug] = useState<string | undefined>(undefined);

  // Updated handler to accept optional slug
  const handleNavigate = (page: 'landing' | 'analyzer' | 'builder' | 'blog', slug?: string) => {
    setCurrentPage(page);
    if (slug) {
      setCurrentBlogSlug(slug);
      // Scroll to top when opening an article
      window.scrollTo(0, 0);
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={handleNavigate}>
      {currentPage === 'landing' && <LandingPage onNavigate={handleNavigate} />}
      {currentPage === 'analyzer' && <Analyzer />}
      {currentPage === 'builder' && <Builder />}
      {currentPage === 'blog' && currentBlogSlug && <BlogPost slug={currentBlogSlug} onNavigate={handleNavigate} />}
    </Layout>
  );
}

export default App;
