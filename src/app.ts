import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import flowMindsRoutes from './modules/flowminds/routes';
import loveLedgerRoutes from './modules/loveledger/routes';

const app = express();

// Global Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
// Modular route mounting
app.use('/api/v1/flowminds', flowMindsRoutes);
app.use('/api/v1/loveledger', loveLedgerRoutes);

// Root landing page
app.get('/', (req, res) => {
    res.json({
        name: "Nexus Gateway API",
        message: "Welcome to the Nexus Gateway. The API is operational.",
        version: "1.0.0",
        endpoints: {
            health: "/health",
            api_v1: "/api/v1"
        }
    });
});

// API Info
app.get('/api', (req, res) => {
    res.json({
        message: "Nexus Gateway API v1",
        base_path: "/api/v1",
        available_modules: ["flowminds", "loveledger"]
    });
});

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default app;
