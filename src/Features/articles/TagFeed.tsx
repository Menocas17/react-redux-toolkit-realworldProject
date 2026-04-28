import { useGetTagFeedQuery } from '../../services/conduit';
import ArticleList from './ArticleList';
import { useAppSelector } from '../../store/hooks';
import { useState } from 'react';

export default function TagFeed() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const offset = (currentPage - 1) * limit;
  const selectedTag = useAppSelector((state) => state.feed.tag);
  const {
    data: tagFeed,
    error,
    isLoading,
  } = useGetTagFeedQuery({ tag: selectedTag, limit, offset });

  if (isLoading) return <h1>The feed is loading</h1>;

  if (error) return <h1>Opps something went wrong, try relodign the page</h1>;

  const articles = tagFeed?.articles;
  const totalPages = Math.ceil((tagFeed?.articlesCount ?? 0) / limit);

  if (!articles || articles.length === 0)
    return (
      <h2 className='no-articles'>
        Looks like there is no articles with this tag anymore, try later!
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
