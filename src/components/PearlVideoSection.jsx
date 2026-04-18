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
      className="pearl-strip"
      aria-label="Golden South Sea Pearl in motion"
    >
      <div className="pearl-strip__inner">
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
    </section>
  );
}
