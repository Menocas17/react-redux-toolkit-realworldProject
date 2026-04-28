import { useGetOwnFeedQuery } from '../../services/conduit';
import ArticleList from './ArticleList';

export default function OwnFeed() {
  const { data: ownFeed, error, isLoading } = useGetOwnFeedQuery();

  if (isLoading) return <h1>The feed is loading</h1>;

  if (error) return <h1>Opps something went wrong, try relodign the page</h1>;

  const articles = ownFeed?.articles;

  if (!articles) return <h1>There is no articles at this moment</h1>;

  return <ArticleList articles={articles} />;
}
