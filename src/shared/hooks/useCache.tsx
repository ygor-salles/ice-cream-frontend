import { useCallback } from 'react';

export function useCache() {
  const getDataLocalStorage = useCallback((key: string) => {
    const json = localStorage.getItem(key);

    if (!json) return null;

    return JSON.parse(json) ?? null;
  }, []);

  const setDataLocalStorage = useCallback((key: string, data: any[]) => {
    const dataCache: any[] = getDataLocalStorage(key);

    if (dataCache && dataCache.length !== data.length) {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    }

    if (!dataCache) {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    }

    return false;
  }, []);

  return {
    setDataLocalStorage,
    getDataLocalStorage,
  };
}
