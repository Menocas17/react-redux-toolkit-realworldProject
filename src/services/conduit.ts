import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  ArticleApiResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  TagsApiResponse,
  ProfileResponse,
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
  tagTypes: ['user'],
  endpoints: (builder) => ({
    getMe: builder.query<LoginResponse, void>({
      query: () => 'user',
      providesTags: ['user'],
    }),

    getProfile: builder.query<ProfileResponse, string>({
      query: (username) => `profiles/${username}`,
    }),

    getGlobalFeed: builder.query<ArticleApiResponse, void>({
      query: () => '/articles',
    }),

    getAllTags: builder.query<TagsApiResponse, void>({
      query: () => '/tags',
    }),

    getProfileArticles: builder.query<ArticleApiResponse, string>({
      query: (author) => `/articles/?author=${author}`,
    }),

    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'users/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['user'],
    }),

    register: builder.mutation<LoginResponse, RegisterRequest>({
      query: (credentials) => ({
        url: 'users',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['user'],
    }),
  }),
});

export const {
  useGetGlobalFeedQuery,
  useGetAllTagsQuery,
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useGetProfileQuery,
  useGetProfileArticlesQuery,
} = conduitApi;
