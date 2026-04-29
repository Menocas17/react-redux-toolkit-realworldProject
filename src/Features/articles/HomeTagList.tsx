import { useGetAllTagsQuery } from '../../services/conduit';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import Spinner from '../../utils/Spinner';
import { setTag, changeTab } from './feedSlice';

export default function TagList() {
  const { data: tags, error, isLoading } = useGetAllTagsQuery();
  const tagSelected = useAppSelector((state) => state.feed.tag);
  const dispatch = useAppDispatch();

  if (isLoading) return <Spinner />;

  if (error) return <h1>Opps something went wrong, try relodign the page</h1>;

  if (!tags) return <p>There is no tags at the moment</p>;

  return (
    <div className='tag-list'>
      {tags.tags.map((tag) => (
        <button
          className={`tag-pill tag-default ${tagSelected === tag ? 'tag-selected' : ''}`}
          key={tag}
          onClick={() => {
            dispatch(setTag({ tag: tag }));
            dispatch(changeTab({ tab: 'tag' }));
          }}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
