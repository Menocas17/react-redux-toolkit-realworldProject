import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  Article,
  ArticleApiResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  TagsApiResponse,
  ProfileResponse,
  PagingParams,
  ArticleCreation,
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

  tagTypes: ['user', 'articles', 'profile'],
  endpoints: (builder) => ({
    getMe: builder.query<LoginResponse, void>({
      query: () => 'user',
      providesTags: ['user'],
    }),

    getProfile: builder.query<ProfileResponse, string>({
      query: (username) => `profiles/${username}`,
      providesTags: ['profile'],
    }),

    getAllTags: builder.query<TagsApiResponse, void>({
      query: () => '/tags',
    }),

    getGlobalFeed: builder.query<ArticleApiResponse, void>({
      query: () => '/articles',
      providesTags: (result) =>
        result
          ? [
              ...result.articles.map(({ slug }: { slug: string }) => ({
                type: 'articles' as const,
                id: slug,
              })),

              { type: 'articles', id: 'LIST' },
            ]
          : [{ type: 'articles', id: 'LIST' }],
    }),

    getProfileArticles: builder.query<ArticleApiResponse, PagingParams>({
      query: ({ username, limit, offset }) =>
        `/articles?author=${username}&limit=${limit}&offset=${offset}`,
      providesTags: (result) =>
        result
          ? [
              ...result.articles.map(({ slug }: { slug: string }) => ({
                type: 'articles' as const,
                id: slug,
              })),
              { type: 'articles', id: 'LIST' },
            ]
          : [{ type: 'articles', id: 'LIST' }],
    }),

    getProfileFavArticles: builder.query<ArticleApiResponse, PagingParams>({
      query: ({ username, limit, offset }) =>
        `/articles?favorited=${username}&limit=${limit}&offset=${offset}`,
      providesTags: (result) =>
        result
          ? [
              ...result.articles.map(({ slug }: { slug: string }) => ({
                type: 'articles' as const,
                id: slug,
              })),
              { type: 'articles', id: 'LIST' },
            ]
          : [{ type: 'articles', id: 'LIST' }],
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

    favorite: builder.mutation<Article, string>({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: 'POST',
      }),

      invalidatesTags: (result, error, arg) => [{ type: 'articles', id: arg }],
    }),

    unFavorite: builder.mutation<Article, string>({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: 'DELETE',
      }),

      invalidatesTags: (result, error, arg) => [{ type: 'articles', id: arg }],
    }),

    addArticle: builder.mutation<Article, ArticleCreation>({
      query: (article) => ({
        url: 'articles',
        method: 'POST',
        body: article,
      }),
      invalidatesTags: [{ type: 'articles', id: 'LIST' }],
    }),

    followUser: builder.mutation<ProfileResponse, string>({
      query: (username) => ({
        url: `profiles/${username}/follow`,
        method: 'POST',
      }),
      invalidatesTags: ['profile'],
    }),

    UnFollowUser: builder.mutation<ProfileResponse, string>({
      query: (username) => ({
        url: `profiles/${username}/follow`,
        method: 'DELETE',
      }),
      invalidatesTags: ['profile'],
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
  useGetProfileFavArticlesQuery,
  useFavoriteMutation,
  useUnFavoriteMutation,
  useAddArticleMutation,
  useFollowUserMutation,
  useUnFollowUserMutation,
} = conduitApi;
