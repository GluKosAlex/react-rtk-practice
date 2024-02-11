import { useEffect, useState } from 'react';
import { useLazyGetUserReposQuery, useSearchUsersQuery } from '../store/github/github.api';
import { useDebounce } from '../hooks/useDebounce';

import ReposList from '../components/ReposList/ReposList';

import { getErrorMessage } from '../utils/getErrorMessage';

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdown, setDropdown] = useState(false);

  const debounced = useDebounce(searchQuery, 500);

  const {
    data,
    isLoading,
    isError,
    isSuccess,
    error: userError,
  } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3, // Do not send request if query string length less then 3
    refetchOnFocus: true, // refetch after focus on tab with page
  });

  const [
    fetchRepos,
    {
      isLoading: areReposLoading,
      data: userRepos,
      isError: isRepoError,
      error: repoError,
      isSuccess: isReposSuccess,
    },
  ] = useLazyGetUserReposQuery();

  useEffect(() => {
    setDropdown(debounced.length >= 3 && data?.length! > 0);
  }, [debounced, data]);

  const clickHandler = (username: string) => {
    fetchRepos(username);
    setSearchQuery('');
    setDropdown(false);
  };

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <main className='w-full max-w-5xl px-4 py-10 mx-auto text-center'>
      <h1 className='mb-8 font-medium text-xl text-slate-900'>Home Page</h1>
      <div className='container max-w-3xl mx-auto mb-8 relative z-10'>
        <input
          className='w-full px-4 py-2 rounded-md border-solid border border-slate-900'
          type='text'
          placeholder='Search user by name...'
          value={searchQuery}
          onChange={searchHandler}
        />
        {dropdown && (
          <ul className='list-none absolute left-0 right-0 top-full container py-2 overflow-y-auto shadow-lg rounded-md border-solid border border-slate-600 bg-white'>
            {isSuccess &&
              data.map((user) => {
                return (
                  <li
                    key={user.id}
                    className='flex text-left py-2 px-4 hover:bg-slate-200 transition-colors cursor-pointer'
                    onClick={() => clickHandler(user.login)}
                  >
                    <img
                      className='rounded-full mr-2 border object-cover size-6 shadow-md'
                      src={user?.avatar_url}
                      alt={user.login}
                      width={20}
                      height={20}
                    />
                    <span>{user.login}</span>
                  </li>
                );
              })}
          </ul>
        )}
        {isError && <p className='text-center font-bold text-red-700'>{getErrorMessage(userError)}</p>}
        {isLoading && <p className='text-center font-bold'>Loading...</p>}
      </div>
      <ReposList
        areReposLoading={areReposLoading}
        userRepos={userRepos}
        isRepoError={isRepoError}
        repoError={repoError}
        isReposSuccess={isReposSuccess}
      />
    </main>
  );
}

export default HomePage;
