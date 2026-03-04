import '../styles.css';
import GlobalFeed from '../Features/articles/GlobalFeed';
import TagList from '../Features/articles/HomeTagList';

export default function HomePage() {
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
                  <a className='nav-link' href=''>
                    Your Feed
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link active' href=''>
                    Global Feed
                  </a>
                </li>
              </ul>
            </div>

            <GlobalFeed />

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
