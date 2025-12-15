import { describe, it, expect } from 'vitest';
import { store } from '../store';
import { api } from '../api';

describe('Redux Store', () => {
  it('should have the correct initial state structure', () => {
    const state = store.getState();

    // Verify the API reducer is registered
    expect(state).toHaveProperty(api.reducerPath);
  });

  it('should have the correct reducer path', () => {
    expect(api.reducerPath).toBe('api');
  });

  it('should have dispatch function', () => {
    expect(store.dispatch).toBeDefined();
    expect(typeof store.dispatch).toBe('function');
  });

  it('should have getState function', () => {
    expect(store.getState).toBeDefined();
    expect(typeof store.getState).toBe('function');
  });
});
