import { useCallback } from 'react';

export function useCache() {
  const isEqual = (arr1: any[], arr2: any[]) => {
    if (arr1.length !== arr2.length) {
      return false;
    }

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < arr1.length; i++) {
      if (JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) {
        return false;
      }
    }

    return true;
  };

  const getDataLocalStorage = useCallback((key: string) => {
    const json = localStorage.getItem(key);

    if (!json) return null;

    return JSON.parse(json) ?? null;
  }, []);

  const setDataLocalStorage = useCallback((key: string, data: any[] | any) => {
    if (Array.isArray(data)) {
      const dataCache: any[] = getDataLocalStorage(key);

      if (dataCache && !isEqual(dataCache, data)) {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
      }

      if (!dataCache) {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
      }

      return false;
    }

    localStorage.setItem(key, JSON.stringify(data));
  }, []);

  return {
    setDataLocalStorage,
    getDataLocalStorage,
  };
}
