import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Analyzer } from './pages/Analyzer';
import { Builder } from './pages/Builder';
import { LandingPage } from './pages/LandingPage';
import { BlogPost } from './pages/BlogPost';
import { AdsterraPopup } from './components/AdsterraPopup';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'analyzer' | 'builder' | 'blog'>('landing');
  const [currentBlogSlug, setCurrentBlogSlug] = useState<string | undefined>(undefined);
  
  // Ad Interception State
  const [isAdOpen, setIsAdOpen] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<{
    page: 'landing' | 'analyzer' | 'builder' | 'blog';
    slug?: string;
  } | null>(null);

  // Intercept navigation to show ad
  const handleNavigate = (page: 'landing' | 'analyzer' | 'builder' | 'blog', slug?: string) => {
    // Determine if we should show ad (e.g., show on every navigation)
    setPendingNavigation({ page, slug });
    setIsAdOpen(true);
  };

  const completeNavigation = () => {
    setIsAdOpen(false);
    if (pendingNavigation) {
      setCurrentPage(pendingNavigation.page);
      if (pendingNavigation.slug) {
        setCurrentBlogSlug(pendingNavigation.slug);
      }
      window.scrollTo(0, 0);
      setPendingNavigation(null);
    }
  };

  return (
    <>
      <AdsterraPopup isOpen={isAdOpen} onClose={completeNavigation} />
      
      <Layout currentPage={currentPage} onNavigate={handleNavigate}>
        {currentPage === 'landing' && <LandingPage onNavigate={handleNavigate} />}
        {currentPage === 'analyzer' && <Analyzer />}
        {currentPage === 'builder' && <Builder />}
        {currentPage === 'blog' && currentBlogSlug && <BlogPost slug={currentBlogSlug} onNavigate={handleNavigate} />}
      </Layout>
    </>
  );
}

export default App;
