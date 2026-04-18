import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './NecklaceSection.css';

gsap.registerPlugin(ScrollTrigger);

const DETAILS = [
  {
    label: 'Pearl type',
    value: 'Golden South Sea   cultivated from Pinctada maxima.',
  },
  {
    label: 'Origin',
    value: 'Warm Philippine seas, where golden nacre develops slowly over years.',
  },
  {
    label: 'What stands out',
    value:
      'Natural golden bodycolor and orient: the soft, inner light that moves when you turn the strand.',
  },
  {
    label: 'In my collection',
    value:
      'A personal piece I wear and photograph not a catalogue SKU. Each pearl was chosen for how it sits next to its neighbors along the line.',
  },
];

export default function NecklaceSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.necklace__kicker, .necklace__title', {
        y: 44,
        opacity: 0,
        duration: 1.05,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: '.necklace__copy',
          start: 'top 82%',
        },
      });

      gsap.from('.necklace__lead, .necklace__body', {
        y: 32,
        opacity: 0,
        duration: 0.95,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: '.necklace__copy',
          start: 'top 78%',
        },
      });

      gsap.from('.necklace__detail', {
        y: 28,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.necklace__details',
          start: 'top 88%',
        },
      });

      gsap.from('.necklace__frame', {
        y: 56,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.necklace__visual',
          start: 'top 85%',
        },
      });

      gsap.fromTo(
        '.necklace__frame img',
        { scale: 1.06 },
        {
          scale: 1,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.necklace__visual',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="necklace"
      ref={sectionRef}
      className="necklace"
      aria-labelledby="necklace-heading"
    >
      <div className="necklace__inner">
        <div className="necklace__grid">

          <div className="necklace__copy">
            <p className="necklace__kicker">Featured piece</p>
            <h2 id="necklace-heading" className="necklace__title">
              The strand in <em>living gold</em>
            </h2>
            <p className="necklace__lead">
              This necklace is part of my own Golden South Sea Pearl
              collection built pearl by pearl, not as a mass-produced line.
            </p>
            <p className="necklace__body">
              South Sea strands are quiet luxury: weight at the collarbone, a
              gradient of golds when daylight moves, and that unmistakable
              depth you only get from thick nacre. The photograph is simply how
              this piece looks in real life warm, tactile, and meant to be
              worn.
            </p>

            <dl className="necklace__details">
              {DETAILS.map((row) => (
                <div className="necklace__detail" key={row.label}>
                  <dt className="necklace__detail-label">{row.label}</dt>
                  <dd className="necklace__detail-value">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="necklace__visual">
            <div className="necklace__visual-ring" aria-hidden="true" />
            <figure className="necklace__frame">
              <img
                src="/necklace.png"
                alt="Strand of golden South Sea pearls arranged as a necklace"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>

        </div>
      </div>
    </section>
  );
}
