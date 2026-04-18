import React from 'react';
import Navigation from './components/Navigation.jsx';
import ImageSequence from './components/ImageSequence.jsx';
import PearlVideoSection from './components/PearlVideoSection.jsx';
import NecklaceSection from './components/NecklaceSection.jsx';
import WearShowcaseSection from './components/WearShowcaseSection.jsx';
import BraceletMomentSection from './components/BraceletMomentSection.jsx';
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
        <WearShowcaseSection />
        <BraceletMomentSection />
        <ContentSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
