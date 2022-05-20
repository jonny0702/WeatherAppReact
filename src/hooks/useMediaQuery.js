import { useState, useEffect } from 'react';

export default function useScreenMediaQuery(breakpoint = 514) {
  const [isMatched, setMatched] = useState(null);

  const mediaQuery =
    typeof window === 'undefined'
      ? ''
      : window.matchMedia(`(min-width: ${breakpoint}px)`);

  const handleScreenChange = (e) => {
    setMatched(e?.matches);
  };

  useEffect(() => {
    handleScreenChange(mediaQuery);

    mediaQuery.addEventListener('change', handleScreenChange);

    return () => mediaQuery.removeEventListener('change', handleScreenChange);
  }, []);

  return {
    isMatched,
  };
}
