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
 *
 * @param userPrompt User prompt
 * @param controller Axios controller
 * @param setError Error setter
 * @param setIsLoading Loading state setter
 * @param setData Data setter
 */
const fetchData = async (
  userPrompt: string,
  controller: any,
  setError: Function,
  setIsLoading: Function,
  setData: Function
) => {
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
    if (error?.code !== 'ERR_CANCELED') {
      setError('There was a generic error');
    }
  } finally {
    setIsLoading(false);
  }
};

/**
 *
 * @param data Retrieved albums
 * @param defaultSlides Default albums to show
 * @returns A list of active slides
 */
export function useActiveSlides(userPrompt: string, defaultSlides: data) {
  const [slides, setSlides]: [string[], Function] = useState(defaultSlides!);
  const [q, setQ] = useState([] as string[]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([] as data);
  const [error, setError] = useState(null as string | null);
  const [oldPrompt, setOldPrompt] = useState(userPrompt);
  const controller = new AbortController();
  const [timer, setTimer]: any = useState(null);

  // Queue management
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setQ((q)=>[...q, ...data]);
    }
  }, [data, setQ]);

  // Revolver timer function
  useEffect(() => {
    const timer = setTimeout(() => {
      let exFirstSlide = slides.shift();
      if (q!.length > 0) {
        if (slides[slides.length - 1] === q![0]) {
          q!.shift();
        } else {
          exFirstSlide = q!.shift();
        }
      }
      let newSlides: string[] = [...slides!, ...[exFirstSlide!]];
      setSlides(newSlides);
    }, 1000);

    return () => clearTimeout(timer);
  }, [q, slides, setSlides]);

  // Data retrieval
  useEffect(() => {
    setOldPrompt(userPrompt);
    if (userPrompt !== oldPrompt) {
      setIsLoading(true);
      clearTimeout(timer);

      setTimer(
        setTimeout(() => {
          fetchData(userPrompt, controller, setError, setIsLoading, setData);
        }, 500)
      );
    }

    return function () {
      controller.abort();
      clearTimeout(timer);
    };
  }, [userPrompt, setIsLoading, setData, setError]);

  return { slides, isLoading, error };
}
