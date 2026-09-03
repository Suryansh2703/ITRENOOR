import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import compression from "compression";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Compress responses
  app.use(compression());

  // Canonical URL redirect
  app.use((req, res, next) => {
    const host = req.get('host');
    const CANONICAL_HOST = 'https://itr-e-noor.vercel.app/';
    
    // Skip local dev
    if (!host || host === 'localhost:3000') {
      return next();
    }

    // If host is not the canonical host, redirect to it
    if (host !== CANONICAL_HOST) {
      return res.redirect(301, `https://${CANONICAL_HOST}${req.originalUrl}`);
    }
    
    next();
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, { maxAge: '1y', immutable: true }));
    app.get('*', (req, res) => {
      console.log(`Fallback: Request for ${req.path}`);
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
