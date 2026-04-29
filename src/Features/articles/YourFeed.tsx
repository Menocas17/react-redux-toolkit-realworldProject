import { useGetOwnFeedQuery } from '../../services/conduit';
import Spinner from '../../utils/Spinner';
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

  if (isLoading) return <Spinner />;

  if (error) {
    if ('status' in error) {
      if (error.status === 401) {
        return (
          <div className='login-msg'>
            <h2>You need to log in to see your feed</h2>
            <a href='/login' className='btn btn-lg btn-primary'>
              Sign in
            </a>
          </div>
        );
      }

      return (
        <h1>
          Oops something went wrong (Error {error.status}), try reloading the
          page
        </h1>
      );
    }

    return <h1>A network error occurred. Please check your connection.</h1>;
  }

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
