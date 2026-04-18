import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Serves root-level assets (the `/pictures` folder and `video.mp4`)
 * directly from the project root without duplicating them into `public/`.
 *
 *   - `/pictures/*`   →  ./pictures/*
 *   - `/video.mp4`    →  ./video.mp4   (with HTTP Range support so seeking works)
 *   - `/logo.png`     →  ./logo.png
 *   - `/pearl.mp4`    →  ./pearl.mp4
 *   - `/necklace.png` →  ./necklace.png
 *   - `/male-wearing-necklace.png`   →  ./male-wearing-necklace.png
 *   - `/female-wearing-necklace.png` →  ./female-wearing-necklace.png
 *   - `/bracelet.png` →  ./bracelet.png
 *
 * On `vite build`, the same assets are copied into `dist/` so the production
 * bundle is fully self-contained.
 */
function rootAssetsPlugin() {
  const root = process.cwd();
  const picturesDir = path.resolve(root, 'pictures');
  const videoPath = path.resolve(root, 'video.mp4');
  const logoPath = path.resolve(root, 'logo.png');
  const pearlPath = path.resolve(root, 'pearl.mp4');
  const necklacePath = path.resolve(root, 'necklace.png');
  const maleWearingNecklacePath = path.resolve(root, 'male-wearing-necklace.png');
  const femaleWearingNecklacePath = path.resolve(
    root,
    'female-wearing-necklace.png'
  );
  const braceletPath = path.resolve(root, 'bracelet.png');

  const mimeOf = (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.png') return 'image/png';
    if (ext === '.webp') return 'image/webp';
    if (ext === '.mp4') return 'video/mp4';
    return 'image/jpeg';
  };

  /**
   * Stream a file to `res`, honoring HTTP Range requests required for
   * <video> elements to seek reliably in the browser.
   */
  const serveFile = (req, res, filePath) => {
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;
    const contentType = mimeOf(filePath);

    res.setHeader('Content-Type', contentType);
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

    if (range) {
      const match = /bytes=(\d*)-(\d*)/.exec(range);
      if (!match) {
        res.statusCode = 416;
        res.setHeader('Content-Range', `bytes */${fileSize}`);
        return res.end();
      }
      const start = match[1] ? parseInt(match[1], 10) : 0;
      const end = match[2] ? parseInt(match[2], 10) : fileSize - 1;
      if (
        isNaN(start) ||
        isNaN(end) ||
        start > end ||
        start < 0 ||
        end >= fileSize
      ) {
        res.statusCode = 416;
        res.setHeader('Content-Range', `bytes */${fileSize}`);
        return res.end();
      }
      res.statusCode = 206;
      res.setHeader('Content-Range', `bytes ${start}-${end}/${fileSize}`);
      res.setHeader('Content-Length', end - start + 1);
      return fs.createReadStream(filePath, { start, end }).pipe(res);
    }

    res.setHeader('Content-Length', fileSize);
    fs.createReadStream(filePath).pipe(res);
  };

  return {
    name: 'serve-root-assets',
    configureServer(server) {
      // /pictures/*  →  ./pictures/*
      server.middlewares.use('/pictures', (req, res, next) => {
        try {
          const rel = decodeURIComponent((req.url || '').split('?')[0]);
          const filePath = path.join(picturesDir, rel);
          if (!filePath.startsWith(picturesDir)) return next();
          if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile())
            return next();
          serveFile(req, res, filePath);
        } catch (err) {
          next(err);
        }
      });

      // /video.mp4  →  ./video.mp4
      server.middlewares.use('/video.mp4', (req, res, next) => {
        try {
          if (!fs.existsSync(videoPath)) return next();
          serveFile(req, res, videoPath);
        } catch (err) {
          next(err);
        }
      });

      // /logo.png  →  ./logo.png
      server.middlewares.use('/logo.png', (req, res, next) => {
        try {
          if (!fs.existsSync(logoPath)) return next();
          serveFile(req, res, logoPath);
        } catch (err) {
          next(err);
        }
      });

      // /pearl.mp4  →  ./pearl.mp4
      server.middlewares.use('/pearl.mp4', (req, res, next) => {
        try {
          if (!fs.existsSync(pearlPath)) return next();
          serveFile(req, res, pearlPath);
        } catch (err) {
          next(err);
        }
      });

      // /necklace.png  →  ./necklace.png
      server.middlewares.use('/necklace.png', (req, res, next) => {
        try {
          if (!fs.existsSync(necklacePath)) return next();
          serveFile(req, res, necklacePath);
        } catch (err) {
          next(err);
        }
      });

      server.middlewares.use('/male-wearing-necklace.png', (req, res, next) => {
        try {
          if (!fs.existsSync(maleWearingNecklacePath)) return next();
          serveFile(req, res, maleWearingNecklacePath);
        } catch (err) {
          next(err);
        }
      });

      server.middlewares.use(
        '/female-wearing-necklace.png',
        (req, res, next) => {
          try {
            if (!fs.existsSync(femaleWearingNecklacePath)) return next();
            serveFile(req, res, femaleWearingNecklacePath);
          } catch (err) {
            next(err);
          }
        }
      );

      server.middlewares.use('/bracelet.png', (req, res, next) => {
        try {
          if (!fs.existsSync(braceletPath)) return next();
          serveFile(req, res, braceletPath);
        } catch (err) {
          next(err);
        }
      });
    },

    /**
     * After build, copy the source assets into `dist/` so `vite preview`
     * and any static host can serve them at the same URLs.
     */
    closeBundle() {
      const outDir = path.resolve(root, 'dist');
      if (!fs.existsSync(outDir)) return;

      // /pictures (optional kept as a fallback / future use)
      if (fs.existsSync(picturesDir)) {
        const dstPics = path.join(outDir, 'pictures');
        fs.mkdirSync(dstPics, { recursive: true });
        for (const file of fs.readdirSync(picturesDir)) {
          const s = path.join(picturesDir, file);
          const d = path.join(dstPics, file);
          if (fs.statSync(s).isFile()) fs.copyFileSync(s, d);
        }
      }

      // /video.mp4
      if (fs.existsSync(videoPath)) {
        fs.copyFileSync(videoPath, path.join(outDir, 'video.mp4'));
      }

      if (fs.existsSync(logoPath)) {
        fs.copyFileSync(logoPath, path.join(outDir, 'logo.png'));
      }

      if (fs.existsSync(pearlPath)) {
        fs.copyFileSync(pearlPath, path.join(outDir, 'pearl.mp4'));
      }

      if (fs.existsSync(necklacePath)) {
        fs.copyFileSync(necklacePath, path.join(outDir, 'necklace.png'));
      }

      if (fs.existsSync(maleWearingNecklacePath)) {
        fs.copyFileSync(
          maleWearingNecklacePath,
          path.join(outDir, 'male-wearing-necklace.png')
        );
      }

      if (fs.existsSync(femaleWearingNecklacePath)) {
        fs.copyFileSync(
          femaleWearingNecklacePath,
          path.join(outDir, 'female-wearing-necklace.png')
        );
      }

      if (fs.existsSync(braceletPath)) {
        fs.copyFileSync(braceletPath, path.join(outDir, 'bracelet.png'));
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), rootAssetsPlugin()],
  server: {
    host: true,
    port: 5173,
  },
});
