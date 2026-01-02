import { type Server } from "node:http";

import express, { type Express, type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { storage } from "./storage";

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export const app = express();

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}
app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Visitor tracking middleware
app.use(async (req, res, next) => {
  // Only track non-API routes and non-static files
  if (!req.path.startsWith("/api") && !req.path.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)) {
    try {
      const forwardedFor = req.headers['x-forwarded-for'];
      const ip = (Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor) || req.ip || req.socket.remoteAddress || null;
      
      // Check if this IP has a recent visit (within 10 minutes)
      const hasRecent = await storage.hasRecentVisitor(ip);
      
      if (!hasRecent) {
        const ua = req.headers['user-agent'];
        const userAgent = (Array.isArray(ua) ? ua[0] : ua) || null;
        
        const ref = req.headers['referer'] || req.headers['referrer'];
        const referrer = (Array.isArray(ref) ? ref[0] : ref) || null;
        
        // Simple device detection from user agent
        let device = 'unknown';
        if (userAgent) {
          if (/mobile/i.test(userAgent)) {
            device = 'mobile';
          } else if (/tablet|ipad/i.test(userAgent)) {
            device = 'tablet';
          } else {
            device = 'desktop';
          }
        }

        // Save visitor data (don't await to avoid slowing down the request)
        storage.createVisitor({
          ip: ip || null,
          country: null, // Can be enhanced with GeoIP service later
          device,
          userAgent,
          referrer,
        }).catch(err => {
          // Silently log errors to avoid breaking the app
          console.error('Error tracking visitor:', err);
        });
      }
    } catch (error) {
      // Continue even if tracking fails
      console.error('Visitor tracking error:', error);
    }
  }
  
  next();
});

export default async function runApp(
  setup: (app: Express, server: Server) => Promise<void>,
) {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly run the final setup after setting up all the other routes so
  // the catch-all route doesn't interfere with the other routes
  await setup(app, server);

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
}
