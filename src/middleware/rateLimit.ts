import { rateLimit, RateLimitRequestHandler } from "express-rate-limit";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      rateLimit?: {
        limit: number;
        resetTime?: Date;
      };
    }
  }
}

const limiter: RateLimitRequestHandler = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  limit: 3, // Máximo 3 intentos por IP
  standardHeaders: true, // Agrega `RateLimit-*` headers en la respuesta
  legacyHeaders: false, // Desactiva `X-RateLimit-*` headers obsoletos

  handler: (req: Request, res: Response) => {
    if (req.rateLimit) {

      const retryAfter = Math.ceil(
        (req.rateLimit.resetTime!.getTime() - Date.now()) / 1000
      );

      res.setHeader("Retry-After", retryAfter);
      return res.status(429).json({
        error:`Demasiados intentos fallidos. Intenta nuevamente en ${retryAfter.toFixed(0)} segundos`
      });
    }
    res.status(429).json({ error: "Demasiados intentos. Intenta más tarde." });
  },
});

export default limiter;
