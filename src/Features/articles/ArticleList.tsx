//TODO - Add the favorited button feature
import { formatDate } from '../../utils/DataFormatter';
import { type Article } from '../../services/types';

export default function ArticleList({
  articles,
}: {
  articles: Article[] | undefined;
}) {
  if (articles?.length === 0) {
    return (
      <div className='no-articles'>
        <h1 className=''>Opps, looks like there ir no articles yet!</h1>
      </div>
    );
  }

  return (
    <>
      {articles?.map((article) => (
        <div className='article-preview' key={article.slug}>
          <div className='article-meta'>
            <a href={`/profile/${article.author.username}`}>
              <img
                src={
                  article.author.image
                    ? article.author.image
                    : '/default-avatar.svg'
                }
              />
            </a>
            <div className='info'>
              <a
                href={`/profile/${article.author.username}`}
                className='author'
              >
                {article.author.username}
              </a>
              <span className='date'>{formatDate(article.createdAt)}</span>
            </div>
            <button className='btn btn-outline-primary btn-sm pull-xs-right'>
              <i className='ion-heart'></i> {article.favoritesCount}
            </button>
          </div>
          <a
            href='/article/how-to-build-webapps-that-scale'
            className='preview-link'
          >
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <span>Read more...</span>

            <ul className='tag-list'>
              {article.tagList.map((tag) => (
                <li className='tag-default tag-pill tag-outline' key={tag}>
                  {tag}
                </li>
              ))}
            </ul>
          </a>
        </div>
      ))}
    </>
  );
}
