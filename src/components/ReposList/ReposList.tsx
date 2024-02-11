import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { IRepo } from '../../models/models';
import { getErrorMessage } from '../../utils/getErrorMessage';
import RepoItem from '../RepoItem/RepoItem';
import { SerializedError } from '@reduxjs/toolkit';

interface ReposListProps {
  areReposLoading: boolean;
  userRepos?: IRepo[];
  isRepoError: boolean;
  repoError?: FetchBaseQueryError | SerializedError;
  isReposSuccess: boolean;
}

function ReposList({ areReposLoading, userRepos, isRepoError, repoError, isReposSuccess }: ReposListProps) {
  return (
    <div className='container mx-auto'>
      {isRepoError && <p className='text-center font-bold text-red-700'>{getErrorMessage(repoError)}</p>}
      {areReposLoading && <p className='text-center font-bold'>Repos are Loading...</p>}
      {isReposSuccess &&
        !areReposLoading &&
        (userRepos?.length !== undefined && userRepos?.length > 0 ? (
          <>
            <h2 className='flex items-center justify-center gap-2 font-bold text-xl mb-4'>
              Repositories of user
              <img
                className='size-6 inline-block align-baseline object-cover rounded-full shadow-md'
                src={userRepos && userRepos[0]?.owner.avatar_url}
                alt={userRepos && userRepos[0]?.owner.login}
                width={24}
                height={24}
              />
              <span>{userRepos && userRepos[0]?.owner.login}</span>
            </h2>
            <ul className='list-none container py-2 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2'>
              {userRepos &&
                userRepos.map((repo) => {
                  return <RepoItem key={repo.id} repo={repo} />;
                })}
            </ul>
          </>
        ) : (
          <h2 className='flex items-center justify-center gap-2 font-bold text-xl mb-4'>
            This user does not have any repositories
          </h2>
        ))}
    </div>
  );
}

export default ReposList;
