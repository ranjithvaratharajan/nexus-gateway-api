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

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default app;
