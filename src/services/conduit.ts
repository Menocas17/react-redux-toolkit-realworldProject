import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ArticleApiResponse } from './types';

export const conduitApi = createApi({
  reducerPath: 'conduitApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_CONDUIT_API }),
  endpoints: (builder) => ({
    getGlobalFeed: builder.query<ArticleApiResponse, void>({
      query: () => '/articles',
    }),
  }),
});

export const { useGetGlobalFeedQuery } = conduitApi;
