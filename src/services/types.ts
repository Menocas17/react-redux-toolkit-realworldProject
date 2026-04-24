export interface Article {
  slug: string;
  title: string;
  description: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string | null;
    image: string | null;
    following: boolean;
  };
}

export interface ArticleCreation {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };
}

export interface ArticleApiResponse {
  articles: Article[];
  articlesCount: number;
}

export interface TagsApiResponse {
  tags: string[];
}

export interface LoginRequest {
  user: { email: string; password: string };
}

export interface LoginResponse {
  user: {
    username: string;
    email: string;
    bio: string | null;
    image: string | null;
    token: string;
  };
}

export interface UpdateUserRequest {
  user: {
    username: string | undefined;
    email: string | undefined;
    bio: string | undefined;
    image: string | undefined;
    password: string | undefined;
  };
}

export interface User {
  username: string;
  email: string;
  bio: string | null;
  image: string | null;
  token: string;
}

export interface ConduitError {
  status: number;
  data: {
    errors: {
      [key: string]: string[];
    };
  };
}

export interface RegisterRequest {
  user: {
    username: string;
    email: string;
    password: string;
  };
}

export interface ProfileResponse {
  profile: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}

export interface PagingParams {
  username: string;
  limit: number;
  offset: number;
}
