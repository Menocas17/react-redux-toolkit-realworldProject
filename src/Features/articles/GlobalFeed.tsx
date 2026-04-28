import { useGetGlobalFeedQuery } from '../../services/conduit';
import ArticleList from './ArticleList';
import { useState } from 'react';

export default function GlobalFeed() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const offset = (currentPage - 1) * limit;

  const {
    data: globalFeed,
    error,
    isLoading,
  } = useGetGlobalFeedQuery({ limit, offset });

  if (isLoading) return <h1>The feed is loading</h1>;

  if (error) return <h1>Opps something went wrong, try relodign the page</h1>;

  const articles = globalFeed?.articles;
  const totalPages = Math.ceil((globalFeed?.articlesCount ?? 0) / limit);

  if (!articles || articles.length === 0)
    return (
      <h2 className='no-articles'>
        Looks like there is no articles right now, try reloading or visit later.
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
