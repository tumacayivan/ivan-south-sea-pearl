import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WearShowcaseSection.css';

gsap.registerPlugin(ScrollTrigger);

const MALE_IMG = '/male-wearing-necklace.png';
const FEMALE_IMG = '/female-wearing-necklace.png';

const LOOKS = [
  {
    src: MALE_IMG,
    label: "Men's wear",
    alt: 'Man wearing a Golden South Sea pearl necklace at the collarbone',
  },
  {
    src: FEMALE_IMG,
    label: "Women's wear",
    alt: 'Woman wearing a Golden South Sea pearl necklace',
  },
];

export default function WearShowcaseSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.wear__header > *', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.wear__header',
          start: 'top 84%',
        },
      });

      gsap.from('.wear__card', {
        y: 48,
        opacity: 0,
        duration: 1.05,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.wear__grid',
          start: 'top 86%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="wear"
      ref={sectionRef}
      className="wear"
      aria-labelledby="wear-heading"
    >
      <div className="wear__inner">
        <header className="wear__header">
          <p className="wear__kicker">On the body</p>
          <h2 id="wear-heading" className="wear__title">
            Gold at the <em>collarbone</em>
          </h2>
          <p className="wear__intro">
            The same strand reads differently on every wearer—here is how the
            pearls sit in motion on both men and women, at ease with tailoring
            or evening dress.
          </p>
        </header>

        <div className="wear__grid">
          {LOOKS.map((item) => (
            <figure key={item.src} className="wear__card">
              <div className="wear__frame">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="wear__caption">{item.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
