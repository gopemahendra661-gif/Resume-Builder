import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Analyzer } from './pages/Analyzer';
import { Builder } from './pages/Builder';
import { LandingPage } from './pages/LandingPage';

function App() {
  // Added 'landing' to the state type and set it as default
  const [currentPage, setCurrentPage] = useState<'landing' | 'analyzer' | 'builder'>('landing');

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {currentPage === 'landing' && <LandingPage onNavigate={setCurrentPage} />}
      {currentPage === 'analyzer' && <Analyzer />}
      {currentPage === 'builder' && <Builder />}
    </Layout>
  );
}

export default App;