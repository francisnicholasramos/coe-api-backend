import {rateLimit} from "express-rate-limit";

export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 200, // 200 overall requests per IP
    standardHeaders: true, // Shows RateLimit-* headers
    legacyHeaders: false
})

export const authLogInLimiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    limit: 5,
    skipSuccessfulRequests: true,
    message: { message: "Too many login attempts. Try again in 2 minutes." }
})

export const authSignInLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 3,
    message: { message: "Request blocked. rate limit reached." }
})

export const writeLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes
    limit: 15,
    message: { message: "Request blocked: rate limit reached." }
})

export const commentLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes
    limit: 30,
    message: { message: "Request blocked: rate limit reached." }
})
