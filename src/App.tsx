import React, { useState } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import Customer360 from './components/Customer360';
import Chat from './components/Chat';
import Skills from './components/Skills';
import Extract from './components/Extract';
import VisitAI from './components/VisitAI';
import ProductPoolDetail from './components/ProductPoolDetail';
import { PageId } from './types';

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home onNavigate={setActivePage} />;
      case 'customer':
        return <Customer360 onNavigate={setActivePage} />;
      case 'chat':
        return <Chat />;
      case 'skills':
        return <Skills onNavigate={setActivePage} />;
      case 'extract':
        return <Extract onNavigate={setActivePage} />;
      case 'visit-ai':
        return <VisitAI onNavigate={setActivePage} />;
      case 'product-pool':
        return <ProductPoolDetail onNavigate={setActivePage} />;
      default:
        return <Home onNavigate={setActivePage} />;
    }
  };

  return (
    <Layout activePage={activePage} onPageChange={setActivePage}>
      {renderPage()}
    </Layout>
  );
}
