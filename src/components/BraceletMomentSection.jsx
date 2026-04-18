import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './BraceletMomentSection.css';

gsap.registerPlugin(ScrollTrigger);

const BRACELET_IMG = '/bracelet.png';

export default function BraceletMomentSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.bracelet__header > *', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.bracelet__header',
          start: 'top 84%',
        },
      });

      gsap.from('.bracelet__frame', {
        y: 52,
        opacity: 0,
        duration: 1.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.bracelet__visual',
          start: 'top 86%',
        },
      });

      gsap.from('.bracelet__copy', {
        y: 32,
        opacity: 0,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.bracelet__copy',
          start: 'top 82%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="bracelet"
      ref={sectionRef}
      className="bracelet"
      aria-labelledby="bracelet-heading"
    >
      <div className="bracelet__inner">
        <header className="bracelet__header">
          <p className="bracelet__kicker">Bracelet</p>
          <h2 id="bracelet-heading" className="bracelet__title">
            Golden South Sea, <em>at the wrist</em>
          </h2>
          <p className="bracelet__deck">
            Shell in hand, stacked pearls—South Sea gold with a white-pearl
            strand, soft palms and sky behind.
          </p>
        </header>

        <div className="bracelet__grid">
          <div className="bracelet__visual">
            <div className="bracelet__glow" aria-hidden="true" />
            <figure className="bracelet__frame">
              <img
                src={BRACELET_IMG}
                alt="Hands with stacked pearl bracelets holding a cream seashell, tropical background"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>

          <p className="bracelet__copy">
            Wrist stacks like this are part of how I wear and show my own
            pieces—email me if you want something similar.
          </p>
        </div>
      </div>
    </section>
  );
}
