import { useEffect, useState } from 'react';
import { data } from './useArtistAlbums';

/**
 * 
 * @param q Queued albums
 * @param defaultSlides Default albums to show
 * @returns A list of active slides
 */
export function useActiveSlides(q: data, defaultSlides: data) {
  const [slides, setSlides]: [string[], Function] = useState(defaultSlides!);
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
      console.log(newSlides.length);
      setSlides(newSlides);
    }, 1000);

    return () => clearTimeout(timer);
  }, [q, slides, slides, setSlides]);
  return { slides };
}
