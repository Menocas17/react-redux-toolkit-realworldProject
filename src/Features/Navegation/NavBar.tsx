import { Link } from 'react-router';
import { useGetMeQuery } from '../../services/conduit';
import { useAppSelector } from '../../store/hooks';
import NavSkeleton from './NavSkeleton';

export default function NavBar() {
  const { token } = useAppSelector((state) => state.auth);
  const {
    data: user,
    error,
    isLoading,
  } = useGetMeQuery(undefined, { skip: !token });

  if (token && isLoading) {
    return <NavSkeleton />;
  }

  if (error || !token) {
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

  if (user) {
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
              <Link className='nav-link' to='/editor'>
                <i className='ion-compose'></i>&nbsp;New Article
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/settings'>
                <i className='ion-gear-a'></i>&nbsp;Settings
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to={`/profile/${user.user.username}`}>
                <img
                  src={
                    user.user.image ? user.user.image : '/default-avatar.svg'
                  }
                  className='user-pic'
                />
                {user.user.username}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
