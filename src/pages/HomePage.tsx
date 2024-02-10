import { useEffect, useState } from 'react';
import { useSearchUsersQuery } from '../store/github/github.api';
import { useDebounce } from '../hooks/useDebounce';

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdown, setDropdown] = useState(false);

  const debounced = useDebounce(searchQuery, 500);
  const { data, isLoading, isError, isSuccess, error } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3, // Do not send request if query string length less then 3
    refetchOnFocus: true, // refetch after focus on tab with page
  });

  useEffect(() => {
    setDropdown(debounced.length >= 3 && data?.length! > 0);
  }, [debounced, data]);

  const getErrorMessage = () => {
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

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <main className='w-full max-w-5xl px-4 py-10 mx-auto text-center'>
      <h1 className='mb-8 font-medium text-xl text-slate-900'>Home Page</h1>
      <div className='w-full max-w-3xl mx-auto relative'>
        <input
          className='w-full p-2 rounded-md border-solid border border-slate-900'
          type='text'
          placeholder='Search user by name...'
          value={searchQuery}
          onChange={searchHandler}
        />
        {dropdown && (
          <ul className='list-none w-full min-h-10 max-h-80 overflow-y-auto shadow-lg rounded-md border-solid border border-slate-600 absolute left-0 right-0 top-full'>
            {isSuccess &&
              data.map((user) => {
                console.log(user.avatar_url);

                return (
                  <li
                    key={user.id}
                    className='flex text-left p-2 hover:bg-slate-200 transition-colors cursor-pointer'
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
        {isError && <p className='text-center font-bold text-red-700'>{getErrorMessage()}</p>}
        {isLoading && <p className='text-center font-bold'>Loading...</p>}
      </div>
    </main>
  );
}

export default HomePage;
