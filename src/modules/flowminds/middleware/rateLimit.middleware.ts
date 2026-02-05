import { Request, Response, NextFunction } from 'express';
import { db } from '../../../config/firebase';

const LIMIT = 50;

export const rateLimiter = {
    middleware: async (req: Request, res: Response, next: NextFunction) => {
        const today = new Date().toISOString().split('T')[0];
        const docRef = db.collection('rate_limits').doc('flowminds');

        try {
            await db.runTransaction(async (t) => {
                const doc = await t.get(docRef);
                let currentCount = 0;

                if (doc.exists) {
                    const data = doc.data();
                    if (data?.date === today) {
                        currentCount = data.count || 0;
                    }
                }

                if (currentCount >= LIMIT) {
                    throw new Error('RateLimitExceeded');
                }

                t.set(docRef, {
                    date: today,
                    count: currentCount + 1
                });
            });

            // If transaction succeeds, proceed
            // We can optionally attach info to headers, but since it's inside transaction, 
            // we don't know exact 'remaining' without reading back or calculating.
            // But we know it succeeded, so count incremented.
            next();

        } catch (error: any) {
            if (error.message === 'RateLimitExceeded') {
                res.status(429).json({
                    success: false,
                    error: 'Daily Global Limit Exceeded. The service has reached its maximum of 50 requests for today. Please try again tomorrow.'
                });
                return;
            }

            console.error('Rate Limit Error:', error);
            // On system error, we fail closed or open? 
            // Let's return 500 to be safe/explicit, or allow if critical?
            // Usually, if rate limiter fails, we might want to block to be safe, or allow to be available.
            // I'll return 500.
            res.status(500).json({
                success: false,
                error: 'Internal Server Error checking rate limit'
            });
        }
    }
};
