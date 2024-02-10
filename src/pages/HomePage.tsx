import { useEffect, useState } from 'react';
import { useLazyGetUserReposQuery, useSearchUsersQuery } from '../store/github/github.api';
import { useDebounce } from '../hooks/useDebounce';

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

  const getErrorMessage = (error: any) => {
    if (error) {
      if ('status' in error) {
        // you can access all properties of `FetchBaseQueryError` here
        return 'error' in error ? error.error : JSON.stringify(error.data);
      } else {
        // you can access all properties of `SerializedError` here
        return error.message;
      }
    } else {
      return '';
    }
  };

  const clickHandler = (username: string) => {
    fetchRepos(username);
    setDropdown(false);
  };

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <main className='w-full max-w-5xl px-4 py-10 mx-auto text-center'>
      <h1 className='mb-8 font-medium text-xl text-slate-900'>Home Page</h1>
      <div className='container max-w-3xl mx-auto relative z-10'>
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
      <div className='container mx-auto'>
        {isReposSuccess && (
          <ul className='list-none container py-2'>
            {userRepos &&
              userRepos.map((repo) => {
                return (
                  <li
                    key={repo.id}
                    className='flex text-left px-4 hover:bg-slate-200 transition-colors cursor-pointer'
                  >
                    <span>{repo.name}</span>
                  </li>
                );
              })}
            {isRepoError && (
              <p className='text-center font-bold text-red-700'>{getErrorMessage(repoError)}</p>
            )}
            {areReposLoading && <p className='text-center font-bold'>Repos are Loading...</p>}
          </ul>
        )}
      </div>
    </main>
  );
}

export default HomePage;
