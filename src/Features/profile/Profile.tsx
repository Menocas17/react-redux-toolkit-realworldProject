import { Link } from 'react-router';
import {
  useGetMeQuery,
  useGetProfileQuery,
  useGetProfileArticlesQuery,
  useGetProfileFavArticlesQuery,
  useFollowUserMutation,
  useUnFollowUserMutation,
} from '../../services/conduit';
import { useParams } from 'react-router';
import ArticleList from '../articles/ArticleList';
import { NavLink } from 'react-router';
import { useLocation } from 'react-router';
import { useState } from 'react';
import Spinner from '../../utils/Spinner';

export default function MyProfile() {
  const { pathname } = useLocation();
  const isFavoritesPage = pathname.endsWith('/favorites');
  const { username } = useParams<{ username: string }>();

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const offset = (currentPage - 1) * limit;

  const { data: user } = useGetMeQuery();
  const { data } = useGetProfileQuery(username ?? '');
  const { data: articlesResponse, isFetching: isFetchingArticles } =
    useGetProfileArticlesQuery(
      { username: username ?? '', limit, offset },
      { skip: isFavoritesPage || !username },
    );
  const { data: favArtResponse, isFetching: isFetchingFavs } =
    useGetProfileFavArticlesQuery(
      { username: username ?? '', limit, offset },
      { skip: !isFavoritesPage },
    );

  const [followUser] = useFollowUserMutation();
  const [unFollowUser] = useUnFollowUserMutation();

  const totalArticles = isFavoritesPage
    ? favArtResponse?.articlesCount
    : articlesResponse?.articlesCount;

  const totalPages = Math.ceil((totalArticles ?? 0) / limit);

  const articleList = articlesResponse?.articles;
  const favArticleList = favArtResponse?.articles;
  const isFetching = isFetchingArticles || isFetchingFavs;

  const isOwnProfile = user?.user.username === data?.profile.username;

  return (
    <div className='profile-page'>
      <div className='user-info'>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-10 offset-md-1'>
              <img
                src={
                  data?.profile.image
                    ? data?.profile.image
                    : '/default-avatar.svg'
                }
                className='user-img'
              />
              <h4>{data?.profile.username}</h4>
              <p>
                {data?.profile.bio
                  ? data.profile.bio
                  : 'No bio yet, go to settings to add a new bio'}
              </p>

              <div className='profile-buttons'>
                {isOwnProfile ? (
                  ''
                ) : (
                  <button
                    className='btn btn-sm btn-outline-secondary action-btn'
                    onClick={
                      data?.profile.following
                        ? () => unFollowUser(data?.profile.username ?? '')
                        : () => followUser(data?.profile.username ?? '')
                    }
                  >
                    <i className='ion-plus-round'></i>
                    &nbsp; {data?.profile.following
                      ? 'Unfollow'
                      : 'Follow'}{' '}
                    {data?.profile.username}
                  </button>
                )}

                {isOwnProfile ? (
                  <Link to={'/settings'}>
                    <button className='btn btn-sm btn-outline-secondary action-btn'>
                      <i className='ion-gear-a'></i>
                      &nbsp; Edit Profile Settings
                    </button>
                  </Link>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-md-10 offset-md-1'>
            <div className='articles-toggle'>
              <ul className='nav nav-pills outline-active'>
                <li className='nav-item'>
                  <NavLink
                    end
                    className={({ isActive }) =>
                      isActive ? 'nav-link active' : 'nav-link'
                    }
                    to={`/profile/${data?.profile.username}`}
                    onClick={() => setCurrentPage(1)}
                  >
                    My Articles
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'nav-link active' : 'nav-link'
                    }
                    to={`/profile/${data?.profile.username}/favorites`}
                    onClick={() => setCurrentPage(1)}
                  >
                    Favorited Articles
                  </NavLink>
                </li>
              </ul>
            </div>
            {/* //TODO - Add the skeletons to a better UI */}
            {isFetching ? (
              <Spinner />
            ) : (
              <>
                {isFavoritesPage ? (
                  <ArticleList articles={favArticleList} />
                ) : (
                  <ArticleList articles={articleList} />
                )}
              </>
            )}
            <ul className='pagination'>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <li
                    key={page}
                    className={`page-item ${currentPage === page ? 'active' : ''}`}
                  >
                    <a
                      className='page-link'
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
