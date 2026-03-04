import { useGetAllTagsQuery } from '../../services/conduit';

export default function TagList() {
  const { data: tags, error, isLoading } = useGetAllTagsQuery();

  if (isLoading) return <h1>The tags are loading</h1>;

  if (error) return <h1>Opps something went wrong, try relodign the page</h1>;

  if (!tags) return <p>There is no tags at the moment</p>;

  return (
    <div className='tag-list'>
      {tags.tags.map((tag) => (
        <a href='' className='tag-pill tag-default' key={tag}>
          {tag}
        </a>
      ))}
    </div>
  );
}
