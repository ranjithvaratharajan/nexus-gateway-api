import app from './app';
import { config } from './config/env';

const startServer = async () => {
    try {
        const port = process.env.PORT || config.PORT;
        app.listen(port, () => {
            console.log(`🚀 Nexus Gateway is running on port ${port}`);
            console.log(`👉 Health Check: http://localhost:${port}/health`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
