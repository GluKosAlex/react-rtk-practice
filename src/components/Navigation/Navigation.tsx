import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav className='flex flex-row gap-4'>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/favorite'>Favorite</NavLink>
    </nav>
  );
}

export default Navigation;
