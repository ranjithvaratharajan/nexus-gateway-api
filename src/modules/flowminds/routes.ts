import { Router } from 'express';
import { FlowMindsController } from './controllers/flowminds.controller';
import { FlowMindsService } from './services/flowminds.service';
import { GeminiProvider } from '../../core/ai/GeminiProvider';
import { config } from '../../config/env';

const router = Router();

// Dependency Injection
// Note: In a larger app, use a DI container (e.g., InversifyJS)
const getApiKey = () => config.FLOWMINDS_GEMINI_KEY || config.GLOBAL_GEMINI_KEY || '';

router.post('/generate', async (req, res) => {
    try {
        const apiKey = getApiKey();
        if (!apiKey) {
            return res.status(500).json({
                success: false,
                error: "Missing API Key. Please set FLOWMINDS_GEMINI_KEY in environment variables."
            });
        }

        const aiProvider = new GeminiProvider(apiKey);
        const service = new FlowMindsService(aiProvider);
        const controller = new FlowMindsController(service);

        await controller.generate(req, res);
    } catch (error: any) {
        console.error('Route error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
