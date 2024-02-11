import { IRepo } from './../../models/models';

function RepoItem({ repo }: { repo: IRepo }) {
  return (
    <li className='flex text-left px-4 hover:bg-slate-200 transition-colors'>
      <span>{repo.name}</span>
    </li>
  );
}

export default RepoItem;
