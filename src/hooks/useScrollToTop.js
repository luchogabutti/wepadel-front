import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scrolls to the top of the page on every route change.
// Needed because React Router doesn't reset scroll position on client-side navigation.
export const useScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};
