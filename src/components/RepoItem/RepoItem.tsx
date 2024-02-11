import { IRepo } from './../../models/models';

function RepoItem({ repo }: { repo: IRepo }) {
  return (
    <li className='flex flex-col text-left p-4 border border-slate-400 rounded hover:bg-slate-100 hover:shadow-md transition-all '>
      <a className='underline' href={repo.html_url} target='_blank' rel='noopener noreferrer'>
        <h3 className='text-lg font-bold text-ellipsis overflow-hidden'>{repo.name}</h3>
      </a>
      <dl className='flex gap-1 text-sm'>
        <dt>Forks: </dt>
        <dd className='font-bold mr-2'>{repo.forks}</dd>
        <dt>Watchers: </dt>
        <dd className='font-bold mr-2'>{repo.watchers}</dd>
      </dl>
      <p className='text-sm font-thin'>{repo?.description}</p>
    </li>
  );
}

export default RepoItem;
