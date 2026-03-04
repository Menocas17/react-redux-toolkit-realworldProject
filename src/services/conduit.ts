import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ArticleApiResponse, TagsApiResponse } from './types';

export const conduitApi = createApi({
  reducerPath: 'conduitApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_CONDUIT_API }),
  endpoints: (builder) => ({
    getGlobalFeed: builder.query<ArticleApiResponse, void>({
      query: () => '/articles',
    }),

    getAllTags: builder.query<TagsApiResponse, void>({
      query: () => '/tags',
    }),
  }),
});

export const { useGetGlobalFeedQuery, useGetAllTagsQuery } = conduitApi;
