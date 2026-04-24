//TODO - Make this page actually display real info and add interactivity (being able to favorite the article, or going to edit or delete the article if you are the owner)
import { useGetArticleQuery, useGetMeQuery } from '../../services/conduit';
import { useParams } from 'react-router';
import { formatDate } from '../../utils/DataFormatter';

export default function Article() {
  const { articleSlug } = useParams<{ articleSlug: string }>();
  const { data: user } = useGetMeQuery();

  const {
    data: article,
    error,
    isLoading,
  } = useGetArticleQuery(articleSlug ?? '');

  const articleData = article?.article;

  const isOwnProfile = user?.user.username === articleData?.author.username;

  if (isLoading) return <h1>The article is loading</h1>;

  if (error) return <h1>Opps something went wrong, try relodign the page</h1>;

  return (
    <div className='article-page'>
      <div className='banner'>
        <div className='container'>
          <h1>{articleData?.title}</h1>
          <p>{articleData?.description}</p>
          <div className='article-meta'>
            <a href={`/profile/${articleData?.author.username}`}>
              <img src={articleData?.author.image || '/default-avatar.svg'} />
            </a>
            <div className='info'>
              <a
                href={`/profile/${articleData?.author.username}`}
                className='author'
              >
                {articleData?.author.username}
              </a>
              <span className='date'>
                {formatDate(articleData?.createdAt ?? '')}
              </span>
            </div>
            {isOwnProfile ? (
              ''
            ) : (
              <button className='btn btn-sm btn-outline-secondary'>
                <i className='ion-plus-round'></i>
                &nbsp; Follow {articleData?.author.username}
              </button>
            )}
            &nbsp;&nbsp;
            <button className='btn btn-sm btn-outline-primary'>
              <i className='ion-heart'></i>
              &nbsp; Favorite Post{' '}
              <span className='counter'>({articleData?.favoritesCount})</span>
            </button>
            {isOwnProfile ? (
              <>
                <button className='btn btn-sm btn-outline-secondary'>
                  <i className='ion-edit'></i> Edit Article
                </button>
                <button className='btn btn-sm btn-outline-danger'>
                  <i className='ion-trash-a'></i> Delete Article
                </button>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>

      <div className='container page'>
        <div className='row article-content'>
          <div className='col-md-12'>
            <p>{articleData?.body}</p>
            <ul className='tag-list'>
              <li className='tag-default tag-pill tag-outline'>realworld</li>
              <li className='tag-default tag-pill tag-outline'>
                implementations
              </li>
            </ul>
          </div>
        </div>

        <hr />

        <div className='article-actions'>
          <div className='article-meta'>
            <a href={`/profile/${articleData?.author.username}`}>
              <img src={articleData?.author.image || '/default-avatar.svg'} />
            </a>
            <div className='info'>
              <a
                href={`/profile/${articleData?.author.username}`}
                className='author'
              >
                {articleData?.author.username}
              </a>
              <span className='date'>
                {formatDate(articleData?.createdAt ?? '')}
              </span>
            </div>
            {isOwnProfile ? (
              ''
            ) : (
              <button className='btn btn-sm btn-outline-secondary'>
                <i className='ion-plus-round'></i>
                &nbsp; Follow {articleData?.author.username}
              </button>
            )}
            &nbsp;&nbsp;
            <button className='btn btn-sm btn-outline-primary'>
              <i className='ion-heart'></i>
              &nbsp; Favorite Post{' '}
              <span className='counter'>({articleData?.favoritesCount})</span>
            </button>
            {isOwnProfile ? (
              <>
                <button className='btn btn-sm btn-outline-secondary'>
                  <i className='ion-edit'></i> Edit Article
                </button>
                <button className='btn btn-sm btn-outline-danger'>
                  <i className='ion-trash-a'></i> Delete Article
                </button>
              </>
            ) : (
              ''
            )}
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-12 col-md-8 offset-md-2'>
            <form className='card comment-form'>
              <div className='card-block'>
                <textarea
                  className='form-control'
                  placeholder='Write a comment...'
                  rows={3}
                ></textarea>
              </div>
              <div className='card-footer'>
                <img
                  src='http://i.imgur.com/Qr71crq.jpg'
                  className='comment-author-img'
                />
                <button className='btn btn-sm btn-primary'>Post Comment</button>
              </div>
            </form>

            <div className='card'>
              <div className='card-block'>
                <p className='card-text'>
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
              <div className='card-footer'>
                <a href='/profile/author' className='comment-author'>
                  <img
                    src='http://i.imgur.com/Qr71crq.jpg'
                    className='comment-author-img'
                  />
                </a>
                &nbsp;
                <a href='/profile/jacob-schmidt' className='comment-author'>
                  Jacob Schmidt
                </a>
                <span className='date-posted'>Dec 29th</span>
              </div>
            </div>

            <div className='card'>
              <div className='card-block'>
                <p className='card-text'>
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
              <div className='card-footer'>
                <a href='/profile/author' className='comment-author'>
                  <img
                    src='http://i.imgur.com/Qr71crq.jpg'
                    className='comment-author-img'
                  />
                </a>
                &nbsp;
                <a href='/profile/jacob-schmidt' className='comment-author'>
                  Jacob Schmidt
                </a>
                <span className='date-posted'>Dec 29th</span>
                <span className='mod-options'>
                  <i className='ion-trash-a'></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
