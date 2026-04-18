# Aurum Maris The Golden South Sea Pearl

A cinematic, scroll-driven single-page React experience built around a
15-second 1440×1440 video of the Philippine Golden South Sea Pearl. Uses
**GSAP + ScrollTrigger** to scrub the video on a `<canvas>` element while the
hero section is pinned, then releases into a luxurious editorial narrative.

## Stack

- **React 18** (functional components + hooks)
- **GSAP 3** with the **ScrollTrigger** plugin
- **Vite 5** for blazing dev + production builds
- Vanilla CSS, design-token driven (`:root` variables)
- Fonts: **Playfair Display** + **Inter** (Google Fonts)

## Running locally

```bash
npm install
npm run dev
```

Visit http://localhost:5173.

### Production build

```bash
npm run build
npm run preview
```

The build copies `video.mp4` (and the `pictures/` folder, as a fallback) into
`dist/` so the output is fully self-contained.

## How the scroll-scrub works

`src/components/ImageSequence.jsx` owns the animation:

1. **Preload** the `<video>` element buffers `video.mp4` and drives a
   progress bar based on `video.buffered`.
2. **Prime** once ready, we call `video.play()` then immediately `pause()`.
   This unlocks `currentTime` seeking on iOS Safari (which otherwise ignores
   programmatic seeks until the video has been played at least once).
3. **Canvas render** each frame is copied to a retina-aware canvas with a
   "cover" fit (`devicePixelRatio` capped at 2 for performance).
4. **ScrollTrigger** a pinned trigger with `scrub: 0.6`, `start: "top top"`,
   `end: "+=2600"` maps scroll progress to a target timestamp in the video.
5. **Smoothing** a GSAP ticker loop lerps the currently-seeked time toward
   the scroll-driven target (`current += (target - current) * 0.18`) so
   scrubs feel buttery even on fast flicks, then redraws the canvas.
6. **Overlay** the hero headline has an entrance timeline plus a
   scrub-linked parallax tween so the text elegantly drifts up and fades as
   the pearl takes over the screen.

### Why Range-request support matters

`vite.config.js` includes a small custom middleware that serves `video.mp4`
with `Accept-Ranges: bytes` and handles HTTP Range requests, which is what
makes `<video>` seeking work reliably a plain `createReadStream(...).pipe(res)`
would stream the whole file on every seek, which browsers interpret as an
unseekable stream.

## Swap in your own video

Replace `video.mp4` at the project root with any `.mp4` and you're done. For
best scrubbing quality on long videos, re-encode with a short keyframe
interval so seeks land precisely:

```bash
ffmpeg -i source.mp4 \
  -c:v libx264 -preset slow -crf 20 \
  -g 24 -keyint_min 24 \          # keyframe every frame at 24 fps
  -movflags +faststart \
  -an video.mp4
```

If you want to tune the scroll pacing, change `SCRUB_DISTANCE` at the top of
`ImageSequence.jsx` (default 2600 px).

## Project layout

```
ivan-south-sea-pearl/
├── video.mp4                   # scrubbed in the hero
├── pictures/                   # (optional fallback frames)
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── components/
│       ├── Navigation.jsx
│       ├── ImageSequence.jsx   ← the scroll-scrub (video → canvas)
│       ├── ContentSection.jsx
│       ├── CTASection.jsx
│       └── Footer.jsx
├── index.html
├── vite.config.js              # Range-aware video middleware
└── package.json
```
