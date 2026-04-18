import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ContentSection.css';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: '5', label: 'Years to form a single pearl' },
  { value: '1 in 10,000', label: 'Typical odds for a pearl this fine' },
  { value: '24k', label: 'Carat-warm, natural golden hue' },
];

const FACETS = [
  {
    eyebrow: '01 — Rarity',
    title: 'A gift of extraordinary patience',
    body:
      'The Golden South Sea Pearl is cultivated from the Pinctada maxima oyster—a species native to the tropical waters of the Philippines. Each pearl takes up to five years to lay down nacre, growing in layers of aragonite so fine they refract light from within.',
  },
  {
    eyebrow: '02 — Heritage',
    title: 'A Philippine legacy',
    body:
      'Declared by Presidential Proclamation as the Philippines’ National Gem, the Golden South Sea Pearl is steeped in the country’s maritime history. From the Sulu Sea to the pristine shores of Palawan, generations of farmers have stewarded the oyster beds that produce the world’s finest golden pearls.',
  },
  {
    eyebrow: '03 — Craft',
    title: 'The alchemy of luster',
    body:
      'What distinguishes a true South Sea pearl is its orient—the quiet shimmer beneath the surface. Held to the light, a golden pearl reveals a liquid glow unlike any metal or gem. It is, quite simply, the sea rendered into form.',
  },
];

export default function ContentSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline reveal
      gsap.from('.content__headline [data-split]', {
        y: 60,
        opacity: 0,
        stagger: 0.08,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.content__headline',
          start: 'top 82%',
        },
      });

      // Intro paragraph
      gsap.from('.content__intro', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.content__intro',
          start: 'top 85%',
        },
      });

      // Stat row staggered float-in
      gsap.from('.stat', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.stats',
          start: 'top 82%',
        },
      });

      // Each facet card + parallax headline
      gsap.utils.toArray('.facet').forEach((facet) => {
        gsap.from(facet.querySelectorAll('[data-reveal]'), {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: facet,
            start: 'top 78%',
          },
        });

        // Subtle parallax on facet titles while they're in view
        const title = facet.querySelector('.facet__title');
        if (title) {
          gsap.fromTo(
            title,
            { yPercent: 8 },
            {
              yPercent: -8,
              ease: 'none',
              scrollTrigger: {
                trigger: facet,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }
      });

      // Quote divider
      gsap.from('.content__quote', {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.content__quote',
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="story" ref={sectionRef} className="content">
      <div className="content__inner">
        <header className="content__header">
          <p className="content__eyebrow">On the Golden South Sea Pearl</p>
          <h2 className="content__headline">
            <span data-split>Born of</span>{' '}
            <span data-split>
              <em>warm seas,</em>
            </span>
            <br />
            <span data-split>shaped by</span>{' '}
            <span data-split>
              <em>time.</em>
            </span>
          </h2>
          <p className="content__intro">
            The Golden South Sea Pearl is considered among the rarest, most
            coveted organic gems in the world. Cultivated in the pristine
            waters of the Philippine archipelago, it is the only pearl that
            carries a naturally golden hue—unaltered, unenhanced—drawn
            entirely from the living oyster.
          </p>
        </header>

        <div className="stats">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat__value">{s.value}</div>
              <div className="stat__label">{s.label}</div>
            </div>
          ))}
        </div>

        <div id="heritage" className="facets">
          {FACETS.map((f) => (
            <article className="facet" key={f.eyebrow}>
              <p className="facet__eyebrow" data-reveal>
                {f.eyebrow}
              </p>
              <h3 className="facet__title" data-reveal>
                {f.title}
              </h3>
              <p className="facet__body" data-reveal>
                {f.body}
              </p>
            </article>
          ))}
        </div>

        <blockquote className="content__quote">
          <span className="content__quote-mark" aria-hidden="true">
            “
          </span>
          <p>
            The golden pearl—the Philippines offered up in a single breath—is
            a small, impossible piece of the sea, made to be worn against the
            skin.
          </p>
          <footer>— Ivan Tumacay</footer>
        </blockquote>
      </div>
    </section>
  );
}
