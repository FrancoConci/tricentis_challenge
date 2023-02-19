import { useState } from 'react';

import { useActiveSlides } from '../hooks';
import styles from './Revolver.module.css';

export default function Revolver() {
  const defaultSlides = ['please', 'select', 'an', 'artist', 'above!'];
  const [userPrompt, setUserPrompt] = useState('');

  const { slides, isLoading, error } = useActiveSlides(userPrompt, defaultSlides);
  const onChange = (e: any) => {
    setUserPrompt(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <input type="text" placeholder="Type away!" data-testid="input" onChange={onChange}></input>
      <h6>{error}</h6>
      <div className={styles.container}>
        {!isLoading &&
          slides.map((slide) => (
            <div key={slide} className={styles.baseItem} data-testid={`item-${slide}`}>
              {slide}
            </div>
          ))}
        {isLoading && <div className={styles.spinner}></div>}
      </div>
    </div>
  );
}
