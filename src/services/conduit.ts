import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  ArticleApiResponse,
  LoginRequest,
  LoginResponse,
  TagsApiResponse,
} from './types';
import type { AuthState } from '../Features/auth/types';
import { setCredentials } from '../Features/auth/authSlice';

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

    getGlobalFeed: builder.query<ArticleApiResponse, void>({
      query: () => '/articles',
    }),

    getAllTags: builder.query<TagsApiResponse, void>({
      query: () => '/tags',
    }),

    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'users/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              token: data.user.token,
            }),
          );
        } catch (err) {
          console.error('Login Error', err);
        }
      },
    }),
  }),
});

export const { useGetGlobalFeedQuery, useGetAllTagsQuery, useLoginMutation } =
  conduitApi;
