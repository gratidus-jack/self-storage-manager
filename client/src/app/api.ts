import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base API configuration for RTK Query
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Unit', 'Tenant', 'Payment', 'Dashboard'],
  endpoints: () => ({}),
});
