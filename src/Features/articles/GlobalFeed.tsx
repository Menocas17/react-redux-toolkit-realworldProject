import '../../styles.css';
import { useGetGlobalFeedQuery } from '../../services/conduit';
import { formatDate } from '../../utils/DataFormatter';

export default function GlobalFeed() {
  const { data: globalFeed, error, isLoading } = useGetGlobalFeedQuery();

  if (isLoading) return <h1>The feed is loading</h1>;

  if (error) return <h1>Opps something went wrong, try relodign the page</h1>;

  const articles = globalFeed?.articles;

  if (!articles) return <h1>There is no articles at this moment</h1>;

  return (
    <>
      {articles.map((article) => (
        <div className='article-preview' key={article.slug}>
          <div className='article-meta'>
            <a href='/profile/eric-simons'>
              <img
                src={
                  article.author.image
                    ? article.author.image
                    : '/default-avatar.svg'
                }
              />
            </a>
            <div className='info'>
              <a href='/profile/eric-simons' className='author'>
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
