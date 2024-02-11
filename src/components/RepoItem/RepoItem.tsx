import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { IRepo } from './../../models/models';

function RepoItem({ repo }: { repo: IRepo }) {
  const { addFavorite, removeFavorite } = useActions();

  const { favorites } = useTypedSelector((state) => state.github);

  const addToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addFavorite(repo);
  };

  const removeFromFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeFavorite(repo.id);
  };

  return (
    <li className='flex flex-col text-left p-4 border border-slate-400 rounded hover:shadow-md transition-all '>
      <a className='underline' href={repo.html_url} target='_blank' rel='noopener noreferrer'>
        <h3 className='text-lg font-bold text-ellipsis overflow-hidden'>{repo.name}</h3>
      </a>
      <dl className='flex gap-1 text-sm'>
        <dt>Forks: </dt>
        <dd className='font-bold mr-2'>{repo.forks}</dd>
        <dt>Watchers: </dt>
        <dd className='font-bold mr-2'>{repo.watchers}</dd>
      </dl>
      <p className='text-sm font-thin mb-auto'>{repo?.description}</p>

      <div className='flex flex-col mt-4'>
        {!favorites.some((f) => f.id === repo.id) ? (
          <button className='border rounded text-teal-800 hover:bg-slate-100' onClick={addToFavorite}>
            Add
          </button>
        ) : (
          <button className='border rounded text-red-800 hover:bg-slate-100' onClick={removeFromFavorite}>
            Remove
          </button>
        )}
      </div>
    </li>
  );
}

export default RepoItem;
