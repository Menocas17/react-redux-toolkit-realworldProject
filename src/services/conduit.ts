import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  ArticleApiResponse,
  LoginResponse,
  TagsApiResponse,
} from './types';
import type { AuthState } from '../Features/auth/types';

interface PartialState {
  auth: AuthState;
}

export const conduitApi = createApi({
  reducerPath: 'conduitApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_CONDUIT_API,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as PartialState).auth.token;
      if (token) {
        headers.set('Authorization', `Token ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMe: builder.query<{ user: LoginResponse }, void>({
      query: () => 'user',
    }),

    getGlobalFeed: builder.query<ArticleApiResponse, void>({
      query: () => '/articles',
    }),

    getAllTags: builder.query<TagsApiResponse, void>({
      query: () => '/tags',
    }),
  }),
});

export const { useGetGlobalFeedQuery, useGetAllTagsQuery } = conduitApi;
