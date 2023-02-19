import { useEffect, useState } from 'react';
import { useArtistAlbums } from '../hooks/useArtistAlbums'; 

function debounce(func: any, timeout = 500) {
  let timer: any;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(null, args);
    }, timeout);
  };
}

function Try2() {
  const [userPrompt, setUserPrompt] = useState('');
  const [q, setQ] = useState([] as string[]);
  const {
    isLoading,
    error,
    data = ['please', 'select', 'an', 'artist', 'above!'],
  } = useArtistAlbums(userPrompt);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setQ([...q, ...data]);
    }
  }, [data, setQ]);

  return (
    <div >
      <input
        type="text"
        onChange={(e) => {
          debounce(setUserPrompt(e.target.value));
        }}
      ></input>
      <h4>{isLoading ? 'loading...' : 'done'}</h4>
      <h4>{error}</h4>
      <div >
        {q}
      </div>
    </div>
  );
}

export default Try2;
