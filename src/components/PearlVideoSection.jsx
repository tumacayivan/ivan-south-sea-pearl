import React, { useEffect, useRef } from 'react';
import './PearlVideoSection.css';

const PEARL_VIDEO_URL = '/pearl.mp4';

export default function PearlVideoSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const tryPlay = () => {
      video.play().catch(() => {});
    };
    video.addEventListener('loadeddata', tryPlay, { once: true });
    if (video.readyState >= 2) tryPlay();
    return () => video.removeEventListener('loadeddata', tryPlay);
  }, []);

  return (
    <section
      id="pearl"
      className="pearl-strip"
      aria-labelledby="pearl-strip-heading"
    >
      <div className="pearl-strip__inner">
        <div className="pearl-strip__grid">
          <div className="pearl-strip__copy">
            <p className="pearl-strip__kicker">Closer look</p>
            <h2 id="pearl-strip-heading" className="pearl-strip__title">
              One pearl in <em>slow motion</em>
            </h2>
            <p className="pearl-strip__text">
              This clip is a single Golden South Sea pearl, turning so you can
              watch light move across natural golden nacre the quiet glow that
              only comes from years in warm Philippine waters.
            </p>
          </div>

          <div className="pearl-strip__visual">
            <div className="pearl-strip__frame" aria-hidden="true">
              <video
                ref={videoRef}
                className="pearl-strip__video"
                src={PEARL_VIDEO_URL}
                preload="metadata"
                muted
                loop
                autoPlay
                playsInline
                disablePictureInPicture
                tabIndex={-1}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
