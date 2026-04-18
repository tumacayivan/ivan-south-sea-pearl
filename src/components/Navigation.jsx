import React, { useEffect, useState } from 'react';
import { contactMailto } from '../contact.js';
import './Navigation.css';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <a className="nav__brand" href="#top" aria-label="Golden South Sea Pearl home">
          {/* <img
            className="nav__logo"
            src="/logo.png"
            alt=""
            width={36}
            height={36}
            decoding="async"
          /> */}
          <span className="nav__name">Golden South Sea Pearl</span>
        </a>
        <nav className="nav__links" aria-label="Primary">
          <a href="#story">The Pearl</a>
          <a href="#jewelry">Jewelry</a>
          <a href="#wear">Worn</a>
          {/* <a href="#bracelet">Bracelet</a> */}
          <a href="#heritage">Heritage</a>
          <a href="#pieces">Pieces</a>
        </nav>
        <a className="nav__cta" href={contactMailto()}>
          Email me
        </a>
      </div>
    </header>
  );
}
