import { Server } from 'http';
import app from '@/app.js';
import { env, connectDatabase, disconnectDatabase } from '@/config/index.js';

let httpServer: Server | null = null;

/**
 * Graceful shutdown handler
 *
 * Handles shutdown signals (SIGINT, SIGTERM) and ensures proper cleanup:
 * 1. Stops accepting new HTTP connections
 * 2. Waits for existing requests to complete
 * 3. Closes database connections
 * 4. Exits the process
 *
 * This prevents data corruption and ensures all resources are properly released.
 *
 * @param signal - The signal that triggered the shutdown (SIGINT, SIGTERM, etc.)
 */
const gracefulShutdown = async (signal: string): Promise<void> => {
  console.log(`\n${signal} received. Starting graceful shutdown...`);

  // Close HTTP server first (stop accepting new connections)
  if (httpServer) {
    await new Promise<void>((resolve, reject) => {
      httpServer!.close((err) => {
        if (err) {
          console.error('❌ Error closing HTTP server:', err);
          reject(err);
        } else {
          console.log('✅ HTTP server closed');
          resolve();
        }
      });
    });
  }

  // Close database connection
  try {
    await disconnectDatabase();
  } catch (error) {
    console.error('❌ Error during database disconnect:', error);
  }

  console.log('✅ Graceful shutdown complete');
  // eslint-disable-next-line no-process-exit
  process.exit(0);
};

/**
 * Setup graceful shutdown handlers
 *
 * Registers event listeners for:
 * - SIGINT: Ctrl+C in terminal
 * - SIGTERM: Termination signal from process managers (Docker, Kubernetes, etc.)
 * - uncaughtException: Unhandled synchronous errors
 * - unhandledRejection: Unhandled promise rejections
 */
const setupGracefulShutdown = (): void => {
  process.on('SIGINT', () => {
    void gracefulShutdown('SIGINT');
  });

  process.on('SIGTERM', () => {
    void gracefulShutdown('SIGTERM');
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    void gracefulShutdown('UNCAUGHT_EXCEPTION');
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    void gracefulShutdown('UNHANDLED_REJECTION');
  });
};

/**
 * Start the server
 */
const startServer = async () => {
  try {
    // Connect to database
    await connectDatabase();

    // Start Express server
    httpServer = app.listen(env.PORT, () => {
      console.log(`🚀 Server running on port ${env.PORT}`);
      console.log(`📝 Environment: ${env.NODE_ENV}`);
      console.log(`🔗 API: http://localhost:${env.PORT}/api`);
    });

    // Setup graceful shutdown handlers
    setupGracefulShutdown();

    // Handle server errors
    httpServer.on('error', (error: NodeJS.ErrnoException) => {
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
