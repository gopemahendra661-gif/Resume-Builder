import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Analyzer } from './pages/Analyzer';
import { Builder } from './pages/Builder';

function App() {
  // Simple state-based routing since we don't need deep links for this SPA
  const [currentPage, setCurrentPage] = useState<'analyzer' | 'builder'>('analyzer');

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {currentPage === 'analyzer' ? <Analyzer /> : <Builder />}
    </Layout>
  );
}

export default App;
