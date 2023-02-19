import { useState } from 'react';

import { useArtistAlbums, useQueue, useActiveSlides } from '../hooks';
import { debounce } from '../utils/utils';
import styles from './Revolver.module.css';

export default function Revolver() {
  const defaultSlides = ['please', 'select', 'an', 'artist', 'above!'];

  const [userPrompt, setUserPrompt] = useState('');
  const { isLoading, error, data = defaultSlides } = useArtistAlbums(userPrompt);
  const q = useQueue(data);
  const slides = useActiveSlides(q, defaultSlides);

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        placeholder='Type away!'
        data-testid="input"
        onChange={(e) => {
          debounce(setUserPrompt(e.target.value), 500);
        }}
      ></input>
      {isLoading && <div className={styles.spinner}></div>}
      <h6>{error}</h6>
      <div className={styles.container}>
        {slides.map((slide) => (
          <div key={slide} className={styles.baseItem} data-testid={`item-${slide}`}>{slide}</div>
        ))}
      </div>
    </div>
  );
}
