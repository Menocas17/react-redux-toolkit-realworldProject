import {
  useGetArticleQuery,
  useGetMeQuery,
  useGetArticleCommentsQuery,
  useAddNewCommentMutation,
  useDeleteCommentMutation,
  useFollowUserMutation,
  useUnFollowUserMutation,
  useFavoriteMutation,
  useUnFavoriteMutation,
  useDeleteArticleMutation,
} from '../../services/conduit';
import { useParams } from 'react-router';
import { formatDate } from '../../utils/DataFormatter';
import { useActionState } from 'react';
import { type ActionState, type ConduitError } from '../../services/types';
import { useNavigate } from 'react-router';

export default function Article() {
  const { articleSlug } = useParams<{ articleSlug: string }>();
  const { data: user } = useGetMeQuery();
  const { data: commentsData } = useGetArticleCommentsQuery(articleSlug ?? '');
  const [addComment] = useAddNewCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [followUser] = useFollowUserMutation();
  const [unFollowUser] = useUnFollowUserMutation();
  const [favorite] = useFavoriteMutation();
  const [unFavorite] = useUnFavoriteMutation();
  const [deleteArticle] = useDeleteArticleMutation();
  const navigate = useNavigate();
  const {
    data: article,
    error,
    isLoading,
  } = useGetArticleQuery(articleSlug ?? '');
  const [errMsg, formAction, isPending] = useActionState<ActionState, FormData>(
    async (_, formData) => {
      const body = formData.get('comment')?.toString() || '';

      const commentRequest = {
        slug: articleSlug ?? '',
        comment: {
          body: body,
        },
      };

      try {
        await addComment(commentRequest).unwrap();
        return null;
      } catch (err) {
        const error = err as ConduitError;
        return error?.data.errors;
      }
    },
    null,
  );
  //TODO - Add the confirmation to delete the article
  const handleDelete = () => {
    deleteArticle(articleData?.slug ?? '');
    navigate('/');
  };

  const handleFollowUnfollow = async () => {
    const authorUsername = articleData?.author.username;
    if (!authorUsername) {
      console.error('Could not find the user name');
      return;
    }

    try {
      if (articleData?.author.following) {
        await unFollowUser(authorUsername).unwrap();
      } else {
        await followUser(authorUsername).unwrap();
      }
    } catch (err) {
      console.error('Error executing mutation follow/unfollow:', err);
    }
  };

  const handleFavoriteUnfavotire = async () => {
    if (!articleSlug) {
      console.error('Could not find the article slug');
      return;
    }

    try {
      if (articleData?.favorited) {
        await unFavorite(articleSlug).unwrap();
      } else {
        await favorite(articleSlug).unwrap();
      }
    } catch (err) {
      console.error('Error executing mutation fav/Unfav:', err);
    }
  };

  const articleData = article?.article;
  const comments = commentsData?.comments ?? [];

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
              <button
                className='btn btn-sm btn-outline-secondary'
                onClick={handleFollowUnfollow}
              >
                <i className='ion-plus-round'></i>
                &nbsp; {articleData?.author.following
                  ? 'Unfollow'
                  : 'Follow'}{' '}
                {articleData?.author.username}
              </button>
            )}
            &nbsp;&nbsp;
            <button
              className='btn btn-sm btn-outline-primary'
              onClick={handleFavoriteUnfavotire}
            >
              <i className='ion-heart'></i>
              &nbsp; {articleData?.favorited
                ? 'Unfavorite'
                : 'Favorite'} Post{' '}
              <span className='counter'>({articleData?.favoritesCount})</span>
            </button>
            {isOwnProfile ? (
              <>
                <a
                  className='btn btn-sm btn-outline-secondary'
                  href={`/editor/${articleData?.slug}`}
                >
                  <i className='ion-edit'></i> Edit Article
                </a>
                <button
                  className='btn btn-sm btn-outline-danger'
                  onClick={handleDelete}
                >
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
              {articleData?.tagList.map((tag) => (
                <li className='tag-default tag-pill tag-outline' key={tag}>
                  {tag}
                </li>
              ))}
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
              <button
                className='btn btn-sm btn-outline-secondary'
                onClick={handleFollowUnfollow}
              >
                <i className='ion-plus-round'></i>
                &nbsp; {articleData?.author.following
                  ? 'Unfollow'
                  : 'Follow'}{' '}
                {articleData?.author.username}
              </button>
            )}
            &nbsp;&nbsp;
            <button
              className='btn btn-sm btn-outline-primary'
              onClick={handleFavoriteUnfavotire}
            >
              <i className='ion-heart'></i>
              &nbsp; {articleData?.favorited
                ? 'Unfavorite'
                : 'Favorite'} Post{' '}
              <span className='counter'>({articleData?.favoritesCount})</span>
            </button>
            {isOwnProfile ? (
              <>
                <a
                  className='btn btn-sm btn-outline-secondary'
                  href={`/editor/${articleData?.slug}`}
                >
                  <i className='ion-edit'></i> Edit Article
                </a>
                <button
                  className='btn btn-sm btn-outline-danger'
                  onClick={handleDelete}
                >
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
            {errMsg && (
              <ul className='error-messages'>
                {Object.entries(errMsg).map(([field, messages]) =>
                  messages.map((message, index) => (
                    <li key={`${field} - ${index}`}>
                      {field} {message}
                    </li>
                  )),
                )}
              </ul>
            )}
            <form className='card comment-form' action={formAction}>
              <div className='card-block'>
                <textarea
                  className='form-control'
                  placeholder='Write a comment...'
                  rows={3}
                  name='comment'
                ></textarea>
              </div>
              <div className='card-footer post-comment'>
                {/* <img
                  src={user?.user.image ?? '/default-avatar.svg'}
                  className='comment-author-img'
                /> */}
                <button className='btn btn-sm btn-primary'>
                  {isPending ? 'Posting Comment' : 'Post Comment'}
                </button>
              </div>
            </form>

            {comments?.length > 0
              ? comments.map((comment) => (
                  <div className='card' key={comment.id}>
                    <div className='card-block'>
                      <p className='card-text'>{comment.body}</p>
                    </div>
                    <div className='card-footer'>
                      <div>
                        <a
                          href={`/profile/${comment.author.username}`}
                          className='comment-author'
                        >
                          <img
                            src={comment.author.image ?? '/default-avatar.svg'}
                            className='comment-author-img'
                          />
                        </a>
                        &nbsp;
                        <a
                          href={`/profile/${comment.author.username}`}
                          className='comment-author'
                        >
                          {comment.author.username}
                        </a>
                        <span className='date-posted'>
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>

                      {comment.author.username === user?.user.username ? (
                        <button
                          className='btn btn-sm btn-outline-danger'
                          style={{ marginLeft: 'auto' }}
                          onClick={() =>
                            deleteComment({
                              id: comment.id,
                              slug: articleSlug ?? '',
                            })
                          }
                        >
                          <i className='ion-trash-a'> Delete Comment</i>
                        </button>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                ))
              : ''}
          </div>
        </div>
      </div>
    </div>
  );
}
