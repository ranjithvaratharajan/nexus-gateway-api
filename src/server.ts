import app from './app';
import { config } from './config/env';

const startServer = async () => {
    try {
        app.listen(config.PORT, () => {
            console.log(`🚀 Nexus Gateway is running on port ${config.PORT}`);
            console.log(`👉 FlowMinds Module: http://localhost:${config.PORT}/api/v1/flowminds/generate`);
            console.log(`👉 LoveLedger Module: http://localhost:${config.PORT}/api/v1/loveledger/status`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
