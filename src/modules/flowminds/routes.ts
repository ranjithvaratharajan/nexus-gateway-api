import { Router } from 'express';
import { FlowMindsController } from './controllers/flowminds.controller';
import { FlowMindsService } from './services/flowminds.service';
import { GeminiProvider } from '../../core/ai/GeminiProvider';
import { config } from '../../config/env';

const router = Router();

// Dependency Injection
// Note: In a larger app, use a DI container (e.g., InversifyJS)
const apiKey = config.FLOWMINDS_GEMINI_KEY || config.GLOBAL_GEMINI_KEY || ''; // Fallback
const aiProvider = new GeminiProvider(apiKey);
const service = new FlowMindsService(aiProvider);
const controller = new FlowMindsController(service);

router.post('/generate', controller.generate);

export default router;
