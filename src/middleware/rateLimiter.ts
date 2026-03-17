import {rateLimit} from "express-rate-limit";

export const authLogInLimiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    limit: 5,
    skipSuccessfulRequests: true,
    message: { message: "Too many login attempts. Try again in 2 minutes." }
})

export const authSignInLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 5,
    message: { message: "Request blocked. rate limit reached." }
})

export const writeLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes
    limit: 15,
    message: { message: "Request blocked: rate limit reached." }
})

export const likeLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 20,
    message: { message: "Request blocked: rate limit reached." }
})

export const commentLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes
    limit: 30,
    message: { message: "Request blocked: rate limit reached." }
})
