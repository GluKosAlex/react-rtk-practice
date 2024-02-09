import { Link } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';

import './Header.css';

function Header() {
  return (
    <header className='flex min-h-10 bg-slate-700 text-white'>
      <div className='flex justify-between w-full max-w-5xl p-4 mx-auto'>
        <Link className='font-bold' to='/'>
          GitHub Search APP
        </Link>
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
