import React from 'react';
import Navigation from './components/Navigation.jsx';
import ImageSequence from './components/ImageSequence.jsx';
import PearlVideoSection from './components/PearlVideoSection.jsx';
import NecklaceSection from './components/NecklaceSection.jsx';
import ContentSection from './components/ContentSection.jsx';
import CTASection from './components/CTASection.jsx';
import Footer from './components/Footer.jsx';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <Navigation />
      <main>
        <ImageSequence />
        <PearlVideoSection />
        <NecklaceSection />
        <ContentSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
