//TODO - Add the proper pagination to this page
import '../styles.css';
import GlobalFeed from '../Features/articles/GlobalFeed';
import TagList from '../Features/articles/HomeTagList';
import { changeTab, setTag } from '../Features/articles/feedSlice';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import OwnFeed from '../Features/articles/YourFeed';
import TagFeed from '../Features/articles/TagFeed';

export default function HomePage() {
  const tagSelected = useAppSelector((state) => state.feed.tag);
  const activeTab = useAppSelector((state) => state.feed.tab);
  const dispatch = useAppDispatch();

  return (
    <div className='home-page'>
      <div className='banner'>
        <div className='container'>
          <h1 className='logo-font'>conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className='container page'>
        <div className='row'>
          <div className='col-md-9'>
            <div className='feed-toggle'>
              <ul className='nav nav-pills outline-active'>
                <li className='nav-item'>
                  <button
                    className={`nav-link ${activeTab === 'feed' ? 'active' : ''}`}
                    onClick={() => {
                      dispatch(changeTab({ tab: 'feed' }));
                      dispatch(setTag({ tag: '' }));
                    }}
                  >
                    Your Feed
                  </button>
                </li>
                <li className='nav-item'>
                  <button
                    className={`nav-link ${activeTab === 'global' ? 'active' : ''}`}
                    onClick={() => {
                      dispatch(changeTab({ tab: 'global' }));
                      dispatch(setTag({ tag: '' }));
                    }}
                  >
                    Global Feed
                  </button>
                </li>
                {tagSelected ? (
                  <li className='nav-item'>
                    <button
                      className={`nav-link ${activeTab === 'tag' ? 'active' : ''}`}
                      onClick={() => dispatch(changeTab({ tab: 'tag' }))}
                    >
                      {tagSelected}
                    </button>
                  </li>
                ) : (
                  ''
                )}
              </ul>
            </div>

            {activeTab === 'global' && <GlobalFeed />}
            {activeTab === 'feed' && <OwnFeed />}
            {activeTab === 'tag' && <TagFeed />}

            <ul className='pagination'>
              <li className='page-item active'>
                <a className='page-link' href=''>
                  1
                </a>
              </li>
              <li className='page-item'>
                <a className='page-link' href=''>
                  2
                </a>
              </li>
            </ul>
          </div>

          <div className='col-md-3'>
            <div className='sidebar'>
              <p>Popular Tags</p>

              <TagList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
