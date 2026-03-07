export default function NavSkeleton() {
  return (
    <nav className='navbar navbar-light'>
      <div className='container'>
        <span className='navbar-brand'>conduit</span>
        <ul className='nav navbar-nav pull-xs-right'>
          <li className='nav-item'>
            <span className='nav-link'>Home</span>
          </li>
          <li className='nav-item'>
            <span className='nav-link'>
              <div
                className='skeleton-box'
                style={{ width: '90px', height: '20px' }}
              />
            </span>
          </li>
          <li className='nav-item'>
            <span className='nav-link'>
              <div
                className='skeleton-box'
                style={{ width: '75px', height: '20px' }}
              />
            </span>
          </li>
          <li className='nav-item'>
            <span className='nav-link'>
              <div className='skeleton-avatar' />
              <div
                className='skeleton-box'
                style={{
                  width: '60px',
                  height: '20px',
                  marginLeft: '5px',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                }}
              />
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
}
