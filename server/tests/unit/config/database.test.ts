import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import mongoose from 'mongoose';
import { connectDatabase, disconnectDatabase, isDatabaseConnected } from '@/config/database.js';

// Mock mongoose
vi.mock('mongoose', () => ({
  default: {
    connect: vi.fn(),
    disconnect: vi.fn(),
    connection: {
      on: vi.fn(),
      readyState: 0,
    },
  },
}));

describe('Database Connection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('connectDatabase', () => {
    it('should connect successfully on first attempt', async () => {
      vi.mocked(mongoose.connect).mockResolvedValueOnce(mongoose as any);

      await connectDatabase();

      expect(mongoose.connect).toHaveBeenCalledTimes(1);
      expect(console.log).toHaveBeenCalledWith('✅ MongoDB connected successfully');
    });

    it('should retry with exponential backoff on failure', async () => {
      const error = new Error('Connection failed');

      // Fail twice, then succeed
      vi.mocked(mongoose.connect)
        .mockRejectedValueOnce(error)
        .mockRejectedValueOnce(error)
        .mockResolvedValueOnce(mongoose as any);

      // Mock setTimeout to avoid actual delays
      vi.useFakeTimers();

      const connectPromise = connectDatabase();

      // Fast-forward through first retry (1 second)
      await vi.advanceTimersByTimeAsync(1000);

      // Fast-forward through second retry (2 seconds)
      await vi.advanceTimersByTimeAsync(2000);

      await connectPromise;

      expect(mongoose.connect).toHaveBeenCalledTimes(3);
      expect(console.log).toHaveBeenCalledWith('✅ MongoDB connected successfully');

      vi.useRealTimers();
    });

    it('should throw error after max retries', async () => {
      const error = new Error('Connection failed');

      // Fail all attempts
      vi.mocked(mongoose.connect).mockRejectedValue(error);

      // Mock setTimeout to avoid actual delays
      vi.useFakeTimers();

      const connectPromise = connectDatabase().catch((err) => err);

      // Fast-forward through all retries
      // Retry delays: 1s, 2s, 4s, 8s, 16s
      for (let i = 0; i < 5; i++) {
        await vi.advanceTimersByTimeAsync(Math.pow(2, i) * 1000);
      }

      const result = await connectPromise;
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toBe('Connection failed');
      expect(mongoose.connect).toHaveBeenCalledTimes(5);

      vi.useRealTimers();
    });

    it('should use exponential backoff delays', async () => {
      const error = new Error('Connection failed');
      const delays: number[] = [];

      // Capture setTimeout delays
      const originalSetTimeout = global.setTimeout;
      vi.spyOn(global, 'setTimeout').mockImplementation(((callback: any, delay: number) => {
        if (delay > 0) {
          delays.push(delay);
        }
        return originalSetTimeout(callback, 0);
      }) as any);

      // Fail 3 times, then succeed
      vi.mocked(mongoose.connect)
        .mockRejectedValueOnce(error)
        .mockRejectedValueOnce(error)
        .mockRejectedValueOnce(error)
        .mockResolvedValueOnce(mongoose as any);

      await connectDatabase();

      // Verify exponential backoff: 1s, 2s, 4s
      expect(delays).toEqual([1000, 2000, 4000]);
    });
  });

  describe('disconnectDatabase', () => {
    it('should disconnect successfully', async () => {
      vi.mocked(mongoose.disconnect).mockResolvedValueOnce();

      await disconnectDatabase();

      expect(mongoose.disconnect).toHaveBeenCalledTimes(1);
      expect(console.log).toHaveBeenCalledWith('✅ MongoDB disconnected successfully');
    });

    it('should throw error on disconnect failure', async () => {
      const error = new Error('Disconnect failed');
      vi.mocked(mongoose.disconnect).mockRejectedValueOnce(error);

      await expect(disconnectDatabase()).rejects.toThrow('Disconnect failed');
      expect(console.error).toHaveBeenCalledWith('❌ Error disconnecting from MongoDB:', error);
    });
  });

  describe('isDatabaseConnected', () => {
    it('should return true when connected', () => {
      (mongoose.connection as any).readyState = 1;

      expect(isDatabaseConnected()).toBe(true);
    });

    it('should return false when not connected', () => {
      (mongoose.connection as any).readyState = 0;

      expect(isDatabaseConnected()).toBe(false);
    });
  });
});
