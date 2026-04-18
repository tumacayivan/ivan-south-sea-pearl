import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { contactMailto } from '../contact.js';
import './CTASection.css';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta__kicker, .cta__title, .cta__copy, .cta__actions', {
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: '.cta',
          start: 'top 75%',
        },
      });

      // Parallax glow
      gsap.fromTo(
        '.cta__glow',
        { yPercent: 15 },
        {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: '.cta',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="pieces" ref={sectionRef} className="cta">
      <div className="cta__glow" aria-hidden="true" />
      <div className="cta__inner">
        <p className="cta__kicker">Founded by Ivan Tumacay</p>
        <h2 className="cta__title">
          A few pieces <em>from my own</em>
          <br /> Golden South Sea Pearls.
        </h2>
        <div className="cta__copy">
          <p className="cta__body">
            Personal pieces from my own collection. If you would like to connect,
            send me an email anytime.
          </p>
          <p className="cta__body cta__body--accent">
            I can also talk through{' '}
            <strong>custom Golden South Sea Pearl jewelry</strong>
            {' '}
            — not only strands, but bracelets, earrings, rings, and other settings
            built around the pearls and the look you have in mind.
          </p>
        </div>
        <div className="cta__actions">
          <a href={contactMailto()} className="btn btn--primary">
            Email me
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </a>
          <a href="#story" className="btn btn--ghost">
            Read the story
          </a>
        </div>
      </div>
    </section>
  );
}
