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
  UpdateUserRequest,
  SingleArticleResponse,
  CommentsResponse,
  singleComment,
  AddCommentRequest,
  DeleteComment,
  PaginationHome,
  UpdateArticle,
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

  tagTypes: ['user', 'articles', 'profile', 'comments', 'article', 'tags'],
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
      providesTags: ['tags'],
    }),

    getGlobalFeed: builder.query<ArticleApiResponse, Partial<PaginationHome>>({
      query: ({ limit, offset }) => `/articles?limit=${limit}&offset=${offset}`,
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

    getTagFeed: builder.query<ArticleApiResponse, Partial<PaginationHome>>({
      query: ({ tag, limit, offset }) =>
        `/articles?tag=${tag}&limit=${limit}&offset=${offset}`,
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

    getOwnFeed: builder.query<ArticleApiResponse, Partial<PaginationHome>>({
      query: ({ limit, offset }) =>
        `articles/feed?limit=${limit}&offset=${offset}`,
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

    getArticle: builder.query<SingleArticleResponse, string>({
      query: (slug) => `articles/${slug}`,
      providesTags: ['article'],
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

    getArticleComments: builder.query<CommentsResponse, string>({
      query: (slug) => `articles/${slug}/comments`,
      providesTags: ['comments'],
    }),

    addNewComment: builder.mutation<singleComment, AddCommentRequest>({
      query: (commentInfo) => ({
        url: `articles/${commentInfo.slug}/comments`,
        method: 'POST',
        body: { comment: commentInfo.comment },
      }),
      invalidatesTags: ['comments'],
    }),

    deleteComment: builder.mutation<void, DeleteComment>({
      query: (deleteComment) => ({
        url: `articles/${deleteComment.slug}/comments/${deleteComment.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['comments'],
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

    updateUser: builder.mutation<LoginResponse, Partial<UpdateUserRequest>>({
      query: (updatedInfo) => ({
        url: 'user',
        method: 'PUT',
        body: updatedInfo,
      }),
      invalidatesTags: ['user'],
    }),

    favorite: builder.mutation<Article, string>({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: 'POST',
      }),

      invalidatesTags: (result, error, arg) => [
        { type: 'articles', id: arg },
        'article',
      ],
    }),

    unFavorite: builder.mutation<Article, string>({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: 'DELETE',
      }),

      invalidatesTags: (result, error, arg) => [
        { type: 'articles', id: arg },
        'article',
      ],
    }),

    addArticle: builder.mutation<Article, ArticleCreation>({
      query: (article) => ({
        url: 'articles',
        method: 'POST',
        body: article,
      }),
      invalidatesTags: [{ type: 'articles', id: 'LIST' }, 'tags'],
    }),

    updateArticle: builder.mutation<Article, Partial<UpdateArticle>>({
      query: (article) => ({
        url: `articles/${article.slug}`,
        method: 'PUT',
        body: { article: article.article },
      }),
      invalidatesTags: [{ type: 'articles', id: 'LIST' }, 'tags'],
    }),

    deleteArticle: builder.mutation<void, string>({
      query: (slug) => ({
        url: `articles/${slug}`,
        method: 'DELETE',
      }),
    }),

    followUser: builder.mutation<ProfileResponse, string>({
      query: (username) => ({
        url: `profiles/${username}/follow`,
        method: 'POST',
      }),
      invalidatesTags: ['profile', 'article'],
    }),

    UnFollowUser: builder.mutation<ProfileResponse, string>({
      query: (username) => ({
        url: `profiles/${username}/follow`,
        method: 'DELETE',
      }),
      invalidatesTags: ['profile', 'article'],
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
  useUpdateUserMutation,
  useGetArticleQuery,
  useAddNewCommentMutation,
  useGetArticleCommentsQuery,
  useDeleteCommentMutation,
  useGetOwnFeedQuery,
  useGetTagFeedQuery,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = conduitApi;
