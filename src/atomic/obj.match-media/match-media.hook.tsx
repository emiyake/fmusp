import { useEffect, useState } from 'react';

export type MatchMedia = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export const breakpoints: Record<MatchMedia, string> = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
};

export const useBreakpoint = (breakpoint: MatchMedia) => {
  const query = breakpoints[breakpoint];
  if (!query) {
    throw new Error(`Invalid breakpoint: ${breakpoint}`);
  }

  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const handleChange = (event: MediaQueryListEvent) => setMatches(event.matches);

    mediaQueryList.addEventListener('change', handleChange);

    return () => mediaQueryList.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
};
