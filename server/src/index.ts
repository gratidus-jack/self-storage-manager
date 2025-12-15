import app from '@/app.js';
import { env, connectDatabase, setupGracefulShutdown } from '@/config/index.js';

/**
 * Start the server
 */
const startServer = async () => {
  try {
    // Connect to database
    await connectDatabase();

    // Setup graceful shutdown handlers
    setupGracefulShutdown();

    // Start Express server
    const server = app.listen(env.PORT, () => {
      console.log(`🚀 Server running on port ${env.PORT}`);
      console.log(`📝 Environment: ${env.NODE_ENV}`);
      console.log(`🔗 API: http://localhost:${env.PORT}/api`);
    });

    // Handle server errors
    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${env.PORT} is already in use`);
      } else {
        console.error('❌ Server error:', error);
      }
      // eslint-disable-next-line no-process-exit
      process.exit(1);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
};

// Start the server
void startServer();
