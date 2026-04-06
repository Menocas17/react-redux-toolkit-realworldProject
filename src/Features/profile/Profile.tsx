import { Link } from 'react-router';
import { useGetMeQuery, useGetProfileQuery } from '../../services/conduit';
import { useParams } from 'react-router';
import { useGetProfileArticlesQuery } from '../../services/conduit';
import ArticleList from '../articles/ArticleList';

export default function MyProfile() {
  const { username } = useParams<{ username: string }>();
  const { data: user } = useGetMeQuery();
  const { data } = useGetProfileQuery(username ?? '');
  const { data: articlesResponse } = useGetProfileArticlesQuery(username ?? '');

  const articleList = articlesResponse?.articles;

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
                  <button className='btn btn-sm btn-outline-secondary action-btn'>
                    <i className='ion-plus-round'></i>
                    &nbsp; Follow {data?.profile.username}
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
                  <a className='nav-link active' href=''>
                    My Articles
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href=''>
                    Favorited Articles
                  </a>
                </li>
              </ul>
            </div>

            <ArticleList articles={articleList} />

            <ul className='pagination'>
              <li className='page-item active'>
                <a className='page-link' href=''>
                  1
                </a>
              </li>
              <li className='page-item'>
                <a className='page-link' href=''>
                  2
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
