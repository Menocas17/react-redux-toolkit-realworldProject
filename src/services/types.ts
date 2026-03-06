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

export interface ArticleApiResponse {
  articles: Article[];
  articlesCount: number;
}

export interface TagsApiResponse {
  tags: string[];
}

export interface LoginRequest {
  user: string;
  password: string;
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

export interface User {
  username: string;
  email: string;
  bio: string | null;
  image: string | null;
  token: string;
}
