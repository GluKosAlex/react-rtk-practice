import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { IRepo } from '../../models/models';
import { getErrorMessage } from '../../utils/getErrorMessage';
import RepoItem from '../RepoItem/RepoItem';
import { SerializedError } from '@reduxjs/toolkit';

interface ReposListProps {
  areReposLoading: boolean;
  userRepos: IRepo[] | undefined;
  isRepoError: boolean;
  repoError: FetchBaseQueryError | SerializedError | undefined;
  isReposSuccess: boolean;
}

function ReposList({ areReposLoading, userRepos, isRepoError, repoError, isReposSuccess }: ReposListProps) {
  return (
    <div className='container mx-auto'>
      {isReposSuccess && (
        <ul className='list-none container py-2'>
          {userRepos &&
            userRepos.map((repo) => {
              return <RepoItem key={repo.id} repo={repo} />;
            })}
        </ul>
      )}
      {isRepoError && <p className='text-center font-bold text-red-700'>{getErrorMessage(repoError)}</p>}
      {areReposLoading && <p className='text-center font-bold'>Repos are Loading...</p>}
    </div>
  );
}

export default ReposList;
