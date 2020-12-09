import { useEffect } from 'react';

const setPageTitle = (title: string) => {
  document.title = `${title} | NH Academy`;
};

export const usePageTitle = (title: string) => {
  useEffect(() => {
    setPageTitle(title);
  }, [title]);

  useEffect(() => {
    return () => setPageTitle('NH Academy');
  }, []);
};
