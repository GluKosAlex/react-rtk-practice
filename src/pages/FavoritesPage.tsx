import RepoItem from '../components/RepoItem/RepoItem';
import { useTypedSelector } from '../hooks/useTypedSelector';

function FavoritesPage() {
  const { favorites } = useTypedSelector((state) => state.github);

  if (favorites.length === 0)
    return <p className='text-center text-lg font-bold'>No favorite repositories.</p>;

  return (
    <main className='w-full max-w-5xl px-4 py-10 mx-auto text-center'>
      <h1 className='mb-8 font-medium text-xl text-slate-900'>Favorite repositories</h1>
      <ul className='list-none container py-2 mx-auto grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2'>
        {favorites.map((fav) => (
          <RepoItem repo={fav} />
        ))}
      </ul>
    </main>
  );
}

export default FavoritesPage;
