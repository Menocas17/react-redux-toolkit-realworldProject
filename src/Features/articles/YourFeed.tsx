import { useGetOwnFeedQuery } from '../../services/conduit';
import ArticleList from './ArticleList';
import { useState } from 'react';

export default function OwnFeed() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const offset = (currentPage - 1) * limit;
  const {
    data: ownFeed,
    error,
    isLoading,
  } = useGetOwnFeedQuery({ limit, offset });

  //TODO - add skeleton for the feed

  if (isLoading) return <h1>The feed is loading</h1>;

  if (error) return <h1>Opps something went wrong, try relodign the page</h1>;

  const articles = ownFeed?.articles;
  const totalPages = Math.ceil((ownFeed?.articlesCount ?? 0) / limit);

  if (!articles || articles.length === 0)
    return (
      <h2 className='no-articles'>
        You don't follow any user yet, explore the global feed and find new
        people!
      </h2>
    );

  return (
    <>
      <ArticleList articles={articles} />
      <ul className='pagination'>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? 'active' : ''}`}
          >
            <a className='page-link' onClick={() => setCurrentPage(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
