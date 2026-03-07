import { Link } from 'react-router';
import { useGetMeQuery } from '../../services/conduit';

export default function NavBar() {
  const { data: user, error } = useGetMeQuery();

  if (error || !user) {
    return (
      <nav className='navbar navbar-light'>
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            conduit
          </Link>
          <ul className='nav navbar-nav pull-xs-right'>
            <li className='nav-item'>
              <Link className='nav-link active' to='/'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/login'>
                Sign in
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/register'>
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
  return (
    <nav className='navbar navbar-light'>
      <div className='container'>
        <a className='navbar-brand' href='/'>
          conduit
        </a>
        <ul className='nav navbar-nav pull-xs-right'>
          <li className='nav-item'>
            <a className='nav-link active' href='/'>
              Home
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='/editor'>
              {' '}
              <i className='ion-compose'></i>&nbsp;New Article{' '}
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='/settings'>
              {' '}
              <i className='ion-gear-a'></i>&nbsp;Settings{' '}
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='/profile/eric-simons'>
              <img
                src={user.user.image ? user.user.image : '/default-avatar.svg'}
                className='user-pic'
              />
              {user.user.username}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
