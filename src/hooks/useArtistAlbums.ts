import axios from 'axios';
import { useEffect, useState } from 'react';

export type data = string[] | null;

/**
 * @description function to retrieve albums from the raw response
 * @param data raw data from api
 * @returns The first five albums, sorted by name
 */
export function getFinalData(data: any) {
  if (!data || !data.results || !Array.isArray(data.results)) {
    return [];
  }
  const returnValue: string[] = [];
  for (let i = 0; i < data.results.length; i++) {
    const result = data.results[i];
    if (!result || !result.collectionName) {
      continue;
    }
    if (returnValue.indexOf(result.collectionName) === -1) {
      returnValue.push(result.collectionName);
    }
  }
  returnValue.sort();
  return returnValue.slice(0, 5);
}

/**
 * @description A hook that returns the first five albums (alphabetically) 
 * for the specified artist 
 * @param userPrompt A string specified by user
 * @returns an object with shape: {isLoading, data, error}
 */
export const useArtistAlbums = (userPrompt: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([] as data);
  const [error, setError] = useState(null as string | null);
  const [oldPrompt, setOldPrompt] = useState(userPrompt);
  const controller = new AbortController();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          url: 'https://itunes.apple.com/search?',
          method: 'GET',
          params: { term: userPrompt },
          signal: controller.signal,
        });
        const data = response?.data;
        setData(getFinalData(data));
        setError(null);
      } catch (error: any) {
        // here i could go over the https response codes...
        if(error?.code !== "ERR_CANCELED") {
          setError('There was a generic error');
        }
      } finally {
        setIsLoading(false);
      }
    };

    setOldPrompt(userPrompt);
    if (userPrompt !== oldPrompt) {
      setIsLoading(true);
      fetchData();
    }

    return function () {
      controller.abort();
    };
  }, [userPrompt, setIsLoading, setData, setError]);

  return { isLoading, data, error };
};
