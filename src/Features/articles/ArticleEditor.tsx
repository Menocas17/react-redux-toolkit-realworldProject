import { useGetArticleQuery } from '../../services/conduit';
import { useParams } from 'react-router';
import EditorForm from './EditorForm';

export default function ArticleEditor() {
  const { articleSlug } = useParams<{ articleSlug: string }>();
  const isEditingArticle = Boolean(articleSlug);
  const { data: article, isLoading } = useGetArticleQuery(articleSlug ?? '', {
    skip: !isEditingArticle,
  });

  //TODO - add skeleton for the form
  if (isEditingArticle && isLoading) return <h2>Loading editor ...</h2>;

  return (
    <EditorForm
      key={articleSlug ?? 'new'}
      isEditMode={isEditingArticle}
      articleSlug={articleSlug}
      article={article?.article}
    />
  );
}
