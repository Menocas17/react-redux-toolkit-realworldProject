import { http, HttpResponse } from 'msw';

const API_URL = import.meta.env.VITE_CONDUIT_API;

export const handlers = [
  http.get(`${API_URL}/tags`, () => {
    return HttpResponse.json({
      tags: ['react', 'testing', 'senior'],
    });
  }),

  http.get(`${API_URL}/articles`, () => {
    return HttpResponse.json({
      articles: [
        {
          slug: 'test-article',
          title: 'How to Test React Apps',
          description: 'A comprehensive guide.',
          tagList: ['react', 'testing'],
          createdAt: '2026-03-04T00:00:00.000Z',
          updatedAt: '2026-03-04T00:00:00.000Z',
          favorited: false,
          favoritesCount: 10,
          author: {
            username: 'testuser',
            bio: 'I love tests',
            image: 'https://i.imgur.com/Qr71crq.jpg',
            following: false,
          },
        },
      ],
      articlesCount: 1,
    });
  }),
];
