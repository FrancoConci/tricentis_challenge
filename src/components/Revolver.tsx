import { useState } from 'react';
import { useArtistAlbums, useQueue, useActiveSlides } from '../hooks';
import { debounce } from '../utils/utils';

export default function Revolver() {
  const defaultSlides = ['please', 'select', 'an', 'artist', 'above!'];

  const [userPrompt, setUserPrompt] = useState('');
  const { isLoading, error, data = defaultSlides } = useArtistAlbums(userPrompt);
  const q = useQueue(data);
  const {slides} = useActiveSlides(q, defaultSlides);

  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          debounce(setUserPrompt(e.target.value), 500);
        }}
      ></input>
      <h4>{isLoading ? 'loading...' : 'done'}</h4>
      <h4>{error}</h4>
      <div>{slides.map(slide=><div key={slide}>
        {slide}
      </div>)}</div>
    </div>
  );
}
