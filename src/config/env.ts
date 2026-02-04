import dotenv from 'dotenv';
import path from 'path';

// Load .env file from the root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface Config {
    PORT: number;
    GLOBAL_GEMINI_KEY?: string;
    FLOWMINDS_GEMINI_KEY?: string;
    LOVELEDGER_DB_URL?: string;
}

const getEnv = (key: string, defaultValue?: string): string => {
    const value = process.env[key] || defaultValue;
    if (!value && defaultValue === undefined) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value!;
};

export const config: Config = {
    PORT: parseInt(getEnv('PORT', '3000'), 10),
    GLOBAL_GEMINI_KEY: process.env.GLOBAL_GEMINI_KEY,
    FLOWMINDS_GEMINI_KEY: process.env.FLOWMINDS_GEMINI_KEY,
    LOVELEDGER_DB_URL: process.env.LOVELEDGER_DB_URL,
};
