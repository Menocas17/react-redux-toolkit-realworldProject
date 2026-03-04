import { Outlet } from 'react-router';

import Footer from './Footer';
import NavBar from '../Features/Navegation/NavBar';

export default function GeneralLayout() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
