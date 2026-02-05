import { Request, Response, NextFunction } from 'express';

interface RateLimitData {
    count: number;
    resetDate: string; // ISO Date string YYYY-MM-DD
}

class FlowMindsRateLimiter {
    private storage = new Map<string, RateLimitData>();
    private readonly LIMIT = 50;

    private getTodayString(): string {
        return new Date().toISOString().split('T')[0];
    }

    public getQuota(ip: string) {
        const today = this.getTodayString();
        let data = this.storage.get(ip);

        // If no data or date has changed, reset
        if (!data || data.resetDate !== today) {
            data = { count: 0, resetDate: today };
            this.storage.set(ip, data);
        }

        return {
            remaining: Math.max(0, this.LIMIT - data.count),
            limit: this.LIMIT,
            resetAt: new Date(new Date().setHours(24, 0, 0, 0)).toISOString() // Midnight tonight
        };
    }

    public middleware = (req: Request, res: Response, next: NextFunction) => {
        const ip = req.ip || req.socket.remoteAddress || 'unknown';
        const quota = this.getQuota(String(ip));

        if (quota.remaining <= 0) {
            res.status(429).json({
                success: false,
                error: 'Daily Limit Exceeded. You have used all 50 free requests for today. Please try again tomorrow.',
                quota
            });
            return;
        }

        // Increment count
        const today = this.getTodayString();
        const currentData = this.storage.get(String(ip))!; // getQuota guarantees it exists

        // Update storage
        this.storage.set(String(ip), {
            ...currentData,
            count: currentData.count + 1
        });

        // Add headers for client info
        res.setHeader('X-RateLimit-Limit', String(this.LIMIT));
        res.setHeader('X-RateLimit-Remaining', String(quota.remaining - 1));

        next();
    }
}

// Singleton instance
export const rateLimiter = new FlowMindsRateLimiter();
