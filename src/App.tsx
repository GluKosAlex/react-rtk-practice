import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import PageLayout from './pages/PageLayout';

function App() {
  return (
    <Routes>
      <Route path='/' element={<PageLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/favorite' element={<FavoritesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
