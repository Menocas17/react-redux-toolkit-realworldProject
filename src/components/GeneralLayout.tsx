import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';

export default function GeneralLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
