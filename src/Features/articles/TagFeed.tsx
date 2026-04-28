import { useGetTagFeedQuery } from '../../services/conduit';
import ArticleList from './ArticleList';
import { useAppSelector } from '../../store/hooks';

export default function TagFeed() {
  const selectedTag = useAppSelector((state) => state.feed.tag);
  const { data: ownFeed, error, isLoading } = useGetTagFeedQuery(selectedTag);

  if (isLoading) return <h1>The feed is loading</h1>;

  if (error) return <h1>Opps something went wrong, try relodign the page</h1>;

  const articles = ownFeed?.articles;

  if (!articles) return <h1>There is no articles at this moment</h1>;

  return <ArticleList articles={articles} />;
}
