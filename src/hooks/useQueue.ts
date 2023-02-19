import { useEffect, useState } from 'react';
import { data } from './useArtistAlbums';

/**
 *
 * @param data Processed list of albums
 * @returns Queued albums to show
 */
export const useQueue = (data: data) => {
  const [q, setQ] = useState([] as string[]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setQ([...q, ...data]);
    }
  }, [data, setQ]);

  return q;
};
