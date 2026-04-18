import React from 'react';
import { CONTACT_EMAIL, contactMailto } from '../contact.js';
import './Footer.css';

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <img
            className="footer__logo"
            src="/logo.png"
            alt=""
            width={36}
            height={36}
            decoding="async"
          />
          <div>
            <p className="footer__name">Golden South Sea Pearl</p>
            <p className="footer__tagline">Founded by Ivan Tumacay</p>
            <p className="footer__note">
              Personal pieces only my own collection. If you would like to
              reach out personally, you can email me at{' '}
              <a href={contactMailto()} className="footer__email">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>
        </div>
        <p className="footer__legal">© {new Date().getFullYear()} Ivan Tumacay</p>
      </div>
    </footer>
  );
}
