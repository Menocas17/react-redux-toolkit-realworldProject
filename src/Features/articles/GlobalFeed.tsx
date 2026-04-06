import '../../styles.css';
import { useGetGlobalFeedQuery } from '../../services/conduit';
import ArticleList from './ArticleList';

export default function GlobalFeed() {
  const { data: globalFeed, error, isLoading } = useGetGlobalFeedQuery();

  if (isLoading) return <h1>The feed is loading</h1>;

  if (error) return <h1>Opps something went wrong, try relodign the page</h1>;

  const articles = globalFeed?.articles;

  if (!articles) return <h1>There is no articles at this moment</h1>;

  return <ArticleList articles={articles} />;
}
