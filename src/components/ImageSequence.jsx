import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ImageSequence.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Served from the project root via Vite middleware (HTTP Range) in vite.config.js.
 */
const VIDEO_URL = '/video.mp4';

export default function ImageSequence() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const kickerRef = useRef(null);
  const founderRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const hintRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;
    let started = false;

    const onProgress = () => {
      if (cancelled || !video.duration) return;
      const b = video.buffered;
      if (b.length > 0) {
        const end = b.end(b.length - 1);
        setProgress(Math.max(0, Math.min(1, end / video.duration)));
      }
    };

    const onReady = async () => {
      if (cancelled || started) return;
      started = true;
      setProgress(1);
      setReady(true);
      try {
        await video.play();
      } catch {
        /* autoplay blocked until user gesture */
      }
    };

    video.addEventListener('progress', onProgress);
    video.addEventListener('loadedmetadata', onProgress);
    video.addEventListener('canplaythrough', onReady, { once: true });
    const fallback = () => {
      if (!cancelled) onReady();
    };
    video.addEventListener('loadeddata', fallback, { once: true });

    if (video.readyState >= 3) onReady();
    else video.load();

    return () => {
      cancelled = true;
      video.removeEventListener('progress', onProgress);
      video.removeEventListener('loadedmetadata', onProgress);
      video.removeEventListener('canplaythrough', onReady);
      video.removeEventListener('loadeddata', fallback);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;

    const section = sectionRef.current;
    const overlay = overlayRef.current;
    const kicker = kickerRef.current;
    const founder = founderRef.current;
    const title = titleRef.current;
    const sub = subRef.current;
    const hint = hintRef.current;
    if (!section || !overlay || !kicker || !founder || !title || !sub || !hint)
      return;

    const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
    intro
      .from(kicker, { y: 24, opacity: 0, duration: 1.1 }, 0)
      .from(founder, { y: 18, opacity: 0, duration: 0.95 }, 0.08)
      .from(title, { y: 40, opacity: 0, duration: 1.3 }, 0.12)
      .from(sub, { y: 24, opacity: 0, duration: 1.1 }, 0.38)
      .from(hint, { y: 16, opacity: 0, duration: 1, delay: 0.1 }, 0.58);

    const overlayTween = gsap.to(overlay, {
      opacity: 0,
      y: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    const hintTween = gsap.to(hint, {
      opacity: 0,
      y: 40,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'top+=25%',
        scrub: true,
      },
    });

    return () => {
      overlayTween.scrollTrigger?.kill();
      overlayTween.kill();
      hintTween.scrollTrigger?.kill();
      hintTween.kill();
      intro.kill();
    };
  }, [ready]);

  const percent = Math.round(progress * 100);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="sequence"
      aria-label="Golden South Sea Pearl cinematic reveal"
    >
      <video
        ref={videoRef}
        className="sequence__video-bg"
        src={VIDEO_URL}
        preload="auto"
        muted
        loop
        autoPlay
        playsInline
        disablePictureInPicture
        aria-hidden="true"
        tabIndex={-1}
      />

      <div className="sequence__vignette" aria-hidden="true" />

      <div
        ref={overlayRef}
        className={`sequence__overlay ${ready ? 'is-ready' : ''}`}
      >
        <p ref={kickerRef} className="sequence__kicker">
          <span className="sequence__dot" aria-hidden="true" />
          Golden South Sea Pearl
        </p>
        <p ref={founderRef} className="sequence__founder">
          Founded by Ivan Tumacay
        </p>
        <h1 ref={titleRef} className="sequence__title">
          The <em>Queen</em>
          <br /> of Pearls
        </h1>
        <p ref={subRef} className="sequence__sub">
          Personal pieces from my own Golden South Sea Pearl collection from
          the warm Philippine seas I love.
        </p>

        <div ref={hintRef} className="sequence__hint" aria-hidden="true">
          <span>Scroll to explore</span>
          <span className="sequence__hint-line" />
        </div>
      </div>

      {!ready && (
        <div className="sequence__loader" role="status" aria-live="polite">
          <div className="sequence__loader-label">
            Loading scene {percent}%
          </div>
          <div className="sequence__loader-bar">
            <div
              className="sequence__loader-fill"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
